DECLARE
  item record;
BEGIN
  --SELECT items.*, COUNT(*)
  --FROM items
  --LEFT JOIN order_items OI ON items.id = OI.item_id
  --WHERE items.id = NEW.item_id
  --GROUP BY items.id
  --INTO item;

  SELECT items.id, items.name, items.stock, COUNT(*)
  FROM items
  LEFT JOIN order_items OI ON items.id = OI.item_id
  INNER JOIN orders O ON OI.order_id = O.id
  WHERE items.id = NEW.item_id
  AND (O.payment_status = 'paid' OR (O.payment_method = 'cash' AND O.payment_status = 'pending'))
  GROUP BY items.id
  INTO item;
  
  IF FOUND AND item.stock <> 0 AND item.count >= item.stock THEN
    RAISE EXCEPTION 'Disponibilità terminata per %', item.name;
  END IF;
  
  RETURN NEW;
END;