---
layout: post
title: Mongodb troubleshooting
comments: true
tags:
  - mongodb
---

### mongodb can't start with Invariant failure false

```
$ mongo
MongoDB shell version: 3.2.6
connecting to: test
2016-07-21T22:48:26.849-0400 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27017, reason: errno:61 Connection refused
2016-07-21T22:48:26.849-0400 E QUERY    [thread1] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed :
connect@src/mongo/shell/mongo.js:229:14
@(connect):1:6
```

```
$ mongod
2016-07-21T22:48:30.907-0400 I CONTROL  [initandlisten] MongoDB starting : pid=44842 port=27017 dbpath=/data/db 64-bit host=Masas-Mac.local
...
2016-07-21T22:48:31.200-0400 E STORAGE  [initandlisten] WiredTiger (13) [1469155711:200898][44842:0x7fff7948b000], file:index-0--7248151655693280502.wt, WT_SESSION.open_cursor: /data/db/index-0--7248151655693280502.wt: handle-open: open: Permission denied
2016-07-21T22:48:31.201-0400 I -        [initandlisten] Invariant failure: ret resulted in status UnknownError: 13: Permission denied at src/mongo/db/storage/wiredtiger/wiredtiger_session_cache.cpp 74
...
```

#### Solutions that worked

```
$ sudo rm -rf /data/db/   # Delete the db directory.
$ sudo mkdir -p /data/db  # Re-create the db directory.
$ sudo chmod 0755 /data/db
$ sudo chown $USER /data/db
```

---

## References

- [adamgibbons/install-mongodb.md](https://gist.github.com/adamgibbons/cc7b263ab3d52924d83b)
- [ga-wdi-lessons/mongo-intro](https://github.com/ga-wdi-lessons/mongo-intro#installation)
