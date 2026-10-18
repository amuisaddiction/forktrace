MATCH (b:Batch)
OPTIONAL MATCH (m:Meal)-[sb:SERVED_BATCH]->(b)
OPTIONAL MATCH (c:Case)-[a:ATE]->(m)
WITH b, count(DISTINCT m) AS exposed_meals, count(DISTINCT c) AS cases
RETURN b.id AS batch_id, exposed_meals, cases
ORDER BY cases DESC, exposed_meals DESC, batch_id ASC

