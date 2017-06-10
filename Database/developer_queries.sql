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
/*
( 13, 5)
( 14, 5)
( 39, 3)
( 42, 1)
( 69, 4)
( 80, 6)
( 87, 1)
( 124, 2)
( 132, 3)
( 133, 2)
( 134, 4)
( 834, 6)
( 676, 7)
( ,)
/*
(1,'Sony PlayStation VR'),
(2,'HTC Vive'),
(3,'Oculus Rift'),
(4,'Google Daydream View'),
(5,'Samsung Gear VR'),
(6,'Merge VR Goggles'),
(7,'Hololense')
*/

select count(*), search.DeviceName FROM (
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
;

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

-- location
