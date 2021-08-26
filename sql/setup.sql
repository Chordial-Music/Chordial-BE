DROP TABLE IF EXISTS users, sequences;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE sequences (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sequences text[]
);