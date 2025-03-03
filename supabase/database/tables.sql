CREATE TABLE IF NOT EXISTS series (
  id uuid primary key,
  name text not null,
  slug text not null,
  date timestamp not null,
  status text not null default 'internal',
  summary text,
  summary_image text,
  description text,
  flyer text,
  regulation text,
  opening_date timestamp,
  closing_date timestamp,
  payment_methods json
);

CREATE TABLE IF NOT EXISTS events (
  id text primary key,
  name text not null,
  slug text not null,
  date timestamp not null,
  type text not null,
  serie uuid references series(id),
  status text not null default 'internal',
  summary text,
  summary_image text,
  description text,
  flyer text,
  capacity smallint,
  details jsonb,

  regulation text,
  opening_date timestamp, --opening_selling_date, start_selling_date ???
  closing_date timestamp,
  payment_methods json
); -- va aggiunto promoter_id / group / organizer

vendors
promoters
organizers

CREATE TABLE IF NOT EXISTS entries (
  id serial primary key,
  promoter_id text,
  name text,
  edition smallint,
  category text,
  series text, -- può essere null e identifica 
  date timestamp,
  status text,
  capacity smallint,
  detail jsonb,
  summary text,
  description text,
  body text,
  flyer text,
  summary_image text,
  regulation text,
  opening_date timestamp, --opening_selling_date, start_selling_date ???
  closing_date timestamp
); -- va aggiunto group / organizer

CREATE TABLE IF NOT EXISTS orders (
  id serial primary key,
  user_id uuid,
  user_email text,
  customer_first_name,
  customer_last_name,
  date timestamp,
  amount smallint,
  status text,
  
  notification_date
  notification_status
  
  payment_id
  payment_date
  payment_method
  payment_status
  
  promoter_id
  
);


rinomina in tabella orders
- user_mail
- user_first name ecc

in costumer_mail
costumer_first_name ecc