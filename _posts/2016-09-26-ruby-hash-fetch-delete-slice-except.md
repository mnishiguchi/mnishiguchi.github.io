---
layout: post
title: Ruby Hash#fetch, Hash#delete, Hash#slice, Hash#except
comments: true
tags:
  - ruby
  - rails
---

## Hash#slice vs Hash#except

- [http://api.rubyonrails.org/classes/Hash.html#method-i-slice](http://api.rubyonrails.org/classes/Hash.html#method-i-slice)
- [http://api.rubyonrails.org/classes/Hash.html#method-i-except](http://api.rubyonrails.org/classes/Hash.html#method-i-except)

#### Hash#slice

```rb
hash = { a: 1, b: 2, c: 3, d: 4 }
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.slice(:a)
#=> {:a=>1}
hash
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.slice(:a, :b)
#=> {:a=>1, :b=>2}
hash
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
```

#### Hash#slice!

```rb
hash = { a: 1, b: 2, c: 3, d: 4 }
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.slice!(:a, :b)
#=> {:c=>3, :d=>4}
hash
#=> {:a=>1, :b=>2}
```

#### Hash#except

```rb
hash = { a: 1, b: 2, c: 3, d: 4 }
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.except(:a)
#=> {:b=>2, :c=>3, :d=>4}
hash
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.except(:a, :b)
#=> {:c=>3, :d=>4}
hash
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
```

#### Hash#except!

```rb
hash = { a: 1, b: 2, c: 3, d: 4 }
#=> {:a=>1, :b=>2, :c=>3, :d=>4}
hash.except!(:a)
#=> {:b=>2, :c=>3, :d=>4}
hash
#=> {:b=>2, :c=>3, :d=>4}
```

## Hash#fetch vs Hash#delete

- [http://apidock.com/ruby/Hash/fetch](http://apidock.com/ruby/Hash/fetch)
- [http://apidock.com/ruby/Hash/delete](http://apidock.com/ruby/Hash/delete)

#### Hash#fetch

```rb
hash = { "a" => 100, "b" => 200 }
#=> {"a"=>100, "b"=>200}
hash.fetch("a")
#=> 100
hash.fetch("z")
# KeyError: key not found: "z"
hash.fetch("z", 0)
#=> 0
hash.fetch("z") { 0 }
#=> 0
hash.fetch("z") { |el| "#{el} not found" }
#=> "z not found"
```

#### Hash#delete

```rb
hash = { "a" => 100, "b" => 200 }
#=> {"a"=>100, "b"=>200}
hash.delete("a")
#=> 100
hash.delete("z")
#=> nil
hash.delete("z"){ [] }
#=> []
hash.delete("z"){ |el| "#{el} not found" }
#=> "z not found"
```
