FROM tobi312/rpi-postgresql

COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./postgresapp.sql.gz .