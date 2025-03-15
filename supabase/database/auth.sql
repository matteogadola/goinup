CREATE TYPE gender AS ENUM('M', 'F');

-- Create a table for public users
CREATE TABLE IF NOT EXISTS users (
  id uuid references auth.users on delete cascade not null primary key, -- 16 bytes
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at timestamp,                                                 -- 8 bytes
  updated_at timestamp,                                                 -- 8 bytes
  avatar_url TEXT,
  phone_number TEXT,
  tin TEXT,
  country TEXT,
  birth_place TEXT,
  birth_date DATE,                                                      -- 4 bytes
  gender GENDER,                                                        -- 1 byte (+4 bytes of enum's definition)
  team TEXT,
  fidal_card TEXT
);

-- Set up Row Level Security (RLS)
alter table users enable row level security;

create policy "User can view own profile." on users
  for select to authenticated using ((select auth.uid()) = id);

create policy "Users can update own profile." on users
  for update to authenticated using ((select auth.uid()) = id);

-- 

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  RAISE log 'raw_user_meta_data: %', new.raw_user_meta_data;
  RAISE log 'raw_app_meta_data: %', new.raw_app_meta_data;
  IF new.raw_app_meta_data->>'provider' = 'email' then
    insert into public.users (id, email, first_name, last_name)
    values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  elseif new.raw_app_meta_data->>'provider' = 'google' then
    insert into public.users (id, email, first_name, last_name, avatar_url)
    values (new.id, new.email, coalesce(SPLIT_PART(new.raw_user_meta_data->>'full_name', ' ', 1), ''), coalesce(SPLIT_PART(new.raw_user_meta_data->>'full_name', ' ', 2), ''), new.raw_user_meta_data->>'avatar_url');
  elseif new.raw_app_meta_data->>'provider' = 'facebook' then
    insert into public.users (id, email)
    values (new.id, new.email);
  end if;
  return new;
end;
$$;

create trigger trig_users_insert
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

--


-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_users_insert()
returns trigger
set search_path = ''
as $$
begin

  IF new.raw_app_meta_data->

  {"iss": "https://accounts.google.com",
  "sub": "116367608793557538291",
  "name": "Jhon Guest", "email": "gandalfico@gmail.com",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocKygxm7vPkD88NNeO81QoRVNSQGZhEI0R0_FYqI6EgbMPPShPA=s96-c",
  "full_name": "Jhon Guest", "last_name": "Utente",
  "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKygxm7vPkD88NNeO81QoRVNSQGZhEI0R0_FYqI6EgbMPPShPA=s96-c",
  "first_name": "Prova",
  "provider_id": "116367608793557538291",
  "email_verified": true,
  "phone_verified": false}
  
  insert into public.users (id, email, first_name, last_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;


-- on user delete


{"provider": "email", "providers": ["email"]}
trig_users_insert
trig_OtherTable_Insert
trig_OtherTable_InsteadOfInsert




-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
-- Users can view/update/insert their own profile only
-- Users with role can view all, 
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');











  -- Create the auth hook function
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

grant usage on schema public to supabase_auth_admin;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon, public;

grant all
  on table public.user_roles
to supabase_auth_admin;

revoke all
  on table public.user_roles
  from authenticated, anon, public;

create policy "Allow auth admin to read user roles" ON public.user_roles
as permissive for select
to supabase_auth_admin
using (true)