# speedupamerica-frontend
Next version of the SpeedUpAmerica site

## Setup

These instructions work on Linux, Windows and MacOS and only need to be performed once

Install [Docker](https://docs.docker.com/install/#supported-platforms) and [Docker Compose](https://docs.docker.com/compose/install/).

> Depending on your OS, you may have to make sure to use `copy` instead of `cp`.

```
$ git clone https://github.com/Hack4Eugene/speedupamerica-frontend.git
$ cd speedupamerica-frontend
$ cp local.env.template local.env
```

## Running

```
$ docker-compose up
```