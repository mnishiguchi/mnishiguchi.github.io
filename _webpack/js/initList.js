// https://listjs.com/
export default function initList() {
  document.addEventListener('turbolinks:load', function () {
    window.postList = new List('js-PostSearch', {
      valueNames: ['js-PostSearch-title', 'js-PostSearch-tags'],
    });
  });
}
