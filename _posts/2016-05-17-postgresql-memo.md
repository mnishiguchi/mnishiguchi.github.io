---
layout: post
title: PostgreSQL memo
comments: true
tags:
  - postgresql
  - database
  - rails
---

_{{ page.title }}_.

## Outside `psql`

#### Create a new database

```
$ createdb moma_db
```

#### List all the databases

```
$ psql -l
```

```
                                          List of databases
               Name                | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------------------------------+-------+----------+-------------+-------------+-------------------
 gladiator                         | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 hello_app_1_development           | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

#### List all tables in the specified database

```
$ psql sample_app_development -c "\d"
```

```bash
               List of relations
 Schema |       Name        |   Type   | Owner
--------+-------------------+----------+-------
 public | schema_migrations | table    | masa
 public | users             | table    | masa
 public | users_id_seq      | sequence | masa
(3 rows)
```

#### List all columns of the table 'users' in the specified database

```
$ psql sample_app_development -c "\d users"
```

```bash
                                        Table "public.users"
     Column      |            Type             |                     Modifiers
-----------------+-----------------------------+----------------------------------------------------
 id              | integer                     | not null default nextval('users_id_seq'::regclass)
 name            | character varying           | not null
 email           | character varying           | not null
 created_at      | timestamp without time zone | not null
 updated_at      | timestamp without time zone | not null
 password_digest | character varying           |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "index_users_on_email" UNIQUE, btree (email)
```

---

## Inside `psql`

#### Show all the users

Type `\du`

#### Show all the databases

Type `\l` or `\list`

```
masa=# \list
```

```
                                          List of databases
               Name                | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------------------------------+-------+----------+-------------+-------------+-------------------
 sample_app_development            | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 sample_app_test                   | masa  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

#### Connect to a database

Type `\connect db_name` or `\c db_name`

```
masa=# \connect sample_app_development
```

```
You are now connected to database "sample_app_development" as user "masa".
```

#### Display all the tables in the currently working database

Type `\dt`

```
sample_app_development=# \dt
```

```
             List of relations
 Schema |       Name        | Type  | Owner
--------+-------------------+-------+-------
 public | schema_migrations | table | masa
 public | users             | table | masa
(2 rows)
```

#### Display a table by performing an SQL query

```
sample_app_development=# SELECT * FROM users;
```

```
 id |         name         |     email      |         created_at         |         updated_at         |                       password_digest
----+----------------------+----------------+----------------------------+----------------------------+--------------------------------------------------------------
  1 | Masatoshi Nishiguchi | mn@example.com | 2016-05-17 21:17:17.639944 | 2016-05-17 21:17:17.639944 | $2a$10$l3PW9nG74ey4JXQJLhBtUOJBChLsK0vDv2ogPKwAqsX/lCk3E0UQe
(1 row)
```

#### Delete a record from a table

```
sample_app_development=# DELETE FROM users WHERE id=3;
```

```
DELETE 1
```

---

## Troubleshooting

#### psql: FATAL: database “db_name” is not currently accepting connections

- [SO](http://stackoverflow.com/a/31147811/3837223)

```
dropdb 'db_name'
```

```
db:setup
```

#### psql: FATAL: database ... does not exist

- Check this: [stackoverflow](http://stackoverflow.com/a/17936043/3837223)

#### Wrong use of single/double quotes

- Single quotes are used to indicate the beginning and end of a string in SQL.
- NOTE: Using `""` for a string causes an error.

#### Missing semicolon

- Make sure that you place a semicolon at the end of the statement.

---

## References

- [PostgreSql コマンドの覚え書き](http://qiita.com/mm36/items/1801573a478cb2865242)
