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

/*
export interface Entry {
  first_name: string,
  last_name: string,
  tin: string,
  gender: 'M' | 'F',
  birth_date: string,
  birth_place: string,
  club: string,
  email: string,
  phone_number: string,
}
  
export interface Entry {
  id: number;
  order_item_id: number;
  item_id: number;
  event_id: string;

  first_name: string;
  last_name: string;
  tin: string;
  gender: '' | 'M' | 'F';
  birth_date: string,
  birth_place: string,

  fidal_card: string;
  country: string;
  bib_number: smallint;
  
  club: string,
  email: string,
  phone_number: string,
}
*/
export type EntryForm = Pick<
  Entry,
  | 'first_name'
  | 'last_name'
  | 'tin'
  | 'gender'
  | 'birth_date'
  | 'birth_place'
  | 'club'
  | 'email'
  | 'phone_number'
>





