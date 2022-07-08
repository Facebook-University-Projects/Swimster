\echo 'Delete and recreate swimster db?'
\prompt 'Return for yes or ctrl-C to cancel > ' answer

DROP DATABASE swimster;
CREATE DATABASE swimster;
\connect swimster;

\i swimster-schema.sql
