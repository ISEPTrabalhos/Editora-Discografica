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

CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `artist` varchar(50) NOT NULL,
  `img` text NOT NULL,
  `qtd` int(11) NOT NULL,
  `price` float NOT NULL,
  `off` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;


INSERT INTO `albums` (`id`, `name`, `artist`, `img`, `qtd`, `price`, `off`) VALUES
(1, '1989', 'Taylor Swift', 'http://a4.mzstatic.com/us/r30/Music3/v4/2c/b1/87/2cb187fa-2da2-839e-436a-8997561c0493/UMG_cvrart_00843930013562_01_RGB72_1400x1400_14UMDIM03405.600x600-75.jpg', 20, 19.99, 0),
(2, 'Cadillactica', 'Big K.R.I.T', 'http://a5.mzstatic.com/us/r30/Music5/v4/7a/f8/dc/7af8dc27-1c9b-5ee2-920d-f8776bce1334/UMG_cvrart_00602537943500_01_RGB72_1500x1500_14UMGIM43868.600x600-75.jpg', 20, 19.99, 0),
(3, 'BEYONCÉ', 'Beyoncé', 'http://a2.mzstatic.com/us/r30/Music3/v4/34/c1/73/34c173c0-faf9-27e6-cac4-f5b6b71f782a/886444955379.600x600-75.jpg', 20, 19.99, 0),
(4, 'Jealous', 'Nick Jonas', 'http://a3.mzstatic.com/us/r30/Music3/v4/87/85/ec/8785ecf8-231c-9ba4-d0da-71379ada6736/UMG_cvrart_00602547140135_01_RGB72_1800x1800_14UMGIM55255.600x600-75.jpg', 20, 19.99, 0),
(5, 'Montevallo', 'Sam Hunt', 'http://a4.mzstatic.com/us/r30/Music3/v4/1f/53/35/1f533522-29e9-948d-eaa8-bcc2a854af3e/UMG_cvrart_00602547034830_01_RGB72_1500x1500_14UMGIM42058.600x600-75.jpg', 20, 19.99, 0),
(6, 'FROOT', 'Marina and The Diamonds', 'http://a1.mzstatic.com/us/r30/Music3/v4/67/74/dd/6774dd4d-f6a9-a6d2-a15d-7be7ac8ab138/825646175765.600x600-75.jpg', 20, 19.99, 0),
(7, 'Save Rock and Roll', 'Fall out Boy', 'http://userserve-ak.last.fm/serve/500/91409179/Save+Rock+and+Roll.png', 20, 8.99, 0),
(8, 'Native', 'One Republic', 'http://userserve-ak.last.fm/serve/500/87338269/Native+Cover+JosepVinaixacom+Version.png', 20, 5.99, 0),
(9, 'AM', 'Arctic Monkeys', 'http://userserve-ak.last.fm/serve/500/92744747/AM.png', 20, 8.99, 0),
(10, 'I am Hardwell', 'Hardwell', 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png', 20, 8.99, 0),
(11, 'A Town Called Paradise', 'Tiesto', 'http://userserve-ak.last.fm/serve/500/98865415/A+Town+Called+Paradise+Tisto.png', 20, 8.99, 0),
(12, 'Neon Future', 'Steve Aoki', '', 20, 8.99, 0);


CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;