---
layout: post
title: Jekyll tags
comments: true
tags:
  - jekyll
---

I wanted to add a simple tagging functionality to my Jekyll site. As I googled around for implementation ideas, I noticed that most of the snippets found on the Internet seemed over-engineered to me. So, I decided to make my version of tagging system that is simple, minimalistic and easy-to-understand.

## My goals

- Create a page that displays all the tags and a list of post titles under each tag.
- Implement the tagging functionality without plugins.

## Get started

### 1. Add tags to to a blog post's Front Matter

I added a list of tags to the YAML Front Matter of a blog post. That way, the tags will be accessible through the Jekyll [variables](https://jekyllrb.com/docs/variables/) `site.tags` and `page.tags`. Jekyll supports `tags` variable by default.

{% raw %}

```md
---
layout: post
title: Jekyll tags
comments: true
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
{% if post %}
  {% assign date = post.date %}
  {% assign tags = post.tags %}
{% else %}
  {% assign date = page.date %}
  {% assign tags = page.tags %}
{% endif %}

<time datetime="{{ date | date_to_xmlschema }}">
  {{ date | date_to_string }}
</time>
<span>
  <!--
  Display all the tag names that link to a corresponding section of the Tags page.
  -->
  {% for tag in tags %}
    <a href="/tags#{{ tag | slugize }}">{{ tag }}</a>
  {% endfor %}
</span>
```

{% endraw %}

### 3. Create "tags" page

I create a page `tags.html` that displays all the tags and a list of post titles under each tag. At the top of the page, it lists all the tags, and each tag links to its own section in the page. Below the tag list, I place links to blog posts that are grouped by tag.

{% raw %}

```html
---
layout: page
title: Tags
permalink: /tags
---

<!--
Create an empty array.
-->
{% assign tag_names = "" | split: "|" %}

<!--
Obtain each tag name and push it to the array.
-->
{% for posts_by_tag in site.tags %}
  {% assign tag_names = tag_names | push: posts_by_tag.first %}
{% endfor %}

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
      <a href="/tags#{{ tag_name | slugize }}">
        {{ tag_name }}
      </a>
    </li>
  {% endfor %}
</ul>

<hr />

<!--
List post titles under each tag.
-->
<section>
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
