#!/usr/bin/env bash

export FAMILY_LOGS_PORT=$(jq -r '.port' env.json)
export LOGFILE_PATH=$(jq -r '.logs_location' env.json)

docker compose up --build -d
docker compose logs -f > family-logs.log 2>&1 &
