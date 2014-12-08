SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `artist` varchar(50) NOT NULL,
  `img` text NOT NULL,
  `qtd` int(11) NOT NULL,
  `price` float NOT NULL,
  `off` float NOT NULL DEFAULT '0',
  `tags` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

INSERT INTO `albums` (`id`, `name`, `artist`, `img`, `qtd`, `price`, `off`, `tags`) VALUES
(1, '1989', 'Taylor Swift', 'http://a4.mzstatic.com/us/r30/Music3/v4/2c/b1/87/2cb187fa-2da2-839e-436a-8997561c0493/UMG_cvrart_00843930013562_01_RGB72_1400x1400_14UMDIM03405.600x600-75.jpg', 27, 19.99, 0, 'pop,dance'),
(2, 'Cadillactica', 'Big K.R.I.T', 'http://a5.mzstatic.com/us/r30/Music5/v4/7a/f8/dc/7af8dc27-1c9b-5ee2-920d-f8776bce1334/UMG_cvrart_00602537943500_01_RGB72_1500x1500_14UMGIM43868.600x600-75.jpg', 16, 19.99, 0.8, 'pop'),
(3, 'BEYONCÉ', 'Beyoncé', 'http://a2.mzstatic.com/us/r30/Music3/v4/34/c1/73/34c173c0-faf9-27e6-cac4-f5b6b71f782a/886444955379.600x600-75.jpg', 8, 19.99, 0, 'pop'),
(4, 'Jealous', 'Nick Jonas', 'http://a3.mzstatic.com/us/r30/Music3/v4/87/85/ec/8785ecf8-231c-9ba4-d0da-71379ada6736/UMG_cvrart_00602547140135_01_RGB72_1800x1800_14UMGIM55255.600x600-75.jpg', 23, 19.99, 0.8, 'pop'),
(5, 'Montevallo', 'Sam Hunt', 'http://a4.mzstatic.com/us/r30/Music3/v4/1f/53/35/1f533522-29e9-948d-eaa8-bcc2a854af3e/UMG_cvrart_00602547034830_01_RGB72_1500x1500_14UMGIM42058.600x600-75.jpg', 38, 19.99, 0, 'alternative'),
(6, 'FROOT', 'Marina and The Diamonds', 'http://a1.mzstatic.com/us/r30/Music3/v4/67/74/dd/6774dd4d-f6a9-a6d2-a15d-7be7ac8ab138/825646175765.600x600-75.jpg', 41, 19.99, 0, 'alternative'),
(7, 'Save Rock and Roll', 'Fall out Boy', 'http://userserve-ak.last.fm/serve/500/91409179/Save+Rock+and+Roll.png', 17, 14.99, 0, 'rock,alternative'),
(8, 'Native', 'One Republic', 'http://userserve-ak.last.fm/serve/500/87338269/Native+Cover+JosepVinaixacom+Version.png', 16, 9.99, 0.8, 'rock,alternative'),
(9, 'AM', 'Arctic Monkeys', 'http://userserve-ak.last.fm/serve/500/92744747/AM.png', 20, 14.99, 0, 'rock, alternative'),
(10, 'I am Hardwell', 'Hardwell', 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png', 32, 14.99, 0, 'house,electro'),
(11, 'A Town Called Paradise', 'Tiesto', 'http://userserve-ak.last.fm/serve/500/98865415/A+Town+Called+Paradise+Tisto.png', 19, 14.99, 0.8, 'house,electro'),
(12, 'Neon Future', 'Steve Aoki', 'http://a4.mzstatic.com/us/r30/Music4/v4/7c/e3/e3/7ce3e33f-d1ef-7b77-91a2-844e137e432c/cover326x326.jpeg', 15, 14.99, 0, 'house,electro'),
(13, 'Thriller', 'Michael Jackson', 'http://userserve-ak.last.fm/serve/500/97977057/Thriller.png', 20, 14.99, 0, 'pop,dance'),
(14, 'Teenage Dream', 'Katy Perry', 'http://userserve-ak.last.fm/serve/500/96074319/Teenage+Dream.png', 15, 14.99, 0, 'pop'),
(15, 'Stadium Arcadium', 'Red Hot Chili Peppers', 'http://userserve-ak.last.fm/serve/500/66662762/Stadium+Arcadium.png', 22, 12.99, 0, 'rock,alternative'),
(16, 'The Suburbs', 'Arcade Fire', 'http://userserve-ak.last.fm/serve/500/50128417/The+Suburbs++HQ+PNG.png', 10, 9.99, 0, 'indie rock,indie'),
(20, 'Night Visions', 'Imagine Dragons', 'http://userserve-ak.last.fm/serve/500/98394887/Night Visions  HQ PNG.png', 13, 19.99, 0, 'alternative,rock'),
(21, 'Playing in the Shadows', 'Example', 'http://userserve-ak.last.fm/serve/500/67988466/Playing in the Shadows  HQ PNG.png', 16, 5.99, 0, 'rock,electronic'),
(22, 'BEYONCÉ [Platinum Edition]', 'Beyoncé', 'http://a2.mzstatic.com/us/r30/Music3/v4/34/c1/73/34c173c0-faf9-27e6-cac4-f5b6b71f782a/886444955379.600x600-75.jpg', 4, 19.99, 0, 'Pop');

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

INSERT INTO `sales` (`id`, `user_id`, `total_price`, `date`) VALUES
(1, 0, 0, '2014-12-04 15:48:19'),
(11, 2, 92.94, '2014-12-04 16:48:00'),
(12, 2, 92.94, '2014-12-04 16:48:58');

CREATE TABLE IF NOT EXISTS `sales_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

INSERT INTO `sales_details` (`id`, `sales_id`, `album_id`, `quantity`, `price`) VALUES
(7, 11, 12, 1, 14.99),
(8, 11, 7, 1, 14.99),
(9, 11, 8, 1, 9.99),
(10, 11, 15, 1, 12.99),
(11, 11, 3, 1, 19.99),
(12, 11, 1, 1, 19.99),
(13, 12, 12, 1, 14.99),
(14, 12, 7, 1, 14.99),
(15, 12, 8, 1, 9.99),
(16, 12, 15, 1, 12.99),
(17, 12, 3, 1, 19.99),
(18, 12, 1, 1, 19.99);

CREATE TABLE IF NOT EXISTS `shop` (
  `api_key` varchar(128) NOT NULL,
  `name` varchar(20) NOT NULL,
  `addres` varchar(50) NOT NULL,
  `contact` int(11) NOT NULL,
  `NIF` int(11) NOT NULL,
  `license` text NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`api_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `shop` (`api_key`, `name`, `addres`, `contact`, `NIF`, `license`, `email`) VALUES
('d8689e6f-d365-4923-a870-4f7fb8f6d772', 'BizzKit', 'BizzKit Address 123 Porto', 229999999, 123456789, 'License 1.0', 'bizzkit@gmail.com');

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `timestamp`) VALUES
(0, 'admin', '4297f44b13955235245b2497399d7a93', 'I''m the Boss', '', '2014-12-03 11:59:14'),
(1, 'mrfhitz', '4297f44b13955235245b2497399d7a93', 'Mário', 'mrfhitz@gmail.com', '2014-11-19 22:32:29'),
(2, 'pajo1471', '4297f44b13955235245b2497399d7a93', 'Paulo', 'pajolool1471@gmail.com', '2014-11-20 10:46:00');
