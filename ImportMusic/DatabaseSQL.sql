-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Dec 06, 2014 at 01:40 AM
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
  `Total` decimal(10,0) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Sale`
--

INSERT INTO `Sale` (`ID`, `Date`, `Total`) VALUES
(1, '2014-12-06 00:35:34', 0),
(2, '2014-12-06 00:36:50', 0),
(3, '2014-12-06 00:37:46', 100),
(4, '2014-12-06 00:38:41', 0),
(5, '2014-12-06 00:39:15', 40);

-- --------------------------------------------------------

--
-- Table structure for table `SaleDetails`
--

CREATE TABLE `SaleDetails` (
`ID` int(11) NOT NULL,
  `SaleID` int(11) NOT NULL,
  `Album` varchar(128) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,0) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `SaleDetails`
--

INSERT INTO `SaleDetails` (`ID`, `SaleID`, `Album`, `Quantity`, `Price`) VALUES
(1, 5, 'yes', 2, 10),
(2, 5, 'no', 2, 10);

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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `SaleDetails`
--
ALTER TABLE `SaleDetails`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;