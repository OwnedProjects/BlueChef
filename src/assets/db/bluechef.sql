-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2018 at 08:11 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluechef`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_register`
--

CREATE TABLE `account_register` (
  `id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `payment_mode` varchar(200) NOT NULL,
  `received_by` varchar(200) NOT NULL,
  `remarks` text NOT NULL,
  `expense_id` int(11) NOT NULL,
  `bill_id` int(11) DEFAULT NULL,
  `supplier_bill_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bill_register`
--

CREATE TABLE `bill_register` (
  `id` int(11) NOT NULL,
  `status` varchar(200) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill_register`
--

INSERT INTO `bill_register` (`id`, `status`, `amount`, `date`, `order_id`) VALUES
(2, 'Pending', 2000, '2018-10-04 11:16:31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `expense_register`
--

CREATE TABLE `expense_register` (
  `id` int(11) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `details` text NOT NULL,
  `paid_by` varchar(200) NOT NULL,
  `paid_to` varchar(200) NOT NULL,
  `amount` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expense_register`
--

INSERT INTO `expense_register` (`id`, `date`, `details`, `paid_by`, `paid_to`, `amount`, `remarks`, `user_id`) VALUES
(1, '2018-10-03 15:15:36', 'Expense for buying vegetables', 'Sufiyan', 'Shahrukh', 5000, '', 6),
(2, '2018-10-05 11:15:36', 'Expense for buying milk', 'Shahrukh', 'Sufiyan', 8000, '', 5);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_register`
--

CREATE TABLE `hotel_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `contact_person` varchar(200) NOT NULL,
  `contact_number` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotel_register`
--

INSERT INTO `hotel_register` (`id`, `name`, `address`, `contact_person`, `contact_number`, `user_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 'Alhumdulillah Hotel', 'Kausarbaugh, Kondhwa', 'Sufiyan', 9890123456, 7, 1, '2018-10-04 11:25:19', 1, '2018-10-04 11:25:19', NULL, NULL),
(2, 'Madinah Hotel', 'NIBM Rd, Kondhwa', 'Shahrukh', 9822123456, 8, 1, '2018-10-04 13:25:19', 1, '2018-10-04 13:25:19', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_order_register`
--

CREATE TABLE `inventory_order_register` (
  `id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory_order_register`
--

INSERT INTO `inventory_order_register` (`id`, `inventory_id`, `order_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_register`
--

CREATE TABLE `inventory_register` (
  `id` int(11) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `rate` int(11) NOT NULL,
  `material_in_or_out` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `supplier_bill_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table is used to manage the materials which came in or went out of inventory';

--
-- Dumping data for table `inventory_register`
--

INSERT INTO `inventory_register` (`id`, `quantity`, `rate`, `material_in_or_out`, `date`, `product_id`, `supplier_id`, `supplier_bill_id`, `user_id`) VALUES
(1, '15 kilos', 120, 'In', '2018-10-02 10:17:43', 4, 2, 2, 1),
(2, '10 kilos', 180, 'In', '2018-10-04 10:17:43', 6, 2, 4, 1),
(3, '10 kilos', 360, 'In', '2018-10-03 14:54:43', 7, 3, 4, 6),
(4, '50', 100, 'In', '2018-10-03 10:29:56', 2, 2, 3, 5),
(5, '10', 100, 'Out', '2018-10-03 16:16:56', 2, 2, 3, 5),
(6, '10', 100, 'Out', '2018-10-03 20:20:43', 2, 2, 3, 6),
(7, '15', 10, 'In', '2018-10-14', 1, 1, 7, 7),
(8, '2', 25, 'In', '1539353619525', 5, 3, 9, 7);

-- --------------------------------------------------------

--
-- Table structure for table `menu_register`
--

CREATE TABLE `menu_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `menu_type_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu_register`
--

INSERT INTO `menu_register` (`id`, `name`, `menu_type_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 'Biryani', 4, 1, '2018-10-06 12:51:33', 1, '2018-10-07 00:29:12', NULL, NULL),
(2, 'Chicken Tandoori', 3, 1, '2018-10-06 12:51:33', 1, '2018-10-07 00:29:15', NULL, NULL),
(7, 'Pulao', 4, 5, '2018-10-06 13:00:36', 5, '2018-10-07 00:29:18', NULL, NULL),
(8, 'Gajar Halwa', 5, 5, '2018-10-06 13:00:36', 5, '2018-10-07 00:29:22', NULL, NULL),
(9, 'Pulao', 4, 5, '2018-10-06 13:01:11', 5, '2018-10-07 00:29:25', NULL, NULL),
(10, 'Gajar Halwa', 5, 5, '2018-10-06 13:01:11', 5, '2018-10-07 00:29:30', NULL, NULL),
(11, 'Chicken Tika', 3, 1, '2018-10-06 13:02:24', 1, '2018-10-07 00:29:35', NULL, NULL),
(12, 'Dudhi Halwa', 5, 6, '2018-10-06 13:02:24', 6, '2018-10-07 00:29:38', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu_type_register`
--

CREATE TABLE `menu_type_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu_type_register`
--

INSERT INTO `menu_type_register` (`id`, `name`) VALUES
(1, 'Breakfast'),
(2, 'Snacks'),
(3, 'Starters'),
(4, 'Main Course'),
(5, 'Desserts');

-- --------------------------------------------------------

--
-- Table structure for table `order_delivery_register`
--

CREATE TABLE `order_delivery_register` (
  `id` int(11) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `delivery_mode` varchar(200) DEFAULT NULL,
  `accepted_by` varchar(200) DEFAULT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_delivery_register`
--

INSERT INTO `order_delivery_register` (`id`, `date`, `delivery_mode`, `accepted_by`, `order_id`) VALUES
(1, '2018-10-03 12:33:54', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_details_register`
--

CREATE TABLE `order_details_register` (
  `id` int(11) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `rate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details_register`
--

INSERT INTO `order_details_register` (`id`, `quantity`, `order_id`, `menu_id`, `rate_id`) VALUES
(13, '2', 22, 1, 0),
(14, '2', 23, 2, 0),
(15, '4', 24, 11, 0),
(16, '5', 25, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_register`
--

CREATE TABLE `order_register` (
  `id` int(11) NOT NULL,
  `order_date` varchar(20) NOT NULL,
  `delivery_date` varchar(20) NOT NULL,
  `order_by` varchar(200) NOT NULL,
  `contact_number` bigint(20) NOT NULL,
  `order_status` varchar(200) NOT NULL,
  `remarks` text,
  `delivery_status` varchar(200) DEFAULT NULL,
  `hotel_id` int(11) NOT NULL,
  `accepted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_register`
--

INSERT INTO `order_register` (`id`, `order_date`, `delivery_date`, `order_by`, `contact_number`, `order_status`, `remarks`, `delivery_status`, `hotel_id`, `accepted_by`) VALUES
(22, '1538896883682', '1538896883682', 'Shahrukh', 9822123456, 'open', '', 'open', 2, NULL),
(23, '1538897585804', '1538897585804', 'Sufiyan', 9890123456, 'open', '', 'open', 1, NULL),
(24, '1538897679024', '1538897679024', 'Sufiyan', 9890123456, 'open', '', 'open', 1, NULL),
(25, '1538901464469', '1538901464469', 'Sufiyan', 9890123456, 'open', '', 'open', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_register`
--

CREATE TABLE `product_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `unit_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_register`
--

INSERT INTO `product_register` (`id`, `name`, `unit_id`) VALUES
(1, 'Basmati Rice', 1),
(2, 'Tandoori Chicken', 2),
(3, 'Regular Rice', 1),
(4, 'Regular Chicken', 1),
(5, 'Toor Daal', 1),
(6, 'Mutton', 1),
(7, 'Paneer', 1),
(8, 'Milk', 5),
(9, 'Garam Masala', 3),
(10, 'Oil', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_supplier_register`
--

CREATE TABLE `product_supplier_register` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_supplier_register`
--

INSERT INTO `product_supplier_register` (`id`, `product_id`, `supplier_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 1, 2, 1, '2018-10-07 00:20:58', 1, '2018-10-07 00:20:58', NULL, NULL),
(2, 2, 1, 5, '2018-10-07 00:20:58', 5, '2018-10-07 00:20:58', NULL, NULL),
(3, 1, 2, 5, '2018-10-02 12:31:04', 5, '2018-10-02 12:31:04', NULL, NULL),
(4, 2, 1, 6, '2018-10-02 12:31:04', 6, '2018-10-02 12:31:04', NULL, NULL),
(5, 1, 1, 1, '2018-10-03 15:31:04', 5, '2018-10-03 15:31:04', NULL, NULL),
(6, 3, 2, 6, '2018-10-02 18:31:04', 6, '2018-10-02 18:31:04', NULL, NULL),
(7, 7, 3, 1, '2018-10-04 10:31:04', 5, '2018-10-04 10:31:04', NULL, NULL),
(8, 8, 3, 6, '2018-10-03 13:31:04', 6, '2018-10-03 13:31:04', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rate_register`
--

CREATE TABLE `rate_register` (
  `id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `rate_unit_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rate_register`
--

INSERT INTO `rate_register` (`id`, `rate`, `menu_id`, `rate_unit_id`, `hotel_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 200, 2, 2, 1, 8, '2018-10-07 11:47:41', 0, '2018-10-07 11:47:41', NULL, NULL),
(2, 100, 1, 5, 1, 7, '2018-10-07 11:48:09', 0, '2018-10-07 11:48:09', NULL, NULL),
(3, 400, 11, 3, 1, 7, '2018-10-07 11:48:28', 0, '2018-10-07 11:48:28', NULL, NULL),
(4, 150, 1, 5, 2, 8, '2018-10-07 11:51:25', 0, '2018-10-07 11:51:25', NULL, NULL),
(5, 200, 12, 5, 2, 8, '2018-10-07 11:51:25', 0, '2018-10-07 11:51:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rate_unit_register`
--

CREATE TABLE `rate_unit_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rate_unit_register`
--

INSERT INTO `rate_unit_register` (`id`, `name`) VALUES
(1, 'Kilos'),
(2, 'Half'),
(3, 'Full'),
(4, 'Litre'),
(5, 'Plate');

-- --------------------------------------------------------

--
-- Table structure for table `stock_register`
--

CREATE TABLE `stock_register` (
  `id` int(11) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock_register`
--

INSERT INTO `stock_register` (`id`, `quantity`, `product_id`) VALUES
(1, '100', 1),
(2, '30', 2),
(3, '100', 3),
(4, '50', 6),
(5, '25', 8);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_bill_register`
--

CREATE TABLE `supplier_bill_register` (
  `id` int(11) NOT NULL,
  `bill_number` varchar(200) NOT NULL,
  `bill_amount` int(11) NOT NULL,
  `bill_date` varchar(20) DEFAULT NULL,
  `bill_status` varchar(200) NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier_bill_register`
--

INSERT INTO `supplier_bill_register` (`id`, `bill_number`, `bill_amount`, `bill_date`, `bill_status`, `supplier_id`) VALUES
(1, '0001', 5000, '2018-10-01 12:32:25', 'Pending', 1),
(2, '245', 3400, '2018-10-03 19:32:25', 'Pending', 1),
(3, '321', 12300, '2018-10-02 13:16:34', 'Paid', 2),
(4, '5872', 19348, '2018-10-04 17:16:34', 'Paid', 3),
(5, '6345', 9873, '2018-10-04 17:25:36', 'Pending', 4),
(6, '', 0, '0000-00-00 00:00:00', 'Pending', 0),
(7, '123', 150, '0000-00-00 00:00:00', 'Pending', 1),
(8, '', 0, '', 'Pending', 0),
(9, '65', 50, '1539353619525', 'Pending', 3);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_register`
--

CREATE TABLE `supplier_register` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `contact_person` varchar(200) NOT NULL,
  `contact_number` bigint(20) NOT NULL,
  `contact_address` varchar(150) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier_register`
--

INSERT INTO `supplier_register` (`id`, `name`, `contact_person`, `contact_number`, `contact_address`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 'ABC Farms', 'Shabib', 9595958584, 'Test abcd', 1, '2018-10-06 12:27:59', 1, '2018-10-14 19:31:00', NULL, NULL),
(2, 'Waseem Groceries', 'Waseem', 9049989211, 'aaa', 1, '2018-10-06 12:28:38', 1, '2018-10-14 19:31:04', NULL, NULL),
(3, 'Sufiyan Dairy', 'Sufiyan', 9545924251, 'bbbb', 1, '2018-10-06 12:29:44', 1, '2018-10-14 19:31:08', NULL, NULL),
(4, 'Shahrukh Vegetables', 'Shahrukh', 8600369676, 'ccccc', 1, '2018-10-06 12:30:44', 1, '2018-10-14 19:31:11', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unit_register`
--

CREATE TABLE `unit_register` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unit_register`
--

INSERT INTO `unit_register` (`id`, `unit_name`) VALUES
(1, 'Kilos'),
(2, 'Number'),
(3, 'Grams'),
(4, 'Mili Grams'),
(5, 'Litre');

-- --------------------------------------------------------

--
-- Table structure for table `user_register`
--

CREATE TABLE `user_register` (
  `id` int(11) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_number` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` varchar(20) DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_on` varchar(20) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_register`
--

INSERT INTO `user_register` (`id`, `first_name`, `last_name`, `user_name`, `password`, `contact_number`, `role_id`, `created_by`, `created_on`, `modified_by`, `modified_on`, `deleted_by`, `deleted_on`) VALUES
(1, 'Shabib', 'Ahmed', 'shabib.ahmed', '8a48ec102b8ab752eacc30a03b71e1b6', 9595958584, 1, 1, '2018-10-06 12:08:51', 1, '2018-10-06 12:08:51', NULL, NULL),
(5, 'Wasim', 'Mulla', 'wasim.mulla', '8a48ec102b8ab752eacc30a03b71e1b6', 9049989211, 2, 1, '2018-10-06 12:23:38', 1, '2018-10-06 12:23:38', NULL, NULL),
(6, 'Maaz', 'Shaikh', 'maaz.shaikh', '8a48ec102b8ab752eacc30a03b71e1b6', 9762843594, 2, 1, '2018-10-06 12:23:38', 1, '2018-10-06 12:23:38', NULL, NULL),
(7, 'Sufiyan', 'Khan', 'sufiyan.khan', '8a48ec102b8ab752eacc30a03b71e1b6', 9545924251, 3, 1, '2018-10-06 18:26:42', 1, '2018-10-06 18:26:42', NULL, NULL),
(8, 'Shahrukh', 'Khan', 'shahrukh.khan', '8a48ec102b8ab752eacc30a03b71e1b6', 8600369676, 3, 1, '2018-10-06 18:27:24', 1, '2018-10-06 18:27:24', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role_register`
--

CREATE TABLE `user_role_register` (
  `id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_role_register`
--

INSERT INTO `user_role_register` (`id`, `type`) VALUES
(1, 'Super Admin'),
(2, 'Admin'),
(3, 'Hotel User'),
(4, 'Caterer Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_register`
--
ALTER TABLE `account_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `expense_id` (`expense_id`),
  ADD UNIQUE KEY `bill_id` (`bill_id`),
  ADD UNIQUE KEY `supplier_bill_id` (`supplier_bill_id`);

--
-- Indexes for table `bill_register`
--
ALTER TABLE `bill_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expense_register`
--
ALTER TABLE `expense_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel_register`
--
ALTER TABLE `hotel_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_order_register`
--
ALTER TABLE `inventory_order_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_register`
--
ALTER TABLE `inventory_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_register`
--
ALTER TABLE `menu_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_type_register`
--
ALTER TABLE `menu_type_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_delivery_register`
--
ALTER TABLE `order_delivery_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details_register`
--
ALTER TABLE `order_details_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_register`
--
ALTER TABLE `order_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_register`
--
ALTER TABLE `product_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_supplier_register`
--
ALTER TABLE `product_supplier_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate_register`
--
ALTER TABLE `rate_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate_unit_register`
--
ALTER TABLE `rate_unit_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_register`
--
ALTER TABLE `stock_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_bill_register`
--
ALTER TABLE `supplier_bill_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_register`
--
ALTER TABLE `supplier_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_register`
--
ALTER TABLE `unit_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_register`
--
ALTER TABLE `user_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `created_by` (`created_by`,`modified_by`,`deleted_by`);

--
-- Indexes for table `user_role_register`
--
ALTER TABLE `user_role_register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_register`
--
ALTER TABLE `account_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bill_register`
--
ALTER TABLE `bill_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expense_register`
--
ALTER TABLE `expense_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hotel_register`
--
ALTER TABLE `hotel_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventory_order_register`
--
ALTER TABLE `inventory_order_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory_register`
--
ALTER TABLE `inventory_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `menu_register`
--
ALTER TABLE `menu_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `menu_type_register`
--
ALTER TABLE `menu_type_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_delivery_register`
--
ALTER TABLE `order_delivery_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_details_register`
--
ALTER TABLE `order_details_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_register`
--
ALTER TABLE `order_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_register`
--
ALTER TABLE `product_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_supplier_register`
--
ALTER TABLE `product_supplier_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rate_register`
--
ALTER TABLE `rate_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rate_unit_register`
--
ALTER TABLE `rate_unit_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock_register`
--
ALTER TABLE `stock_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `supplier_bill_register`
--
ALTER TABLE `supplier_bill_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `supplier_register`
--
ALTER TABLE `supplier_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `unit_register`
--
ALTER TABLE `unit_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_register`
--
ALTER TABLE `user_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_role_register`
--
ALTER TABLE `user_role_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_register`
--
ALTER TABLE `account_register`
  ADD CONSTRAINT `account_register_ibfk_1` FOREIGN KEY (`expense_id`) REFERENCES `expense_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_register_ibfk_2` FOREIGN KEY (`bill_id`) REFERENCES `bill_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_register_ibfk_3` FOREIGN KEY (`supplier_bill_id`) REFERENCES `supplier_bill_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
