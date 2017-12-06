// Initialize sidebar toggle.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('#sidebar');
  const checkbox = document.querySelector('#sidebar-checkbox');

  // Close the sidebar when the screen other than the sidebar itself is clicked.
  document.addEventListener(
    'click',
    e => {
      const target = e.target;
      if (
        !checkbox.checked ||
        sidebar.contains(target) ||
        (target === checkbox || target === toggle)
      )
        return;
      checkbox.checked = false;
    },
    false
  );

  // Close the sidebar on resize if it is open.
  window.addEventListener(
    'resize',
    e => {
      // console.log("resized");
      if (!checkbox.checked) return;
      checkbox.checked = false;
    },
    false
  );
});

/**
 * Initialize anchor jump button.
 */
(function() {
  const breakpoint = -160;
  const topEl = document.querySelector('.js-top');
  const downButton = document.querySelector('.js-anchor-jump--down');
  const upButton = document.querySelector('.js-anchor-jump--up');

  window.addEventListener('scroll', () => {
    if (topEl.getBoundingClientRect().top > breakpoint) {
      // use down botton
      downButton.style.display = 'block';
      upButton.style.display = 'none';
    } else {
      // use up botton
      downButton.style.display = 'none';
      upButton.style.display = 'block';
    }
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
(function() {

  'use strict';

  window.requestAnimFrame = function(){
    return (
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
      }
    );
  }();

  window.cancelAnimFrame = function(){
    return (
      window.cancelAnimationFrame       ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame    ||
      window.oCancelAnimationFrame      ||
      window.msCancelAnimationFrame     ||
      function(id){
        window.clearTimeout(id);
      }
    );
  }();

  var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) ),
    hidden = Array.prototype.slice.call( document.querySelectorAll( '.hide' ) ),
    current_frame = 0,
    total_frames = 60,
    path = new Array(),
    length = new Array(),
    handle = 0;

  function init() {
    [].slice.call( document.querySelectorAll( 'path' ) ).forEach( function( el, i ) {
      path[i] = el;
      var l = path[i].getTotalLength();
      length[i] = l;
      path[i].style.strokeDasharray = l + ' ' + l;
      path[i].style.strokeDashoffset = l;
    } );

  }

  function draw() {
    var progress = current_frame/total_frames;
    if (progress > 1) {
      window.cancelAnimFrame(handle);
      showPage();
    } else {
      current_frame++;
      for(var j=0; j<path.length;j++){
        path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
      }
      handle = window.requestAnimFrame(draw);
    }
  }

  function showPage() {
    svgs.forEach( function( el, i ) {
      el.setAttribute( 'class', el.getAttribute('class') + ' hide' );
    } );
    hidden.forEach( function( el, i ) {
      el.classList.remove( 'hide' );
      el.classList.add( 'show' );
    } );
  }

  init();
  draw();
})();
