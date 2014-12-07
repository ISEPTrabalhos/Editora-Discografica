CREATE TABLE IF NOT EXISTS `SalesDetail` (
`id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `album` varchar(120) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

ALTER TABLE `OrderDetail`
 ADD PRIMARY KEY (`id`);

CREATE TABLE IF NOT EXISTS `Sales` (
`id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,0) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

ALTER TABLE `Order`
 ADD PRIMARY KEY (`id`);
