---
layout: post
title: Rails - Application URI
tags:
  - ruby
  - rails
  - routes
  - uri
comments: true
---

I found it handy to have all the application routes related information in a single module.

## dependencies

- ruby 2.5
- rails 5.2

## get started

```rb
# config/routes.rb

Rails.application.routes.default_url_options = {
  host: "localhost",
  port: Rails.env.development? || Rails.env.test? ? "3000" : nil
}
```

```rb
# app/models/application_uri.rb

class ApplicationUri
  include Rails.application.routes.url_helpers

  delegate_missing_to :@uri

  def initialize(url_or_path = nil, subdomain: nil)
    @uri = URI.parse(url_or_path || "/")
    @uri.scheme = self.class.scheme
    @uri.host = subdomain ? "#{subdomain}.#{self.class.host}" : self.class.host
    @uri.port = self.class.port
    @subdomain = subdomain
  end

  def url
    @uri.to_s
  end

  def host
    self.class.host
  end

  class << self
    def scheme
      Rails.env.production? ? "https" : "http"
    end

    def host
      Rails.application.routes.default_url_options[:host]
    end

    def port
      Rails.application.routes.default_url_options[:port]
    end

    def url_helpers
      new
    end
  end
end
```

```rb
# spec/models/application_uri_spec.rb

require "rails_helper"

describe ApplicationUri do
  describe "url_helpers" do
    it { expect(described_class.url_helpers.root_path).to eq("/") }
    it { expect(described_class.url_helpers.root_url).to eq("http://localhost:3000/") }
  end

  describe "custom path" do
    let(:instance) { described_class.new("/some_custom_path") }
    it { expect(instance.path).to eq("/some_custom_path") }
    it { expect(instance.url).to eq("http://localhost:3000/some_custom_path") }
  end

  describe "scheme" do
    it { expect(described_class.scheme).to eq("http") }
  end

  describe "host" do
    it { expect(described_class.host).to eq("localhost") }
  end

  describe "port" do
    it { expect(described_class.port).to eq("3000") }
  end
end
```
