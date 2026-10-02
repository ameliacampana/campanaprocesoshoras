// Service worker: la app abre y permite cargar horas sin conexión.
const CACHE = "horas-v2";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Archivos de la app: primero caché, y se refrescan en segundo plano
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => {
        const net = fetch(req)
          .then((res) => {
            if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
            return res;
          })
          .catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Librería de Microsoft (MSAL): se guarda para tenerla disponible
  if (url.hostname === "cdn.jsdelivr.net" && url.pathname.includes("msal-browser")) {
    e.respondWith(
      caches.open(CACHE).then((c) =>
        c.match(req).then((hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res && res.ok) c.put(req, res.clone());
            return res;
          })
        )
      )
    );
  }
  // Todo lo demás (login de Microsoft, Graph) va directo a la red.
});
