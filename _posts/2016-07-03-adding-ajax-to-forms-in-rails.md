---
layout: post
title: Adding Ajax to forms in Rails
comments: true
tags:
  - rails
  - ajax
---

This is my memo on _{{ page.title }}_.

Adding Ajax to web forms is a common practice so Rails makes Ajax easy to implement.

#### HTML

Add `remote: true` option to `form_for` method then Rails automagically uses Ajax.

`app/views/household_items/index.html.slim`

using `form_tag`

```slim
...
- moving.tags.each do |tag|
  = form_tag(moving_household_items_path, method: :get, remote: true) do
    = hidden_field_tag :filter, tag.name
    = submit_tag tag.name.capitalize, name: nil
...
```

or using `link_to`

```slim
...
- moving.tags.each do |tag|
  = link_to tag.name, moving_household_items_path(filter: tag.name),
    method: :get, remote: true, class: "btn btn-xs btn-info"
...
```

#### Controller

Use `respond_to` method to handle both `html` and `js` formats.

`app/controllers/household_items_controller.rb`

```rb
def index
  respond_to do |format|
    format.html do
      @household_items = @moving.household_items
      render :index
    end
    format.js do
      if params[:filter].present?
        @household_items = HouseholdItem.tagged_with(params[:filter], params[:moving_id])
      else
        @household_items = @moving.household_items
      end
    end
  end
end
```

#### JS

Replace the content by rendering a partial.

`app/views/household_items/index.js.erb`

```js
/*
When a filter button is clicked, the following script is invoked via household_items#index action.
It replaces the table content with filtered data.
 */
$(document).ready(function () {
  $('#moving_items').html(
    "<%= escape_javascript(render 'shared/moving_items', moving: @moving, household_items: @household_items) %>"
  );
});
```

## References

- [RailsCasts #37 Simple Search Form](http://railscasts.com/episodes/37-simple-search-form) by Ryan Bates
- [Ruby on Rails Tutorial](https://www.railstutorial.org/book/following_users#sec-a_working_follow_button_with_ajax) by Michael Hartl
- [mnishiguchi/estimate_moving](https://github.com/mnishiguchi/estimate_moving/tree/master)
