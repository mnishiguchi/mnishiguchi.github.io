---
layout: post
title: Nested routes in Rails
comments: true
tags:
  - rails
  - routes
---

This is my memo on _{{ page.title }}_.

## [Nested Routes](http://guides.rubyonrails.org/routing.html#path-and-url-helpers#nested-resources)

- Never nest more than 2-level deep.
- Needs two arguments

```rb
Rails.application.routes.draw do
  ...
  resources :artists do
    resources :songs
  end
  ...
```

```bash
$ rake routes | grep song
    artist_songs GET    /artists/:artist_id/songs(.:format)          songs#index
                 POST   /artists/:artist_id/songs(.:format)          songs#create
 new_artist_song GET    /artists/:artist_id/songs/new(.:format)      songs#new
edit_artist_song GET    /artists/:artist_id/songs/:id/edit(.:format) songs#edit
     artist_song GET    /artists/:artist_id/songs/:id(.:format)      songs#show
                 PATCH  /artists/:artist_id/songs/:id(.:format)      songs#update
                 PUT    /artists/:artist_id/songs/:id(.:format)      songs#update
                 DELETE /artists/:artist_id/songs/:id(.:format)      songs#destroy
```

Example of a `new` form

```html
<h2>New Song</h2>

<%= form_for [@artist, @song] do |f| %> <%= f.label :title %> <%= f.text_field
:title %> <%= f.label :album %> <%= f.text_field :album %> <%= f.label
:preview_url %> <%= f.text_field :preview_url %> <%= f.submit %> <% end %>
```

```rb
class SongsController < ApplicationController
  ...
  # GET    /artists/:artist_id/songs/new
  def new
    @artist = Artist.find(params[:artist_id])
    @song = Song.new
  end

  # POST   /artists/:artist_id/songs
  def create
    @artist = Artist.find(params[:artist_id])
    @song = @artist.songs.create(song_params)
    redirect_to @artist
  end
  ...
```

```rb
class SongsController < ApplicationController
  ...
  # GET    /artists/:artist_id/songs/new
  def new
    @artist = Artist.find(params[:artist_id])
    @song = @artist.songs.new
  end

  # POST   /artists/:artist_id/songs
  def create
    @artist = Artist.find(params[:artist_id])
    @song = Song.new(song_params.merge(artist: @artist))
    if @song.save
      flash[:success] = "A song added to #{@artist.name}"
      redirect_to @artist
    else
      render :new
    end
  ...
```

---

## Misc

#### Passing data through params

- Three ways:
  1. query string
  2. GET some path
  3. POST some path
- Always string

#### [Rails Named Routes: Path Vs. URL](https://www.viget.com/articles/rails-named-routes-path-vs-url)

- You need to use an absolute URI when linking to an SSL site from a non-SSL site, and vice versa.
- You need to use an absolute URI when creating a redirect (e.g. with redirect_to.)

---

## References

- [Nested Routes](http://guides.rubyonrails.org/routing.html#path-and-url-helpers#nested-resources)
