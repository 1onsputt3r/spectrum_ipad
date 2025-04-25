// 檢查瀏覽器是否支持 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('Service Worker 註冊成功，範圍是:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker 註冊失敗:', error);
      });
  });
}