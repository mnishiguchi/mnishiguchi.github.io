---
layout: post
title: Rails - form object
tags:
  - ruby
  - rails
  - form
comments: true
---

This is my note on how to implement a simple contact form using a form object.

## dependencies

- ruby 2.5.3
- rails 5.2.2
- webpacker
- bootstrap4
- simple_form
- slim_rails
- etc

## form object

```rb
# app/models/contact_form.rb

class ContactForm
  include ActiveModel::Model

  attr_accessor(
    :first_name,
    :last_name,
    :email
  )

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true

  def submit
    if valid?
      # do something if needed
      # - send notifications
      # - log events, etc.
      true
    else
      false
    end
  end
end
```

## routing and controller actions

```rb
# config/routes.rb

Rails.application.routes.draw do
  resource :contact, only: [:show, :create]
end
```

```rb
# app/controllers/contacts_controller.rb

class ContactsController < ApplicationController
  def show
    @contact_form = ContactForm.new
  end

  def create
    @contact_form = ContactForm.new(contact_form_params)

    if @contact_form.submit
      flash[:notice] = "Thanks for contacting us"
      redirect_to root_url
    else
      render :show
    end
  end

  private def contact_form_params
    params.require(:contact_form).permit!
  end
end
```

## view with contact form

```slim
/ app/views/contacts/show.slim

.container
  h1 Contact

  = simple_form_for @contact_form, url: contact_path do |f|
    = f.error_notification
    = f.input :first_name
    = f.input :last_name
    = f.input :email

    .btn-group
      = f.button :submit, 'Send Contact Form', class: "btn-primary"
      = f.button :button, "Cancel", type: "reset", class: "btn-outline-secondary"
```

## links

- https://robots.thoughtbot.com/activemodel-form-objects
