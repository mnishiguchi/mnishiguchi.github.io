---
layout: post
title: Custom routes in Rails
comments: true
tags:
  - rails
  - routes
---

This is my memo on _{{ page.title }}_.

> You are not limited to the seven routes that RESTful routing creates by default. If you like, you may add additional routes that apply to the collection or individual members of the collection. - Rails Guides

`config/routes.rb`

```rb
Rails.application.routes.draw do
  ...
  resources :songs do
    member do
      post 'add_favorite'
      delete 'remove_favorite'
    end
  end
  ...
end
```

`app/controllers/songs_controller.rb`

```rb
class SongsController < ApplicationController
  ...
  def add_favorite
    @song = Song.find(params[:id])
    @artist = @song.artist
    @song.favorites.create(user: current_user)
    redirect_to artist_path(@artist)
  end

  def remove_favorite
    @song = Song.find(params[:id])
    @artist = @song.artist
    @song.favorites.where(user: current_user).destroy_all
    redirect_to artist_path(@artist)
  end
  ...
```

```bash
$ rake routes | grep favorite
    add_favorite_song POST   /songs/:id/add_favorite(.:format)             songs#add_favorite
    remove_favorite_song DELETE /songs/:id/remove_favorite(.:format)          songs#remove_favorite
```

---

## References

- [Adding More RESTful Actions](http://guides.rubyonrails.org/routing.html#adding-more-restful-actions)
- [ga-wdi-lessons/rails-many-to-many](https://github.com/ga-wdi-lessons/rails-many-to-many)
- [tunr_rails_many_to_many/tree/favorites-solution](https://github.com/ga-wdi-exercises/tunr_rails_many_to_many/tree/favorites-solution)
