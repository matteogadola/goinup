//import 'server-only';
import { Order, OrderItem } from '@/types/orders';
import { pool } from './pg';
import { dt } from './date';
import { Event } from '@/types/events';
import { Entry } from '@/types/entries';
import supabase from './supabase';
import { calcStripeTax, capitalize, verifyTin } from './helpers';
import { cache } from 'react';
import { getEvent } from './events';
import { Promoter } from '@/types/promoters';

export const getOrders = async () => {
  const { data } = await supabase.from('orders').select().returns<Order[]>();
  return data;
};

export const getOrder = async (id: number) => {
  const { data } = await supabase.from('orders').select().eq('id', id).returns<Order[]>().single();

  if (data !== null) {
    const { data: items } = await supabase.from('order_items').select().eq('order_id', id).returns<OrderItem[]>();
    data.items = items ?? [];
  }

  return data;
};

export const createOrder = async (params: Partial<Order>) => {
  if (params?.items === undefined || params.items.length === 0) {
    throw new Error('Il carrello non può essere vuoto');
  }

  const carnetItems = [
    { id: 1023, event_id: 'cech-up-3' },
    { id: 1024, event_id: 'riscio-up-2' },
    { id: 1025, event_id: 'larg-up-6' },
    { id: 1026, event_id: 'lave-nsu-5' },
    { id: 1027, event_id: 'vertical-madonnina-1' },
    { id: 1028, event_id: 'vertical-lino-5' },
    { id: 1029, event_id: 'kurt-up-5' },
    { id: 1030, event_id: 'sostila-vertical-2' },
    { id: 1031, event_id: 'colmen-vertical-10' },
    { id: 1032, event_id: 'san-giorgio-vertical-2-2024' },
    { id: 1033, event_id: 'arz-up-8' },
    { id: 1035, event_id: 'mirtillo-sprint-1' },
  ];

  const client = await pool.connect();
  const orderItems: OrderItem[] = [];
  const entries: any[] = [];

  try {
    // "verifico" il prezzo lato server
    for (let item of params.items) {
      const { rows: items } = await client.query<{ name: string; price: number; status: string }>(
        'SELECT name, price, status FROM items WHERE id = $1',
        [item.id]
      );

      if (items.length === 0 || items[0]?.price !== item.price || items[0]?.name !== item.name) {
        if (items[0]?.status !== undefined && items[0]?.status !== 'published') {
          console.warn(`[createOrder] item non abilitato: ${JSON.stringify(params.items)}`);
          throw new Error(`Iscrizione non disponibile`);
        }
        console.warn(`[createOrder] errore nella richiesta: ${JSON.stringify(params.items)}`);
        throw new Error('Errore nella richiesta');
      }
    }

    await client.query('BEGIN');

    const event = await getEvent(params.items[0].event_id!);
    
    if (!!event?.date) {
      const closingDate = !!event.closing_date ? dt(event.closing_date) : dt(event.date).subtract(45, 'hours').subtract(45, 'minutes');
      if (dt().isAfter(closingDate)) {
        console.warn(`[createOrder] iscrizioni chiuse: ${JSON.stringify(params.items)}`);
        throw new Error(`Iscrizioni chiuse. Potrai iscriverti alla partenza`);
      }
    }

    const order = await client.query<Omit<Order, 'items'>>(
      `INSERT INTO orders (user_id, user_email, customer_first_name, customer_last_name, amount, date, payment_method, payment_status, promoter_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        params.user_id ?? null,
        params.user_email,
        params.customer_first_name,
        params.customer_last_name,
        params.items!.reduce((a, c) => a + c.price, 0),
        dt().utc().format(),
        params.payment_method,
        params.payment_method === 'stripe' ? 'intent' : 'pending',
        event?.promoter?.id,
      ]
    ).then(res => res.rows.shift()!);
    console.debug(`[createOrder] order: ${JSON.stringify(order)}`);

    for (let item of params.items) {
      if (item?.description) {
        item.description = capitalize(item.description);
      }

      const { rows: orderItemRows } = await client.query(
        `INSERT INTO order_items (order_id, item_id, name, price, quantity, description)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [order.id, item.id, item.name, item.price, item.quantity, item?.description]
      );
      const orderItem = orderItemRows[0];
      orderItems.push({ ...orderItem, event_id: item.event_id });
      //orderItems.push(orderItem);

      // tarrozzata, poi rimarrà questa senza la seconda clausola
      if (item?.entry && item.id !== 1022) {
        item.entry.first_name = capitalize(item.entry.first_name);
        item.entry.last_name = capitalize(item.entry.last_name);
        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

        if (item.entry.team) {
          item.entry.team = item.entry.team.trim();
        }

        const { rows: entrieRows } = await client.query<Entry>(
          `INSERT INTO entries (order_item_id, order_id, item_id, event_id, first_name, last_name, birth_date, birth_place,
          gender, country, team, email, phone_number, tin, fidal_card)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT ON CONSTRAINT entries_unique
          DO UPDATE SET order_item_id = excluded.order_item_id, order_id = excluded.order_id, item_id = excluded.item_id,
          first_name = excluded.first_name, last_name = excluded.last_name, birth_date = excluded.birth_date,
          birth_place = excluded.birth_place, gender = excluded.gender, country = excluded.country, team = excluded.team,
          email = excluded.email, phone_number = excluded.phone_number, fidal_card = excluded.fidal_card
          WHERE entries.event_id = excluded.event_id AND entries.tin = excluded.tin`,
          [
            orderItem.id,
            order.id,
            item.id,
            item.event_id,
            item.entry.first_name,
            item.entry.last_name,
            item.entry.birth_date ??
            `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
            item.entry.birth_place ?? cf.birthplace.nome,
            item.entry.gender ?? cf.gender,
            item.entry.country ?? 'ITA',
            item.entry.team,
            item.entry.email,
            item.entry.phone_number,
            item.entry.tin,
            item.entry.fidal_card,
          ]
        );

        entries.push({
          order_item_id: orderItem.id,
          order_id: order.id,
          item_id: item.id,
          event_id: item.event_id,
          first_name: item.entry.first_name,
          last_name: item.entry.last_name,
          birth_date:
            item.entry.birth_date ??
            `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
          birth_place: item.entry.birth_place ?? cf.birthplace.nome,
          gender: item.entry.gender ?? cf.gender,
          country: item.entry.country,
          team: item.entry.team,
          email: item.entry.email,
          phone_number: item.entry.phone_number,
          tin: item.entry.tin,
          fidal_card: item.entry.fidal_card,
        });
      }

      // tarrozzata !
      if (item?.entry && item.id === 1022) {
        item.entry.first_name = capitalize(item.entry.first_name);
        item.entry.last_name = capitalize(item.entry.last_name);
        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

        if (item.entry.team) {
          item.entry.team = item.entry.team.trim();
        }

        for (let row of carnetItems) {
          /*
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = $1, item_id = $2, first_name = $4, last_name = $5,
            birth_date = $6, birth_place = $7, gender = $8, country = $9, team = $10, email = $11, phone_number = $12
            WHERE entries.event_id = $3 AND entries.tin = $13*/
          const { rows: entrieRows } = await client.query<Entry>(
            `INSERT INTO entries (order_item_id, order_id, item_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = excluded.order_item_id, order_id = excluded.order_id, item_id = excluded.item_id,
            first_name = excluded.first_name, last_name = excluded.last_name, birth_date = excluded.birth_date,
            birth_place = excluded.birth_place, gender = excluded.gender, country = excluded.country, team = excluded.team,
            email = excluded.email, phone_number = excluded.phone_number
            WHERE entries.event_id = excluded.event_id AND entries.tin = excluded.tin`,
            [
              orderItem.id,
              order.id,
              row.id,
              row.event_id,
              item.entry.first_name,
              item.entry.last_name,
              item.entry.birth_date ??
              `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
              item.entry.birth_place ?? cf.birthplace.nome,
              item.entry.gender ?? cf.gender,
              item.entry.country,
              item.entry.team,
              item.entry.email,
              item.entry.phone_number,
              item.entry.tin,
            ]
          );

          //orderItems[count - 1].entry = entrieRows[0];
          entries.push({
            order_item_id: orderItem.id,
            order_id: order.id,
            item_id: row.id,
            event_id: row.event_id,
            first_name: item.entry.first_name,
            last_name: item.entry.last_name,
            birth_date:
              item.entry.birth_date ??
              `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
            birth_place: item.entry.birth_place ?? cf.birthplace.nome,
            gender: item.entry.gender ?? cf.gender,
            country: item.entry.country,
            team: item.entry.team,
            email: item.entry.email,
            phone_number: item.entry.phone_number,
            tin: item.entry.tin,
          });
        }
      }
    }

    // add tax
    if (params.payment_method === 'stripe') {
      const tax = calcStripeTax(params.items);

      const { rows: orderItemTaxRows } = await client.query(
        `INSERT INTO order_items (order_id, name, price)
        VALUES($1, $2, $3) RETURNING *`,
        [order.id, 'Commissioni di servizio', tax]
      );
      const orderItemTax = orderItemTaxRows[0];
      orderItems.push(orderItemTax);
    }

    /*if (process.env.NODE_ENV === 'production') {
      await db.runTransaction(async (t) => {
        t.set(db.collection('orders').doc(order.id.toString()), { ...order, items: orderItems });

        for (let item of entries) {
          t.set(db.collection('events').doc(item.event_id).collection('entries').doc(item.tin), item);
        }
      });
    }*/

    await client.query('COMMIT');
    return { ...order, items: orderItems };
  } catch (e: any) {
    await client.query('ROLLBACK');
    console.warn(`[createOrder] Errore ${e.code}: ${e.message}`);

    if (e.code === '23505') {
      if (e.constraint === 'entries_unique') {
        console.warn(`[createOrder] non dovrebbe più capitare: ${JSON.stringify(e.message)}`);
        const lastEntry = orderItems.pop();
        throw new Error(`${lastEntry?.description} risulta già iscritto`);
      }
    }

    throw new Error(e.message);

    /*if (e.code) {
      throw new Error(`Errore interno ${e.code}`);
    } else {
      throw e;
    }*/
  } finally {
    client.release();
  }
};

export const updateOrder = async (id: number, params: Partial<Order>) => {
  try {
    const { data, error } = await supabase.from('orders').update(params).eq('id', id);

    if (error) {
      console.warn(`[updateOrder] error: ${error.message}`);
      throw new Error(error.message);
    }

    return data;
  } catch (e: any) {
    console.warn(`[updateOrder] exception: ${e.message}`);
    throw e;
  }
};
