-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 10, 2017 at 06:08 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `news`
--

-- --------------------------------------------------------

--
-- Table structure for table `eco`
--

CREATE TABLE `eco` (
  `id` int(10) unsigned zerofill NOT NULL COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '新闻标题',
  `time` varchar(50) NOT NULL COMMENT '发布时间',
  `author` varchar(50) NOT NULL,
  `count` bigint(20) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `imgUrl` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2796 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `edu`
--

CREATE TABLE `edu` (
  `id` int(10) unsigned zerofill NOT NULL,
  `title` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `count` bigint(20) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `imgUrl` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=613 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mli`
--

CREATE TABLE `mli` (
  `id` int(10) unsigned zerofill NOT NULL COMMENT 'æ–°é—»id',
  `title` varchar(50) NOT NULL COMMENT 'æ–°é—»æ ‡é¢˜',
  `time` varchar(50) NOT NULL COMMENT 'æ–°é—»å‘å¸ƒæ—¶é—´',
  `author` varchar(50) NOT NULL,
  `count` bigint(20) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `imgUrl` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2741 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `preference`
--

CREATE TABLE `preference` (
  `user_name` varchar(20) NOT NULL,
  `type` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='prefernce for type of news';

--
-- Dumping data for table `preference`
--

INSERT INTO `preference` (`user_name`, `type`) VALUES
('achao@zju', 'mli'),
('achao@zju', 'sci'),
('achao@zju', 'edu'),
('achao@zju', 'spo'),
('achao@zju', 'eco'),
('123333', 'mli'),
('123333', 'sci'),
('123333', 'spo'),
('123333', 'eco');

-- --------------------------------------------------------

--
-- Table structure for table `sci`
--

CREATE TABLE `sci` (
  `id` int(10) unsigned zerofill NOT NULL COMMENT 'æ–°é—»id',
  `title` varchar(50) NOT NULL COMMENT 'æ–°é—»æ ‡é¢˜',
  `time` varchar(50) NOT NULL COMMENT 'æ–°é—»å‘å¸ƒæ—¶é—´',
  `author` varchar(50) NOT NULL,
  `count` bigint(20) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `imgUrl` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=688 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `spo`
--

CREATE TABLE `spo` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT 'æ–°é—»æ ‡é¢˜',
  `time` varchar(50) NOT NULL COMMENT 'æ–°é—»å‘å¸ƒæ—¶é—´',
  `author` varchar(50) NOT NULL,
  `count` bigint(20) NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `imgUrl` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `password`, `email`) VALUES
('', '', ''),
('123333', '123456', 'a@aa.com'),
('123456', '123456', '123456'),
('1234567', '123456', 'c@bb.com'),
('231232', '123456', 'q@q.com'),
('achao@zju', '123456', 'a@a.com'),
('sss', '', ''),
('ssssss', '123456', 'b@bb.com'),
('sssssss', '123456', 'sss@ss.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eco`
--
ALTER TABLE `eco`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `edu`
--
ALTER TABLE `edu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mli`
--
ALTER TABLE `mli`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sci`
--
ALTER TABLE `sci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spo`
--
ALTER TABLE `spo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eco`
--
ALTER TABLE `eco`
  MODIFY `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',AUTO_INCREMENT=2796;
--
-- AUTO_INCREMENT for table `edu`
--
ALTER TABLE `edu`
  MODIFY `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=613;
--
-- AUTO_INCREMENT for table `mli`
--
ALTER TABLE `mli`
  MODIFY `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'æ–°é—»id',AUTO_INCREMENT=2741;
--
-- AUTO_INCREMENT for table `sci`
--
ALTER TABLE `sci`
  MODIFY `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'æ–°é—»id',AUTO_INCREMENT=688;
--
-- AUTO_INCREMENT for table `spo`
--
ALTER TABLE `spo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;