-- --------------------------------------------------------
-- 主机:                           localhost
-- 服务器版本:                        10.11.2-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 financial_accounting 的数据库结构
CREATE DATABASE IF NOT EXISTS `financial_accounting` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `financial_accounting`;

-- 导出  表 financial_accounting.account 结构
CREATE TABLE IF NOT EXISTS `account` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `number` varchar(191) DEFAULT NULL,
  `type` varchar(191) NOT NULL,
  `funds` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 数据导出被取消选择。

-- 导出  表 financial_accounting.invoice 结构
CREATE TABLE IF NOT EXISTS `invoice` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `typeId` varchar(191) NOT NULL,
  `accountId` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `datetime` datetime(3) DEFAULT current_timestamp(3),
  `status` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Invoice_typeId_fkey` (`typeId`),
  KEY `Invoice_accountId_fkey` (`accountId`),
  CONSTRAINT `Invoice_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Invoice_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 数据导出被取消选择。

-- 导出  表 financial_accounting.type 结构
CREATE TABLE IF NOT EXISTS `type` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 数据导出被取消选择。

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
