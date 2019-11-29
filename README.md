# OChain Block Fetcher

This is a module that is responsible for fetching all the relvenat data from the 0chain and store it in a noSql database like mongoDb for faster querying and data caching purposes.

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
redis           docker-entrypoint.sh redis ...   Up      6379/tcp
worker          docker-entrypoint.sh make  ...   Up
```

### Stop Services

To stop all services:

```
$ docker-compose down
```

### Swagger Documentation

Open `http://localhost:3000/docs/` on browser to view

## Services and Features

### Ledger Sync

This service is responsible for fetching all the chain, blocks and transaction related data and storing it in the database. However it does not fetch confirmation details of a transaction or file details as these will take time if fetched in the same flow. This is done by a parallel service called worker described next.

### Redis Based Worker

This service is responsible for fetching confirmation details of a transaction, identifying storage related transaction, verifying file data in the blockchain and storing it in the database. This run parallel to the ledger-sync service.

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

I have designed this codebase in such a way as to minimize dependencies between different modules. Ite enables to easily manage/maintain codebase. There are 3 different services running parallely that are dockerized and scalable. Also, I have kept the file data related codebase modular so that it does not affect the other codebase in case we agree on some major changes in that aspect.

## Limitations / Future Improvements

- `Caching`: To cache response of APIs for faster GET operations and less Database queries
- `Unit Testing`: To be implemented
- `Integration Testing`: To be implemented
- `Worker Test Cases`: To be implemented
- `Proper Exception Handling`: Needed to be made more fault tolerant
- `Performance Test`: REST API load testing hasnt been done yet.
- `Data Caching in database`: Feature that will be implemented
- `Re-evaluate Database Indexes`: Needed to be improved

### File related data storage limitations

As per discussion I have assumed that a storage related transaction will have a payload like this:

```
{
  "actual_file_hash": "12b56872cbd2749a7ef3d67344aa6c22df2548ac",
  "actual_file_size": 43963193,
  "actual_thumbnail_hash": "",
  "actual_thumbnail_size": 0,
  "content_hash": "f2f4a83ade4739808cce450e4015d1365c0fe3bd",
  "custom_meta": "",
  "encrypted_key": "",
  "hash": "8f75e4b6b9510af1d2f3fe34a0a93c721dd0a641ddb9fd698c600470abf08982",
  "lookup_hash": "53bbdc22761c135cd9657af2ae8e3a853dcbf4b316f612d3fc0f4a0141cbb5e4",
  "merkle_root": "f91f417d7f386ea735bee94b78badf63df619ad5038acebeccdc95b06980c4a6",
  "mimetype": "video/mp4",
  "name": "abcd.mp4",
  "num_of_blocks": 336,
  "path": "/abcd.mp4",
  "path_hash": "53bbdc22761c135cd9657af2ae8e3a853dcbf4b316f612d3fc0f4a0141cbb5e4",
  "size": 21981597,
  "thumbnail_hash": "",
  "thumbnail_size": 0,
  "type": "f"
}
```

As per this assumption I have designed the logic to query file metadata from a storage related transaction and store it in the database.

Another problem I faced was to query the blockchain to verify a file payload received in a transaction (Creating wallets and allocations did not work either). Also, I could get the correct way of doing this. Hopefully we can improve this feature after we have a concrete idea of SDK's usage for what we want to achieve. As of now all my logic is based on the above assumption.

I have also not added GET APIs to fetch file metadata due to above-mentioned reasons. It could be easily added once we fix the file fetching process.
