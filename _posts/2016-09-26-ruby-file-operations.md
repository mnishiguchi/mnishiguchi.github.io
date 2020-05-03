---
layout: post
title: Ruby file operations
comments: true
tags:
  - ruby
  - file
  - rails
---

## Currently working directory

```rb
puts "Dir.pwd: #{Dir.pwd}"
```

## Join path

```rb
FILE_DIR = "#{Dir.pwd}/test/fixtures/files"
filename = "example.xml"
path     = File.join(FILE_DIR, filename)
```

## Read

```rb
contents = File.open("sample.txt", "r") { |file| file.read }
puts contents
```

```rb
file = File.read(path)
```

#### Reading multiple files

```rb
def read_all_feed_files
  pattern   = File.join(Dir.pwd, "test", "fixtures", "files", "feed_*.xml")
  filenames = Dir.glob(pattern)

  [].tap do |xml_files|
    filenames.each do |io|
      xml_files << File.read(io)
    end
  end
end
```

#### Reading each line

```rb
File.open("example.rb", "r") do |io|
  io.each_line do |line|
    puts line
  end
end
```

#### Reading from URL

- https://ruby-doc.org/stdlib-2.1.0/libdoc/open-uri/rdoc/OpenURI.html

```rb
require "open-uri"
puts open("https://mnishiguchi.com").read
```

#### Reading JSON

- [Stackoverflow: Unable to parse JSON because of invisible characters](http://stackoverflow.com/a/26399045/3837223)

```rb
data = File.read("#{Rails.root}/test/fixtures/files/feed_a.json")
JSON.parse(data.encode("ASCII", { undef: :replace, replace: "" }))
```

## Write

- http://qiita.com/mayahiro/items/eba22d312f31331fead3#comment-0440fe2c41e85526e37f

```rb
File.open("data_file.yml", "w") do |io|
  io.write(data)
end
```

```rb
File.write "data_file.yml", data
```

## Links and References

- http://ruby.bastardsbook.com/chapters/io/
- https://stackoverflow.com/questions/5545068/what-are-all-the-common-ways-to-read-a-file-in-ruby
