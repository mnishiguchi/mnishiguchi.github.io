---
layout: post
title: Modal dialog with pure CSS
comments: true
tags:
  - html
  - css
  - javascript
---

I wanted to make the site navigation appear on a modal dialog box. After googling around, I found that I could implement modal with pure CSS. I thought this was a great opportunity to learn how to implement simple modal without JS.

## My goals

- Create a simple modal dialog box that displays the navigation menu.
- Open and close the modal by clicking a button.
- Implement it with pure CSS (an anchor link and the CSS pseudo selector `:target`).

## Advantages of pure CSS modal

- It works without JavaScript.
- The code for the functionality is simple and located in a single place.

## Some issues

### The modal open state getting preserved in the browser history

- When I press the back button and re-visit the URL where the modal was open, the modal dialog opens again. This behavior is a little strange.

### A page getting scrolled under the modal

- It is difficult to prevent the page from scrolling without JavaScript. Even if the transparent modal overlay is covering the whole page, we can still scroll the page from above the overlay.

At first, I was trying to prevent the page from scrolling when the modal is open.
And because I wanted to stick to the pure CSS implementation, it was very challenging to do it.
In fact, as of now I do not know how to stop the page from scrolling without JS.

Then after doing experiments by trail and error, I came up with these two solutions:

- Not using transparent color for the overlay background so that I do not even see the scrolling page under the overlay.
- Giving up on pure CSS implementation and considering use of JS in the first place.

I realized that the simplest solution for the problem of the page scrolling was
to simply not use transparent background color because if it is invisible,
we do not care even if it is actually scrolling.

## Get started

### HTML

The anchor link to `#open-navigation` is used to trigger the modal to open.

{% raw %}

```html
<a href="#open-navigation" title="Open" class="hamburger">
  &#8801
</a>

<nav id="open-navigation">
  <a href="#" title="Close" class="close-modal">
    &#x2715;
  </a>
  <ul id="nav-menu">
    <li class="nav-item active">
      <a>Home</a>
    </li>
    <li class="nav-item">
      <a href="/about">About</a>
    </li>
    <li class="nav-item">
      <a href="/blog/">Blog</a>
    </li>
  </ul>
</nav>
```

{% endraw %}

### SCSS

I trigger the opening/closing of the modal by using an anchor link and the CSS pseudo selector `:target`.
When the hamburger that is lined to `#open-navigation` is clicked, the browser targets the element with that ID and gives that element the `:target` pseudo selector.
Taking advantage of that, I can switch the modal by the presence of the `:target` pseudo selector on the modal container element.

{% raw %}

```scss
@mixin modal {
  opacity: 0; // Hidden by default
  pointer-events: none; // Disable mouse/touch events by default
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10; // Sit on top of contents
  width: 100vw; // Full width
  height: 100vh; // Full height
  background: $black;
  &:target {
    // This is triggered by an anchor hash link to this element.
    opacity: 1;
    pointer-events: auto; // Enable mouse/touch events.
  }
}
@mixin modal-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  display: block;
  width: 80%;
  height: 77%;
  padding: 0;
  margin: auto;
  background: $black;
}

.hamburger {
  position: absolute;
  top: 16px;
  right: 10px;
  z-index: 3;
  display: inline-block;
  background: none;
  color: #777;
  border: 1px solid #777;
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
  // Hide it when larger than iPad.
  @media only screen and (min-width: 768px) {
    display: none;
  }
}
.close-modal {
  @extend .hamburger;
  z-index: 12;
}

// Mobile devices: The Modal (background)
nav {
  @include modal;
  ul {
    @include modal-dialog;
    li {
      display: block;
      height: 56px;
      line-height: 56px;
      color: #777;
      background: white;
      a {
        display: block;
        color: #555;
        background: white;
        padding: 0 0.8rem;
        width: 100%;
        height: 56px;
        line-height: 56px;
      }
      &.active a {
        color: #ccc;
        background: #eee;
        text-decoration: none;
        cursor: default; // Use default cursor instead of the finger pointer.
      }
    }
  }
}

// Prevent BODY from scrolling when a modal is opened
body.modal-is-open {
  position: fixed;
  overflow: hidden;
}
```

{% endraw %}

### JavaScript (optional)

If I really have to prevent the page from scrolling, I could do it with JavaScript;
however if I do so, maybe I might as well trigger the modal opening/closing by
toggling the `modal-is-open` class in the first place.

Disabling the scroll with JavaScript can be complex because there are several
possible scenarios where we want to re-configure the ability of scrolling on and off appropriately
(For example, screen rotation, screen resize and browser refresh).
Because of that, the code can become buggy or difficult to maintain.

{% raw %}

```js
(function () {
  // Wait until DOM is loaded and then execute.
  document.addEventListener('DOMContentLoaded', function (event) {
    // Check the initial state.
    toggleModal();

    // Keep watch on hash change due to back buttoon or history.
    window.addEventListener('hashchange', toggleModal);

    // Keep watch on page refresh.
    window.addEventListener('load', toggleModal);

    // Keep watch on screen rotation or resize.
    window.addEventListener('resize', toggleModal);

    /**
     * Toggle the ".modal-is-open" class on document.body checking whether the nav
     * is targeted of not.
     */
    function toggleModal() {
      if (document.querySelector('nav:target')) {
        document.body.classList.add('modal-is-open');
      } else {
        document.body.classList.remove('modal-is-open');
      }
    }
  });
})();
```

{% endraw %}

## Conclusion

- It is great to know that I can trigger the navigation to open with pure CSS only.
- Although classic-style modal often comes with transparent overlay, we can consider
  non-transparent overlay so that I need not worry about potential issue of
  scrolling page contents.
- There are tons of other options to consider, including:
  - [Sliding Sidebar by mdo](https://github.com/poole/lanyon)
  - [Full-Screen Pushing Navigation by Sebastiano Guerriero](https://codyhouse.co/gem/full-screen-pushing-navigation/)

## Reference

- [Modal in pure html and css - JSFiddle](http://jsfiddle.net/raving/1mhsynmw/)
