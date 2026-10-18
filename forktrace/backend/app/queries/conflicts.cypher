MATCH (m:Meal)-[sb:SERVED_BATCH]->(b:Batch),
      (m)-[sa:SERVED_AT]->(r:Restaurant)
OPTIONAL MATCH (s:Shipment)-[cr:CARRIES]->(b),
               (s)-[del:DELIVERED_TO]->(r)
WHERE s.day <= m.day AND m.day <= s.day + b.shelf
WITH m, b, r, count(s) AS valid_shipments
WHERE valid_shipments = 0
RETURN m.id AS meal_id, m.day AS meal_day, r.id AS restaurant_id, b.id AS batch_id
ORDER BY meal_id ASC, batch_id ASC

