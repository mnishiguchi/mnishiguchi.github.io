const swPath = '/assets/sw.js';

// https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
export default function () {
  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('turbolinks:load', () => {
      navigator.serviceWorker
        .register(swPath)
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
