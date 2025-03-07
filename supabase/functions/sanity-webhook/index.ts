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
            INSERT INTO events (id, name, slug, date, type, serie, status, summary_image, flyer, capacity, details, opening_date, closing_date, entry_type, payment_methods)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, date=$4, type=$5, serie=$6, status=$7, summary_image=$8, flyer=$9, capacity=$10, details=$11, opening_date=$12, closing_date=$13, entry_type=$14, payment_methods=$15`,
            [body._id, body.name, body.slug.current, body.date, body.type, body.serie._ref, body.status, body.summary_image?.asset?._ref, body.flyer?.asset?._ref, body.capacity, body.details, body.opening_date, body.closing_date, body.entry_type, JSON.stringify(body.payment_methods)]
          );

          await connection.queryObject(`
            DELETE FROM events_products
            WHERE event_id = $1`,
            [body._id]
          );

          if (body.products) {
            for (const product of body.products) {
              await connection.queryObject(`
                INSERT INTO events_products (event_id, product_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`,
                [body._id, product._ref]
              );
            }
          }

          // ci sarebbe anche items/bliglietti/sarcazzo...
          break;
        case 'serie':
          await connection.queryObject(`
            INSERT INTO series (id, name, slug, start_date, end_date, status, summary_image, flyer, opening_date, closing_date, payment_methods)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, start_date=$4, end_date=$5, status=$6, summary_image=$7, flyer=$8, opening_date=$9, closing_date=$10, payment_methods=$11`,
            [body._id, body.name, body.slug.current, body.start_date, body.end_date, body.status, body.summary_image?.asset?._ref, body.flyer?.asset?._ref, body.opening_date, body.closing_date, JSON.stringify(body.payment_methods)]
          );
          break;
        case 'product':
          await connection.queryObject(`
            INSERT INTO products (id, name, slug, type, status, price, stock, summary, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, type=$4, status=$5, price=$6, stock=$7, summary=$8, description=$9`,
            [body._id, body.name, body.slug.current, body.type, body.status, body.price, body.stock, body.summary, body.description]
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
