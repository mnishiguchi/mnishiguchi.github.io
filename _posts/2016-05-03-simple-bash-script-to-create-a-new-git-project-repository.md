---
layout: post
title: Simple bash script to create a new git project repository
comments: true
tags:
  - shell
  - git
  - unix
---

When I was learning basics on Linux operating system following Linux Foundation's [online lectures](https://www.edx.org/course/introduction-linux-linuxfoundationx-lfs101x-0) a few month ago, I created a simple bash script that helps create a new git repository.

## [git_mkdir](https://github.com/mnishiguchi/git_mkdir)

The purposes of creating that script were:

- for me to understand how bash scripts work and
- to create a tool that I can actually use in my usual web development workflow.

After writing more than several [practice scripts](https://github.com/mnishiguchi/linux_and_git_notebook/tree/master/bin)
for the sake of learning, I decided to write a practical custom command to
create a new project directory and initialize it as a local git repository.

Today I recall that script and tried to use it, but it could not be run from Desktop of my MacBook Air. I thought now is the time to learn how to make a bash script global.

Just as usual, I google around to get general ideas. As it turned out, it was pretty straightforward. All we need to do is just place the script in `/usr/local/bin`.

```bash
#!/bin/bash

# Ask the user for a directory name to be created.
echo "Enter the directory name to be created:"
read dirname

# Create a new directory with that name and CD into it.
mkdir $dirname
cd ./$dirname

# Report the working directory.
echo "$dirname has been created"
echo "Moved into $( pwd )"

# Create a few files.
touch index.html
echo "# $dirname" > README.md
echo ".DS_Store" > .gitignore

# Initialize git.
git init
git add -A
git commit -m "Initial commit"

# Report the filenames that have been created.
ls -hartl

# Tell the user that this script is done.
echo "Done!"
```

## Conclusion

I am very happy about this script so far because I was able to factor out and automate the initial steps of creating a new project repository. With this script, I don't need to manually initialize the repository and create README any more!
