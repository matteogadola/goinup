import { Hono } from 'jsr:@hono/hono'
import * as postgres from 'https://deno.land/x/postgres/mod.ts'
import dayjs from 'npm:dayjs@1.11.7'
import CodiceFiscale from 'npm:codice-fiscale-js@2.3.22'
//import { HTTPException } from 'jsr:@hono/hono/http-exception'
import { createClient, FunctionsHttpError } from 'jsr:@supabase/supabase-js@2'

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseUrl = Deno.env.get('SUPABASE_DB_URL')!

const app = new Hono()
const pool = new postgres.Pool(databaseUrl, 3, true)

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);


app.get('/orders', async (c) => {
  const req: any = await c.req.json()

  if (!req.order_id) {
    return c.json({ message: 'manca order_id' }, { status: 500})
  }

  try {
    const client = await pool.connect();

    try {
      const { rows } = await client.queryObject(
        `SELECT * FROM orders WHERE id = $1`,
        [
          req.order_id,
        ]
      )
    const order = rows[0]
    console.debug(`[createOrder] order: ${JSON.stringify(order)}`);


    for (const item of items) {
      const { rows } = await client.queryObject(
        `INSERT INTO order_items (order_id, user_id, event_id, product_id, name, description, price, quantity, payment_method, payment_status)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          order.id,
          req.user_id || null,
          item.event_id,
          item.product_id,
          item.name,
          item.description,
          item.price,
          item.quantity,
          order.payment_method,
          order.payment_status,
        ]
      )
      const orderItem = rows[0]
      orderItems.push(orderItem);

      if (item?.entry && Object.keys(item.entry).length) {
        const productItems = (item.product_type === 'carnet' || item.product_id === '6561bc35-0ee0-4c25-a515-e50b43d1c95c')
          ? carnetItems
          : [{ product_id: item.product_id, event_id: item.event_id }]

        for (const row of productItems) {
          await client.queryObject(
            `INSERT INTO entries (order_item_id, order_id, product_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, club, email, phone_number, tin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = excluded.order_item_id, order_id = excluded.order_id, product_id = excluded.product_id,
            first_name = excluded.first_name, last_name = excluded.last_name, birth_date = excluded.birth_date,
            birth_place = excluded.birth_place, gender = excluded.gender, country = excluded.country, club = excluded.club,
            email = excluded.email, phone_number = excluded.phone_number
            WHERE entries.event_id = excluded.event_id AND entries.tin = excluded.tin`,
            [
              orderItem.id,
              order.id,
              row.product_id,
              row.event_id,
              item.entry.first_name,
              item.entry.last_name,
              item.entry.birth_date,
              item.entry.birth_place,
              item.entry.gender,
              item.entry.country,
              item.entry.club,
              item.entry.email,
              item.entry.phone_number,
              item.entry.tin,
            ]
          );
        }
      }
    }

    await client.queryObject('COMMIT');
    return c.json({ ...order, items: orderItems })
  } catch (e: any) {
    await client.queryObject('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
} catch (e: any) {
  console.warn(`[createOrder] Errore ${e.code}: ${e.message}`);
  return c.json({ message: e.message }, { status: 500})
}
});

app.post('/orders', async (c) => {
  const req: any = await c.req.json()

  if (!req.items?.length) {
    return c.json({ message: 'Il carrello non può essere vuoto' }, { status: 500})
  }

  const carnetItems = [
    { product_id: '39bc184c-c9e4-4557-9fbb-40907b391b8a', event_id: '6aa979c2-622d-4d06-996a-596568e6e18d' },
    { product_id: '06fc0294-c4f3-4998-ab84-5c72ba6afef2', event_id: 'b56fbb8a-5c49-4811-8bb7-b992c2544303' },
    { product_id: '504e6532-09b6-4b98-9eba-20c067911915', event_id: '241de043-8f32-4d3a-b9ac-b1731fe8ce48' },
    { product_id: 'dec0d443-c380-41f7-acb8-a23e696a296b', event_id: 'dbfdfef0-c7e8-4cb0-9e70-3872cdf15929' },
    { product_id: '2702b42d-1986-4196-9929-e2ae19755f5e', event_id: 'b0061698-9762-4849-8ce0-d907ff1d9743' },
    { product_id: '9e946616-9335-4faa-a66e-0a6344352b2b', event_id: 'c514bdcb-3ef7-4415-b5de-d4ba79aa4d52' },
    { product_id: '461c382b-6f12-4799-862c-7f54730117be', event_id: 'a96a093e-56e5-40ba-be5a-8d978fb562a8' },
    { product_id: '41d92792-d914-4cc6-9337-9f7dcfd5f34d', event_id: 'd1242f0d-acb6-4cc7-a268-e970cd1ac8fe' },
    { product_id: '600d7cce-c9e2-4e89-8a40-9e2bca8b3622', event_id: '751be1a5-9cd9-4bab-94f8-d3d568e56187' },
    { product_id: 'bc265e0f-71b4-48bd-b3b2-35c2eb9727fc', event_id: '5d2b6463-d0ea-44c9-b8ec-fdebd0e8814f' },
    { product_id: '6d769257-7022-468e-a0fd-0a38cf0628c2', event_id: '94134137-72eb-4824-9144-e3ccefda50cb' },
  ];

  const items = [];
  const entries: any[] = [];
  const orderItems: any[] = [];

  try {

    const client = await pool.connect();

  try {
    
    // "verifico" che item non sia manipolato
    for (let item of req.items) {
      const { rows } = await client.queryObject(
        `SELECT * FROM products WHERE id = $1`,
        [item.product_id]
      )

      const product = rows[0]

      if (!product) {
        console.warn(`[createOrder] Prodotto non trovato: ${JSON.stringify(req.items)}`);
        //return c.json({ message: 'Errore nella richiesta' }, { status: 500})
        throw new Error('Prodotto non trovato')
      }

      if (product.status !== 'open') {
        console.warn(`[createOrder] item non abilitato: ${JSON.stringify(req.items)}`);
        //return c.json({ message: 'Iscrizione non disponibile' }, { status: 500})
        throw new Error('Iscrizione non disponibile')
      }

      if (product.end_sale_date && dayjs(product.end_sale_date).isBefore()) {
        console.warn(`[createOrder] end_sale_date passata: ${JSON.stringify(req.items)}`);
        //return c.json({ message: 'Iscrizione non disponibile' }, { status: 500})
        throw new Error('Iscrizione non disponibile')
      }

      if (product.start_sale_date && dayjs(product.start_sale_date).isAfter()) {
        console.warn(`[createOrder] start_sale_date futura: ${JSON.stringify(req.items)}`);
        //return c.json({ message: 'Iscrizione non disponibile' }, { status: 500})
        throw new Error('Iscrizione non disponibile')
      }

      if (product.type === 'carnet') {
        // recupero i sotto biglietti... TODO
      }

      let _item: any = {
        event_id: item.event_id,
        product_id: product.id,
        product_type: item.product_type, // serve? per vedere che è carnet dopo
        name: product.name,
        description: item.description ? capitalize(item.description) : null,
        price: product.price,
        quantity: item.quantity,
      }

      if (item?.entry && Object.keys(item.entry).length) {
        const tin = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

        _item['entry'] = {
          ...item.entry,
          first_name: capitalize(item.entry.first_name),
          last_name: capitalize(item.entry.last_name),
          birth_date: item.entry.birth_date ||
            `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
          birth_place: item.entry.birth_place || tin.birthplace.nome,
          gender: item.entry.gender || tin.gender,
          country: item.entry.country || 'ITA',
          tin: item.entry.tin.toUpperCase(),
          email: item.entry.email.toLowerCase(),
          club: item.entry.club ? item.entry.club.trim().toUpperCase() : null,
        }
      }

      items.push(_item)
    }

    if (req.payment_method === 'stripe') {
      const tax = calcStripeFee(items);
      items.push({ name: 'Commissioni di servizio', price: tax, quantity: 1 })
    }
    const totalAmount = calcTotalAmount(items);
    const orderDate = dayjs().format();

    client.queryObject('BEGIN');

    const { rows } = await client.queryObject(
      `INSERT INTO orders (user_id, date, amount, customer_email, customer_first_name, customer_last_name, payment_method, payment_status)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        req.user_id || null,
        orderDate,
        totalAmount,
        req.customer_email,
        req.customer_first_name,
        req.customer_last_name,
        req.payment_method,
        req.payment_method === 'stripe' ? 'intent' : 'pending',
      ]
    )
    const order = rows[0]
    console.debug(`[createOrder] order: ${JSON.stringify(order)}`);


    for (const item of items) {
      const { rows } = await client.queryObject(
        `INSERT INTO order_items (order_id, user_id, event_id, product_id, name, description, price, quantity, payment_method, payment_status)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          order.id,
          req.user_id || null,
          item.event_id,
          item.product_id,
          item.name,
          item.description,
          item.price,
          item.quantity,
          order.payment_method,
          order.payment_status,
        ]
      )
      const orderItem = rows[0]
      orderItems.push(orderItem);

      if (item?.entry && Object.keys(item.entry).length) {
        const productItems = (item.product_type === 'carnet' || item.product_id === '6561bc35-0ee0-4c25-a515-e50b43d1c95c')
          ? carnetItems
          : [{ product_id: item.product_id, event_id: item.event_id }]

        for (const row of productItems) {
          await client.queryObject(
            `INSERT INTO entries (order_item_id, order_id, product_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, club, email, phone_number, tin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = excluded.order_item_id, order_id = excluded.order_id, product_id = excluded.product_id,
            first_name = excluded.first_name, last_name = excluded.last_name, birth_date = excluded.birth_date,
            birth_place = excluded.birth_place, gender = excluded.gender, country = excluded.country, club = excluded.club,
            email = excluded.email, phone_number = excluded.phone_number
            WHERE entries.event_id = excluded.event_id AND entries.tin = excluded.tin`,
            [
              orderItem.id,
              order.id,
              row.product_id,
              row.event_id,
              item.entry.first_name,
              item.entry.last_name,
              item.entry.birth_date,
              item.entry.birth_place,
              item.entry.gender,
              item.entry.country,
              item.entry.club,
              item.entry.email,
              item.entry.phone_number,
              item.entry.tin,
            ]
          );
        }
      }
    }

    await client.queryObject('COMMIT');
    return c.json({ ...order, items: orderItems })
  } catch (e: any) {
    await client.queryObject('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
} catch (e: any) {
  console.warn(`[createOrder] Errore ${e.code}: ${e.message}`);
  return c.json({ message: e.message }, { status: 500})
}
});

const capitalize = function(input: string) {
  if (!input) return input
  const wordArray = input.trim().replace(/\s\s+/g, ' ').split(' ');
  const output = wordArray.map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`);

  return output.join(' ');
};

const calcTotalAmount = function(items: any[]) {
  return items.reduce((a: any, c: any) => a + (c.price * c.quantity), 0);
};

const calcStripeFee = function(items: any[]) {
  const totalAmount = calcTotalAmount(items);
  const stripeTax = 25 + Math.round(totalAmount * 0.015);
  const stripeTaxIva = Math.round(stripeTax * 0.22);
  return Math.ceil((stripeTax + stripeTaxIva) / 50) * 50;
};

const verifyTin = function(tin: string, firstName: string, lastName: string) {
  try {
    const cf = new CodiceFiscale(tin);

    if (!cf.isValid()) {
      throw new Error(`Codice fiscale ${tin} non valido`);
    }
  
    const checkTin = new CodiceFiscale({
      name: firstName,
      surname: lastName,
      gender: cf.gender,
      day: cf.day,
      month: cf.month,
      year: cf.year,
      birthplace: cf.birthplace.nome,
      birthplaceProvincia: '',
    });
  
    if (checkTin.toString() !== cf.cf) {
      throw new Error(`Corrispondenza codice fiscale non valida`);
    }

    return cf;
  } catch (e: any) {
    throw new Error(`Codice fiscale ${tin} non valido`);
  }
};

Deno.serve(app.fetch);
