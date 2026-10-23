importScripts("prox/sw.js?v=20261022-4");

var APP_PATHNAME = new URL("app.html", self.registration.scope).pathname;
var APP_HTML = new URL("index.html?v=20261022-4", self.registration.scope).href;

async function serveApp() {
  var res = await fetch(APP_HTML, { cache: "no-store" });
  if (!res.ok) {
    return new Response("App unavailable (" + res.status + ")", {
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
