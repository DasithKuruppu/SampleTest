const express = require('express');
const { Pool } = require('pg');
const { seed } = require('./db/seed');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://app:app@localhost:5432/sampledb',
});

const app = express();
app.use(express.static('public'));

app.get('/api/random', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, author, text FROM quotes ORDER BY random() LIMIT 3'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const port = process.env.PORT || 3000;

seed(pool)
  .then((n) => {
    console.log(`DB seed complete (${n} rows inserted)`);
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('DB seed failed', err);
    process.exit(1);
  });
