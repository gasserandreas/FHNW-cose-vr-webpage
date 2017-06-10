USE coin_db;

DROP TABLE IF EXISTS `Tag`;
CREATE TABLE IF NOT EXISTS `Tag` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    value varchar(255) IS NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `TagToItem`;
CREATE TABLE IF NOT EXISTS `TagToItem` (
	`TagId` int(11) NOT NULL,
	`ItemId` int(11) NOT NULL,
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `Device`;
CREATE TABLE IF NOT EXISTS `Device` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) IS NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `TagToDevice`;
CREATE TABLE IF NOT EXISTS `TagToDevice` (
	`TagId` int(11) NOT NULL,
	`DeviceId` int(11) NOT NULL,
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `TagToItem` ADD CONSTRAINT `tag_to_item_fk_1` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`id`);
ALTER TABLE `TagToItem` ADD CONSTRAINT `tag_to_item_fk_2` FOREIGN KEY (`SearchItem`) REFERENCES `Tag` (`ItemId`);

ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_1` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`id`);
ALTER TABLE `TagToDevice` ADD CONSTRAINT `tag_to_device_fk_2` FOREIGN KEY (`Device`) REFERENCES `Tag` (`id`);

/*
USE coin_db;

DROP TABLE IF EXISTS Device;
CREATE TABLE IF NOT EXISTS `Device` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `keywords` text NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS ItemToDevice;
CREATE TABLE IF NOT EXISTS `ItemToDevice` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `device_id` int(11) NOT NULL,
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