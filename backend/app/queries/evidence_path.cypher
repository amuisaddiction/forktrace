MATCH (c:Case)-[a:ATE]->(m:Meal)
OPTIONAL MATCH (m)-[sb:SERVED_BATCH]->(b_rec:Batch {id: $batch_id})
OPTIONAL MATCH (m)-[sa:SERVED_AT]->(r:Restaurant)<-[del:DELIVERED_TO]-(s:Shipment)-[cr:CARRIES]->(b_inf:Batch {id: $batch_id})-[of:OF]->(i:Ingredient)<-[ct:CONTAINS]-(m)
WHERE s.day <= m.day AND m.day <= s.day + b_inf.shelf
OPTIONAL MATCH (m)-[sb_check:SERVED_BATCH]->(:Batch)-[of_check:OF]->(i)
WITH c, m, b_rec, b_inf, r, s, count(sb_check) AS has_served
WHERE b_rec IS NOT NULL OR (b_inf IS NOT NULL AND has_served = 0)
RETURN c.id AS case_id,
       m.id AS meal_id,
       CASE WHEN b_rec IS NOT NULL THEN 'RECORDED' ELSE 'INFERRED' END AS evidence_type,
       $batch_id AS batch_id,
       r.id AS restaurant_id,
       s.id AS shipment_id
ORDER BY case_id ASC, meal_id ASC
LIMIT $limit


