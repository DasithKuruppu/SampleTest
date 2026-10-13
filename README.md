# SampleTest

A minimal Node.js + Express website that shows random rows from a local PostgreSQL database.

## Run

1. Start Postgres (creates the `quotes` table from `db/init.sql` on first start):

   ```sh
   docker compose up -d
   ```

2. Install dependencies and start the web server:

   ```sh
   npm install
   npm start
   ```

3. Open http://localhost:3000 — three random quotes are shown; click **Shuffle** for more.

## Seeding

On every start or deploy, `npm start` runs `db/seed.js` first. It creates the `quotes` table if missing and inserts seed quotes until the table has at least 10 rows. It is idempotent and never deletes data. If seeding fails, the server exits.

## Configuration

- `DATABASE_URL` — defaults to `postgres://app:app@localhost:5432/sampledb`
- `PORT` — defaults to `3000`

Using an existing Postgres instead of Docker? Create the database; seeding happens automatically on start:

```sh
createdb sampledb
DATABASE_URL=postgres://user:pass@localhost:5432/sampledb npm start
```
