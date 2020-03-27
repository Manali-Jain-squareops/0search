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
scanner         docker-entrypoint.sh make  ...   Up                                    
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

This service is responsible for fetching all the chain, blocks and transaction related data and storing it in the database. It starts fetching the latest finalized blocks along with the transactions from the chain and stores in the database. It checks the latest and put it in the database. A worker keeps running in the background to add the missing blocks in the database described next. 

### Worker

This service also fetches the blocks and transactions from the chain and put it in the database similarly to the ledger-sync. The only difference is it starts fetching blocks from round number 2 till it catches the blockchain. This is how, the missing blocks gets added in the database.
We have defined a config variable which can be updated to the number from where the worker should start.

### Scanner

Scanner service also runs in the background and do a periodic scan of missing blocks by going towards the worker from the ledger-sync. It basically fills the gap in between the 2. It checks the latest block in the database (fetched and added by the ledger-sync) and then start going backwards and checks each round of block if it is present in the database or not and adds it in the database. We have defined a scanner scan limit variable in the config which can be changed to define the span of missing blocks to be fetched.

### Mongo Replica Set

A replica set is a group of mongod instances that maintain the same data set. A replica set contains several data bearing nodes and optionally one arbiter node.

Currently, for development purpose I have used 3 mongod nodes.

### REST APIs

Implemented REST APIs to get information of `Chain` stored in database by `ledger-sync`

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

I have designed this codebase in such a way as to minimize dependencies between different modules. Ite enables to easily manage/maintain codebase. There are 3 different services running parallely that are dockerized and scalable. Also, I have kept the file data related codebase modular so that it does not affect the other codebase in case we agree on some major changes in that aspect.

## Limitations / Future Improvements

- `Caching`: To cache response of APIs for faster GET operations and less Database queries
- `Unit Testing`: To be implemented
- `Integration Testing`: To be implemented
- `Proper Exception Handling`: Needed to be made more fault tolerant
- `Performance Test`: REST API load testing hasnt been done yet.
- `Data Caching in database`: Feature that will be implemented
- `Re-evaluate Database Indexes`: Needed to be improved

### Metadata storage in the database for a transaction.

Currently, the metadata of a transaction is getting stored in the database as a single field of object type.
Metadata field will be different for different types of transactions like for storage related transactions, it would be like 

```
{
  "Name": "env",
  "Type": "f",
  "Path": "/env",
  "PathHash": "d664a2440eac5af4849e17fd8d900068756e0740ba686b16f386971c61d35c11",
  "LookupHash": "d664a2440eac5af4849e17fd8d900068756e0740ba686b16f386971c61d35c11",
  "Hash": "c9b6acc0cc94cbd0eae30d644b83ad44e4540288",
  "MimeType": "application/octet-stream",
  "Size": 2666,
  "ThumbnailSize": 0,
  "ThumbnailHash": "",
  "EncryptedKey": ""
}
```
and for locking related transactions, metadata will have these attributes:

```
  {
    "name": "lock",
    "input": {
      "duration": "1h0m"
    }
  }
```
for allocation transactions:

```
{
  "name":"new_allocation_request"
  "input":{
    "data_shards": 2
    "expiration_date": 1588833876
    "owner_id": "a72e411c814dadff04e31c0914564044f6a8  ef  2a59a3de2a1d15db9df3769a9d"
    "owner_public_key": "8c50545aaf2df8a52adc3db71ccc  628088c54035227c5b8470a6cdd26ad48f0b50a85d1fd8388e1b8a061b6cf3fbab2cff03236074b830069c011fbeaa15b092"
    "parity_shards": 2
    "size": 2147483648
}
```
The search is also updated as per the metadata coming from the blockchain in every transaction.
A search in metadata field can be done by calling the search api with ```metadata```  query params. Search can be done on the following fields:

```
1. File name
2. Path name
3. Path hash
4. Content hash
5. From
6. To
7. Blobber Id
8. Allocation Id
```
