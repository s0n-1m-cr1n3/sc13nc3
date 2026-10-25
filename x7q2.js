importScripts("https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/sw.js?v=20261022-3");

var APP_PATHNAME = new URL("app.html", self.registration.scope).pathname;
var APP_HTML = new URL("assets/index.html?v=20261025-1", self.registration.scope).href;
var CDN_APP_HTML = "https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/index.html?v=20261025-1";

async function serveApp() {
  var res = null;
  try { res = await fetch(APP_HTML, { cache: "no-store" }); } catch (e) {}
  if (!res || !res.ok) {
    try { res = await fetch(CDN_APP_HTML, { cache: "no-store" }); } catch (e) { res = null; }
  }
  if (!res || !res.ok) {
    return new Response("App unavailable", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  var body = await res.text();
  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

self.addEventListener("fetch", function (event) {
  if (event.request.mode !== "navigate") return;
  var url;
  try {
    url = new URL(event.request.url);
  } catch (e) {
    return;
  }
  if (url.pathname !== APP_PATHNAME) return;
  event.respondWith(serveApp());
});
