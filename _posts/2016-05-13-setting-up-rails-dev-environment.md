---
layout: post
title: Setting up Rails development environment (OS X)
comments: true
tags:
  - ruby
  - rails
  - rvm
---

I have worked on Rails apps more than a few times in the past but every time I set it up, I need some researches to refresh my memory. I decided to put together all my resources here so that I will not need to go anywhere else for this topic.

## 1. Preparing basic tools

- Text editor: Atom etc
- Terminal: iTerm etc
- Browser: Chrome etc
- Git

## 2. Install a Ruby version management tool

- Either [Ruby Version Manager (RVM)](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv)
- Allow you to install and manage multiple versions of Ruby on the same machine.
- NOTE: RVM and rbenv can’t be used on the same system simultaneously
  - check `$ which rvm` and `$ which rbenv`

### [Install RVM](https://rvm.io/rvm/install)

```bash
# Install RVM
$ \curl -sSL https://get.rvm.io | bash

# Reload this shell and initialize rvm.
$ exec bash -l

# Update rvm
$ rvm get master

# Install ruby
$ rvm install 2.3.1
# NOTE: If you get the warning below, you can safely ignore it and move on to step 3.
# * WARNING: You have '~/.profile' file, you might want to load it,
#   to do that add the following line to '/Users/adamzerner/.bash_profile':

# Configure your default version of ruby
$ rvm use 2.3.1 --default
```

### If you ever get stuck with RVM

```bash
$ rvm help
$ rvm gemset help
```

## 3. Install RubyGems

- RubyGems is a package manager for Ruby projects.
- Provides the `gem` command.
- NOTE: If you have installed RVM, you already have RubyGems, since RVM includes it automatically.
  - Check `$ which gem`

## 4. Install Rails

```bash
# Install Rails with a specific version number.
$ gem install rails -v 4.2.2
```

## Reference

- [RUBY ON RAILS TUTORIAL (4.0 VERSION & 2ND ED.)](http://rails-4-0.railstutorial.org/book/beginning#sec-install_ruby)
- [Ruby Version Manager (RVM) Overview for Rails Newbs](https://strandcode.com/2013/07/11/ruby-version-manager-rvm-overview-for-rails-newbs/)
- [https://github.com/ga-dc/installfest/blob/master/Rakefile](https://github.com/ga-dc/installfest/blob/master/Rakefile)
