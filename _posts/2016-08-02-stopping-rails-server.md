---
layout: post
title: Stopping Rails server
comments: true
tags:
  - rails
  - server
  - process
---

### When stopping a currently-running server

Check the process ID of a currently-running server

```bash
$ cat tmp/pids/server.pid
26711
```

Kill that process

```
$ kill -9 26711
```

---

### When a process appears to be frozen

Check all the processed on your system.

```
$ ps aux
```

Check all the processed with the name spring

```
$ ps aux | grep spring
masa            28136   0.0  0.0  2434840    776 s001  S+    3:43PM   0:00.00 grep spring
```

Try to stop the spring server

```
$ spring stop
```

Kill all the processes of spring

```
$ pkill -9 -f spring
```

Kill an individual process

```
$ kill -9 <pid>
```
