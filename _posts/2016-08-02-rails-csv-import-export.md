---
layout: post
title: Rails CSV import and export
comments: true
tags:
  - rails
  - csv
  - rspec
---

#### Routes

```rb
# GET /cities          List with import and export buttons
# GET /cities.csv      Export csv
# POST /cities/import  Import csv
resources :cities, only: :index do
  collection do
    post :import
  end
end
```

#### Controller

```rb
class CitiesController < ApplicationController
  before_action :ensure_csv_file, only: :import

  # GET /cities
  # GET /cities.csv
  def index
    @cities = City.all.order(:preamble)

    respond_to do |format|
      format.html
      format.csv { send_data @cities.to_csv, filename: "cities-#{Date.current}.csv" }
    end
  end

  # POST /cities/import
  def import
    count = City.import_csv(params[:file])
    flash[:success] = "#{count} records were successfully uploaded from #{params[:file].original_filename}"
    redirect_to cities_url
  rescue StandardError => exception
    flash[:error] = exception.to_s
    redirect_to(cities_url)
  end

  private

  def ensure_csv_file
    if params[:file].nil?
      flash[:error] = "No File Uploaded"
      redirect_to(cities_url)
    elsif params[:file].content_type != "text/csv"
      flash[:error] = "File type must be csv: #{params[:file].original_filename}"
      redirect_to(cities_url)
    end
  end
end
```

#### Model

```rb
require "csv"

class City < ApplicationRecord
  validates :preamble, presence: true, uniqueness: true

  class << self
    def to_csv
      csv_attribute_names = %w[preamble description]
      CSV.generate(headers: true) do |csv|
        csv << csv_attribute_names
        find_each { |city| csv << city.attributes.values_at(*csv_attribute_names) }
      end
    end

    # Takes an uploaded file, upsert records from the file content and returns imported item count.
    def import_csv(file)
      options = {
        headers: true,
        encoding: "iso-8859-1:utf-8",
        header_converters: ->(f) { f.strip.downcase.parameterize(separator: "_") },
        converters: ->(f) { f ? f.strip : nil }
      }

      transaction do
        delete_all

        CSV.foreach(file.path, options) do |row|
          row_hash = row.to_hash.symbolize_keys
          ensure_valid_csv_row(row_hash)

          create!(row_hash.slice(:preamble, :description))
        end
      end

      count
    end

    private

    def ensure_valid_csv_row(row_hash)
      required_keys = %i[preamble description]
      raise "Invalid csv row" unless required_keys.to_set.intersect?(row_hash.keys.to_set)
    end
  end
end
```

#### View

```haml
= content_for :page_header do
  %h1 Cities

#cities_index
  = form_tag import_cities_path, multipart: true do
    .row
      .col-xs-4
        = link_to 'Export CSV', cities_path(format: :csv), class: "btn btn-primary btn-sm"
      .col-xs-8
        = render 'shared/csv_file_import', submit_options: { "data-test-id" => "cities-csv-import" }

  %table.table
    %thead
      %tr
        %th.col-lg-3 Preamble
        %th.col-lg-9 Description
    %tbody
      - @cities.each do |city|
        %tr
          %td{"data-test-id" => "cities-index-table-city-#{city.id}-preamble"}= city.preamble
          %td{"data-test-id" => "cities-index-table-city-#{city.id}-description"}= city.description
```

#### RSpec

```rb
require "rails_helper"

feature "user uploads cities csv", :js do
  scenario "user uploads valid csv file and sees uploaded rows content" do
    user = create(:user)
    login_as(user, scope: :user)

    visit cities_url
    page.attach_file("file", Rails.root.join("spec", "fixtures", "files", "valid_cities.csv"))
    find("[data-test-id='cities-csv-import']").click

    expect_url_with_flash(cities_url, "3 records were successfully uploaded from valid_cities.csv")
    City.all.each { |city| expect_correct_city_row(city) }
  end

  scenario "user tries to upload non-csv file and sees correct table content" do
    user = create(:user)
    login_as(user, scope: :user)

    visit cities_url
    page.attach_file("file", Rails.root.join("spec", "fixtures", "files", "invalid_cities.csv"))
    find("[data-test-id='cities-csv-import']").click

    expect_url_with_flash(cities_url, "Invalid csv row")
    expect(page).not_to have_selector("[data-test-id*='cities-index-table-citiy-']")
  end

  private

  def expect_correct_city_row(city)
    expect(page).to have_selector("[data-test-id='cities-index-table-city-#{city.id}-preamble']",
                                  text: /\A#{Regexp.escape(city.preamble)}\z/)
    expect(page).to have_selector("[data-test-id='cities-index-table-city-#{city.id}-description']",
                                  text: /\A#{Regexp.escape(city.description)}\z/)
  end
end
```

---

## Links and References

- [My past experiment on CSV export 1](http://qiita.com/mnishiguchi/items/2e63dbe977cd278a4396)
- [My past experiment on CSV export 2](http://qiita.com/mnishiguchi/items/2bd477a4e7c303c25014)
- [How to test CSV file download in Capybara and RSpec?](http://stackoverflow.com/questions/29309324/how-to-test-csv-file-download-in-capybara-and-rspec/29544674#29544674)
- https://stackoverflow.com/questions/21347388/rails-uninitialized-constant-productcsv/30515771#30515771
