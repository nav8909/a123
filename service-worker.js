var CACHE_NAME = 'my-site-cache-v1';
var ulrsToCache = [
  '/',
  '/css/style.css',
  '/css/menu-r.css',
  '/css/img/HM.png',
  '/css/img/icon_bed.png',
  '/css/img/icon_people.png',
  '/css/img/icon_size.png',
  '/css/img/services.png',
  '/css/img/1508774072.jpg',
  '/css/img/1513285844.jpg',
  '/css/img/1513285858.jpg',
  '/css/img/alrededores1.jpg',
  '/css/img/alrededores2.jpg',
  '/css/img/alrededores3.jpg',
  '/css/img/alrededores4.jpg',
  '/css/img/bar4.jpg',
  '/css/img/ecentos1.jpg',
  '/css/img/ecentos2.jpg',
  '/css/img/ecentos3.jpg',
  '/css/img/gastronomia4.jpg',
  '/css/img/habitacion-1.jpg',
  '/css/img/habitacion-2.jpg',
  '/css/img/habitacion-3.jpg',
  '/css/img/historia1.jpg',
  '/css/img/historia2.jpg',
  '/css/img/historia3.jpg',
  '/css/img/historia4.jpg',
  '/css/img/HM-rest.jpg',
  '/css/img/rooms.jpg',
  '/img/HM.png',
  '/img/habitacion-1.jpg',
  '/img/habitacion-2.jpg',
  '/img/habitacion-3.jpg',
  '/envio.php',
  '/js/jquery-2.1.3.min.js',
  '/js/menu.js',
  '/js/main.js',
  '/index.html',
  '/bar.html',
  '/eventos.html',
  '/explorar.html',
  '/HM.html',
  '/promociones.html',
  '/restaurante.html',
  '/room.html',
  '/ibl-fv.png',
  '/HM.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Cache open!');
      return cache.addAll(ulrsToCache);
    })
  );
});


// self.addEventListener('fetch', function(event){
//   event.respondWith(
//     caches.match(event.request)
//     .then(function(response){
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });




self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value, use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response, and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});



/*
manejar una solicitud y respuesta de red y actualizar caché
*/
function updataCache (request, response) {
    // console.log('Update the cache');
    caches.open(CACHE_NAME)
        .then(function(cache) {
            cache.put(request.url, response);
        });
}