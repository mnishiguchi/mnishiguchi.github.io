---
layout: post
title: Rake tasks basics
comments: true
tags:
  - ruby
  - rake
  - rails
---

## Basic commands

```bash
# List all the tasks
bundle exec rake -T
```

## Rake tasks in Rails

```bash
be rake db:migrate:redo
```

```bash
be rake log:clear
```

```bash
be rake db:migrate db:seed log:clear
```

```bash
# List all the TODOs and FIXMEs
be rake notes
```

```bash
be rake rails:update  # Rails 4
be rake app:update    # Rails 5
# d - diff
# Y - yes
# n - no
# q - quit
```

#### `first_or_create!` in `db/seed.rb`

This allows us to run the `be rake db:seed` command without deleting any data.

```rb
# db/seed.rb
Post.where(
  title: "The title",
  body:  "Hello world"
).first_or_create!
```

## Write custom tasks

```rb
# Rakefile
namespace :masatoshi do
  desc "Say hello"
  task :hello do
    puts "Hello"
  end

  desc "Say world"
  task :world do
    puts "World"
  end

  desc "Say hello and world"
  task :hello_world => [:hello, :world]

  desc "Take parameter"
  task :custom_hello, [:name] do |t, args|
    puts "Hello, #{args[:name]}!"
  end
end
```

#### Calling tasks from a terminal

```bash
$ be rake masatoshi:hello
Hello
$ be rake masatoshi:world
World
$ be rake masatoshi:hello_world
Hello
World
```

#### Calling tasks from a ruby file

```rb
# rake_include.rb
require "rubygems"
require "bundler"
require "rake"

Bundler.require
load "Rakefile"
Rake::Task["masatoshi:custom_hello"].invoke("Mr. Nishiguchi")
```

```bash
ruby rake_include.rb
Hello, Mr. Nishiguchi!
```

---

## Resources

- [https://github.com/ruby/rake](https://github.com/ruby/rake)
- [RailsConf 2016 - Crushing It With Rake Tasks By Barrett Clark](https://youtu.be/8HRJQUr2Y3Q)
