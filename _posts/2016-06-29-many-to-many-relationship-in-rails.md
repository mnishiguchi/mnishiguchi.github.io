---
layout: post
title: Many-to-many relationship in Rails
comments: true
tags:
  - rails
  - postgresql
  - active_record
  - database
---

Adding a `many to many` relationship between the following two models:

- `User`
- `Song`

#### Create a migration file to create a join table.

```
rails g model Favorite user:references song:references
```

`db/migrate/20160629144158_create_favorites.rb`

```rb
class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.references :song, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
```

#### The join table

`app/models/favorite.rb`

```rb
class Favorite < ActiveRecord::Base
  belongs_to :song
  belongs_to :user
end
```

#### Two models accessing each other through the join table

`app/models/user.rb`

```rb
class User < ActiveRecord::Base
  ...
  has_many :favorites, dependent: :destroy
  has_many :songs, through: :favorites
  ...
```

`app/models/song.rb`

```rb
class Song < ActiveRecord::Base
  ...
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites
  ...
```

---

## References

- [Rails4 の has_many through で多対多のリレーションを実装する](http://qiita.com/samurairunner/items/cbd91bb9e3f8b0433b99) by @samurairunner
- http://stackoverflow.com/questions/10301794/difference-between-rake-dbmigrate-dbreset-and-dbschemaload
- [ga-wdi-lessons/rails-many-to-many](https://github.com/ga-wdi-lessons/rails-many-to-many)
- [Rails - has_many & belongs_to 関係を既存のモデルに追加](http://qiita.com/mnishiguchi/items/35e40ab46ef02d095ce0)
