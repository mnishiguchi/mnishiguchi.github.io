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
export default function initSvgDrawingAnimation() {
  var svgClassName = 'mn-SvgLineDrawing-svg';
  var imgHiddenClassName = 'mn-SvgLineDrawing-imgHidden';
  var imgVisibleClassName = 'mn-SvgLineDrawing-imgVisible';

  document.addEventListener('turbolinks:load', function () {
    // Do nothing if the images are already visible. This occurs when a page is re-visited.
    var visibleImgs = Array.prototype.slice.call(
      document.querySelectorAll('.' + imgVisibleClassName)
    );
    if (visibleImgs.length > 0) return;

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

    var svgs = Array.prototype.slice.call(
        document.querySelectorAll('.' + svgClassName)
      ),
      hidden = Array.prototype.slice.call(
        document.querySelectorAll('.' + imgHiddenClassName)
      ),
      current_frame = 0,
      total_frames = 60,
      path = new Array(),
      length = new Array(),
      handle = 0;

    function init() {
      [].slice
        .call(document.querySelectorAll('path'))
        .forEach(function (el, i) {
          path[i] = el;
          var l = path[i].getTotalLength();
          length[i] = l;
          path[i].style.strokeDasharray = l + ' ' + l;
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
          path[j].style.strokeDashoffset = Math.floor(
            length[j] * (1 - progress)
          );
        }
        handle = window.requestAnimFrame(draw);
      }
    }

    function showPage() {
      svgs.forEach(function (el, i) {
        el.setAttribute(
          'class',
          el.getAttribute('class') + ' ' + imgHiddenClassName
        );
      });
      hidden.forEach(function (el, i) {
        el.classList.remove(imgHiddenClassName);
        el.classList.add(imgVisibleClassName);
      });
    }

    init();
    draw();
  });
}
