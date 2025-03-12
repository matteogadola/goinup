CREATE OR REPLACE FUNCTION public.prevent_entries_duplicate()
returns trigger as $$
DECLARE
  gender text;
begin
  IF entry_exist(NEW.event_id, NEW.tin) THEN
    IF NEW.gender = 'F' THEN
      gender := 'iscritta';
    ELSE
      gender := 'iscritto';
    END IF;
    RAISE EXCEPTION '% % risulta già %', NEW.first_name, NEW.last_name, gender;
  END IF;
  
  RETURN NEW;
end;
$$ language plpgsql security definer;

CREATE TRIGGER on_new_entry
  before insert on entries
  for each row execute procedure public.prevent_entries_duplicate();
