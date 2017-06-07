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
(1, 5),
(7, 5),
(8, 5),
(9, 5),
(10, 5),
(13, 3),
(14, 5),
(15, 5),
(16, 5),
(17, 1),
(35, 4),
(41, 6),
(50, 1),
(51, 1),
(52, 1),
(54, 5),
(60, 5),
(142, 3),
(148, 5),
(149, 5),
(150, 5),
(151, 5),
(154, 3),
(167, 5),
(168, 5),
(172, 2),
(173, 2),
(174, 2),
(14, 4),
(15, 4),
(16, 4),
(148, 4),
(149, 4),
(150, 4),
(151, 4),
(153, 3),
(165, 4),
(165, 5),
(167, 4),
(168, 4),
(194, 4),
(194, 5) /* stopped with id = 200 */
;

/* add constraint again */
ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_2` FOREIGN KEY (`DeviceId`) REFERENCES `Device` (`id`);
