---
layout: post
title: Remove unused CSS using PurgeCSS
tags:
  - purgecss
  - css
  - thor
  - ruby
comments: true
---

I really like [Twitter Bootstrap](https://getbootstrap.com/) (Bootstrap) for styling my web projects, but people often suggest smaller CSS frameworks with comparison data like [this](https://cssfs.dev/sizes.html). I tried some of them. While it was interesting to see diferent ideas and conventions in styling, I never felt as productive as using Bootstap. So I often ended up using Bootstrap feeling guilty until I found [PurgeCSS](https://purgecss.com/).

PurgeCSS is a tool to remove unused CSS. Long story short, it removes all the Bootstrap CSS that I do not use based on my HTML files. Now there is not much reason not to use Bootstrap. I can use Bootstrap without the guilt.

PurgeCSS offers [multiple ways](https://purgecss.com/) for us to use it. If I let Webpack build everything, I could use a Webpack plugin but for my site, I need to run Jekyll for building HTML after running Webpack for builing assets. So I ended up writing a simple throwaway script in Ruby, which is a simple tool that runs [PurgeCSS CLI](https://purgecss.com/CLI.html#usage) for my site. That way, I can run it after everything is built.
I do not think it is a bad idea. It is such a simple task.

I decided to use my favorite language Ruby. I used a simple CLI tool using [Thor gem](https://github.com/erikhuda/thor). Ruby was already available because the project I was working on was a Jekyll site. I just installed [PurgeCSS NPM package](https://purgecss.com/) and [Thor gem](https://github.com/erikhuda/thor). That was pretty much all I needed to get started.

```
yarn add --dev purgecss
```

Adding to my project's Gemfile:

```
gem "thor"
```

then

```
bundle install
```

Here is an example script:

```rb
#!/usr/bin/env ruby
# frozen_string_literal: true

require 'rubygems'
require 'thor'
require 'pathname'
require 'fileutils'

class PurgeCss < Thor
  def self.exit_on_failure?
    true
  end

  CONTENT_FILES = Dir.glob('_site/**/*.html')
  CSS_FILES = Dir.glob('_site/assets/main-bundle.css')
  OUTPUT_DIR = '_site/assets'

  default_task :purgecss

  desc 'purgecss', 'Remove unused CSS'
  def purgecss
    css_size_lookup = build_css_size_lookup
    print_config
    system("purgecss #{purgecss_option}")
    print_results(css_size_lookup)
  end

  private

  def print_results(css_size_lookup)
    CSS_FILES.each do |css_file|
      size_before = css_size_lookup[css_file]
      size_after = File.size(css_file)
      print_result(css_file, size_before, size_after)
    end
  end

  def print_config
    puts <<~LOG
      content: #{CONTENT_FILES.size.to_s.rjust(8, ' ')} files
      css:     #{CSS_FILES.size.to_s.rjust(8, ' ')} files
      output:  #{OUTPUT_DIR}
    LOG
  end

  def print_result(css_file, size_before, size_after)
    puts <<~LOG
      #{css_file}
        size_before: #{size_before.to_s.rjust(8, ' ')}
        size_after:  #{size_after.to_s.rjust(8, ' ')}
        diff:        #{(size_after - size_before).to_s.rjust(8, ' ')}
    LOG
  end

  def build_css_size_lookup
    CSS_FILES.each_with_object({}) do |css_file, lookup|
      lookup[css_file] = File.size(css_file)
    end
  end

  def purgecss_option
    "--css #{CSS_FILES.join(',')} "\
    "--content #{CONTENT_FILES.join(',')} "\
    "--output #{OUTPUT_DIR}"
  end
end

PurgeCss.start(ARGV)
```

I can use it by running:

```
> bundle exec bin/purgecss

content:       74 files
css:            1 files
output:  _site/assets
_site/assets/main-bundle.css
  size_before:   145396
  size_after:     19060
  diff:         -126336
```

where the script location is `bin/purgecss` relative to a project root. One important point to note is that I need to prepend `bundle exec` to my command so that it can load ruby gems appropriately.

As you can see in the result, it removes significant amount of CSS from my CSS bundle. Awesome!
