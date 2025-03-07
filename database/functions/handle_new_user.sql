CREATE OR REPLACE FUNCTION public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');

  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  return new;
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Mail già presente';
end;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
