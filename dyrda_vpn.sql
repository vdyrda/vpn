-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 02, 2017 at 01:33 AM
-- Server version: 5.6.34
-- PHP Version: 5.6.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dyrda_vpn`
--
CREATE DATABASE IF NOT EXISTS `dyrda_vpn` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dyrda_vpn`;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `quota` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `quota`) VALUES
(1, 'Apple', 10995116277760),
(2, 'Alibaba', 1099511627776);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `time_stamp` timestamp NOT NULL,
  `url` text NOT NULL,
  `size` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `user_id`, `time_stamp`, `url`, `size`) VALUES
(1, 4, '2016-10-31 22:04:45', 'http://xxxx.xxx/xx.xx', 132070244352),
(4, 5, '2016-11-10 12:15:13', 'http://xxxx.xxx/xx.xx', 1649267441664),
(5, 4, '2016-11-13 11:35:20', 'http://xxxx.xxx/xx.xx', 193273528320),
(6, 1, '2016-11-15 12:05:06', 'http://xxxx.xxx/xx.xx', 111669149696),
(7, 1, '2016-11-15 13:01:01', 'http://xxxx.xxx/xx.xx', 370440929280),
(8, 5, '2016-11-15 15:05:01', 'http://xxxx.xxx/xx.xx', 5497558138880),
(9, 5, '2016-11-15 18:01:01', 'http://xxxx.xxx/xx.xx', 3298534883328),
(10, 2, '2016-11-16 11:13:13', 'http://xxxx.xxx/xx.xx', 286689067008),
(11, 3, '2016-11-17 12:14:14', 'http://xxxx.xxx/xx.xx', 610959097856),
(12, 3, '2016-11-19 15:17:17', 'http://xxxx.xxx/xx.xx', 251255586816);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `company_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `company_id`, `name`, `email`) VALUES
(1, 2, 'John', 'John@doe.com'),
(2, 2, 'Jane', 'jane@doe.com'),
(3, 1, 'Jim', 'jim@doe.com'),
(4, 1, 'Richard', 'richard@apple.com'),
(5, 1, 'Picasso', 'picasso@apple.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
