---
layout: post
title: Rspec retry
comments: true
tags:
  - ruby
  - rails
  - rspec
---

```rb
# Gemfile
gem "rspec-retry"
```

```rb
# spec/support/retry.rb
require "rspec/retry"

RSpec.configure do |config|
  # show retry status in spec process
  config.verbose_retry = true
  # show exception that triggers a retry if verbose_retry is set to true
  config.display_try_failure_messages = true

  # run retry only examples with retry_on_failure flag
  config.around :each, :retry_on_failure do |ex|
    ex.run_with_retry retry: 3
  end

  # callback to be run between retries
  config.retry_callback = proc do |ex|
    # run some additional clean up task - can be filtered by example metadata
    Capybara.reset! if ex.metadata[:js]
  end
end
```

```rb
# In an example, add `:retry_on_failure` option to enable the retry.
scenario "visitor sees that in there", :retry_on_failure do
  # ...
end
```

## Links and References

- https://github.com/NoRedInk/rspec-retry
- https://relishapp.com/rspec/rspec-core/docs/metadata/user-defined-metadata
