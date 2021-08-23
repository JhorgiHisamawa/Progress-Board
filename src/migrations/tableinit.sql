
--check if todos table is existed and enum of status is existed
DROP TABLE IF EXISTS todos;
DROP TYPE IF EXISTS status_t;

--create type of enum first
CREATE TYPE status_t as enum('todo','on progress','done');

-- create table if todos table is not existed
CREATE TABLE todos ( id  serial NOT NULL, name varchar(100)  NOT NULL, description text NOT NULL, status status_t, createdAt TIMESTAMP DEFAULT NOW(), updatedAt TIMESTAMP DEFAULT NOW(),  CONSTRAINT todos_pkey PRIMARY KEY (id));
