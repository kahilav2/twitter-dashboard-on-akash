#!/usr/bin/env bash

if [ -z "$TWITTER_KEY" ]; then
  echo "[ERR] TWITTER_KEY not defined"
  exit 1
fi
echo "[OK] TWITTER_KEY defined"

if [ -z "$DATABASE_URL" ]; then
  echo "[ERR] DATABASE_URL not defined"
  exit 1
fi
echo "[OK] DATABASE_URL defined"

wget --no-check-certificate -O ./api/database.db $DATABASE_URL 
