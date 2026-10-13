const MIN_ROWS = 10;

const SEED_QUOTES = [
  ['Grace Hopper', 'The most dangerous phrase in the language is, "We\'ve always done it this way."'],
  ['Alan Kay', 'The best way to predict the future is to invent it.'],
  ['Donald Knuth', 'Premature optimization is the root of all evil.'],
  ['Edsger Dijkstra', 'Simplicity is prerequisite for reliability.'],
  ['Linus Torvalds', 'Talk is cheap. Show me the code.'],
  ['Ada Lovelace', 'The more I study, the more insatiable do I feel my genius for it to be.'],
  ['Brian Kernighan', 'Debugging is twice as hard as writing the code in the first place.'],
  ['Margaret Hamilton', 'There was no choice but to be pioneers.'],
  ['Alan Turing', 'We can only see a short distance ahead, but we can see plenty there that needs to be done.'],
  ['Barbara Liskov', 'Programs must be written for people to read, and only incidentally for machines to execute.'],
  ['Ken Thompson', 'When in doubt, use brute force.'],
  ['Tony Hoare', 'Inside every large program is a small program struggling to get out.'],
];

// Creates the schema if needed and tops quotes up to MIN_ROWS. Idempotent; never deletes.
async function seed(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS quotes (
      id     SERIAL PRIMARY KEY,
      author TEXT NOT NULL,
      text   TEXT NOT NULL,
      UNIQUE (author, text)
    )`);

  const { rows } = await pool.query('SELECT count(*)::int AS n FROM quotes');
  const missing = MIN_ROWS - rows[0].n;

  let inserted = 0;
  for (const [author, text] of SEED_QUOTES) {
    if (inserted >= missing) break;
    const res = await pool.query(
      'INSERT INTO quotes (author, text) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [author, text]
    );
    inserted += res.rowCount;
  }
  return inserted;
}

module.exports = { seed, MIN_ROWS };
