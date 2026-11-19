importScripts("https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/assets/prox/t4k7m.js?v=20261022-3");

var APP_PATHNAME = new URL("ubzlol", self.registration.scope).pathname;
var APP_HTML = new URL("index.html?v=20261114-1", self.registration.scope).href;
var CDN_APP_HTML = "https://cdn.jsdelivr.net/gh/s0n-1m-cr1n3/sc13nc3@main/index.html?v=20261114-1";

// Entry pages published before 2026-11-15 hopped to /app.html, and jsDelivr serves every .html as
// text/plain (a wall of source, never a page) while caching those old bootstraps for a week. So the
// retired names are answered here and redirected to the real app path.
var APP_ALIASES = ["app.html", "ubzlol.html"].map(function (name) {
  return new URL(name, self.registration.scope).pathname;
});

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
  if (url.pathname === APP_PATHNAME) {
    event.respondWith(serveApp());
    return;
  }
  if (APP_ALIASES.indexOf(url.pathname) !== -1) {
    event.respondWith(Response.redirect(
      new URL(APP_PATHNAME, self.location.origin).href + url.search + url.hash,
      302
    ));
  }
});
