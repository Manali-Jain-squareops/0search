# 0chain-blockWorker

## Setup

Clone the repo and run the following command inside the cloned directory
```
$ ./docker.local/bin/init.sh
```

## Building and Starting the Node

If there is new code, do a git pull and run the following command

```
$ ./docker.local/bin/build.sh
```

Go to the bin directory (cd docker.local/bin) and run the container using
```
$ ./start.sh
```
## Point to another blockchain

You can point the server to any instance of 0chain blockchain you like, Just go to config (docker.local/config) and update the blockworker.yaml.

By default the are pointing to one network
```
miners:
  - http://one.devnet-0chain.net:31201
  - http://one.devnet-0chain.net:31202
  - http://one.devnet-0chain.net:31203
  - http://one.devnet-0chain.net:31204
  - http://one.devnet-0chain.net:31205
  - http://one.devnet-0chain.net:31206
sharders:
  - http://one.devnet-0chain.net:31101
  - http://one.devnet-0chain.net:31102
  - http://one.devnet-0chain.net:31103
  ```

You need to set miners and sharders of the blockchain you want to connect in blockworker.yaml, There are other configurable properties as well which you can update as per the requirement.

### Cleanup

Get rid of old data when the blockchain is restarted or if you point to a different network:
```
$ ./docker.local/bin/clean.sh
```
### Network issue
If there is no test network, run the following command 
```
docker network create --driver=bridge --subnet=198.18.0.0/15 --gateway=198.18.0.255 testnet0
```