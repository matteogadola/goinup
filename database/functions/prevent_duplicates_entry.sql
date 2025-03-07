DECLARE
  item record;
  gender text;
BEGIN
  SELECT *
  FROM entries
  INNER JOIN orders ON entries.order_id = orders.id
  WHERE (orders.payment_status = 'paid' OR (orders.payment_method = 'cash' AND orders.payment_status = 'pending'))
  AND entries.event_id = NEW.event_id AND tin = NEW.tin
  INTO item;
  
  IF FOUND THEN
    IF NEW.gender = 'F' THEN
      gender := 'iscritta';
    ELSE
      gender := 'iscritto';
    END IF;
    RAISE EXCEPTION '% % risulta già %', NEW.first_name, NEW.last_name, gender;
  END IF;
  
  RETURN NEW;
END;