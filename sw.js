// A folder on the host still needs a same-origin script for the browser to register, so this file
// stays small: the worker itself (app serving + pr0xy) is fetched from jsDelivr at install time.
// The inline copy below only runs if every CDN mirror is unreachable.
var SOURCES = [
  "https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/sw-app.js?v=20261025-1",
  "https://gcore.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/sw-app.js?v=20261025-1",
  "https://fastly.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/sw-app.js?v=20261025-1"
];

var loaded = false;
for (var i = 0; i < SOURCES.length; i++) {
  try {
    importScripts(SOURCES[i]);
    loaded = true;
    break;
  } catch (e) {}
}

if (!loaded) {
  try {
    importScripts("https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/sw.js?v=20261022-3");
  } catch (e) {}

  var APP_PATHNAME = new URL("app.html", self.registration.scope).pathname;
  var APP_HTML = new URL("index.html?v=20261025-1", self.registration.scope).href;
  var CDN_APP_HTML = "https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/index.html?v=20261025-1";

  self.addEventListener("fetch", function (event) {
    if (event.request.mode !== "navigate") return;
    var url;
    try {
      url = new URL(event.request.url);
    } catch (e) {
      return;
    }
    if (url.pathname !== APP_PATHNAME) return;
    event.respondWith((async function () {
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
      return new Response(await res.text(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    })());
  });
}
