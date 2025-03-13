import type { Entry } from './entries';
import { Promoter } from './promoters';

export interface Order {
  id: number;
  user_id?: string | null;
  customer_email: string;
  customer_first_name?: string;
  customer_last_name?: string;
  date: string;
  status: string;
  notification_id: string | null,
  notification_date: string | null;
  notification_status: string | null;
  payment_id: string | null;
  payment_date: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  items: OrderItem[];
  promoter_id?: string; // ???
}

export type OrderStatus = 'created' | 'cancelled' | 'error' | 'confirmed';

export type PaymentMethod = 'stripe' | 'sepa' | 'cash' | 'on-site';
export type PaymentStatus = 'intent' | 'pending' | 'awaiting' | 'paid' | 'failed';

export interface OrderItem {
  id: number;
  order_id?: number;
  event_id?: string; // ???
  name: string;
  quantity: number;
  price: number; //
  description?: string | null;
  entry?: Entry;
}
