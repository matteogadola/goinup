CREATE OR REPLACE FUNCTION public.handle_delete_user() 
returns trigger as $$
begin
  delete from public.users where id = OLD.id;
  return new;
end;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_delete_user();
