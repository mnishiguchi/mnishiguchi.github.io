---
layout: post
title: Detecting enter key pressed in JavaScript
comments: true
tags:
  - javascript
---

## Vanilla JS

```js
// Listen for the enter key press.
document.body.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    // Simulate clicking on the submit button.
    submitButton.click();
  }
});
```

```js
// Listen for the enter key press.
document.body.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    // Simulate clicking on the submit button.
    triggerEvent(submitButton, 'click');
  }
});

/**
 * Trigger the specified event on the specified element.
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
 * https://codepen.io/felquis/pen/damDA
 * @param  {Object} elem  the target element.
 * @param  {String} event the type of the event (e.g. 'click').
 */
function triggerEvent(elem, event) {
  // Create the event.
  var clickEvent = new Event(event);

  // Dispatch the event.
  elem.dispatchEvent(clickEvent);
}
```

## jQuery

```js
$('body').on('keyup', function (evt) {
  if (evt.keyCode == 13) {
    // Simulate clicking on the submit button.
    $button.trigger('click');
  }
});
```

## References

- [https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
- [https://codepen.io/felquis/pen/damDA](https://codepen.io/felquis/pen/damDA)
- [http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript/37533906#37533906](http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript/37533906#37533906)
