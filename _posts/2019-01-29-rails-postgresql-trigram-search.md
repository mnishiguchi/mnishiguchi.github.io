---
layout: post
title: 'Rails, PostgreSQL - Trigram Search'
tags:
  - ruby
  - rails
  - postgresql
  - search
comments: true
---

This is my note on how to set up PostgreSQL Trigram Search, which is so powerful that it enables me to find records even by misspelled word.

- https://github.com/Casecommons/pg_search#trigram-trigram-search
- https://www.postgresql.org/docs/current/pgtrgm.html

## example model

```
# == Schema Information
#
# Table name: agencies
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Agency < ApplicationRecord
```

## set up fuzzy matching

### install pg_search gem

```rb
gem "pg_search"
```

### install PostgreSQL extensions

- https://github.com/Casecommons/pg_search/wiki/Installing-PostgreSQL-Extensions

create a migration file

```bash
$ rails g migration install_pg_trgm
```

paste this into a generated migration file

```rb
class InstallPgTrgm < ActiveRecord::Migration
  def up
    execute "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
  end

  def down
    execute "DROP EXTENSION IF EXISTS pg_trgm;"
  end
end
```

run `bin/rails db:migrate`

## define pg_search_scope in a model

```rb
class Agency < ApplicationRecord
  include PgSearch
  pg_search_scope :fuzzy_match_by_name, against: :name, using: :trigram
```

## rspec

```rb
describe Agency do
  describe "fuzzy_match_by_name" do
    it "finds a best result by name" do
      create_list(:agency, 10)
      nice_agency = create(:agency, name: "Nice Agency")

      ["nice_agency",
       "Nice-Agency-123",
       "Mice Agent"].each do |name|
        expect(
          described_class.fuzzy_match_by_name(name).first
        ).to eq(nice_agency)
      end
    end

    it "returns nil when not found" do
      expect(
        described_class.fuzzy_match_by_name("Nice Agency")
      ).to be_blank
    end
  end
end
```

That's it.
