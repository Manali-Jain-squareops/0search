# 0Chain Block Recorder

This is a module that is responsible for providing all the APIs that can be used to query the database created by the blockworker. Blockworker is responsible for adding data into the database. This service is used to connect to the blockworker database and then used to query the stored info in the database with the help of below mentioned REST APIs.

You can find the blockworker readme here. ()

## Table of Contents

- [Requirements](#requirements)
- [Start Services](#start-services)
- [Stop Services](#stop-services)
- [Swagger Documentation](#swagger-documentation)
- [REST APIs](#rest-apis)

## Setup

### Requirements

Tools required to run this project:

- Docker version 18.09.1, build 4c52b90
- docker-compose version 1.23.2, build 1110ad01

### Connecting blockworker database

Go to the development.json file and check if the mongourl is correct or not, it would be similar to the below config:

```
"mongodb": {
    "url": "mongodb://mongodb:27017/block-recorder",
    "pool_size": 2
  },
```

The mongourl mentioned here would be the url of the blockworker's mongo database.

Blockworker's readme (https://github.com/0chain/blockworker/blob/master/README.md).

### Start Services

Move in project directory:

```
$ cd path/to/project
```

Setup Services:

```
$ make start-dev-services
```

It might take a couple of minutes to build/start the backend service.

Check if service has been started successfully:

```
$ docker-compose ps
```

Output should be like:

```
    Name                   Command               State           Ports
-------------------------------------------------------------------------------
backend         docker-entrypoint.sh make  ...   Up      0.0.0.0:3000->3000/tcp                   
```

### Stop Services

To stop the service:

```
$ docker-compose down
```

### Swagger Documentation

Open `http://localhost:3000/docs/` on browser to view

### REST APIs

Implemented REST APIs to get information of `Chain` stored in the database.

Below-mentioned REST APIs are implemented:

- `/transaction/:hash`: To query a transaction by its hash
- `/transactions/search`: API to search transactions by providing multiple query params
- `/transactions/block-hash`: API to get transactions by a block's hash.
- `/blocks`: API to get paginated list of latest blocks
- `/blocks/search`: To search blocks by providing multiple query params
- `/block`: Get a block by its hash or round
- `/block/latest`: Get information of latest block
- `/stats`: API to get current Stat of Chain
- `/stats/network-details`: API to get network details of Chain (miners, blobbers, sharders)
- `/docs`: Used for [swagger](https://swagger.io/) based API documentation

### Modular Codebase

I have designed this codebase in such a way as to minimize dependencies between different modules. It enables to easily manage/maintain codebase.

## Limitations / Future Improvements

- `Caching`: To cache response of APIs for faster GET operations and less Database queries
- `Unit Testing`: To be implemented
- `Integration Testing`: To be implemented
- `Proper Exception Handling`: Needed to be made more fault tolerant
- `Performance Test`: REST API load testing hasnt been done yet.
- `Data Caching in database`: Feature that will be implemented
- `Re-evaluate Database Indexes`: Needed to be improved