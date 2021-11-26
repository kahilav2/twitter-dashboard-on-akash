#!/usr/bin/env bash

if [ -z "$TWITTER_KEY" ]; then
  echo "[ERR] TWITTER_KEY not defined"
  exit 1
fi

if [ -z "$TWITTER_IDS" ]; then
  echo "[ERR] TWITTER_IDS not defined"
  exit 1
fi

if [ -n "$DATABASE_URL" ]; then
  wget --no-check-certificate -O ./api/database.db $DATABASE_URL 
  echo "Database retrieved"
fi

echo "[DEBUG] Trying to build"

APP_NODE_ENV=production
USES_HTTPS=true

echo "APP_NODE_ENV: $APP_NODE_ENV"
echo "USES_HTTPS: $USES_HTTPS"

npm run build

echo "[DEBUG] Build complete"

npm run start