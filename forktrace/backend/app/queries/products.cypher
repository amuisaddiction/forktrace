MATCH (p:Product)-[mf:MADE_FROM]->(b:Batch {id: $batch_id})
RETURN p.id AS product_id, p.name AS product_name, b.id AS batch_id
ORDER BY product_id ASC

