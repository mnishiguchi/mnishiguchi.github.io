---
layout: post
title: Ruby - Date Range PORO
tags:
  - ruby
  - date
comments: true
---

I wanted to make a simple ruby object that represents date range.

```rb
class DateRange < Range
  DEFAULT_FORMAT = "%m/%d/%Y".freeze
  DEFAULT_SEPARATOR = " - ".freeze

  attr_reader :start_date, :end_date, :format, :separator

  def initialize(start_date, end_date, opts = {})
    super(start_date, end_date)
    @start_date = start_date
    @end_date = end_date
    @format =  opts[:format] || DEFAULT_FORMAT
    @separator = opts[:separator] || DEFAULT_SEPARATOR
  end

  def to_s
    @to_s ||= [start_date.strftime(format),
               separator,
               end_date.strftime(format)].join("")
  end

  class << self
    def from_string(date_range_string, opts = {})
      format = opts[:format] || DEFAULT_FORMAT
      separator = opts[:separator] || DEFAULT_SEPARATOR
      start_date, end_date = date_range_string.split(separator).map do |s|
        Date.strptime(s.strip, format)
      end
      new(start_date, end_date, opts)
    end

    def from_date_range(date_range, opts = {})
      new(date_range.first, date_range.last, opts)
    end
  end
end
```

```rb
describe DateRange do
  describe ".from_string" do
    it "returns correct instance" do
      instance = described_class.from_string("03/11/2019 - 04/15/2019", format: "%m/%d/%Y")

      expect(instance.to_s).to eq("03/11/2019 - 04/15/2019")
      expect(instance.first).to eq("2019-03-11".to_date)
      expect(instance.last).to eq("2019-04-15".to_date)
    end
  end

  describe ".from_date_range" do
    it "returns correct instance" do
      instance = described_class.from_date_range("2019-03-11".to_date.."2019-04-15".to_date, format: "%m/%d/%Y")

      expect(instance.to_s).to eq("03/11/2019 - 04/15/2019")
      expect(instance.first).to eq("2019-03-11".to_date)
      expect(instance.last).to eq("2019-04-15".to_date)
    end
  end
end
```
