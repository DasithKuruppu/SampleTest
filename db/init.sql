CREATE TABLE IF NOT EXISTS quotes (
  id     SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  text   TEXT NOT NULL
);

-- Seed only an empty table, so running this again doesn't duplicate rows.
INSERT INTO quotes (author, text)
SELECT author, text FROM (VALUES
  ('Grace Hopper', 'The most dangerous phrase in the language is, "We''ve always done it this way."'),
  ('Alan Kay', 'The best way to predict the future is to invent it.'),
  ('Donald Knuth', 'Premature optimization is the root of all evil.'),
  ('Edsger Dijkstra', 'Simplicity is prerequisite for reliability.'),
  ('Linus Torvalds', 'Talk is cheap. Show me the code.'),
  ('Ada Lovelace', 'The more I study, the more insatiable do I feel my genius for it to be.'),
  ('Brian Kernighan', 'Debugging is twice as hard as writing the code in the first place.'),
  ('Margaret Hamilton', 'There was no choice but to be pioneers.')
) AS seed(author, text)
WHERE NOT EXISTS (SELECT 1 FROM quotes);
