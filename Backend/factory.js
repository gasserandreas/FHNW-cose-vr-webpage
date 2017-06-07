
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
}

const analyseDevices = (db) => {
    return new Promise((resolve, reject) => {
       db.query('SELECT ItemId, Title FROM SearchItems', (itemErr, itemRows, itemFields) => { // debug
        // db.query('SELECT ItemId, Title FROM SearchItems', (err, rows, fields) => {
            if (itemErr) {
                reject(itemErr);
            }

            // get all tags
            db.query('SELECT id, value, raw FROM Tag', (tagError, tagRows, tagFields) => {
                if (tagError) {
                    reject(tagError);
                }

                // get highest tag id for increasing id pointer
                var highestTag = tagRows[tagRows.length] ? tagRows[tagRows.length].id : 0;

                db.query('SELECT * FROM TagToItem', (tagToItemError, tagToItemRows, tagToItemFields) => {
                    //const tags = tagRows.filter((tag) => tagToItemRows.map(row => row.ItemId).includes()

                    const tags = tagRows;
                    const newTags = [];
                    const newTagsToItems = [];

                    // only items not yet in db
                    const items = itemRows.filter((item) => (
                        !tagToItemRows.map(row => row.ItemId).includes(item.ItemId)
                    ));

                    // proceed all items in db
                    items.forEach((item) => {
                        const itemId = item.ItemId;
                        var title = item.Title.trim();

                        // create array of words, remove tangling spaces and filter word length < 3
                        const rawWords = title.split(' ');
                        const words = rawWords
                            .filter((word) => word.length > 2)
                            .map(word => ({
                                value: word.toLowerCase().trim(),
                                raw: word,    
                            }));

                        // proceed all words and store in global array
                        words.forEach((word) => {
                            const tempTags = tags.map(tag => tag.value);
                            const index = tempTags.indexOf(word.value);

                            let tag;

                            // if tag not yey in db, create new one
                            if (index === -1) {
                                highestTag += 1;
                                // handle not found
                                const newTag = {
                                    id: highestTag,
                                    value: word.value,
                                    raw: word.raw,
                                };

                                // store new tag
                                tag = newTag;

                                // add to db query array
                                tags.push(newTag);
                                newTags.push(newTag);
                            }

                            // if tag is in db, take tag from array
                            if (!tag) {
                                tag = tags[index];
                            }

                            // create new link
                            const newTagToItem = {
                                tagId: tag.id,
                                itemId,
                            };

                            // check if item is already in array (yeaah I know, very very bad code...)
                            if (newTagsToItems.filter((item) => item.tagId === tag.id).map(item => item.itemId).indexOf(itemId) === -1) {
                                newTagsToItems.push(newTagToItem);
                            }
                        });
                    });
                    
                    // create db queries
                    const tagValues = newTags
                    .map((tag, i) => {
                        return '(' + tag.id + ',"' + tag.value.replace(/[^a-zA-Z0-9 ]/g, '') + '","' + tag.raw.replace(/[^a-zA-Z0-9 ]/g, '') + '")';
                    })
                    .join(',');

                    const tagToItemValues = newTagsToItems
                    .map((tagToItem, i) => {
                        return '(' + tagToItem.tagId + ',' + tagToItem.itemId + ')'
                    })
                    .join(',');

                    // create queries
                    const insertTagQuery = 'INSERT INTO Tag (id, value, raw) VALUES ' + tagValues;
                    const insertTagToItemQuery = 'INSERT INTO TagToItem (TagId, ItemId) VALUES ' + tagToItemValues;

                    if (tagValues.length > 0) {

                        // save all data to database
                        db.query(insertTagQuery, (error, rows, fields) => {
                            if (error) {
                                // promise error
                                reject(error);
                                console.log(insertTagQuery);
                            }

                            if (insertTagToItemQuery.length > 0) {

                                db.query(insertTagToItemQuery, (error2, rows2, fields2) => {
                                    if (error2) {
                                        reject(error2);
                                        console.log(insertTagToItemQuery);
                                    }

                                    const successObject = {
                                        tags: newTags.length,
                                        tagsToItems: newTagsToItems.length,
                                    };
                                    resolve(successObject);
                                });
                            } else {
                                const successObject = {
                                    tags: newTags.length,
                                    tagsToItems: 0,
                                };
                                resolve(successObject);
                            }
                        });
                    } else if (tagToItemValues.length > 0) {
                        db.query(insertTagToItemQuery, (error2, rows2, fields2) => {
                            if (error2) {
                                reject(error2);
                                console.log(insertTagToItemQuery);
                            }

                            const successObject = {
                                tags: 0,
                                tagsToItems: newTagsToItems.length,
                            };
                            resolve(successObject);
                        });
                    } else {
                        const successObject = {
                            tags: 0,
                            tagsToItems: 0,
                        };
                        resolve(successObject);
                    }
                });
            });
        });
    });
};

module.exports = {
    getAllItems,
    getItemWithId,
    analyseDevices
};
