-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2024 at 06:38 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `java_project_diary`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorities`
--

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `authorities`
--

INSERT INTO `authorities` (`username`, `authority`) VALUES
('dhruv', 'ROLE_USER'),
('john', 'ROLE_USER'),
('susan', 'ROLE_ADMIN'),
('susan', 'ROLE_USER'),
('user1', 'ROLE_USER'),
('user10', 'ROLE_USER'),
('user2', 'ROLE_USER'),
('user3', 'ROLE_USER'),
('user4', 'ROLE_USER'),
('user5', 'ROLE_USER'),
('user6', 'ROLE_USER'),
('user7', 'ROLE_USER'),
('user8', 'ROLE_USER'),
('user9', 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `diary`
--

CREATE TABLE `diary` (
  `id` int(11) NOT NULL,
  `owner` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `type` varchar(10) NOT NULL,
  `content` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diary`
--

INSERT INTO `diary` (`id`, `owner`, `date`, `type`, `content`) VALUES
(7, 'susan', '2024-03-23', 'private', 'susan1 private changed.'),
(8, 'john', '2024-03-23', 'public', 'jhon1 public'),
(12, 'john', '2024-03-24', 'private', 'this is updated content.'),
(13, 'john', '2024-03-25', 'public', 'this is a public diary on date 2024-03-25'),
(14, 'user1', '2024-03-26', 'public', 'This is a public diary entry for user1 on 2024-03-26'),
(15, 'user1', '2024-03-27', 'public', 'This is another public diary entry for user1 on 2024-03-27'),
(16, 'user2', '2024-03-26', 'private', 'This is a private diary entry for user2 on 2024-03-26'),
(17, 'user2', '2024-03-27', 'private', 'This is another private diary entry for user2 on 2024-03-27'),
(18, 'user3', '2024-03-26', 'public', 'This is a public diary entry for user3 on 2024-03-26'),
(19, 'user3', '2024-03-26', 'private', 'This is a private diary entry for user3 on 2024-03-26'),
(20, 'user4', '2024-03-26', 'public', 'This is a public diary entry for user4 on 2024-03-26'),
(21, 'user4', '2024-03-27', 'public', 'This is another public diary entry for user4 on 2024-03-27'),
(22, 'user5', '2024-03-26', 'private', 'This is a private diary entry for user5 on 2024-03-26'),
(23, 'user5', '2024-03-27', 'private', 'This is another private diary entry for user5 on 2024-03-27'),
(24, 'user6', '2024-03-26', 'public', 'This is a public diary entry for user6 on 2024-03-26'),
(25, 'user6', '2024-03-26', 'private', 'This is a private diary entry for user6 on 2024-03-26'),
(26, 'user7', '2024-03-26', 'public', 'This is a public diary entry for user7 on 2024-03-26'),
(27, 'user7', '2024-03-27', 'public', 'This is another public diary entry for user7 on 2024-03-27'),
(28, 'user8', '2024-03-26', 'private', 'This is a private diary entry for user8 on 2024-03-26'),
(29, 'user8', '2024-03-27', 'private', 'This is another private diary entry for user8 on 2024-03-27'),
(30, 'user9', '2024-03-26', 'public', 'This is a public diary entry for user9 on 2024-03-26'),
(31, 'user9', '2024-03-26', 'private', 'This is a private diary entry for user9 on 2024-03-26'),
(32, 'user10', '2024-03-26', 'public', 'This is a public diary entry for user10 on 2024-03-26'),
(33, 'user10', '2024-03-27', 'public', 'This is another public diary entry for user10 on 2024-03-27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `enabled`) VALUES
('dhruv', '{noop}test123', 1),
('john', '{noop}test123', 1),
('susan', '{noop}test123', 1),
('user1', '{noop}password1', 1),
('user10', '{noop}password10', 1),
('user2', '{noop}password2', 1),
('user3', '{noop}password3', 1),
('user4', '{noop}password4', 1),
('user5', '{noop}password5', 1),
('user6', '{noop}password6', 1),
('user7', '{noop}password7', 1),
('user8', '{noop}password8', 1),
('user9', '{noop}password9', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorities`
--
ALTER TABLE `authorities`
  ADD UNIQUE KEY `authorities_idx_1` (`username`,`authority`);

--
-- Indexes for table `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diary`
--
ALTER TABLE `diary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authorities`
--
ALTER TABLE `authorities`
  ADD CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
