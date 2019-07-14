# speedupamerica-frontend

Next version of the SpeedUpAmerica site

## Setup

These instructions work on Linux, Windows and MacOS and only need to be performed once

Install [Docker](https://docs.docker.com/install/#supported-platforms) and [Docker Compose](https://docs.docker.com/compose/install/).

This service depends on the database used by previous version of the frontend. The database in SpeedUpAmerica (v1) must be running, have the latest migration, and be populated with data for this services to work. Run the [setup instructions for v1 of SpeedUpAmerica](https://github.com/Hack4Eugene/SpeedUpAmerica/#setup) before proceeding.

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
