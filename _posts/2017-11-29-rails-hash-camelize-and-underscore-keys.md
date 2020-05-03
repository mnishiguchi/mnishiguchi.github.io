---
layout: post
title: Rails hash camelize and underscore keys
comments: true
tags:
  - ruby
  - rails
  - hash
  - json
  - api
---

## Camelize hash keys before converting hash to json

#### Manually using Hash#deep_transform_keys!

```rb
hash.deep_transform_keys! { |key| key.camelize(:lower) }
```

#### In jbuilder

- Automatically camelize the keys of any outgoing jsons.
- https://stackoverflow.com/questions/37569439/automatically-convert-hash-keys-to-camelcase-in-jbuilder

```rb
# config/environment.rb
Jbuilder.key_format camelize: :lower
```

## Snakecase hash keys from json

#### A: Manually using Hash#deep_transform_keys!

```rb
hash.deep_transform_keys! { |key| key.underscore }
```

#### B: In middleware

- Automatically snakecase the keys of any incoming params.

```rb
# application.rb
require_relative "../app/middlewares/snake_case_parameters"
config.middleware.use SnakeCaseParameters
```

```rb
# app/middlewares/snake_case_parameters.rb
# A middleware that underscores the keys of any incoming (to the rails server) params
class SnakeCaseParameters
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)
    request.request_parameters.deep_transform_keys!(&:underscore)
    request.query_parameters.deep_transform_keys!(&:underscore)

    @app.call(env)
  end
end
```

## Links and References

- https://stackoverflow.com/questions/37569439/automatically-convert-hash-keys-to-camelcase-in-jbuilder
- https://apidock.com/rails/Hash/transform_keys
- https://apidock.com/rails/Hash/deep_transform_keys
