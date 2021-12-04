#!/usr/bin/env bash

if [ -z "$TWITTER_KEY" ]; then
  echo "[ERR] TWITTER_KEY not defined"
  exit 1
fi

if [ -n "$DATABASE_URL" ]; then
  wget --no-check-certificate -O ./api/database.db $DATABASE_URL 
  echo "Database retrieved"
fi

npm run start