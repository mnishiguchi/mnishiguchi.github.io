---
layout: post
title: Autocomplete form in Rails
comments: true
tags:
  - rails
  - jquery
  - form
  - json
---

This is my memo on _{{ page.title }}_.

## I want to:

- display a dropdown list of suggestions every time user enters a character into a text field.
- automatically fill an appropriate value in another field when an item in the dropdown list is clicked.

## Dependencies

- Ruby 2.3.1
- Rails 5.0.0.rc2
- jquery-rails
- jquery-ui-rails

## View

`/app/views/household_items/new.html.slim`

```slim
= simple_form_for([@moving, @household_item], html: { class: 'form-horizontal' }) do |f|
  = f.input :name
  = f.input :volume
  = f.input :quantity
  = f.input :all_tags
  = f.input :description
  .form-group
    = f.submit "Create item", class: 'btn btn-primary'
```

## Data

`app/helpers/household_items.json`

```json
{
  "armchair, small": 20,
  "armchair, large": 30,
  "sofa, 4 seater": 70,
  "sofa, 3 seater": 60,
  "sofa, 2 seater": 40
}
```

`/app/helpers/household_items_helper.rb`

```rb
module HouseholdItemsHelper

  def item_volume_json
    # Read a file.
    File.read(File.dirname(__FILE__) + '/household_items.json')
  end
end
```

## Controller

Make the helper module available in the view.

```rb
class HouseholdItemsController < ApplicationController

  # To use the item_volume_json data.
  include HouseholdItemsHelper

  ...
```

## JS / jQuery

Pass the data to the `source` property.

```js
$(document).ready(function(){

  // Write the item-volume-json data directly on the HTML at server side.
  // The data is an object of key-value pairs (name: volume)
  var data = #{raw item_volume_json}
  var itemNames = Object.keys(data)

  // Configure the autocomplete.
  $('#household_item_name').autocomplete({
    source: itemNames,
    select: onSelect
  });

  // Invoked when an autocomplete list item is clicked.
  function onSelect(e, ui) {
    setVolume(data[ui.item.value])
  }

  // Set the specified value on the volume field.
  function setVolume(volume){
    $('#household_item_volume').val(volume)
  }
});
```

## Styles

```scss
ul.ui-autocomplete {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  border: solid 1px #999;
  cursor: default;
  li {
    background-color: #fff;
    border-top: solid 1px #ddd;
    margin: 0;
    padding: 2px 15px;
    a {
      color: #000;
      display: block;
      padding: 3px;
    }
    a.ui-state-hover,
    a.ui-state-active {
      background-color: #fffcb2;
    }
  }
}
```

## References

- [Rails, jQuery-ui, Autocomplete で語句候補ドロップダウン](http://qiita.com/mnishiguchi/items/c3aab56e089071ac8d5c)
- [https://github.com/railscasts/102-auto-complete-association-revised](https://github.com/railscasts/102-auto-complete-association-revised)
- [https://github.com/joliss/jquery-ui-rails](https://github.com/joliss/jquery-ui-rails)
- [https://jqueryui.com/autocomplete/](https://jqueryui.com/autocomplete/)
