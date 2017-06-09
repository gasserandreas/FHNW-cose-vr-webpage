
const createDeviceObject = (row) => {
    return {
        id: row.ItemId,
        title: row.Titel,
        conditionId: row.ConditionId,
        listingInfoId: row.ListingInfoId,
        sellingStatusId: row.SellingStatusId,
        urls: {
            gallery: row.GalleryUrl,
            item: row.ViewItemUrl,
        },
        category: {
            id: row.CategoryId,
            name: row.CategoryName,
        },
        location: {
            zip: row.PostalCode,
            country: row.Country,
            location: row.Location,
            latitude: row.Latitude,
            longitude: row.Longitude,
        },
        shipping: {
            locations: row.ShipToLocations,
            cost: row.ShippingCost,
            currency: row.ShippingCurrency,
        },
        device: {
            id: row.DeviceId,
            name: row.DeviceName,
        },
    };
};

const createLocation = (item, id) => {
    const object = {
        id: id,
        zip: item.PostalCode,
        country: item.Country,
        location: item.Location,
        latitude: item.Latitude,
        longitude: item.Longitude,
        items: [item],
        devices: [
            {
                id: item.DeviceId,
                name: item.DeviceName,
            },
        ],
    };
    return object;
};

const getAllItems = (db) => {
    const promise = new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT
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
WHERE device.name IS NOT NULL`;
        db.query(query, function(err, rows, fields) {
            if (err) {
            reject(err);
          } else {

            const items = [];
            rows.forEach((row) => {
                const item = createDeviceObject(row);
                items.push(item);
            });

            resolve(items);
          }
        });
    });
    return promise;
};

const getItemWithId = (db, id) => {
    const promise = new Promise((resolve, reject) => {
        const query = `SELECT DISTINCT
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
WHERE device.name IS NOT NULL AND items.ItemId = '${id}'`;

        db.query(query, function(err, row, fields) {
            if (err) {
            reject(err);
          } else {
            const item = createDeviceObject(row[0]);
            resolve(item);
          }
        });
    });
    return promise;
};

const getAllLocations = (db) => {
    const promise = new Promise ((resolve, reject) => {
        const query = `SELECT items.Latitude, items.Longitude
FROM SearchItems items
WHERE items.Latitude IS NOT NULL AND items.Longitude IS NOT NULL`;
        db.query(query, function(err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    return promise;
}

const getAllLocation = (db) => {
    const promise = new Promise((resolve, reject) => {
         const query = `SELECT DISTINCT
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
WHERE device.name IS NOT NULL AND items.Longitude IS NOT NULL AND items.Latitude IS NOT NULL`;
        db.query(query, (err, items, fields) => {
            const locations = [];
            var i = 1;

            items.forEach((item) => {

                var searchTerm = `${item.Latitude}-${item.Longitude}`;
                var index = -1;
                for(var i = 0, len = locations.length; i < len; i++) {
                    const innerSearchTerm = `${locations[i].latitude}-${locations[i].longitude}`;
                    if (innerSearchTerm === searchTerm) {
                        index = i;
                        break;
                    }
                }

                let location;
                if (index === -1) {
                    // create new location
                    location = createLocation(item, i);

                    locations.push(location);
                } else {
                    location = locations[index];

                    // add data to location
                    location.items.push(item);

                    const device = {
                        id: item.DeviceId,
                        name: item.DeviceName,
                    };

                    location.devices.push(device);

                    // save new location object
                    locations[index] = location;
                }
                i = i + 1;
            });

            console.log(locations.length);
            resolve(locations);
            // console.log(locations);
            // resolve(locations);
        });
    });
    return promise;
};

module.exports = {
    getAllItems,
    getItemWithId,
    getAllLocation,
    getAllLocations,
};
