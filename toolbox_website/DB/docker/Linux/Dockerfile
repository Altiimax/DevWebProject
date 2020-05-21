FROM postgres:12.3

COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./postgresapp.sql.gz .