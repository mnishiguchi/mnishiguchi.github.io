---
layout: post
title: Float an element to the right using CSS Flexbox
tags:
  - css
  - flexbox
comments: true
---

Every now and again, there is a situation where I want to make an HTML elemnt float to the right. I could use CSS `float` property; however its resulting behavior is sometimes counterintuitive and it requires something called "Clearfix hack".

As an alternative, I found it much more intuitive to use CSS Flexbox and a spacer element. All I need to do is:

- wrap all the items in a wrapper element that has CSS `display: flex`
- insert to the list a spacer element that has CSS `flex-grow: 1`

then that spacer will stretch out and push the subsequent elements to the right.


<iframe
     src="https://codesandbox.io/embed/float-right-using-css-flex-yeflh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Float right using CSS Flex"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


That's it.
