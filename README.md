# SampleTest

A minimal Node.js + Express website that shows random rows from a local PostgreSQL database.

## Run

1. Start Postgres (creates the empty `quotes` table from `db/init.sql` on first start):

   ```sh
   docker compose up -d
   ```

2. Install dependencies and start the web server:

   ```sh
   npm install
   npm start
   ```

   The server seeds the database automatically on every start/deploy (`db/seed.js`): it creates the `quotes` table if missing and inserts quotes until there are at least 10 rows. It is idempotent and never deletes data.

3. Open http://localhost:3000 — three random quotes are shown; click **Shuffle** for more.

## Configuration

- `DATABASE_URL` — defaults to `postgres://app:app@localhost:5432/sampledb`
- `PORT` — defaults to `3000`

Using an existing Postgres instead of Docker? Create the database; the server creates and seeds the table on start:

```sh
createdb sampledb
DATABASE_URL=postgres://user:pass@localhost:5432/sampledb npm start
```
