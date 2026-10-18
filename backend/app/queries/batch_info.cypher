MATCH (sup:Supplier)-[sp:SUPPLIES]->(b:Batch {id: $batch_id})-[of:OF]->(i:Ingredient)
RETURN b.id AS batch_id, b.shelf AS shelf_life, i.name AS ingredient, sup.name AS supplier

