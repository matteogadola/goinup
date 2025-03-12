'use server'

import { createClient } from "@utils/supabase/server";
import { Order, OrderItem } from '@d/orders'

export const getOrders = async () => {
  const supabase = await createClient()
  const { data } = await supabase.from('orders').select().returns<any[]>();
  return data;
};

export const getOrder = async (id: number) => {
  const supabase = await createClient()
  const { data } = await supabase.from('orders').select().eq('id', id).returns<Order[]>().single();

  if (data !== null) {
    const { data: items } = await supabase.from('order_items').select().eq('order_id', id).returns<OrderItem[]>();
    data.items = items ?? [];
  }

  return data;
};

export const updateOrder = async (id: number, params: Partial<any>) => {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('orders').update(params).eq('id', id);

    if (error) {
      console.warn(`[updateOrder] error: ${error.message}`);
      throw new Error(error.message);
    }

    const { data: lolle, error: errorDue } = await supabase.from('order_items').update(params).eq('order_id', id);

    if (errorDue) {
      console.warn(`[updateOrder] error: ${errorDue.message}`);
      throw new Error(errorDue.message);
    }

    return data;
  } catch (e: any) {
    console.warn(`[updateOrder] exception: ${e.message}`);
    throw e;
  }
};