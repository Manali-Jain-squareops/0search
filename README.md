# OChain Block Fetcher

[TODO] basic desc of project

## Approach

## Setup

### Requirements

Tools required to run this project:

- Docker version 18.09.1, build 4c52b90
- docker-compose version 1.23.2, build 1110ad01

### Start Services

Move in project directory:

```
$ cd path/to/project
```

Setup Services:

```
$ make start-dev-services
```

It might take a couple of minutes to build/start all services.

Check if services has been started successfully:

```
$ docker-compose ps
```

Output should be like:

```
    Name                   Command               State           Ports
-------------------------------------------------------------------------------
backend         docker-entrypoint.sh make  ...   Up      0.0.0.0:3000->3000/tcp
ledger-sync     docker-entrypoint.sh make  ...   Up
mongo-master    /usr/bin/mongod --bind_ip_ ...   Up      27017/tcp
mongo-slave-1   /usr/bin/mongod --bind_ip_ ...   Up      27017/tcp
mongo-slave-2   /usr/bin/mongod --bind_ip_ ...   Up      27017/tcp
```

### Swagger Documentation

Open `http://localhost:3000/docs/` on browser to view

## Features

### Ledger Sync

### Redis Based Worker

### Transaction Processing

### Mongo Replica Set

A replica set is a group of mongod instances that maintain the same data set. A replica set contains several data bearing nodes and optionally one arbiter node.

Currently, for development purpose I have used 3 mongod nodes.

### REST APIs

Implemented REST APIs to get information of `Chain` stored in database by `ledger-sync`

Below-mentioned REST APIs are implemented:

- `/transaction/:hash`: To query a transaction by its hash
- `/transactions/search`: API to search transactions by providing multiple query params
- `/blocks`: API to get paginated list of latest blocks
- `/blocks/search`: To search blocks by providing multiple query params
- `/block`: Get a block by its hash or round
- `/block/latest`: Get information of latest block
- `/stats`: API to get current Stat of Chain
- `/docs`: Used for [swagger](https://swagger.io/) based API documentation

### Modular Codebase

I have designed this codebase in such a way as to minimize dependencies between different modules. Ite enables to easily manage/maintain codebase.

[TODO]

## Limitations / Future Improvements

- `Caching`: To cache response of APIs for faster GET operations and less Database queries
- `Unit Testing`:
- `Integration Testing`:
- `Worker Test Cases`:
- `Chain Document Related Operations`:
- `Proper Exception Handling`:
- `Performance Test`:
- `Data Sharding`:
- `Re-evaluate Database Indexes`:
