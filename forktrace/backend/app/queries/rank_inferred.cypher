MATCH (b:Batch)-[of:OF]->(i:Ingredient)
OPTIONAL MATCH (m:Meal)-[ct:CONTAINS]->(i),
               (m)-[sa:SERVED_AT]->(r:Restaurant),
               (s:Shipment)-[cr:CARRIES]->(b),
               (s)-[del:DELIVERED_TO]->(r)
WHERE s.day <= m.day AND m.day <= s.day + b.shelf
OPTIONAL MATCH (m)-[sb_check:SERVED_BATCH]->(:Batch)-[of_check:OF]->(i)
WITH b, m, count(sb_check) AS has_served
WHERE m IS NULL OR has_served = 0
OPTIONAL MATCH (c:Case)-[a:ATE]->(m)
WITH b, count(DISTINCT m) AS exposed_meals, count(DISTINCT c) AS cases
RETURN b.id AS batch_id, exposed_meals, cases
ORDER BY cases DESC, exposed_meals DESC, batch_id ASC


