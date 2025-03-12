export interface Event {
  id: string;
  category: 'race' | 'race-series' | 'food' | 'award-ceremony'; // 'carnet' 
  name: string;
  edition: number;
  date: string;
  promoter_id: text;
  capacity: number;
  status: EventStatus;
  detail: Partial<EventDetail> | null;
  summary: string | null;
  summary_image: string | null;
  description: string | null;
  body: string | null;
  flyer: string | null;
  regulation: string | null;
  attachments?: Attachment[];
  promoter?: { id: string, name: string; stripe_account: string; };
  items?: Item[];
  closing_date?: string;
}

export type EventStatus = 'internal' | 'published' | 'scheduled' | 'cancelled' | 'postponed' | 'stockout';

/**
 * internal - evento creato ma non visibile in alcun modo
 * published - evento visibile solo con link diretto
 * scheduled - evento visibile anche da home page (events widget)
 * cancelled
 * postponed
 * stockout
 */

export interface EventDetail {
  distance: number;
  elevationGain: number;
  startLine: string;
  finishLine: string;
  location?: string;
}

//
export interface Attachment {
  id: number;
  event_id: string;
  type: EventLinkType;
  name: string;
  url: string;
}

export type EventLinkType = 'result' | 'photo' | 'video' | 'article' | 'link';
