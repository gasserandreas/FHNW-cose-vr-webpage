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
