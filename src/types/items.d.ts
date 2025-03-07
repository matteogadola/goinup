export interface Item {
  id: number;
  event_id: string;
  name: string;
  category: string;
  summary: string | null;
  description: string | null;
  detail: any;
  price: number;
  stock: number;
  status: ItemStatus;
  options?: Partial<ItemOptions> | null;
}

export type ItemStatus = 'hidden' | 'internal' | 'published' | 'cancelled' | 'stockout';
/**
 * hidden - non visibile da nessuna parte
 * internal - visibile solo in ambiente amministrativo
 * published
 * cancelled
 * stockout
 */

export interface ItemOptions {
  isFidalCardRequested: boolean;
}
