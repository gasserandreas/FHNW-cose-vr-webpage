select * from SearchItems;

select count(*) from SearchItems;

SELECT count(*), items.Country
FROM SearchItems items
GROUP BY items.Country
;

SELECT count(*) as numbers, items.PostalCode
FROM SearchItems items
GROUP BY items.PostalCode
ORDER BY numbers DESC
;

SELECT * FROM SearchItems
WHERE Country <> 'US';

SELECT count(*) as numbers, items.Location
FROM SearchItems items
WHERE items.PostalCode IS NULL
GROUP BY items.Location
ORDER BY numbers DESC
;

SELECT * FROM SearchItems WHERE PostalCode IS NULL;

SELECT * FROM SearchItems
WHERE PostalCode IS NULL;

SELECT ItemId, Title FROM SearchItems;
