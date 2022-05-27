#!/bin/sh
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
docker compose -f docker-compose.yml build
