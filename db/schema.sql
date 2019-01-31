
-- DROP DATABASE IF EXISTS burgers_db;
-- CREATE DATABASE burgers_db;
-- use burgers_db;

--  * **id**: an auto incrementing int that serves as the primary key.
--  * **burger_name**: a string.
--  * **devoured**: a boolean.
CREATE TABLE burgers (
  id smallserial PRIMARY KEY,
  burger_name VARCHAR(255) NOT NULL,
  devoured BOOLEAN DEFAULT false
);