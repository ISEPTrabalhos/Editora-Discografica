CREATE TABLE IF NOT EXISTS `OrderDetail` (
`id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `album` varchar(120) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

ALTER TABLE `OrderDetail`
 ADD PRIMARY KEY (`id`);

CREATE TABLE IF NOT EXISTS `Order` (
`id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,0) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

ALTER TABLE `Order`
 ADD PRIMARY KEY (`id`);
