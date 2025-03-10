-- CREATE TYPE status AS ENUM('', 'F');
-- CREATE TYPE status_di_vednita AS ENUM('', 'F');

-- events and products

CREATE TABLE IF NOT EXISTS events (
  id uuid primary key,
  name text not null,
  slug text not null,
  date timestamp not null,
  type text not null,
  status text not null default 'internal',
  summary text,
  summary_image text,
  description text,
  flyer text,
  capacity smallint,
  details jsonb,
  regulation text
);

alter table events enable row level security;

create policy "Users can view all not internal events." on events
  for select to anon, authenticated using (status <> 'internal');

CREATE TABLE IF NOT EXISTS products (
  id uuid primary key,
  name text not null,
  slug text not null,
  type text not null,
  status text not null default 'internal',
  price smallint not null,
  stock smallint,
  summary text,
  description text,
  start_sale_date timestamp,
  end_sale_date timestamp,
  entry_form text,
  payment_methods json
); -- poi ci sarà la tabella products_variations

alter table products enable row level security;

create policy "Users can view all not internal events." on products
  for select to anon, authenticated using (status <> 'internal');

CREATE TABLE IF NOT EXISTS events_products (
  event_id uuid references events(id) ON DELETE CASCADE,
  product_id uuid references products(id) ON DELETE CASCADE,
  primary key (event_id, product_id)
);

alter table events_products enable row level security;

--create policy "Users can update own profile." on users
--  for update to authenticated using ((select auth.uid()) = id);

-- orders and entries

CREATE TABLE IF NOT EXISTS orders (
  id serial primary key, -- start da 7000
  user_id uuid references users (id) ON DELETE CASCADE,
  date timestamp default now() not null,
  status text default 'created' not null,-- pending error paid -- GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_date - start_date)) / 60) STORED,
  amount smallint, -- serve o viene calcolato con v_orders
  customer_email text,
  customer_first_name text,
  customer_last_name text,
  notification_id text,
  notification_date timestamp,
  notification_status text,
  payment_id text,
  payment_date timestamp,
  payment_method text,
  payment_status text
);

CREATE TABLE IF NOT EXISTS order_items (
  id serial primary key,
  order_id smallint references orders (id) ON DELETE CASCADE NOT NULL,
  user_id uuid references users (id) ON DELETE CASCADE,
  date timestamp default now() not null,
  status text default 'created' not null,-- pending error paid -- GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_date - start_date)) / 60) STORED,
  event_id uuid references events (id),
  product_id uuid references products (id),
  description text,
  price smallint,
  quantity smallint,
  payment_id text,
  payment_date timestamp,
  payment_method text,
  payment_status text
);

CREATE TABLE IF NOT EXISTS entries (
  id serial primary key,
  order_item_id int references order_items (id),
  order_id int references orders (id) ON DELETE CASCADE NOT NULL,
  event_id uuid references events (id),

  first_name text not null,
  last_name text not null,
  birth_date text not null,
  birth_place text,
  gender gender,
  tin text,
  country text default 'ITA',
  club text,
  email text,
  phone_number text,
  bib_number smallint,
  fidal_card text
);


CREATE OR REPLACE VIEW v_entries_public


CREATE OR REPLACE VIEW v_entries_console


CREATE TABLE IF NOT EXISTS organizations (
  id smallserial primary key,
  name text not null,
  status text
);

CREATE TABLE IF NOT EXISTS users_organizations (
  user_id uuid references users (id) ON DELETE CASCADE,
  organization_id smallint references organizations (id) ON DELETE CASCADE,
  primary key (user_id, organization_id)
);

CREATE TABLE IF NOT EXISTS organizations_events (
  organization_id smallint references organizations (id) ON DELETE CASCADE,
  event_id uuid references events (id) ON DELETE CASCADE,
  primary key (organization_id, event_id)
);

INSERT INTO organizations (name) VALUES
('Goinup'), ('Goinup gare amiche'), ('Team Valtellina'),
('Arz-Up'), ('Cech-Up'), ('Colmen Vertical'), ('Kurt-Up'), ('LAVEnsu'), ('Larg-Up'),
('Riscio-Up'), ('San Giorgio Vertical'), ('Sostila Vertical'), ('Vertical Egùl'),
('Vertical Lino'), ('Vertical Madonnina');
