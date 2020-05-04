---
layout: post
title: Jekyll related page list
comments: true
tags:
  - jekyll
---

I wanted to make a list of related pages at the bottom of each post in my Jekyll site.

## My goals

- Generate a list of related posts based on the attributes of the current page.
- Accept as an argument the number of the posts that will be displayed.
- For a blog post, display other posts that belong to the same tags as the post does.
- For the other types of pages, display the latest posts.

## Jekyll variables

At first, I was a little bit confused about how to use these [Jekyll variables](https://jekyllrb.com/docs/variables/).
Actually that is the reason I decided to write this post so that I can save time in the future.

- `site.posts` - A reverse chronological list of all Posts.
- `site.tags[TAG]` - The list of all Posts with tag TAG.
- `page.tags` - The list of tags to which this post belongs.

## Liquid filters

I heard that [Liquid filters](https://help.shopify.com/themes/liquid/filters) purposely has limitted capabilities for the safety reason.
I realized that it was important to clearly understand what we can and cannot do with Liquid.
Also, I need to get used to Liquid's syntax some of which is very different from Ruby's.

## Pseudo-code

- Create an empty array and assign it to `posts_list`
- If the current page has 1+ tags
  - find posts for each tag and iterate over them
    - push all the items (filtered by tag) to `posts_list` unless it is the current page
  - remove duplicate items
  - iterate over `posts_list`
    - generate appropriate HTML
- If the page have no tags
  - iterate over Jekyll's default `site.posts` array
    - generate appropriate HTML

## Implementation

{% raw %}

```html
{% assign posts_list = "" | split: "|" %}

{% if page.tags %}
  {% for each_tag in page.tags %}
    {% for each_post in site.tags[each_tag] %}
      {% if each_post.title != page.title %}
        {% assign posts_list = posts_list | push: each_post %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  {% assign posts_list = posts_list | uniq %}
{% else %}
  {% assign posts_list = site.posts %}
{% endif %}

<ul class="related-posts">
  {% for post in posts_list limit:include.limit %}
    <li>
      <a href="{{ post.url | absolute_url }}">
        {{ post.title }}
      </a>
      <br />
      {% include post_meta.html %}
    </li>
  {% endfor %}
</ul>
```

{% endraw %}
