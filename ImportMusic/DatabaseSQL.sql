-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Dec 03, 2014 at 07:54 PM
-- Server version: 5.5.38
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `ImportMusic`
--

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
`ID` int(11) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Total` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`ID`, `Date`, `Total`) VALUES
(45, '2014-12-02 22:22:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetail`
--

CREATE TABLE `OrderDetail` (
`ID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Album` varchar(255) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Total` decimal(11,0) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Dumping data for table `OrderDetail`
--

INSERT INTO `OrderDetail` (`ID`, `OrderID`, `Album`, `Quantity`, `Total`) VALUES
(39, 45, 'A', 0, 0),
(40, 45, 'A', 0, 0),
(41, 45, 'A', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `OrderDetail`
--
ALTER TABLE `OrderDetail`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Order`
--
ALTER TABLE `Order`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `OrderDetail`
--
ALTER TABLE `OrderDetail`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;