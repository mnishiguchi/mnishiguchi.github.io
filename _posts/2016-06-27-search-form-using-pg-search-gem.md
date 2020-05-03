---
layout: post
title: Search form using pg_search gem
comments: true
tags:
  - rails
  - postgresql
  - database
---

This is my memo on _{{ page.title }}_.

# Implementing search using pg_search gem

![Screenshot 2015-07-18 21.51.47.png](https://qiita-image-store.s3.amazonaws.com/0/82804/1ce907d4-6210-9db0-c5b2-248bfdf587be.png)

## Environment

- Ruby
- Rails
- PostgreSQL
- pg_search gem

## Gemfile

```rb:
gem 'rails'
gem 'pg'
gem 'pg_search',   '~> 1.0.3'   # Named scopes that take advantage of PostgreSQL's full text search
# ...
```

## Get started

#### Model

- Add `include PgSearch` to use `pg_search` gem.
- Define `pg_search_scope` When `search` method is called, searching will be performed based on the scope that is defined here.

```rb
class Artist < ApplicationRecord
  include PgSearch

  has_many :songs, dependent: :destroy

  scope :sorted, ->{ order(name: :asc) }

  pg_search_scope :search,
                  against: [
                    :name,
                    :nationality
                  ],
                  using: {
                    tsearch: {
                      prefix: true,
                      normalization: 2
                    }
                  }

  def self.perform_search(keyword)
    if keyword.present?
    then Artist.search(keyword)
    else Artist.all
    end.sorted
  end
end
```

#### View

- Create a search form.
- Issue a GET#index request with the user's input as a search term.

```slim
/...
h1.page-header All the Artists

.artist_search.form-group
  = form_tag(artists_path, method: "get") do
    = text_field_tag :search, nil, placeholder: "Search artists ...", class: "form-control"
    = submit_tag "", style: "display: none;"
/...
```

#### Controller

```rb
class ArtistsController < ApplicationController
  def index
    if params[:search].present?s
      @artists = Artist.perform_search(params[:search])
    else
      @artists = Artist.all
    end
  end
# ...
```

## references

- [pg_search gem](https://github.com/Casecommons/pg_search)
- [Railscasts PRO #343 Full-Text Search in PostgreSQL (pro)](https://www.youtube.com/watch?v=n41F29Qln5E)
- [Rails and React](http://codeloveandboards.com/blog/2014/09/10/rails-and-react-ii-a-real-use-case/)
