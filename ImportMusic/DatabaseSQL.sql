-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Dec 08, 2014 at 01:50 AM
-- Server version: 5.5.38
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `ImportMusic`
--

-- --------------------------------------------------------

--
-- Table structure for table `Sale`
--

CREATE TABLE `Sale` (
`ID` int(11) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Sale`
--

INSERT INTO `Sale` (`ID`, `Date`, `Total`) VALUES
(1, '2014-12-08 00:29:00', 40.00),
(2, '2014-12-08 00:32:27', 40.00),
(3, '2014-12-08 00:48:48', 40.00),
(4, '2014-12-08 00:49:48', 39.98);

-- --------------------------------------------------------

--
-- Table structure for table `SaleDetails`
--

CREATE TABLE `SaleDetails` (
`ID` int(11) NOT NULL,
  `SaleID` int(11) NOT NULL,
  `Album` varchar(128) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Type` varchar(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `SaleDetails`
--

INSERT INTO `SaleDetails` (`ID`, `SaleID`, `Album`, `Quantity`, `Price`, `Type`) VALUES
(1, 1, '1989', 1, 20.00, 'CD'),
(2, 1, 'Cadillactica', 1, 20.00, 'CD'),
(3, 2, '1989', 1, 20.00, 'CD'),
(4, 2, 'Cadillactica', 1, 20.00, 'CD'),
(5, 3, '1989', 1, 19.99, 'CD'),
(6, 3, 'Cadillactica', 1, 19.99, 'CD'),
(7, 4, '1989', 1, 19.99, 'CD'),
(8, 4, 'Cadillactica', 1, 19.99, 'CD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Sale`
--
ALTER TABLE `Sale`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `SaleDetails`
--
ALTER TABLE `SaleDetails`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Sale`
--
ALTER TABLE `Sale`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `SaleDetails`
--
ALTER TABLE `SaleDetails`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;