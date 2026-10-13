CREATE TABLE IF NOT EXISTS quotes (
  id     SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  text   TEXT NOT NULL,
  UNIQUE (author, text)
);
