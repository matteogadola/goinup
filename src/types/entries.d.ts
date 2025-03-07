export interface Entry {
  id: number;
  order_item_id: number;
  item_id: number;
  event_id: string;
  first_name: string;
  last_name: string;
  tin: string;
  email: string;
  phone_number: string;
  team: string | null;
  fidal_card: string | null;
  country: string;
  birth_place: string | null;
  birth_date: string;
  birth_year?: number;
  gender: 'M' | 'F';
  bib_number: smallint;
}

export type PartialEntry = Pick<
  Entry,
  | 'event_id'
  | 'first_name'
  | 'last_name'
  | 'birth_year'
  | 'gender'
  | 'team'
>