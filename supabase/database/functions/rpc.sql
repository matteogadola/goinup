CREATE OR REPLACE FUNCTION public.entry_prevent_duplicate(_tin text, _first_name text, _last_name text, _birth_year int)
RETURNS BOOLEAN AS $$
BEGIN
  PERFORM *
  FROM entries E
  INNER JOIN order_items OI ON E.order_item_id = OI.id
  WHERE (OI.payment_status = 'paid' OR (OI.payment_method = 'cash' AND OI.payment_status = 'pending'))
  AND (tin = _tin OR (E.first_name = _first_name AND E.last_name = _last_name AND extract(year from E.birth_date) = _birth_year));
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;