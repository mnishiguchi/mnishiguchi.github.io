---
layout: post
title: Stimulus JS
tags:
  - javascript
  - stimulusjs
  - react
comments: true
---

I like writing [React](https://reactjs.org/) apps. While it is good to keep with the popular javascript framework, every now and then I ask myself: "Do I really need it?". I have a feeling that using [React](https://reactjs.org/), [Vue](https://vuejs.org/), etc is overkill in many cases.

[Stimulus](https://stimulusjs.org) is a nice powerful alternative that allows us to keep javascript code simple.
I personally see Stimulus more similar to jquery than to React etc.
Stimulus simply helps us find elements, define event listeners and event handlers. Also Stimulus gives us conventions for our code organizaton.

## Stimulus termininology

Pretty much only the following three key things:

- A [controller](https://stimulusjs.org/reference/controllers) is the basic organizational unit of a Stimulus application.
- [Actions](https://stimulusjs.org/reference/actions) are how you handle DOM events in your controllers.
- [Targets](https://stimulusjs.org/reference/targets) let you reference important elements by name.

## Basic Usage

It is easy. Here are all you need know about other than fundamental Web development skills.

### Step 1: Setup

- Do the initial setup following the [doc](https://stimulusjs.org/handbook/installing). It is significantly easy compared to other modern JS frameworks.

### Step 2: Write HTML

In Stimulus, we write pure HTML, no DSL or directives. Long story short, we annotate our HTML tags using [HTML data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), namely:

- `data-controller`
- `data-action`
- `data-target`

As long as we follow Stimulus naming conventions, Stimulus will automatically load them and make them available our Stimulus controller.

### Step 3: Write a controller subclassing Stimulus' Controller

- The file name and the class name should match a `data-controller` attributes in our HTML.
- Register targets in our controller class, which should match `data-target` attributes within the controller element.
- Write actions as instance methods.

## Comparison between Vanilla JS and Stimulus

I wrote two versions of the [hello greeting app](https://stimulusjs.org/) (with and without Stimulus) so that I can compare and figure out what are some benefits of using Stimulus.

### Vanilla JS

Some things I thought of:

#### `++`

- no need of initial setup
- freedom in coding

#### `--`

- There can be tons of ad-hoc `document.querySelector` and `document.addEventListener` statements required.
- The code structure depends on the developers' skills and experiences.
- Often CSS id and class are used for finding an element, and changing them can break the app.
- The JS code can go human-unfriendly without architechting carefully.
- For larger logic, there might be extra overhead for architecting and maintenance.

<iframe
     src="https://codesandbox.io/embed/hello-input-without-stimulusjs-64qd1?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hello-input-without-stimulusjs"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
<hr>

### With Stimulus

Some things I thought of:

#### `++`

- There is no need of `document.querySelector` or `document.addEventListener`
- The code is encouraged to be declarative by Stimulus conventions, which will contribute to human-readable code.
- Code is forced to be in certain structure regardless of engineers skill level.

#### `--`

- There is some overhead for initial setup and understanding the conventions.
- Vendor lock-in

<iframe
     src="https://codesandbox.io/embed/hello-with-stimulus-xzn0z?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hello-with-stimulus"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
<br>

## Conclusion

Stimulus is a nice and simple alternative to both jquery and other modern JS frameworks like React.
I believe that Stimulus helps us remove the overhead of code organization and maintainability by enforcing its conventions.
Most importantly it works like a charm.

## Link

- [Event reference - MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
