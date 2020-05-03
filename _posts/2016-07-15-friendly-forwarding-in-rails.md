---
layout: post
title: Friendly forwarding in Rails
comments: true
tags:
  - rails
---

### When forwarding to the URL immediately before current one

Use the `request.referrer` method.

```rb
  ...
  def destroy
    @micropost.destroy
    flash[:success] = "Micropost deleted"
    redirect_to request.referrer || root_url
  end
  ...
```

### When forwarding to the URL further before

Store the URL in the `session` ahead of time.

```rb
module SessionsHelper
  ...

  # Redirects to stored location (or to the default).
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # Stores the URL trying to be accessed.
  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end
end
```

#### `request.referrer`

- Returns the previous request URL as a String.
- The same as `request.headers["HTTP_REFERER"]`

#### `original_url`

- Returns the original request URL as a String.

```rb
# get "/articles?page=2"
request.original_url # => "http://www.example.com/articles?page=2"
```

---

## References

- [ttps://www.railstutorial.org/book](https://www.railstutorial.org/book/updating_and_deleting_users#sec-friendly_forwarding)
