# SampleTest

A minimal Node.js + Express website that shows random rows from a local PostgreSQL database.

## Run

1. Start Postgres (creates the `quotes` table and seeds it from `db/init.sql` on first start):

   ```sh
   docker compose up -d
   ```

2. Install dependencies and start the web server:

   ```sh
   npm install
   npm start
   ```

3. Open http://localhost:3000 — three random quotes are shown; click **Shuffle** for more.

## Configuration

- `DATABASE_URL` — defaults to `postgres://app:app@localhost:5432/sampledb`
- `PORT` — defaults to `3000`

Using an existing Postgres instead of Docker? Create the database and run the migration:

```sh
createdb sampledb
DATABASE_URL=postgres://user:pass@localhost:5432/sampledb npm run migrate
DATABASE_URL=postgres://user:pass@localhost:5432/sampledb npm start
```

`npm run migrate` applies `db/init.sql` and is safe to run repeatedly. Hosting platforms that look for a `migrate` script (such as Roar AI Cloud) will pick it up automatically.
