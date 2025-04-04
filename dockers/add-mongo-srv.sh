#!/bin/bash


function usage() {
	echo "Usage: $0 <docker-name> <docker-compose-file> <addr>"
	echo "  <docker-name> Name of the docker container"
	echo "  <docker-compose-file> Path to the docker-compose file"
	echo "  <addr>  Last part of the address e.g 20 for 10.0.0.20"
  echo "  <run>  The program to run by default mongodb"               
}

if [ $# -lt 3 ]; then
	usage
	exit 1
fi

if [ -z "$4" ]; then
    RUN="mongod"
else
    RUN="$4"
fi

DOCKER_NAME=$1
DOCKER_COMPOSE_FILE=$2
DOCKER_COMPOSE_DIR=$(dirname "$DOCKER_COMPOSE_FILE")
ADDR=$3

if [ "$RUN" == "mongod" ]; then
    MONGO_CONFIG="./config/mongod.conf"
else
    MONGO_CONFIG="./config/mongos.conf"
fi

# create the config file in the config folder
mkdir -p "$DOCKER_COMPOSE_DIR/$DOCKER_NAME/config" "$DOCKER_COMPOSE_DIR/$DOCKER_NAME/db" "$DOCKER_COMPOSE_DIR/$DOCKER_NAME/logs"
echo "Creating config file at $DOCKER_COMPOSE_DIR/$DOCKER_NAME/config/mongod.conf"
cp $MONGO_CONFIG "$DOCKER_COMPOSE_DIR/$DOCKER_NAME/config/mongod.conf"
touch "$DOCKER_COMPOSE_DIR/$DOCKER_NAME/logs/mongo.log"

if [ $? -ne 0 ]; then
  echo "Failed to create config file"
  exit 1
fi

# add new entry to the docker-compose file
echo "Adding new entry to $DOCKER_COMPOSE_FILE"
cat <<EOL >> "$DOCKER_COMPOSE_FILE"
 
  $DOCKER_NAME:
    image: mongo
    container_name: $DOCKER_NAME
    hostname: $DOCKER_NAME
    privileged: true
    ports:
      - "27017"
    volumes:
      - ./$DOCKER_NAME:/mnt/data
    command: $RUN --config /mnt/data/config/mongod.conf
    networks:
      internet-access:
        ipv4_address: 10.0.0.$ADDR
EOL