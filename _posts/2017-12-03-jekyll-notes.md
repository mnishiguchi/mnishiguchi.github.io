---
layout: post
title: Jekyll notes
comments: true
tags:
  - jekyll
---

This is my notes on what I learned about Jekyll through my own blog site.

## page.url

- the URL of the current page, without the host (e.g. /index.html)
- http://jekyllrb.com/docs/variables/#page-variables

## Setting up Disqus

- [Jekyll Installation Instructions](https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions)

## Canonical URLs with Jekyll

```html
<link
  rel="canonical"
  href="{{ site.url }}{{ page.url | replace:'index.html',''}}"
/>
```

## Links to Assets

```html
<link rel="stylesheet" href="{{ site.baseurl }}/styles.css" />
```

## Pagination

- http://jekyllrb.com/docs/pagination/
- Pagination only works within HTML files
- Pagination does not work from within Markdown or Textile files from your Jekyll site.
- Pagination works when called from within the HTML file, named `index.html`, which optionally may reside in and produce pagination from within a subdirectory, via the paginate_path configuration value.

## Post excerpts

- https://jekyllrb.com/docs/posts/#post-excerpts

#### 1. Specify a separator for experpts in \_config.yml

```yml
excerpt_separator:
```

#### 2. Insert the excerpt separator in a post.

```md
---
layout: post
title: My first blog
comments: true
tags: general
---

Hi, this is Masatoshi Nishiguchi. I am writing a blog post for the first time.

The primary purpose of this is for me to learn how blog works at the moment. That's it. But I might eventually find out some other purposes that are more fun and more useful for the Internet communities.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

#### 3. Access the experpt of a post in a template

{% raw %}

```
{{ post.excerpt }}
```

{% endraw %}

## Sitemaps for GitHub Pages

#### jekyll-sitemap plugin

- https://github.com/jekyll/jekyll-sitemap
- https://help.github.com/articles/sitemaps-for-github-pages/

```yml
plugins:
  - jekyll-sitemap
```

## Markdown in yaml

#### Single paragraphs (`>`)

```
# Markdown enabled, however don't use more than one paragraph (enforced by `>`)
description: >
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

#### Multiple paragraphs (`|`)

```
# Markdown enabled, can use multiple paragraphs (enabled by `|`)
about: |
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
```

## Creating local variables using variable tags

- https://docs.shopify.com/themes/liquid/tags/variable-tags

{% raw %}

```
{% assign my_variable = false %}

{% if my_variable != true %}
This statement is valid.
{% endif %}
```

{% endraw %}

## Detecting page or posts

- http://stackoverflow.com/a/14090469/3837223

{% raw %}

```html
<div class="{{ if page.id }} post {{ else }} page {{ endif }}">
  ...
</div>
```

{% endraw %}

## Creating an array with Jekyll

- https://talk.jekyllrb.com/t/how-do-you-add-items-to-an-array-in-jekyll/324
- https://jekyllrb.com/docs/templates/

{% raw %}

```
<!--Create an emply array-->
{% assign tag_names = "" | split: "|" %}

<!--Obtain a tag name and push it to the array-->
{% for posts_by_tag in site.tags %}
  {% assign tag_names = tag_names | push: posts_by_tag.first %}
{% endfor %}

<!--Sort the tag names-->
{% assign tag_names = tag_names | sort %}
```

{% endraw %}

## Outputting curly braces or Liquid tags in Jekyll templete

#### A: Use `raw` tag

- https://jekyllrb.com/docs/templates/#code-snippet-highlighting

#### B: Create custom variables

- http://nateeagle.com/2011/08/31/how-to-output-curly-brackets-in-jekyll/

## CSS themes for Pygments syntax highlighter

- https://github.com/jwarby/jekyll-pygments-themes

## Links and References

- https://jekyllrb.com/
- https://github.com/poole
- https://github.com/mnishiguchi/mnishiguchi.com
