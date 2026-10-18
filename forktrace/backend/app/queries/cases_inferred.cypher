MATCH (b:Batch {id: $batch_id})-[of:OF]->(i:Ingredient),
      (c:Case)-[a:ATE]->(m:Meal)-[ct:CONTAINS]->(i),
      (m)-[sa:SERVED_AT]->(r:Restaurant),
      (s:Shipment)-[cr:CARRIES]->(b),
      (s)-[del:DELIVERED_TO]->(r)
WHERE s.day <= m.day AND m.day <= s.day + b.shelf
OPTIONAL MATCH (m)-[sb_check:SERVED_BATCH]->(:Batch)-[of_check:OF]->(i)
WITH b, c, m, count(sb_check) AS has_served
WHERE has_served = 0
RETURN DISTINCT b.id AS batch_id, c.id AS case_id
ORDER BY case_id ASC


