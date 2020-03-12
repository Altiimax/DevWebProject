#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER"  <<-EOSQL
    CREATE USER admin WITH LOGIN PASSWORD 'devweb2';
    CREATE DATABASE toolbox_db;
    GRANT ALL PRIVILEGES ON DATABASE toolbox_db TO admin;
EOSQL
