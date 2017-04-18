#删除已有数据库
drop database if exists news;
#先创建好数据库并打开设置UTF-8编码格式
create database news
CHARACTER SET 'utf8'
COLLATE 'utf8_general_ci';
use news;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `news`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
      `id` int(10) unsigned zerofill NOT NULL COMMENT '新闻id',
      `title` varchar(50) DEFAULT NULL COMMENT '新闻标题',
      `content` varchar(10000) DEFAULT NULL COMMENT '新闻内容',
      `time` date DEFAULT NULL COMMENT '新闻发布时间',
      `source` varchar(20) DEFAULT NULL COMMENT '新闻来源的网站'

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '新闻id';
