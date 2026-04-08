import fs from 'fs'
import path from 'path'

const distPath = './dist'

// Função recursiva para pegar todos arquivos
function getFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath))
    } else {
      results.push(filePath)
    }
  })

  return results
}

// Pega todos arquivos do dist
const files = getFiles(distPath).map(file =>
  file.replace('dist', '')
)

// Gera conteúdo do SW
const sw = `
const CACHE_NAME = 'app-cache-v1'
const ASSETS = ${JSON.stringify(files, null, 2)}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
        });
        return cached;
      }
      return fetch(event.request);
    })
  );
});
`

fs.writeFileSync('./dist/service-worker.js', sw)

console.log('✅ Service Worker gerado com sucesso!')