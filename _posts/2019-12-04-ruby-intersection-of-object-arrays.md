---
layout: post
title: Ruby Intersection of Object Arrays
tags:
  - ruby
  - poro
  - array
comments: true
---

- By default, arrays of objects cannot be intersected in Ruby.
- By overriding `eql?(other)` and `hash` methods, we can make a Ruby object capable of intersecting.

```rb
#
class Color
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

# Both lists have Blue in common so Blue should be the intersection.
list1 = [Color.new("Blue"), Color.new("Yellow"), Color.new("Black")].shuffle
list2 = [Color.new("Blue"), Color.new("Red"), Color.new("White")].shuffle

# But result is empty.
list1 & list2
#=> []
```

```rb
# Array-intersecting-capable class.
class Color
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def eql?(other)
    other.kind_of?(self.class) && name == other.name
  end

  def hash
    name.hash
  end
end

# Both lists have Blue in common so Blue should be the intersection.
list1 = [Color.new("Blue"), Color.new("Yellow"), Color.new("Black")].shuffle
list2 = [Color.new("Blue"), Color.new("Red"), Color.new("White")].shuffle

# The result is as expected.
list1 & list2
#=> [#<Color:0x007f92001a5c18 @name="Blue">]
```

Surprisingly there was not much information on this topic. This old article from 2006 was helpful.
http://shortrecipes.blogspot.com/2006/10/ruby-intersection-of-two-arrays-of.html

That's it.
