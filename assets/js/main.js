(function initList() {
  window.postList = new List("posts", {
    valueNames: ["js_post_title", "js_post_tags"],
  });
})();

// https://disqus.com/admin/universalcode/
(function initDisqus() {
  document.addEventListener("turbolinks:load", function () {
    // Do nothing if the Discus target element does not exist in a page.
    if (!document.querySelector("#disqus_thread")) return;

    // https://help.disqus.com/en/articles/1717084-javascript-configuration-variables
    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = window.location.href;
    };

    // Reload the Disqus if it exists.
    // https://github.com/disqus/DISQUS-API-Recipes/blob/master/snippets/js/disqus-reset/disqus_reset.html
    if (typeof window.DISQUS !== "undefined") {
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
        s = d.createElement("script");
      s.src = "//mnishiguchi.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  });
})();

/**
 * svganimations2.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function () {
  "use strict";

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  window.cancelAnimFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function (id) {
        window.clearTimeout(id);
      }
    );
  })();

  var svgs = Array.prototype.slice.call(document.querySelectorAll("svg")),
    hidden = Array.prototype.slice.call(document.querySelectorAll(".hide")),
    current_frame = 0,
    total_frames = 60,
    path = new Array(),
    length = new Array(),
    handle = 0;

  function init() {
    [].slice.call(document.querySelectorAll("path")).forEach(function (el, i) {
      path[i] = el;
      var l = path[i].getTotalLength();
      length[i] = l;
      path[i].style.strokeDasharray = l + " " + l;
      path[i].style.strokeDashoffset = l;
    });
  }

  function draw() {
    var progress = current_frame / total_frames;
    if (progress > 1) {
      window.cancelAnimFrame(handle);
      showPage();
    } else {
      current_frame++;
      for (var j = 0; j < path.length; j++) {
        path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
      }
      handle = window.requestAnimFrame(draw);
    }
  }

  function showPage() {
    svgs.forEach(function (el, i) {
      el.setAttribute("class", el.getAttribute("class") + " hide");
    });
    hidden.forEach(function (el, i) {
      el.classList.remove("hide");
      el.classList.add("show");
    });
  }

  init();
  draw();
})();
