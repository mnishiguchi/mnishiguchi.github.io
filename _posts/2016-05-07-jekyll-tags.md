---
layout: post
title: Jekyll tags
comments: true
tags:
  - jekyll
---

I wanted to add a simple tagging functionality to my Jekyll site. As I googled around for implementation ideas, I noticed that most of the snippets found on the Internet seemed over-engineered to me. So, I decided to make my version of tagging system that is simple, minimalistic and easy-to-understand.

## Objectives

- Create a partial for post-meta that contains post-date and post-tags.
- Create a page that is dedicated to display a tag cloud and post titles under each tag.
- Implement the functionality without plugins.

## Demo

- [http://mnishiguchi.com/tags](http://mnishiguchi.com/tags)

## Implementation

### 1. Add tags to to a blog post

I added a tag or two to the YAML Front Matter of a blog post. That way, the tags will be accessible through the Jekyll [variables](https://jekyllrb.com/docs/variables/) `site.tags` and `page.tags`.

{% raw %}

```md
---
layout: post
title: Implementing tags in Jekyll site
tags:
  - jekyll
---
```

{% endraw %}

### 2. Create a partial for post meta (datetime and tags)

I created a partial `_include/post_meta.html` for maintainability and reusability.
This partial will be placed under each post title and display the post date and associated tags.

{% raw %}

```html
<!--
Obtain time and tags that are associated with current page/post.
-->
{% if post %} {% assign date = post.date %} {% assign tags = post.tags %} {%
else %} {% assign date = page.date %} {% assign tags = page.tags %} {% endif %}

<span class="post-meta">
  <time datetime="{{ date | date_to_xmlschema }}" class="post-date">
    {{ date | date_to_string }}
  </time>

  <div class="post-tags">
    <!--
    Display all the tag names that link to a corresponding section of the Tags page.
    -->
    {% for tag in tags %}
    <a href="{{ site.url }}/tags#{{ tag | slugize }}">{{ tag }}</a>
    {% endfor %}
  </div>
</span>
```

{% endraw %}

### 3. Create a page for displaying a tag cloud and post titles under each tag

I create a single page `tags.html` that is dedicated to display a tag cloud and post titles under each tag. At the top of the page, it lists all the tags as a tag cloud, and each tag links to its own section in the page. Below the tag cloud, I place links to blog posts that are grouped by tags.

{% raw %}

```html
---
layout: page
title: Posts By Tags
permalink: /tags
---

<!--
Create an empty array.
-->
{% assign tag_names = "" | split: "|" %}

<!--
Obtain each tag name and push it to the array.
-->
{% for posts_by_tag in site.tags %} {% assign tag_names = tag_names | push:
posts_by_tag.first %} {% endfor %}

<!--
Sort the tag names.
-->
{% assign tag_names = tag_names | sort %}

<!--
Display tags.
-->
<ul class="tag-cloud">
  {% for tag_name in tag_names %}
  <li>
    <a href="{{ site.url }}/tags#{{ tag_name | slugize }}">
      {{ tag_name }}
    </a>
  </li>
  {% endfor %}
</ul>

<hr />

<!--
List post titles under each tag.
-->
<section class="posts-by-tags">
  {% for tag_name in tag_names %}
  <div>
    <h3 id="{{ tag_name }}">
      {{ tag_name | capitalize | replace: "_", " " }}
    </h3>

    {% for post in site.tags[tag_name] %}
    <a href="{{ post.url | absolute_url }}">
      {{ post.title }}
    </a>
    {% endfor %}
  </div>
  {% endfor %}
</section>
```

{% endraw %}

###4. Style them
I styled them with basic CSS (SCSS).

{% raw %}

```scss
@mixin post-tag($font-size) {
  a {
    font-size: $font-size;
    padding: 0 0.3rem;
    margin: 0 0.1rem;
    background: $link-color;
    color: white;
    &:hover {
      text-decoration: none;
    }
  }
}

/**
 *  Meta data line below post title
 */
.post-meta {
  display: block;
  margin-top: -0.3rem;
  margin-bottom: 1rem;
  color: #9a9a9a;
  time {
    margin-right: 0.5rem;
  }
  .post-tags {
    @include post-tag(0.8rem);
  }
}

/**
 * Styles for _pages/tags.html
 */
.tag-cloud {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    @include post-tag(0.8rem);
  }
}
```

{% endraw %}
