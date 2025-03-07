DECLARE
  item record;
BEGIN
  SELECT events.id, events.name, events.capacity, COUNT(*)
  FROM entries
  INNER JOIN events ON entries.event_id = events.id
  INNER JOIN orders O ON entries.order_id = O.id
  WHERE events.id = NEW.event_id
  AND (O.payment_status = 'paid' OR (O.payment_method = 'cash' AND O.payment_status = 'pending'))
  GROUP BY events.id, events.capacity
  INTO item;
  
  IF FOUND AND item.capacity <> 0 AND item.count >= item.capacity THEN
    RAISE EXCEPTION 'Disponibilità terminata per %', item.name;
  END IF;
  
  RETURN NEW;
END;