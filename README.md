# 0Chain Block Recorder

This is a module that is responsible for providing all the APIs that can be used to query the database created by the blockworker. Blockworker is responsible for adding data into the database. This service is used to connect to the blockworker database and then used to query the stored info in the database with the help of below mentioned REST APIs.

You can find the blockworker readme here. (https://github.com/0chain/blockworker/blob/master/README.md)

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
