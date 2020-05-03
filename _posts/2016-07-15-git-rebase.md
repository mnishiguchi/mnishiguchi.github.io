---
layout: post
title: Git rebase
comments: true
tags:
  - git
---

## Use case

> One of the best ways to incorporate rebasing into your workflow is to clean up local, in-progress features.

- [https://www.atlassian.com/git/tutorials/merging-vs-rebasing/](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/)

```
$ git rebase -i HEAD~3
```

## In case of conflicts

Relax and do not panic.

```bash
masa@Masas-Mac:~/blog (master)
$ git rebase -i HEAD~10
error: could not apply f8a87e6... Add layout to timeline in the About page

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".

Could not apply f8a87e6a17d80b13048a7d2dfb90cfd77dd0066e... Add layout to timeline in the About page
```

- Resolve conflicts.
- Then run `git rebase --continue` to continue.

```
masa@Masas-Mac:~/blog (master|REBASE-i 3/10)
$ git rebase --continue
```

## Undoing `git rebase`

- [stackoverflow](http://stackoverflow.com/a/135614/3837223)

```bash
# Find the head commit of the branch:
$ git reflog
```

```bash
# Suppose the old commit was HEAD@{5} in the ref log:
git reset --hard HEAD@{5}
```
