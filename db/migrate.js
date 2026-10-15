const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Applies db/init.sql. Safe to run more than once: the table is created only
// if missing and the seed rows are inserted only into an empty table.
async function migrate() {
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL || 'postgres://app:app@localhost:5432/sampledb',
  });
  await client.connect();
  try {
    await client.query(fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8'));
    const { rows } = await client.query('SELECT COUNT(*)::int AS n FROM quotes');
    console.log(`Migration complete: quotes table has ${rows[0].n} rows`);
  } finally {
    await client.end();
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
