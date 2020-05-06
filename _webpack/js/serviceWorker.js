// https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
export default function () {
  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('turbolinks:load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
}
