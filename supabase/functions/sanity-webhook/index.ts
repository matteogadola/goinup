/**
 * viene invocata da sanity.io
 */
import { Hono } from 'jsr:@hono/hono'
import * as postgres from 'https://deno.land/x/postgres@v0.19.3/mod.ts'

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseUrl = Deno.env.get('SUPABASE_DB_URL')!

const app = new Hono()
const pool = new postgres.Pool(databaseUrl, 3, true)

app.post('/sanity-webhook', async (c) => {
  const body = await c.req.json()

  try {
    const connection = await pool.connect()

    try {
      switch(body._type) {
        case 'event':
          await connection.queryObject(`
            INSERT INTO events (id, name, slug, date, type, serie, status, summary_image, flyer, capacity, details, opening_date, closing_date, payment_methods)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, date=$4, type=$5, serie=$6, status=$7, summary_image=$8, flyer=$9, capacity=$10, details=$11, opening_date=$12, closing_date=$13, payment_methods=$14`,
            [body._id, body.name, body.slug.current, body.date, body.type, body.serie._ref, body.status, body.summary_image?.asset?._ref, body.flyer?.asset?._ref, body.capacity, body.details, body.opening_date, body.closing_date, JSON.stringify(body.payment_methods)]
          );

          // ci sarebbe anche items/bliglietti/sarcazzo...
          break;
        case 'serie':
          await connection.queryObject(`
            INSERT INTO series (id, name, slug, date, status, summary_image, flyer, opening_date, closing_date, payment_methods)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, date=$4, status=$5, summary_image=$6, flyer=$7, opening_date=$8, closing_date=$9, payment_methods=$10`,
            [body._id, body.name, body.slug.current, body.date, body.status, body.summary_image?.asset?._ref, body.flyer?.asset?._ref, body.opening_date, body.closing_date, JSON.stringify(body.payment_methods)]
          );
          break;
      }

      return new Response('', {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
    } finally {
      connection.release()
    }
  } catch (err) {
    console.error(err)
    return new Response(String(err?.message ?? err), { status: 500 })
  }
});

Deno.serve(app.fetch);
