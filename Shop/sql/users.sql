SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `timestamp`) VALUES
(1, 'mrfhitz', '4297f44b13955235245b2497399d7a93', 'Mário', 'mrfhitz@gmail.com', '2014-11-19 22:32:29');

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `timestamp`) VALUES
(2, 'pajo1471', '4297f44b13955235245b2497399d7a93', 'Paulo', 'pajolool1471@gmail.com', '2014-11-20 10:46:00');

ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;