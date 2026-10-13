-- Schema only; rows are seeded by db/seed.js when the server starts.
CREATE TABLE IF NOT EXISTS quotes (
  id     SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  text   TEXT NOT NULL,
  UNIQUE (author, text)
);
