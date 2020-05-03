---
layout: post
title: Setting up Minitest in Rails
comments: true
tags:
  - minitest
  - rails
  - ruby
---

This is my memo on _{{ page.title }}_.

### MiniTest reporters

It gets the default Rails tests to show red and green at the appropriate times.

1. Include the [`minitest-reporters`](https://github.com/kern/minitest-reporters) gem.
2. Configure the test by adding these [few lines](https://www.railstutorial.org/book/static_pages#code-minitest_reporters) to the `test/test_helper.rb` file.

### Automated tests with Guard

1. Include the [`guard`](https://github.com/guard/guard) gem in the Gemfile.
2. Initialize it by running `$ bundle exec guard init`.
3. Edit the resulting Guardfile so that Guard will run the right tests. [[Example](https://www.railstutorial.org/book/static_pages#code-guardfile)]

4. Open a new terminal and run it at the command line as follows:

```bash
$ bundle exec guard # start
$ quit              # exit
```

## Reference

- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/static_pages#sec-advanced_testing_setup)
