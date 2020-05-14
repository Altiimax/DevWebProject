FROM postgres:latest

COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./postgresapp.sql.gz .