SELECT * FROM SearchItems;

SELECT Country, COUNT(*) as countItem From SearchItems
GROUP BY Country
ORDER BY countItem DESC;

select * from SearchItems where Country = 'IT';

select COUNT(*) AS counter, Longitude, Latitude, country FROM SearchItems
WHERE Longitude IS NOT NULL
GROUP BY Longitude, Latitude, country
ORDER BY counter DESC;
;

SELECT COUNT(*) FROM Tag;

SELECT COUNT(*) FROM TagToItem;

SELECT * FROM Tag;

SELECT * FROM Device;

SELECT * FROM SearchItems;

SELECT * FROM Tag
WHERE 
	value LIKE 'microsoft'
    ;

select count(*) AS counter, search.DeviceName FROM (
SELECT DISTINCT
    items.*,
    device.id as DeviceId,
    device.name as DeviceName
FROM SearchItems items
LEFT JOIN TagToItem tagToItem
	ON items.ItemId = tagToItem.ItemId
LEFT JOIN Tag tag
	ON tagToItem.TagId = tag.id
LEFT JOIN TagToDevice tagToDevice
	ON tagToDevice.TagId = tag.id
LEFT JOIN Device device
	ON device.id = tagToDevice.DeviceId
WHERE device.name IS NOT NULL AND items.Latitude IS NOT NULL
) search
GROUP BY search.DeviceId
ORDER BY counter DESC
;

SELECT items.Title as title, items.Location as location, items.Latitude as latitude, items.Longitude as longitude
FROM SearchItems items
WHERE items.Latitude IS NOT NULL AND items.Longitude IS NOT NULL;

SELECT DISTINCT
    items.*,
    device.id as DeviceId,
    device.name as DeviceName
FROM SearchItems items
LEFT JOIN TagToItem tagToItem
    ON items.ItemId = tagToItem.ItemId
LEFT JOIN Tag tag
    ON tagToItem.TagId = tag.id
LEFT JOIN TagToDevice tagToDevice
    ON tagToDevice.TagId = tag.id
LEFT JOIN Device device
    ON device.id = tagToDevice.DeviceId
WHERE device.name IS NOT NULL AND items.ItemId = '112244278859';

SELECT count(*), ItemId FROM (
SELECT
	innerQuery.*,
    sellingStatus.*
FROM (
	SELECT DISTINCT
		items.*,
		device.id as DeviceId,
		device.name as DeviceName
	FROM SearchItems items
	LEFT JOIN TagToItem tagToItem
		ON items.ItemId = tagToItem.ItemId
	LEFT JOIN Tag tag
		ON tagToItem.TagId = tag.id
	LEFT JOIN TagToDevice tagToDevice
		ON tagToDevice.TagId = tag.id
	LEFT JOIN Device device
		ON device.id = tagToDevice.DeviceId
	WHERE device.name IS NOT NULL
) innerQuery
LEFT JOIN SellingStatusDbModel sellingStatus
	ON innerQuery.SellingStatusId = sellingStatus.id
    )
;

SELECT * FROM SellingStatusDbModel
ORDER BY InterestCount DESC;
