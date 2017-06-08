SELECT * FROM SearchItems;

SELECT COUNT(*) FROM Tag;

SELECT COUNT(*) FROM TagToItem;

SELECT * FROM Tag;

SELECT * FROM Device;

SELECT * FROM SearchItems;

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
