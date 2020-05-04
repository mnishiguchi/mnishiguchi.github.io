---
layout: post
title: Learning Docker basics
comments: true
tags:
  - vagrant
  - docker
---

Today I studied Docker so I wrote down my notes.

## Benefit

- Separation of concerns
- Fast dev cycle
- Portability
- Scalability

## Docker platform

> A platform for developing, shipping and running apps, using container visualization technology.

- Docker Engine
- Docker Hub
- Docker Orchestration
  - Docker Machine
  - Docker Swarm
  - Docker Compose

## Architecture

![](https://docs.docker.com/engine/article-img/architecture.svg)

- Linux OS kernel namespaces and control groups are used to manage the isolated workspaces.
- Client-server architecture
  - Client:
    - takes inputs
    - CLI or GUI(Kinematic)
  - Server(daemon):
    - builds, runs and distributes containers

```
                  HOST
                  - Docker daemon
CLIENT -------->  - Container
                  - Container
                  - Container
```

## Containers and images

- Image: read-only
- Container:
  - contains everything needed to run an application
  - can contain multiple images

## Registry (DockerHub)

- The public registry that contains a large number of images available for your use.
- We can search for official repositories and download them from DockerHub.

```
repo       repo       repo
  + image    + image    + image
  + image    + image    + image
  + image    + image    + image
```

```
Local    <--pull---  DockerHub
         ---push-->  + repo
                     + repo
                     + repo
```

## Basic commands

```bash
# Run a command in a new container:
docker run -it IMAGE [COMMAND] [ARG...]   # Standard input / terminal
docker run -d  IMAGE [COMMAND] [ARG...]   # Detached running in the background
docker attach CONTAINER_ID
docker run -d -P IMAGE [COMMAND] [ARG...] # Detached running in the background, mapping ports

# List containers
docker ps -a
```

Hello world test:

```bash
$ docker run hello-world
$ docker ps -a
```

Running a command in the container:

```bash
$ docker run ubuntu:14.04 echo "Konnichiwa sekai"
Konnichiwa sekai
```

Running bash in the container:

```bash
$ docker run -it ubuntu:latest /bin/bash
root@3eff1b34173e:/# echo "Hello"
Hello
root@3eff1b34173e:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# CTRL + P + Q: Close the terminal.
# exit:         Close the container.
```

Running a web application container:

```bash
# Start the container in the background, with port mapping.
$ docker run -d -P tomcat:7

# Check the port.
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED                  STATUS              PORTS                     NAMES
5c545a857282        tomcat:7            "catalina.sh run"   Less than a second ago   Up 6 seconds        0.0.0.0:32768->8080/tcp   elated_lovelace

# Visit that IP + PORT on the host's browser.
```

Logging the standard output:

```
$ docker logs -f CONTAINER_ID
```

- [docker run](https://docs.docker.com/engine/reference/commandline/run/)
- [docker ps](https://docs.docker.com/engine/reference/commandline/ps/)
- [docker images](https://docs.docker.com/engine/reference/commandline/images/)

---

## Vagrant

[Docs](https://www.vagrantup.com/docs/getting-started/index.html)

> Vagrant provides easy to configure, reproducible, and portable work environments built on top of industry-standard technology and controlled by a single consistent workflow to help maximize the productivity and flexibility of you and your team.

- Ships out of the box with support for VirtualBox, Hyper-V, and Docker.
- Supports provisioning tools such as shell scripts, Chef, or Puppet.

> Provisioners in Vagrant allow you to automatically install software, alter configurations, and more on the machine as part of the vagrant up process.

> Once you or someone else creates a single Vagrantfile, you just need to vagrant up and everything is installed and configured for you to work.

---

## References

- [getstarted](https://docs.docker.com/engine/getstarted/)
- [understanding-docker](https://docs.docker.com/engine/understanding-docker/)
- [self-paced-training](https://training.docker.com/self-paced-training)
- [Docker 入門 - 基礎編　いまから始める Docker 管理](http://www.slideshare.net/zembutsu/introduction-to-docker-management-and-operations-basic)
