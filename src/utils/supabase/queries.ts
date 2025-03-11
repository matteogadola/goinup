import { createClient } from './server'
import clubs from '../data/names.json'
import { Order, OrderItem } from '@d/orders'

const supabase = await createClient()

export const getUpcomingEvents = async () => {
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('events')
    .select(`
      *,
      promoter:promoters (id, name, stripe_account),
      items (*)`
    )
    .neq('status', 'internal')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(3)
    .returns<Event[]>()

  return data ?? [];

  //return client.fetch(`*[_type == "event" && status != "internal" && date >= "${today}"] | order(date) [0...2]`)
}

export const getOrders = async () => {
  const { data } = await supabase.from('orders').select().returns<any[]>();
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

export const updateOrder = async (id: number, params: Partial<any>) => {
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

export const getClubs = (): string[] => {
  return clubs
}
