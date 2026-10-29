// Serves the app at app.html.
//
// index.svg registers this worker, then navigates to app.html; that path resolves to
// index.html from this same folder, so the app can be opened even when the host serves
// index.html itself with a type or content filter that stops the page from loading.
// Nothing is fetched from a third party here, and no request is forwarded anywhere.

var APP_PATHNAME = new URL("app.html", self.registration.scope).pathname;
var APP_HTML = new URL("index.html?v=20261028-1", self.registration.scope).href;

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

async function serveApp() {
  var res = null;
  try {
    res = await fetch(APP_HTML, { cache: "no-store" });
  } catch (e) {
    res = null;
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
