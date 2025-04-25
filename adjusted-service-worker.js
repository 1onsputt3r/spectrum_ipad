const CACHE_NAME = 'spectrum-app-v1';

// 需要緩存的基本資源列表
// 請根據你的專案實際文件結構進行調整
const urlsToCache = [
  './',
  './index.html',
  // 添加你的 CSS 文件
  // 例如: './css/style.css', 
  // 添加你的 JS 文件
  // 例如: './js/script.js',
  // 添加其他需要離線使用的資源
];

// 安裝 Service Worker 時緩存資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網絡請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果緩存中找到匹配的資源，則返回緩存的版本
        if (response) {
          return response;
        }
        
        // 否則發送網絡請求
        return fetch(event.request)
          .then((response) => {
            // 檢查是否有效的響應
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆響應（因為它是流，只能使用一次）
            const responseToCache = response.clone();
            
            // 將新資源添加到緩存
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});

// 當安裝新版本時，清理舊緩存
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});