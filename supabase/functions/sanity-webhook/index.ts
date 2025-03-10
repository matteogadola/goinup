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
            INSERT INTO events (id, name, slug, date, type, status, summary, summary_image, flyer, capacity, details)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, slug=$3, date=$4, type=$5, status=$6, summary=$7, summary_image=$8, flyer=$9, capacity=$10, details=$11`,
            [
              body._id,
              body.name,
              body.slug.current,
              body.date,
              body.type,
              body.status,
              body.summary,
              body.summary_image?.asset?._ref,
              body.flyer?.asset?._ref,
              body.capacity,
              body.details,
            ]
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
                [body._id, product._id]
              );
            }
          }

          // ci sarebbe anche items/bliglietti/sarcazzo...
          break;
        case 'product':
          await connection.queryObject(`
            INSERT INTO products (id, name, type, status, price, stock, summary, description, start_sale_date, end_sale_date, entry_form, payment_methods)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            ON CONFLICT (id) DO UPDATE
            SET name=$2, type=$3, status=$4, price=$5, stock=$6, summary=$7, description=$8, start_sale_date=$9, end_sale_date=$10, entry_form=$11, payment_methods=$12`,
            [
              body._id,
              body.name,
              body.type,
              body.status,
              body.price,
              body.stock,
              body.summary,
              body.description,
              body.start_sale_date,
              body.end_sale_date,
              body.entry_form._ref,
              JSON.stringify(body.payment_methods),
            ]
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
