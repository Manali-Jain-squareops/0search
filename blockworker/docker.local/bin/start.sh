#!/bin/sh
PWD=`pwd`

echo Starting blockworker ...

docker-compose -p blockworker -f ../docker-compose.yml up -d
