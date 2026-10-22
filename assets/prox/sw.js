var CORE_CDN = "https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/fks12s.js";
try {
  importScripts(CORE_CDN);
} catch (e) {
  console.warn("[sw] pr0xy core failed to load", e);
}
if (!self._pnclg8f) {
  throw new Error("pr0xy core unavailable");
}

var readyClients = new Set();
var readyWaiters = [];

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  var data = event.data;
  if (!data || !data.$ubWispReady) return;
  var source = event.source;
  if (source && source.id) {
    readyClients.add(source.id);
    var waiters = readyWaiters.slice();
    readyWaiters.length = 0;
    waiters.forEach(function (fn) { fn(); });
  }
});

function waitForReadyClient() {
  return new Promise(function (resolve) {
    var settled = false;
    var timer = null;
    function finish(id) {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      resolve(id);
    }
    function check() {
      var id = readyClients.values().next().value;
      if (id) finish(id);
    }
    timer = setTimeout(function () {
      var i = readyWaiters.indexOf(check);
      if (i !== -1) readyWaiters.splice(i, 1);
      finish(null);
    }, 20000);
    readyWaiters.push(check);
    check();
  });
}

async function pickReadyClient(clientId) {
  if (clientId && readyClients.has(clientId)) {
    var own = await self.clients.get(clientId);
    if (own) return own;
    readyClients.delete(clientId);
  }
  while (true) {
    var id = await waitForReadyClient();
    if (!id) return null;
    var client = await self.clients.get(id);
    if (client) return client;
    readyClients.delete(id);
  }
}

function isExternalHttp(request) {
  try {
    var url = new URL(request.url);
    return (url.protocol === "http:" || url.protocol === "https:") && url.origin !== self.location.origin;
  } catch (e) {
    return false;
  }
}

function shouldWispFetch() {
  return false;
}

function responseHeaders(rawHeaders) {
  var blocked = /^(content-encoding|content-length|transfer-encoding|connection|keep-alive|proxy-authenticate|proxy-authorization|te|trailer|upgrade|set-cookie|set-cookie2|content-security-policy|content-security-policy-report-only|cross-origin-embedder-policy|cross-origin-opener-policy|cross-origin-resource-policy|access-control-allow-origin|access-control-allow-credentials)$/i;
  var out = [];
  (rawHeaders || []).forEach(function (pair) {
    if (!pair || pair.length < 2) return;
    var name = String(pair[0] || "");
    var value = String(pair[1] || "");
    if (!name || blocked.test(name)) return;
    out.push([name, value]);
  });
  out.push(["Access-Control-Allow-Origin", self.location.origin]);
  out.push(["Access-Control-Allow-Credentials", "true"]);
  out.push(["Cross-Origin-Resource-Policy", "cross-origin"]);
  return out;
}

async function proxyExternal(event) {
  var client = await pickReadyClient(event.clientId);
  if (!client) {
    return new Response("Wisp transport unavailable", {
      status: 503,
      headers: { "Content-Type": "text/plain" }
    });
  }
  var headers = [];
  try {
    event.request.headers.forEach(function (value, key) {
      if (/^(cookie|host|connection|content-length|accept-encoding|origin|if-none-match|if-modified-since|if-unmodified-since|if-match)$/i.test(key)) return;
      headers.push([key, value]);
    });
  } catch (e) {}
  if (event.request.referrer && /^https?:/i.test(event.request.referrer)) {
    headers.push(["Referer", event.request.referrer]);
  }
  var channel = new MessageChannel();
  var result = new Promise(function (resolve) {
    channel.port1.onmessage = function (message) { resolve(message.data); };
  });
  try {
    client.postMessage({
      $ubWispFetch: {
        url: event.request.url,
        method: event.request.method,
        headers: headers,
        destination: event.request.destination
      }
    }, [channel.port2]);
  } catch (e) {
    return new Response("Wisp transport unavailable", {
      status: 503,
      headers: { "Content-Type": "text/plain" }
    });
  }
  var timeout = new Promise(function (resolve) {
    setTimeout(function () { resolve({ error: "timeout" }); }, 60000);
  });
  var data = await Promise.race([result, timeout]);
  try { channel.port1.close(); } catch (e) {}
  if (!data || data.error) {
    return new Response("Wisp request failed: " + ((data && data.error) || "unknown"), {
      status: 502,
      headers: { "Content-Type": "text/plain" }
    });
  }
  var status = Number(data.status) || 502;
  if (status < 200 || status > 599) status = 502;
  var body = (event.request.method === "HEAD" || status === 204 || status === 205 || status === 304) ? null : data.body;
  return new Response(body, {
    status: status,
    statusText: data.statusText || "",
    headers: responseHeaders(data.headers)
  });
}

self.addEventListener("fetch", function (event) {
  if (self._pnclg8f && self._pnclg8f.shouldRoute(event)) {
    event.respondWith(self._pnclg8f.route(event));
    return;
  }
  if (shouldWispFetch(event)) {
    event.respondWith(proxyExternal(event));
  }
});
