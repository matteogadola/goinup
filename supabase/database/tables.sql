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
  name text,
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
  order_item_id int references order_items (id) ON DELETE CASCADE,
  order_id int references orders (id) ON DELETE CASCADE,
  product_id uuid references products (id) ON DELETE SET NULL,
  event_id uuid references events (id) ON DELETE SET NULL,

  first_name text not null,
  last_name text not null,
  birth_date timestamp not null,
  birth_place text,
  gender gender,
  tin text,
  country text default 'ITA',
  club text,
  email text,
  phone_number text,
  bib_number smallint,
  fidal_card text,
  CONSTRAINT entries_unique UNIQUE (event_id, tin)
);


CREATE OR REPLACE VIEW v_entries_public


CREATE OR REPLACE VIEW v_entries_console

CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  uid SMALLINT NOT NULL,
  name TEXT NOT NULL,
  visible BOOLEAN DEFAULT true NOT NULL,
  description TEXT
);

INSERT INTO roles VALUES
  ('owner', 0, 'Owner'),
  ('admin', 1, 'Admin'),
  ('manager', 3, 'Manager'),
  ('editor', 5, 'Editor'),
  ('viewer', 8, 'Viewer');

CREATE TABLE IF NOT EXISTS groups (
  id smallserial primary key,
  name text not null,
  status text
);

CREATE TABLE IF NOT EXISTS users_groups (
  user_id uuid references users (id) ON DELETE CASCADE,
  group_id smallint references organizations (id) ON DELETE CASCADE,
  role text references roles (id) ON DELETE CASCADE,
  primary key (user_id, group_id, role)
);

CREATE TABLE IF NOT EXISTS events_groups (
  event_id uuid references events (id) ON DELETE CASCADE,
  group_id smallint references groups (id) ON DELETE CASCADE,
  primary key (event_id, group_id)
);

INSERT INTO groups (name) VALUES
('Goinup'), ('Goinup gare amiche'), ('Team Valtellina'),
('Arz-Up'), ('Cech-Up'), ('Colmen Vertical'), ('Kurt-Up'), ('LAVEnsu'), ('Larg-Up'),
('Riscio-Up'), ('San Giorgio Vertical'), ('Sostila Vertical'), ('Vertical Egùl'),
('Vertical Lino'), ('Vertical Madonnina');

INSERT INTO events_groups (group_id, event_id) VALUES
(1, 'b4547860-023d-4dee-ad8a-277e4b82c17c'),
(1, '6aa979c2-622d-4d06-996a-596568e6e18d'),
(1, '4823a240-c430-48a8-85a9-1c71b957e12b'),
(1, 'b56fbb8a-5c49-4811-8bb7-b992c2544303'),
(1, '241de043-8f32-4d3a-b9ac-b1731fe8ce48'),
(1, 'dbfdfef0-c7e8-4cb0-9e70-3872cdf15929'),
(1, '94134137-72eb-4824-9144-e3ccefda50cb'),
(1, 'b0061698-9762-4849-8ce0-d907ff1d9743'),
(1, 'c514bdcb-3ef7-4415-b5de-d4ba79aa4d52'),
(1, '5d2b6463-d0ea-44c9-b8ec-fdebd0e8814f'),
(1, 'a96a093e-56e5-40ba-be5a-8d978fb562a8'),
(1, 'd1242f0d-acb6-4cc7-a268-e970cd1ac8fe'),
(1, '751be1a5-9cd9-4bab-94f8-d3d568e56187'),
(2, '4823a240-c430-48a8-85a9-1c71b957e12b'),
(2, '5d2b6463-d0ea-44c9-b8ec-fdebd0e8814f'),

(4, '751be1a5-9cd9-4bab-94f8-d3d568e56187'),
(5, '6aa979c2-622d-4d06-996a-596568e6e18d'),
(6, 'a96a093e-56e5-40ba-be5a-8d978fb562a8'),
(7, 'c514bdcb-3ef7-4415-b5de-d4ba79aa4d52'),
(8, 'dbfdfef0-c7e8-4cb0-9e70-3872cdf15929'),
(9, '241de043-8f32-4d3a-b9ac-b1731fe8ce48'),
(10, 'b56fbb8a-5c49-4811-8bb7-b992c2544303'),
(11, 'd1242f0d-acb6-4cc7-a268-e970cd1ac8fe'),
(13, '94134137-72eb-4824-9144-e3ccefda50cb'),
(14, 'b0061698-9762-4849-8ce0-d907ff1d9743');
