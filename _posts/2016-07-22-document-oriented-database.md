---
layout: post
title: Document-oriented database
comments: true
tags:
  - database
  - mongodb
---

## Document-oriented database vs Relationoal database

- Different ways to store information.

#### Relationoal database

- Schema's in relational databases are fairly rigid.
- JOIN queries can get expensive and slow down our app.

#### Document-oriented database

- Provides a more flexible, scalable solution for less complex domain models.
- Suitable for working with a flexible data model, that involves similar, but different objects.

---

## MongoDB

- An open-source document database that provides:
  - High Performance
  - High Availability
  - Automatic Scaling
- Its data structure composed of field(key) and value pairs:
  - similar to JSON objects
  - stored as BJSON
  - fields may include other documents, arrays, and arrays of documents
- collection + operation + modification = result
  - `db.your_collection.find(...)`
  - `db.your_collection.update(...)`
  - `db.your_collection.remove(...)`

```bash
MongoDB            | Relational DB
-------------------+------------------
Database           | Database
Collections        | Tables
Documents(BSON)    | Rows
Fields             | Columns
_id (BSON ObjectId)| Primary key (integer)
```

---

## Get started

#### Start mongod server in a terminal

```bash
$ mongod
2016-07-21T22:50:41.806-0400 I CONTROL  [initandlisten] MongoDB starting : pid=44910 port=27017 dbpath=/data/db 64-bit host=Masas-Mac.local
2016-07-21T22:50:41.807-0400 I CONTROL  [initandlisten] db version v3.2.6
2016-07-21T22:50:41.807-0400 I CONTROL  [initandlisten] git version: 05552b562c7a0b3143a729aaa0838e558dc49b25
...
```

#### For more info

```
brew info mongo
```

#### Start the Mongo shell in another terminal

- A Javascript shell.

```
$ mongo
MongoDB shell version: 3.2.6
connecting to: test
>
```

#### For help

```bash
> help
...

show dbs                     show database names
show collections             show collections in current database
show users                   show users in current database
show profile                 show most recent system.profile entries with time >= 1ms
show logs                    show the accessible logger names
show log [name]              prints out the last segment of log in memory, 'global' is default
use <db_name>                set current database
db.foo.find()                list objects in collection foo
db.foo.find( { a : 1 } )     list objects in foo where a == 1
...
exit                         quit the mongo shell
```

#### create/connect to a new database(collection)

```bash
> use restaurant_db # Create a new db called restaurant_db.
> db                # The `db` variable will point to the currently connected database.
restaurant_db
```

NOTE: Our database does not show in `show dbs` until we add a document to it.

```bash
> show dbs
local  0.000GB
```

#### Create a record(document)

```bash
> db.restaurants.insert(
   {
      "name": "Cookies Corner",
      "address" : {
         "street" : "1970 2nd St NW",
         "zipcode" : 20001,
      },
      "yelp": "http://www.yelp.com/biz/cookies-corner-washington"
   })
WriteResult({ "nInserted" : 1 })
>
```

```bash
> show collections
restaurant
>
```

#### Find a record(document) in database(collection)

- [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)

```bash
> db.restaurant.find()
{ "_id" : ObjectId("5792264ba8fd59f6e3553039"), "name" : "Cookies Corner", "address" : { "street" : "1970 2nd st NW", "zipcode" : 20001 }, "yelp" : "http://www.yelp.com/biz/cookies-corner-washington" }
>
```

```bash
> db.restaurants.find({name: "Cookies Corner"}).pretty()
{
	"_id" : ObjectId("579229eca8fd59f6e355303a"),
	"name" : "Cookies Corner",
	"address" : {
		"street" : "1970 2nd St NW",
		"zipcode" : 20001
	},
	"yelp" : "http://www.yelp.com/biz/cookies-corner-washington"
}
```

#### Drop a database(collection)

```bash
> use random_db
switched to db random_db
> db
random_db
> db.dropDatabase()
{ "ok" : 1 }
```

#### Updage a record(document)

- [http://docs.mongodb.org/manual/core/write-operations-introduction/](http://docs.mongodb.org/manual/core/write-operations-introduction/)

```
> db.your_collection.update(
  { criteria },
  {
    $set: { assignments }
  },
  { options }
)
```

```bash
> db.restaurants.update(
  {"name": "Cookies Corner"},
  { $set: { state: "DC" }}
)
```

Updating multiple document at the same time

```bash
> db.restaurants.update(
  {},
  {
    $set: { "state": "DC" }
  },
  { multi: true }
)
```

#### Remove records(documents)

```bash
db.restaurants.remove({ conditions })
```

```bash
> db.restaurants.remove({"name":"Masatoshi"})
WriteResult({ "nRemoved" : 1 })
```

---

## Cursors

- A pointer to the result set that is returned when you ask MongoDB for data.
- Using a cursor, we can do things, such as counting or skipping ahead, before actually pulling down data.

---

## References

- [Document-oriented database](https://en.wikipedia.org/wiki/Document-oriented_database)
- [ga-wdi-lessons/mongo-intro](https://github.com/ga-wdi-lessons/mongo-intro)
- [karlseguin/the-little-mongodb-book](https://github.com/karlseguin/the-little-mongodb-book)
