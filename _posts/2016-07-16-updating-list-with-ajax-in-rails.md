---
layout: post
title: Updating a list with Ajax in Rails
comments: true
tags:
  - rails
  - ajax
---

### View

```html
...
<tbody>
  <% @household_items.each do |household_item| %>
  <tr id="household_item-<%= household_item.id %>">
    <td><%= household_item.name %></td>
    <td><%= household_item.volume %></td>
    <td><%= household_item.quantity %></td>
    <td><%= household_item.tag %></td>
    <td><%= household_item.description %></td>
    <td><%= link_to 'Show', household_item %></td>
    <td><%= link_to 'Edit', edit_household_item_path(household_item) %></td>
    <td>
      <%= link_to 'Destroy', household_item, method: :delete, remote: true,
      data: { confirm: 'Are you sure?' } %>
    </td>
  </tr>
  <% end %>
</tbody>
...
```

### Create

`app/controllers/household_items_controller.rb`

```rb
  ...
  # POST /household_items
  # POST /household_items.json
  def create
    @household_item = HouseholdItem.new(household_item_params)

    respond_to do |format|
      if @household_item.save
        format.html { ... }
        format.js do
          # For ajax, use `flash.now`.
          flash.now[:success] = "HouseholdItem was successfully created."
          @household_item
        end
      else
        format.html { ... }
      end
    end
  end
  ...
```

`app/views/household_items/create.js.erb`

```js
// Update the table.
var $tbody = $('#household_items__table tbody');
var newRecordHTML =
  "<%= j render 'household_items/table_row', household_item: @household_item %>";
$tbody.prepend(newRecordHTML);

// Update flash.
$('#flash_box').html("<%= j render 'layouts/flash' %>");
```

### Delete

`app/controllers/household_items_controller.rb`

```rb
  ...
  # DELETE /household_items/1
  # DELETE /household_items/1.json
  def destroy
    @household_item = HouseholdItem.find(params[:id])
    @household_item.destroy
    respond_to do |format|
      format.js do
        # For ajax, use `flash.now`.
        flash.now[:success] = "HouseholdItem was successfully destroyed."
      end
    end
  end
  ...
```

`app/views/household_items/destroy.js.erb`

```js
// Remove the deleted item from the table.
$('#household_item-<%= @household_item.id %>').remove();

// Update flash.
$('#flash_box').html("<%= j render 'layouts/flash' %>");
```

---

## Gotchas

#### Don't forget to update your `.js.erb` files when refactoring

- Partial file names
- Variable names
- CSS ids/classes

#### We cannot comment out `erb` code with JavaScript commenting

- Unused `erb` code can be evaluated and cause an error.

---

## References

- [https://github.com/mnishiguchi/react_vs_rails](https://github.com/mnishiguchi/react_vs_rails)
