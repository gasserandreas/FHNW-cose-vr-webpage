USE coin_db;

DROP TABLE IF EXISTS `TagToItem`;
DROP TABLE IF EXISTS `TagToDevice`;
DROP TABLE IF EXISTS `Device`;
DROP TABLE IF EXISTS `Tag`;

CREATE TABLE IF NOT EXISTS `Tag` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `value` varchar(255) NOT NULL,
    `raw` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `TagToItem` (
	`TagId` bigint(20) NOT NULL,
	`ItemId` bigint(20) NOT NULL,
    PRIMARY KEY (TagId, ItemId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `Device` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `TagToDevice` (
	`TagId` bigint(20) NOT NULL,
	`DeviceId` bigint(20) NOT NULL,
    PRIMARY KEY (TagId, DeviceId)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE `TagToItem` ADD CONSTRAINT `tag_to_item_fk_1` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`id`);
ALTER TABLE `TagToItem` ADD CONSTRAINT `tag_to_item_fk_2` FOREIGN KEY (`ItemId`) REFERENCES `SearchItems` (`ItemId`);

ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_1` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`id`);
ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_2` FOREIGN KEY (`DeviceId`) REFERENCES `Device` (`id`);

/*
USE coin_db;

DROP TABLE IF EXISTS Device;
CREATE TABLE IF NOT EXISTS `Device` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `keywords` text NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS ItemToDevice;
CREATE TABLE IF NOT EXISTS `ItemToDevice` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `device_id` bigint(20) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

TRUNCATE TABLE `Device`;
INSERT INTO `Device` (`id`, `name`, `keywords`) VALUES
(1, 'Austria', ''),
(2, 'Belgium', ''),
(3, 'Bulgaria', '');

ALTER TABLE `ItemToDevice`
  ADD CONSTRAINT `item_to_device_fk_1` FOREIGN KEY (`device_id`) REFERENCES `Device` (`id`);

*/