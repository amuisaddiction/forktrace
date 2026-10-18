MATCH (c:Case)-[a:ATE]->(m:Meal)-[sb:SERVED_BATCH]->(b:Batch {id: $batch_id})
RETURN DISTINCT b.id AS batch_id, c.id AS case_id
ORDER BY case_id ASC

