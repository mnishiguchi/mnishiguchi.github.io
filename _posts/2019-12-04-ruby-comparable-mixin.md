---
layout: post
title: Ruby Comparable Mixin
tags:
  - ruby
  - poro
  - mixin
  - comparable
comments: true
---

- The Comparable mixin is used by classes whose objects may be ordered.
- https://docs.ruby-lang.org/en/2.5.0/Comparable.html

```rb
# By default, Ruby objects do not support sorting.
class Language
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

languages = [Language.new("Ruby"), Language.new("Dart"), Language.new("Python")]

# Sorting does not work by default.
languages.sort
# ArgumentError: comparison of Language with Language failed

# Different instances are considered as different because each instance has a different object id.
Language.new("Dart") == Language.new("Dart")
#=> false
```

```rb
# Comparable class
class Language
  include Comparable

  attr_reader :name

  def initialize(name)
    @name = name
  end

  # The class must define the <=> operator.
  def <=>(other)
    name <=> other.name
  end
end

languages = [Language.new("Ruby"), Language.new("Dart"), Language.new("Python")]

# Can be sorted based on the <=> operator.
languages.sort
#=> [#<Language:0x007f991b2373a8 @name="Dart">, #<Language:0x007f991b237308 @name="Python">, #<Language:0x007f991b237448 @name="Ruby">]

# Can be compared based on the <=> operator.
Language.new("Dart") == Language.new("Dart")
#=> true
```

That's it.
