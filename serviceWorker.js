self.addEventListener("install", async (e) => {
  console.log("service worker installed");

  var cache = await caches.open("staticUrbanHell");
  cache.addAll([
    "./",
    "./index.html",
    "./catalogo.html",
    "./favoritos.html",
    "./compras.html",
    "./producto.html",
    "./resumen.html",
    "./styles/index.css",
    "./index.js",
    "./manifest.json",
    "./fonts/ground.ttf",
    "./data/ropa.json",
    "./imgs/banners/banner-header.jpg",
    "./imgs/banners/banner-header-mobile.jpg",
    "./imgs/banners/banner-clasico.jpg",
    "./images/banners/banner-deportivo.jpg",
    "./imgs/banners/banner-vintage.jpg",
    "./imgs/banners/banner-urbano.jpg",
    "./imgs/buzos/buzo-classic-delante.jpg",
    "./imgs/buzos/buzo-classic-detras.jpg",
    "./imgs/buzos/buzo-kinder-delante.jpg",
    "./imgs/buzos/buzo-kinder-detras.jpg",
    "./imgs/buzos/buzo-retro-delante.jpg",
    "./imgs/buzos/buzo-retro-detras.jpg",
    "./imgs/buzos/buzo-simple-delante.jpg",
    "./imgs/buzos/buzo-simple-detras.jpg",
    "./imgs/buzos/buzo-urban-delante.jpg",
    "./imgs/buzos/buzo-urban-detras.jpg",
    "./imgs/gorras/gorra-goorin-delante.jpg",
    "./imgs/gorras/gorra-goorin-detras.jpg",
    "./imgs/gorras/gorra-goorin-perfil.jpg",
    "./imgs/gorras/gorra-los-angeles-delante.jpg",
    "./imgs/gorras/gorra-los-angeles-detras.jpg",
    "./imgs/gorras/gorra-los-angeles-perfil.jpg",
    "./imgs/gorras/gorra-new-york-delante.jpg",
    "./imgs/gorras/gorra-new-york-detras.jpg",
    "./imgs/gorras/gorra-new-york-perfil.jpg",
    "./imgs/gorras/gorra-stetson-delante.jpg",
    "./imgs/gorras/gorra-stetson-detras.jpg",
    "./imgs/gorras/gorra-stetson-perfil.jpg",
    "./imgs/gorras/gorra-under-delante.jpg",
    "./imgs/gorras/gorra-under-detras.jpg",
    "./imgs/gorras/gorra-under-perfil.jpg",
    "./imgs/remeras/remera-baseball-delante.jpg",
    "./imgs/remeras/remera-baseball-detras.jpg",
    "./imgs/remeras/remera-deportiva-delante.jpg",
    "./imgs/remeras/remera-deportiva-detras.jpg",
    "./imgs/remeras/remera-jako-delante.jpg",
    "./imgs/remeras/remera-jako-detras.jpg",
    "./imgs/remeras/remera-polo-delante.jpg",
    "./imgs/remeras/remera-polo-detras.jpg",
    "./imgs/remeras/remera-simple-delante.jpg",
    "./imgs/remeras/remera-simple-detras.jpg",
    "./imgs/icons/bolsa-icon.svg",
    "./imgs/icons/carrito-icon.svg",
    "./imgs/icons/casa-icon.svg",
    "./imgs/icons/corazon-icon.svg",
    "./imgs/icons/cruz-icon.svg",
    "./imgs/icons/favoritos-icon.svg",
    "./imgs/icons/favoritos-lleno-icon.svg",
    "./imgs/icons/online-icon.svg",
    "./imgs/icons/offline-icon.svg",
    "./imgs/icons/campana-icon.svg",
    "./imgs/icons/tacho-icon.svg",
    "./imgs/icons/tarjeta-icon.svg",
    "./imgs/icons/urban-hell-logo-16.png",
    "./imgs/icons/urban-hell-logo-144.png",
    "./imgs/icons/urban-hell-logo.ico",
    "./imgs/icons/urban-hell-logo.png",
    "./imgs/icons/urban-hell-logo.svg",
  ]);
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  } 
  // else {
  //   event.respondWith(networkFirst(req));
  // }
});

async function cacheFirst(req) {
  return (await caches.match(req)) || fetch(req);
}

// async function networkFirst(req) {
//   const cache = await caches.open("staticUrbanHell");
//   try {
//     const res = await fetch(req);
//     cache.put(req, res.clone());
//     return res;
//   } catch (error) {
//     const cachedResponse = await cache.match(req);
//     return cachedResponse || (await caches.match("./manifest.json"));
//   }
// }