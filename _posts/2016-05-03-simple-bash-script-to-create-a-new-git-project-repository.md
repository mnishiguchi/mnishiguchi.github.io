---
layout: post
title: Simple bash script to create a new git project repository
comments: true
tags:
  - shell
  - git
  - unix
---

I learned basics on Linux operating system following Linux Foundation's [online lectures](https://www.edx.org/course/introduction-linux-linuxfoundationx-lfs101x-0) a few month ago. After writing more than several [practice scripts](https://github.com/mnishiguchi/linux_and_git_notebook/tree/master/bin)
for the sake of learning, I decided to write a practical custom command to create a new project directory and initialize it as a local git repository.

I jus thought it was a great opportunity to utilize what I learned. Just as usual, I started by googling around for general ideas. As it turned out, it was pretty straightforward. All we need to do is just place the script in `/usr/local/bin` to make my custom scripts globally available.

## My goals

- to understand how bash scripts work
- to create a tool that I can actually use in my usual web development workflow

## Creating `git_mkdir` script

- [repo](https://github.com/mnishiguchi/git_mkdir)

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

## How to run a custom script?

- This is not so useful for a global use.

```
sh path/to/the/script
```

## How to make a shell script global?

- TL;DR: Place a script file in `/usr/local/bin`
- [stackoverflow](https://stackoverflow.com/questions/3560326/how-to-make-a-shell-script-global)

```sh
# Move to the directory that contains the script file
cd path/to/script/dir

# Make a symlink to /usr/local/bin/
ln -sf $PWD/git_mkdir /usr/local/bin/

# Verify the symlink creation
ls -a /usr/local/bin/ | grep git_mkdir
```

Now I can run the command from anywhere.

```
git_mkdir
```

## Conclusion

I am very happy about this script so far because I was able to factor out and automate the initial steps of creating a new project repository. With this script, I don't need to manually initialize the repository and create README any more!
