---
layout: post
title: Creating models in Rails
comments: true
tags:
  - rails
  - postgresql
  - active_record
  - database
---

This is my memo on _{{ page.title }}_.

#### Create models and migration files (database schema)

[docs](http://guides.rubyonrails.org/command_line.html#rails-generate)

```
rails generate model NAME [field[:type][:index] field[:type]
```

#### Migrate the database

```
$ rake db:migrate
== 20160624190709 CreateArtists: migrating ====================================
-- create_table(:artists)
   -> 0.0247s
== 20160624190709 CreateArtists: migrated (0.0248s) ===========================
...
```

In case, you need to reset the database, run

```
$ rake db:migrate:reset
```

#### Create a seed file and fill the database with sample database

- This allows us to check if database is working as we expects before moving on to actually writing application code.
- Use `create!` instead of `create` so that we can detect syntax error easily.

```rb
require_relative './song_data.rb'
require_relative './artist_data.rb'

# Clear all the data in the database.
Song.destroy_all   # Dependent
Artist.destroy_all

# Get data from files.
song_data   = get_song_data()
artist_data = get_artist_data()

# Associate artist to his/her songs.
song_data.each_pair do |artist_name, songs|
  info = artist_data[artist_name]
  current_artist = Artist.create!({
    name:         info[:name],
    photo_url:    info[:photo_url],
    nationality:  info[:nationality]
  })

  songs.each do |song|
    Song.create!({
      title:        song[:title],
      album:        song[:album],
      preview_url:  song[:preview_link],
      artist:       current_artist
    })
  end
end
```

```
$ rake db:seed
```

#### Check if the data is successfully injected into the database.

```
$ rails c
>> Song.all
  Song Load (2.3ms)  SELECT "songs".* FROM "songs"
=> #<ActiveRecord::Relation []>
>> Artist.all.length
  Artist Load (2.3ms)  SELECT "artists".* FROM "artists"
=> 5
>> Song.all.length
  Song Load (2.1ms)  SELECT "songs".* FROM "songs"
=> 250
>>
```
