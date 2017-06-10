/* drop constraints first */
ALTER TABLE TagToDevice DROP FOREIGN KEY tag_to_device_fk_2;

/* truncate tables */
TRUNCATE TABLE Device;
TRUNCATE TABLE TagToDevice;

/* create devies */
INSERT INTO Device (id, name) VALUES
(1,'Sony PlayStation VR'),
(2,'HTC Vive'),
(3,'Oculus Rift'),
(4,'Google Daydream View'),
(5,'Samsung Gear VR'),
(6,'Merge VR Goggles'),
(7,'Hololense')
;

INSERT INTO TagToDevice (TagId, DeviceId) VALUES
( 13, 5),
( 14, 5),
( 39, 3),
( 42, 1),
( 69, 4),
( 80, 6),
( 87, 1),
( 124, 2),
( 132, 3),
( 133, 2),
( 134, 4),
( 834, 6),
( 676, 7)
;

/* add constraint again */
ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_2` FOREIGN KEY (`DeviceId`) REFERENCES `Device` (`id`);
