---
layout: post
title: Ruby - USA State PORO
tags:
  - ruby
  - rails
comments: true
---

A simple PORO that represents a USA state.

```rb
class UsState
  attr_reader :name, :abbreviation

  def initialize(name_or_abbreviation)
    @name = self.class.state_name_from_abbreviation(name_or_abbreviation)
    @abbreviation = self.class.abbreviate_state_name(@name)
  end

  def valid?
    name.present? && abbreviation.present?
  end

  class << self
    def state_name_from_abbreviation(name_or_abbreviation)
      return if name_or_abbreviation.blank?
      return name_or_abbreviation if valid_state_name?(name_or_abbreviation)

      US_STATES[name_or_abbreviation.to_s.upcase]
    end

    def abbreviate_state_name(state_name)
      return if state_name.blank?
      return state_name.to_s.upcase if valid_abbreviation?(state_name)

      US_STATES.invert[state_name]&.upcase
    end

    def valid_abbreviation?(word)
      word&.length == 2 && US_STATES[word.to_s.upcase]
    end

    def valid_state_name?(word)
      word&.length != 2 && US_STATES.invert[word]
    end
  end

  US_STATES = {
    "AK" => "Alaska",
    "AL" => "Alabama",
    "AR" => "Arkansas",
    "AS" => "American Samoa",
    "AZ" => "Arizona",
    "CA" => "California",
    "CO" => "Colorado",
    "CT" => "Connecticut",
    "DC" => "District of Columbia",
    "DE" => "Delaware",
    "FL" => "Florida",
    "GA" => "Georgia",
    "GU" => "Guam",
    "HI" => "Hawaii",
    "IA" => "Iowa",
    "ID" => "Idaho",
    "IL" => "Illinois",
    "IN" => "Indiana",
    "KS" => "Kansas",
    "KY" => "Kentucky",
    "LA" => "Louisiana",
    "MA" => "Massachusetts",
    "MD" => "Maryland",
    "ME" => "Maine",
    "MI" => "Michigan",
    "MN" => "Minnesota",
    "MO" => "Missouri",
    "MS" => "Mississippi",
    "MT" => "Montana",
    "NC" => "North Carolina",
    "ND" => "North Dakota",
    "NE" => "Nebraska",
    "NH" => "New Hampshire",
    "NJ" => "New Jersey",
    "NM" => "New Mexico",
    "NV" => "Nevada",
    "NY" => "New York",
    "OH" => "Ohio",
    "OK" => "Oklahoma",
    "OR" => "Oregon",
    "PA" => "Pennsylvania",
    "PR" => "Puerto Rico",
    "RI" => "Rhode Island",
    "SC" => "South Carolina",
    "SD" => "South Dakota",
    "TN" => "Tennessee",
    "TX" => "Texas",
    "UT" => "Utah",
    "VA" => "Virginia",
    "VI" => "Virgin Islands",
    "VT" => "Vermont",
    "WA" => "Washington",
    "WI" => "Wisconsin",
    "WV" => "West Virginia",
    "WY" => "Wyoming"
  }.freeze
end
```

```rb
RSpec.describe UsState do
  it "is valid with valid abbreviation" do
    expect_valid_dc_instance(described_class.new("DC"))
    expect_valid_md_instance(described_class.new("md"))
    expect_valid_va_instance(described_class.new(:va))
    expect(described_class.new(" vA")).not_to be_valid
  end

  it "is valid with valid state name" do
    expect_valid_dc_instance(described_class.new("District of Columbia"))
    expect(described_class.new("District Of Columbia")).not_to be_valid
    expect(described_class.new("district of columbia")).not_to be_valid
  end

  context "when input is nil" do
    it "has nil name and nil abbreviation" do
      instance = described_class.new(nil)
      expect(instance.name).to be_nil
      expect(instance.abbreviation).to be_nil
    end
  end

  private

  def expect_valid_dc_instance(instance)
    expect(instance).to be_valid
    expect(instance.name).to eq("District of Columbia")
    expect(instance.abbreviation).to eq("DC")
  end

  def expect_valid_md_instance(instance)
    expect(instance).to be_valid
    expect(instance.name).to eq("Maryland")
    expect(instance.abbreviation).to eq("MD")
  end

  def expect_valid_va_instance(instance)
    expect(instance).to be_valid
    expect(instance.name).to eq("Virginia")
    expect(instance.abbreviation).to eq("VA")
  end
end
```
