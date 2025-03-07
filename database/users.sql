CREATE TYPE user_role AS ENUM('user', 'manager', 'admin');
CREATE TYPE grant_mode AS ENUM('read', 'write');
CREATE TYPE gender AS ENUM('M', 'F');

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY, -- UUID from auth.users
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  tin TEXT,
  country TEXT,
  birth_place TEXT,
  birth_date TEXT,
  gender GENDER,
  team: TEXT,
  fidal_card: TEXT
);

CREATE TABLE IF NOT EXISTS user_grants (
  id SERIAL PRIMARY KEY,
  user_id uuid references users on delete cascade not null,
  role user_role NOT NULL DEFAULT 'user'::user_role,
  promoters jsonb,
  events jsonb,
  unique (user_id)
);

CREATE TABLE IF NOT EXISTS grant_users_events (
  user_id uuid REFERENCES users (id),
  event_id TEXT REFERENCES events (id),
  mode grant_mode NOT NULL DEFAULT 'read'::grant_mode
);

CREATE OR REPLACE FUNCTION get_granted_events (user_id UUID, mode grant_mode default 'read')
RETURNS TEXT[]
LANGUAGE SQL
SECURITY DEFINER
AS
$$
  SELECT role FROM users WHERE id = $1;

  IF role = 'admin' THEN
    RETURN SELECT id FROM events;
  ELSE IF role = 'moderator' THEN
    RETURN SELECT event_id FROM grant_users_events WHERE id = $1
  ELSE
    RETURN [];
  END IF
$$;