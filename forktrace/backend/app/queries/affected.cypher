MATCH (s:Shipment)-[cr:CARRIES]->(b:Batch {id: $batch_id}),
      (s)-[del:DELIVERED_TO]->(p:Place)
RETURN DISTINCT p.id AS place_id, labels(p) AS place_labels, s.id AS shipment_id, s.day AS shipment_day
ORDER BY s.day ASC, place_id ASC

