---
layout: post
title: Jsonify Ruby Hash string
tags:
  - ruby
  - json
  - hash
comments: true
---

Sometimes I have this issue of parsing JSON that contains the string representation of Ruby hash.

## Problem

It happens obviously because the hash string is not JSON.

```rb
require 'json'
hsh_as_str = '{"order_id"=>nil}'
JSON.parse(hsh_as_str)
# JSON::ParserError: 783: unexpected token at '{"order_id"=>nil}'
```

## Solution A

```rb
require 'json'
hsh_as_str = '{"order_id"=>nil}'
valid_json = hsh_as_str.gsub('=>', ':').gsub(':nil', ':null')
#=> "{\"order_id\":null}"
JSON.parse(valid_json)
#=> {"order_id"=>nil}
```

## Solution B

```rb
require 'json'
hsh_as_str = '{"order_id"=>nil}'
eval(hsh_as_str)
#=> {"order_id"=>nil}
```

## Pitfalls

- It can be more complicated when the string contains the string representation of Ruby objects, for example:

```rb
'{"user"=>#<User id=123>}'
```

That's it.


## Links

- [stackoverflow](https://stackoverflow.com/questions/1667630/how-do-i-convert-a-string-object-into-a-hash-object)
