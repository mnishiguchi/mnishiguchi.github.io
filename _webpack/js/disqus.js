// https://disqus.com/admin/universalcode/
export default function initDisqus() {
  document.addEventListener('turbolinks:load', function () {
    // Do nothing if the Discus target element does not exist in a page.
    if (!document.querySelector('#disqus_thread')) return;

    // https://help.disqus.com/en/articles/1717084-javascript-configuration-variables
    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = window.location.href;
    };

    // Reload the Disqus if it exists.
    // https://github.com/disqus/DISQUS-API-Recipes/blob/master/snippets/js/disqus-reset/disqus_reset.html
    if (typeof window.DISQUS !== 'undefined') {
      window.DISQUS.reset({
        reload: true,
        config: disqus_config,
      });
      return;
    }

    // Else initialize the Disqus.
    // DON'T EDIT BELOW THIS LINE
    (function () {
      var d = document,
        s = d.createElement('script');
      s.src = '//mnishiguchi.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  });
}
