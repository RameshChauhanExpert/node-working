-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2019 at 04:19 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `offerlane`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_setting`
--

CREATE TABLE `account_setting` (
  `site_title` varchar(255) DEFAULT NULL,
  `admin_email_address` varchar(255) DEFAULT NULL,
  `default_meta_title` text,
  `default_meta_description` text,
  `account_setting_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_setting`
--

INSERT INTO `account_setting` (`site_title`, `admin_email_address`, `default_meta_title`, `default_meta_description`, `account_setting_id`) VALUES
('offerlane', 'rajat@evincedev.com', 'Property,Seller,Buyer', 'Property,Seller,Buyer1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cms`
--

CREATE TABLE `cms` (
  `entity_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `meta_keyword` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms`
--

INSERT INTO `cms` (`entity_id`, `title`, `slug`, `content`, `image`, `status`, `meta_title`, `meta_description`, `meta_keyword`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'About Us', 'about-us-1', '<p>hi Ramesh</p>', 'gfga', 0, 'about', 'about page', 'about page', 1, '2019-04-23 07:12:27', 1, '2019-04-27 01:45:25');

-- --------------------------------------------------------

--
-- Table structure for table `cms_about_us`
--

CREATE TABLE `cms_about_us` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `section1_title` varchar(255) NOT NULL,
  `section1_description` text NOT NULL,
  `section1_image` varchar(255) NOT NULL,
  `section2_title` varchar(255) NOT NULL,
  `section2_description` text NOT NULL,
  `section2_image1` varchar(255) NOT NULL,
  `section2_hover_image1` varchar(255) NOT NULL,
  `section2_title1` varchar(255) NOT NULL,
  `section2_desc1` text NOT NULL,
  `section2_image2` varchar(255) NOT NULL,
  `section2_hover_image2` varchar(255) NOT NULL,
  `section2_title2` varchar(255) NOT NULL,
  `section2_desc2` text NOT NULL,
  `section2_image3` varchar(255) NOT NULL,
  `section2_hover_image3` varchar(255) NOT NULL,
  `section2_title3` varchar(255) NOT NULL,
  `section2_desc3` text NOT NULL,
  `section3_title` varchar(255) NOT NULL,
  `section3_description` text NOT NULL,
  `section3_image` varchar(255) NOT NULL,
  `section4_title` varchar(255) NOT NULL,
  `section4_description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_about_us`
--

INSERT INTO `cms_about_us` (`id`, `image`, `main_title`, `section1_title`, `section1_description`, `section1_image`, `section2_title`, `section2_description`, `section2_image1`, `section2_hover_image1`, `section2_title1`, `section2_desc1`, `section2_image2`, `section2_hover_image2`, `section2_title2`, `section2_desc2`, `section2_image3`, `section2_hover_image3`, `section2_title3`, `section2_desc3`, `section3_title`, `section3_description`, `section3_image`, `section4_title`, `section4_description`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'cms/cms_about_us/125299dbfd4874812ecbfd11f03d6208.jpg', 'About Us', 'About Offerlane Properties', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas cumsan lacus vel facilisis', 'cms/cms_about_us/e970e3b2b4b61dc0281e4c321abfb233.jpg', 'Our Values', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'cms/cms_about_us/5fa72be88501daa9c8e4196cfff4adae.jpg', 'cms/cms_about_us/cfcbc759d0f65de9c61e8f70a044c5be.jpg', 'Multiple Offers', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', 'cms/cms_about_us/f20d4ff487a1deff11a1cb96e811a92c.jpg', 'cms/cms_about_us/f1c412085d78f6a874926b07aed8f3a9.jpg', '24 Hours Closing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', 'cms/cms_about_us/24e7f372220df3a270876b7bba818d61.jpg', 'cms/cms_about_us/2584fcd1bca4ef294b42fe9d9af0ccee.jpg', 'All-in one(Consolidated)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do', 'Lets Buy Something Great Together', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'cms/cms_about_us/b0f8e06007e7ce7c501cb522c25f491d.jpg', 'Our Team', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.', 0, '2019-04-26 06:02:05', 0, '2019-04-26 08:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `cms_faqs`
--

CREATE TABLE `cms_faqs` (
  `id` int(11) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content_title` varchar(255) NOT NULL,
  `content_image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_faqs`
--

INSERT INTO `cms_faqs` (`id`, `main_title`, `image`, `content_title`, `content_image`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'Seller FAQ', 'cms/cms_faqs/712953dd69e86306c7112ed21179da53.jpg', 'Have questions about Offerlane?', 'cms/cms_faqs/d9517feaca09b2dc82daef1402fa3c41.jpg', '', 0, '2019-04-26 07:10:58', 0, '2019-04-26 09:17:09'),
(2, 'Buyer FAQ', 'cms/cms_faqs/c25b062b787741774a36b961d85a2c44.jpg', 'Have questions about Offerlane?', 'cms/cms_faqs/836465b0f4db87a8d60b23f7f90c8d7e.jpg', '', 0, '2019-04-26 07:10:58', 0, '2019-04-26 09:14:10');

-- --------------------------------------------------------

--
-- Table structure for table `cms_home`
--

CREATE TABLE `cms_home` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `section1_title` varchar(255) NOT NULL,
  `section1_description` text NOT NULL,
  `section1_image1` varchar(255) NOT NULL,
  `section1_hover_image1` varchar(255) NOT NULL,
  `section1_title1` varchar(255) NOT NULL,
  `section1_desc1` text NOT NULL,
  `section1_image2` varchar(255) NOT NULL,
  `section1_hover_image2` varchar(255) NOT NULL,
  `section1_title2` varchar(255) NOT NULL,
  `section1_desc2` text NOT NULL,
  `section1_image3` varchar(255) NOT NULL,
  `section1_hover_image3` varchar(255) NOT NULL,
  `section1_title3` varchar(255) NOT NULL,
  `section1_desc3` text NOT NULL,
  `section2_title` varchar(255) NOT NULL,
  `section2_image` varchar(255) NOT NULL,
  `section3_image1` varchar(255) NOT NULL,
  `section3_image2` varchar(255) NOT NULL,
  `section3_image3` varchar(255) NOT NULL,
  `section3_title` varchar(255) NOT NULL,
  `section3_description` text NOT NULL,
  `section4_title` varchar(255) NOT NULL,
  `section4_description` text NOT NULL,
  `section4_image` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_home`
--

INSERT INTO `cms_home` (`id`, `title`, `description`, `section1_title`, `section1_description`, `section1_image1`, `section1_hover_image1`, `section1_title1`, `section1_desc1`, `section1_image2`, `section1_hover_image2`, `section1_title2`, `section1_desc2`, `section1_image3`, `section1_hover_image3`, `section1_title3`, `section1_desc3`, `section2_title`, `section2_image`, `section3_image1`, `section3_image2`, `section3_image3`, `section3_title`, `section3_description`, `section4_title`, `section4_description`, `section4_image`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(5, 'Get your property offer in 24 Hours', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Why Sell to Offerlane', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'cms/cms_home/1759b52206886c9932e05efc4a8d5cd3.jpg', 'cms/cms_home/1d5cf63519737b6f0c0ef117f6cb8df5.jpg', 'Multiple Offers', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', 'cms/cms_home/60c1355cdadcbb5ddea7d3d283b6b612.png', 'cms/cms_home/2568169b98580d6876d2bc4eb43e5c11.png', '24 Hours Closing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', 'cms/cms_home/974bfb40e292605c7a722620bb6f7884.jpg', 'cms/cms_home/18e9cc6c83fb2ee0648f66ca00afd3a2.jpg', 'All in one(consolidated)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', 'Built to ease the process of viewing a property', 'cms/cms_home/9d698c16e09c90f13cf816904d67e83e.jpg', 'cms/cms_home/5b8e322c1b8a6c56358dca2e48a78962.jpg', 'cms/cms_home/0ab98e69c3a9b88d340fa30dde29be72.jpg', 'cms/cms_home/bc0f805b96a5bec04b3f0fdb4b1c37e7.jpg', 'Know more about Offerlane properties', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.', 'Sell Us', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.', 'cms/cms_home/de7f4d1bb1b8362e5e4be898f21a57fd.gif', 0, '2019-04-25 08:32:16', 0, '2019-04-25 15:36:16');

-- --------------------------------------------------------

--
-- Table structure for table `cms_how_it_works`
--

CREATE TABLE `cms_how_it_works` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `step1_title` varchar(255) NOT NULL,
  `step1_desc` text NOT NULL,
  `step1_image` varchar(255) NOT NULL,
  `step2_title` varchar(255) NOT NULL,
  `step2_desc` text NOT NULL,
  `step2_image` varchar(255) NOT NULL,
  `step3_title` varchar(255) NOT NULL,
  `step3_desc` text NOT NULL,
  `step3_image` varchar(255) NOT NULL,
  `step4_title` varchar(255) NOT NULL,
  `step4_desc` text NOT NULL,
  `step4_image` varchar(255) NOT NULL,
  `step5_title` varchar(255) NOT NULL,
  `step5_desc` text NOT NULL,
  `step5_image` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_how_it_works`
--

INSERT INTO `cms_how_it_works` (`id`, `image`, `main_title`, `content`, `title`, `description`, `step1_title`, `step1_desc`, `step1_image`, `step2_title`, `step2_desc`, `step2_image`, `step3_title`, `step3_desc`, `step3_image`, `step4_title`, `step4_desc`, `step4_image`, `step5_title`, `step5_desc`, `step5_image`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'cms/cms_how_it_works/1d9f88dc05864c6a9451550b96fb58cc.jpg', 'How it Works', 'To see how offerlane property works Watch the video', 'How Offerlane Works', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'SUBMIT PROPERTY INFORMATION', 'Lorem ipsum dolor sit amet,', 'cms/cms_how_it_works/0b11026a443c8b81e7efc366a58a9dc3.jpg', 'HEADING GOES HERE', 'Lorem ipsum dolor sit amet', 'cms/cms_how_it_works/0010d8a050c3d594ec1e2acbe436fd96.jpg', 'MULTIPLE BUYERS', 'Lorem ipsum dolor sit amet', 'cms/cms_how_it_works/5d79bc293bf3819cb473d380aa99caf8.jpg', 'REVIEW OFFER', 'Lorem ipsum dolor sit amet', 'cms/cms_how_it_works/95f99700b0c8beefd947157a599652cf.jpg', '24 HOUR CLOSING', 'Lorem ipsum dolor sit amet', 'cms/cms_how_it_works/e8cb741930eabc818adea9e91a09ce03.png', 0, '2019-04-26 07:03:10', 0, '2019-04-26 09:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `cms_slider_images`
--

CREATE TABLE `cms_slider_images` (
  `image_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_slider_images`
--

INSERT INTO `cms_slider_images` (`image_id`, `image`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'cms/slider_images/7d63947e2fe81c04945acc0f13775105.jpg', 1, '2019-04-26 06:37:47', 0, '0000-00-00 00:00:00'),
(3, 'cms/slider_images/a1d262f1afb0165a4e71fea7b3438756.jpg', 1, '2019-04-26 06:37:47', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `contact_us_id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` int(15) NOT NULL,
  `message` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`contact_us_id`, `Name`, `email`, `mobile_number`, `message`) VALUES
(1, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(2, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(3, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(4, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(5, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(6, 'bgh', 'sgdfg@df.com', 554654654, 'sdfgsdf'),
(7, 'ghjkg', 'ghj@df.com', 3545, 'sdfgsfd'),
(8, 'dfgh', 'dfgh@fg.com', 443, 'dfgsfdg'),
(9, 'sdfgsdf', 'sdg@df.com', 5646, 'sdfgs'),
(10, 'dfghd', 'fgd@ef.coom', 64645, 'sdfgsd'),
(11, 'fghjf', 'ghj@df.com', 546, 'dfghd@df.com'),
(12, 'fgjfgh', 'jfg@df.com', 55465, 'dfgsd'),
(13, 'sdfgsdfg', 'dfgh@df.com', 54654, 'fghdfg');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `faq_id` int(11) NOT NULL,
  `user_type` enum('Buyer','Seller') NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_search`
--

CREATE TABLE `location_search` (
  `location_id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `county` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location_search`
--

INSERT INTO `location_search` (`location_id`, `area`, `county`, `state`) VALUES
(9, '1600 Pennsylvania Ave NW Northwest Washington Washington 20500 ', '', 'DC'),
(8, '1600 Pennsylvania Ave NW Northwest Washington Washington 20500 ', '', 'DC'),
(7, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(10, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(11, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(12, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(13, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(14, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(15, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(16, 'Lake De Soto Lake City 32055 ', 'Columbia County', 'FL'),
(17, 'Lake De Soto Lake City 32055 ', 'Columbia County', 'FL'),
(18, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(19, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(20, 'Udall 67146 ', 'Cowley County', 'KS'),
(21, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(22, '620 Park Ave Manhattan New York 10065 ', 'New York County', 'NY'),
(23, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(24, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(25, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(26, 'Ualena St Honolulu 96819 ', 'Honolulu County', 'HI'),
(27, 'San Diego College West 92182 ', 'San Diego County', 'CA'),
(28, 'Denver ', 'Denver County', 'CO'),
(29, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(30, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(31, '', '', 'SD'),
(32, '', '', ''),
(33, 'Grapevine 75261 ', 'Tarrant County', 'TX'),
(34, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(35, 'Denver ', 'Denver County', 'CO'),
(36, 'Fort Lauderdale ', 'Broward County', 'FL'),
(37, 'Fort Worth ', 'Tarrant County', 'TX'),
(38, '9449 Friars Rd Mission Valley San Diego 92108 ', 'San Diego County', 'CA'),
(39, 'Fgcu Lake Pkwy E Fort Myers 33965 ', 'Lee County', 'FL'),
(40, 'Emancipation Ave Houston ', 'Harris County', 'TX'),
(41, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(42, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(43, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(44, '', '', 'AL'),
(45, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(46, 'University of North Fl Dr Southside Jacksonville 32224 ', 'Duval County', 'FL'),
(47, '33013 Hialeah ', 'Miami-Dade County', 'FL'),
(48, '33013 Hialeah ', 'Miami-Dade County', 'FL'),
(49, 'County Rd FL Ely Township 49849 ', 'Marquette County', 'MI'),
(50, 'E Princeton St Orlando ', 'Orange County', 'FL'),
(51, 'DFW Airport Grapevine 75261 ', 'Tarrant County', 'TX'),
(52, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(53, 'FGCU Blvd S Fort Myers 33965 ', 'Lee County', 'FL'),
(54, 'DFW Airport Grapevine 75261 ', 'Tarrant County', 'TX'),
(55, '', '', 'FL'),
(56, 'Alachua ', 'Alachua County', 'FL'),
(57, 'Dallas-Fort Worth Metropolitan Area ', '', 'TX'),
(58, '', '', 'AK'),
(59, 'Austin ', 'Travis County', 'TX'),
(60, 'Austin ', 'Travis County', 'TX'),
(61, 'Austin ', 'Travis County', 'TX'),
(62, 'dfgsg Sumrall 39482 ', 'Lamar County', 'MS'),
(63, 'FGCU Blvd S Fort Myers 33965 ', 'Lee County', 'FL'),
(64, '9449 Friars Rd Mission Valley San Diego 92108 ', 'San Diego County', 'CA'),
(65, '', '', 'AK'),
(66, '', '', 'SD'),
(67, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(68, '', '', 'MA'),
(69, 'Asdee Ln Woodbridge Woodbridge 22192 ', 'Prince William County', 'VA'),
(70, '', '', 'AK'),
(71, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(72, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(73, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(74, 'Albuquerque ', 'Bernalillo County', 'NM'),
(75, '', '', 'AK'),
(76, '', '', 'AL'),
(77, '', '', 'AK'),
(78, '', '', 'AK'),
(79, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(80, 'FL-7 ', '', 'FL'),
(81, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(82, 'Houston ', 'Harris County', 'TX'),
(83, '', '', 'OH'),
(84, '', '', 'GA'),
(85, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(86, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(87, '', '', 'SD'),
(88, 'SD 49 E V Ave Vicksburg Schoolcraft Township 49097 ', 'Kalamazoo County', 'MI'),
(89, 'Fgcu Lake Pkwy E Fort Myers 33965 ', 'Lee County', 'FL'),
(90, 'Gfrer Rd Mansfield Mansfield ', 'Richland County', 'OH'),
(91, 'Grand Rapids ', 'Kent County', 'MI'),
(92, 'Honolulu ', 'Honolulu County', 'HI'),
(93, 'Fort Worth ', 'Tarrant County', 'TX'),
(94, 'JGF Farms Lake Jackson Township 65085 ', 'Osage County', 'MO'),
(95, 'H F Shepherd Dr Decatur 30034 ', 'Dekalb County', 'GA'),
(96, 'Hinesville 31313 ', 'Liberty County', 'GA'),
(97, '', '', 'FL'),
(98, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(99, '', '', 'HI'),
(100, 'Tempe 85281 ', 'Maricopa County', 'AZ'),
(101, 'Houston ', 'Harris County', 'TX'),
(102, 'H D Atha Rd Monroe ', 'Walton County', 'GA'),
(103, 'D S Bailey Ln Acres Homes Houston 77091 ', 'Harris County', 'TX'),
(104, 'Dallas ', 'Dallas County', 'TX'),
(105, '', '', 'SD'),
(106, '', '', ''),
(107, 'Houston ', 'Harris County', 'TX'),
(108, '', '', 'AK'),
(109, 'Albuquerque ', 'Bernalillo County', 'NM'),
(110, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(111, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(112, 'Fort Worth ', 'Tarrant County', 'TX'),
(113, 'FGH Building 820 Harrison Ave South End Boston 02118 ', 'Suffolk County', 'MA'),
(114, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(115, 'Dallas ', 'Dallas County', 'TX'),
(116, 'Tempe 85281 ', 'Maricopa County', 'AZ'),
(117, 'FGCU Blvd S Fort Myers 33965 ', 'Lee County', 'FL'),
(118, 'SF ', 'San Francisco County', 'CA'),
(119, 'SF ', 'San Francisco County', 'CA'),
(120, 'Sioux Falls 49-5 ', '', 'SD'),
(121, 'Sioux Falls 49-5 ', '', 'SD'),
(122, 'Northampton 18067 ', 'Northampton County', 'PA'),
(123, 'Sioux Falls 49-5 ', '', 'SD'),
(124, 'Sioux Falls 49-5 ', '', 'SD'),
(125, 'Northampton 18067 ', 'Northampton County', 'PA'),
(126, 'Sioux Falls 49-5 ', '', 'SD'),
(127, 'Sioux Falls 49-5 ', '', 'SD'),
(128, '200 Folsom St South Beach SF 94105 ', 'San Francisco County', 'CA'),
(129, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(130, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(131, 'FSW Pkwy Fort Myers 33919 ', 'Lee County', 'FL'),
(132, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(133, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(134, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(135, '5830 North Bend 98045 ', 'King County', 'WA'),
(136, '5830 North Bend 98045 ', 'King County', 'WA'),
(137, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(138, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(139, '5830 North Bend 98045 ', 'King County', 'WA'),
(140, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(141, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(142, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(143, 'Avondale Jacksonville 32205 ', 'Duval County', 'FL'),
(144, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(145, '5830 North Bend 98045 ', 'King County', 'WA'),
(146, 'Northside Jacksonville 32218 ', 'Duval County', 'FL'),
(147, 'Rtj Rd Anacoco 2 71403 ', 'Vernon Parish', 'LA'),
(148, 'Rtj Rd Anacoco 2 71403 ', 'Vernon Parish', 'LA'),
(149, 'Rtj Rd 2 71403 ', 'Vernon Parish', 'LA'),
(150, '', '', 'OH'),
(151, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(152, '5656 N Central Expy Lower Greenville Dallas 75205 ', 'Dallas County', 'TX'),
(153, '5656 N Central Expy Lower Greenville Dallas 75205 ', 'Dallas County', 'TX'),
(154, '5656 Westheimer Rd Westside Houston 77056 4002 ', 'Harris County', 'TX'),
(155, '', '', 'GA'),
(156, 'Issaquah ', 'King County', 'WA'),
(157, '', '', 'HI'),
(158, 'Housing and Dining Administration Building Torrey Pines San Diego 92161 ', 'San Diego County', 'CA'),
(159, 'Housing and Dining Administration Building Torrey Pines San Diego 92161 ', 'San Diego County', 'CA'),
(160, 'FGH Building 820 Harrison Ave South End Boston 02118 ', 'Suffolk County', 'MA'),
(161, 'FGH Building 820 Harrison Ave South End Boston 02118 ', 'Suffolk County', 'MA'),
(162, 'Fjord Dr NE Poulsbo 98370 ', 'Kitsap County', 'WA'),
(163, 'DFW Airport Grapevine 75261 ', 'Tarrant County', 'TX'),
(164, 'Fdr Drive Service Rd E Manhattan New York ', 'New York County', 'NY'),
(165, 'Manhattan New York 10016 ', 'New York County', 'NY'),
(166, 'DFW Airport Grapevine 75261 ', 'Tarrant County', 'TX'),
(167, '', '', 'FL'),
(168, 'FH-45 Fuller Hill Rd Alexander City 35010 ', 'Tallapoosa County', 'AL'),
(169, 'Popovich Hall South Los Angeles Los Angeles 90089 ', 'Los Angeles County', 'CA'),
(170, 'Popovich Hall South Los Angeles Los Angeles 90089 ', 'Los Angeles County', 'CA'),
(171, 'Jk Powell Blvd Whiteville Whiteville 28472 ', 'Columbus County', 'NC'),
(172, '5452 Chestnut St West Philadelphia Philadelphia 19139 3368 ', 'Philadelphia County', 'PA'),
(173, 'FDR Dr. Brooklyn ', 'Kings County', 'NY'),
(174, 'Southwest Washington Washington ', '', 'DC'),
(175, 'Southwest Washington Washington ', '', 'DC'),
(176, 'Southwest Washington Washington ', '', 'DC'),
(177, 'FDR Dr. Brooklyn ', 'Kings County', 'NY'),
(178, 'Southwest Washington Washington ', '', 'DC'),
(179, 'Southwest Washington Washington ', '', 'DC'),
(180, 'Fdr Drive Service Rd E Manhattan New York ', 'New York County', 'NY'),
(181, 'FDR Dr. Brooklyn ', 'Kings County', 'NY'),
(182, 'Fort Lauderdale ', 'Broward County', 'FL'),
(183, 'Fort Lauderdale ', 'Broward County', 'FL'),
(184, 'Forest Service F566C Troy 29848 ', 'Greenwood County', 'SC'),
(185, 'Forest Service F566C Troy 29848 ', 'Greenwood County', 'SC'),
(186, 'Forest Service F566C Troy 29848 ', 'Greenwood County', 'SC'),
(187, 'Forest Service F566C Troy 29848 ', 'Greenwood County', 'SC'),
(188, 'FGCU Blvd S Fort Myers 33965 ', 'Lee County', 'FL'),
(189, '', '', 'HI'),
(190, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(191, '6770 Market St Upper Darby 19082 2432 ', 'Delaware County', 'PA'),
(192, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(193, 'Cfd 23 Mountain Home Mountain Home Township 72653 ', 'Baxter County', 'AR'),
(194, '', '', 'AZ'),
(195, 'Dallas ', 'Dallas County', 'TX'),
(196, 'G.G. Brown Building 2350 Hayward St Northside Ann Arbor 48109 ', 'Washtenaw County', 'MI'),
(197, 'Gates Dell Complex 2317 Speedway University of Texas at Austin Austin 78712 ', 'Travis County', 'TX'),
(198, '', '', 'SD'),
(199, 'Co Rd 3812 Terrell ', 'Kaufman County', 'TX'),
(200, 'FH-45 Fuller Hill Rd Alexander City 35010 ', 'Tallapoosa County', 'AL'),
(201, 'Alachua St Corkscrew Immokalee 34142 ', 'Collier County', 'FL'),
(202, 'Anaheim ', 'Orange County', 'CA'),
(203, 'Alachua Pl New Port Richey 34655 ', 'Pasco County', 'FL'),
(204, 'Alachua St Corkscrew Immokalee 34142 ', 'Collier County', 'FL'),
(205, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(206, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(207, 'Alachua St Corkscrew Immokalee 34142 ', 'Collier County', 'FL'),
(208, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(209, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(210, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(211, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(212, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(213, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(214, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(215, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(216, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(217, '15 NW 1st St City Central Gresham 97030 7213 ', 'Multnomah County', 'OR'),
(218, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(219, '15 NW 1st St Downtown Miami Miami 33128 1814 ', 'Miami-Dade County', 'FL'),
(220, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(221, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(222, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(223, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(224, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(225, '561 Greenwich St Manhattan New York 10014 ', 'New York County', 'NY'),
(226, '56 7th Ave Manhattan New York 10011 ', 'New York County', 'NY'),
(227, '565 Boylston St Back Bay Boston 02116 ', 'Suffolk County', 'MA'),
(228, '56L Watts Rd Woodworth E 71485 ', 'Rapides Parish', 'LA'),
(229, '56L Watts Rd Woodworth E 71485 ', 'Rapides Parish', 'LA'),
(230, '563 Massachusetts Ave The Port Cambridge 02139 4030 ', 'Middlesex County', 'MA'),
(231, '56 3rd Ave Manhattan New York 10003 ', 'New York County', 'NY'),
(232, '56F Shrewsbury Green Dr Shrewsbury 01545 3621 ', 'Worcester County', 'MA'),
(233, '56F S Union St East Avenue Rochester 14607 ', 'Monroe County', 'NY'),
(234, '561 Greenwich St Manhattan New York 10014 ', 'New York County', 'NY'),
(235, '5623 N Clark St Andersonville Chicago 60660 ', 'Cook County', 'IL'),
(236, '2552 Massachusetts Ave North Cambridge Cambridge 02140 1630 ', 'Middlesex County', 'MA'),
(237, '25525 Southwest Fwy Sugar Land 77479 ', 'Fort Bend County', 'TX'),
(238, '25525 Southwest Fwy Sugar Land 77479 ', 'Fort Bend County', 'TX'),
(239, 'Yturria Drive Belton 76513 ', 'Bell County', 'TX'),
(240, 'Yturria Drive Belton 76513 ', 'Bell County', 'TX'),
(241, 'Yturria 78580 ', 'Willacy County', 'TX'),
(242, 'Virginia Beach Northwest 23462 ', '', 'VA'),
(243, 'JGF Farms Lake Jackson Township 65085 ', 'Osage County', 'MO'),
(244, 'Abilene ', 'Taylor County', 'TX'),
(245, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(246, 'Alachua St Fernandina Beach 32034 ', 'Nassau County', 'FL'),
(247, 'Austin ', 'Travis County', 'TX'),
(248, 'Asdee Ln Woodbridge Woodbridge 22192 ', 'Prince William County', 'VA'),
(249, '223 E Concord St Lake Eola Heights Orlando 32801 ', 'Orange County', 'FL'),
(250, 'Escondido ', 'San Diego County', 'CA'),
(251, 'Jd Yarnell Industrial Pkwy Clinton 37716 ', 'Anderson County', 'TN'),
(252, 'Affton 63123 ', 'St Louis County', 'MO'),
(253, '', '', ''),
(254, 'Fort Worth ', 'Tarrant County', 'TX'),
(255, '', '', 'FL'),
(256, '', '', 'FL'),
(257, '', '', ''),
(258, '', '', ''),
(259, '', '', ''),
(260, '', '', ''),
(261, 'Los Angeles ', 'Los Angeles County', 'CA'),
(262, 'Los Angeles ', 'Los Angeles County', 'CA'),
(263, '', '', 'AZ'),
(264, '', '', ''),
(265, '', '', ''),
(266, '', '', ''),
(267, '', '', ''),
(268, '', '', ''),
(269, '1600 Pennsylvania Ave NW Northwest Washington Washington 20500 ', '', 'DC'),
(270, '', 'Bay County', 'FL'),
(271, '', 'Bay County', 'FL'),
(272, '', 'Baker County', 'FL'),
(273, '', 'Baker County', 'FL'),
(274, 'Whittier ', 'Los Angeles County', 'CA'),
(275, 'Whittier ', 'Los Angeles County', 'CA'),
(276, 'White Plains ', 'Westchester County', 'NY'),
(277, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(278, '1325 Boylston St West Fens Boston 02215 3909 ', 'Suffolk County', 'MA'),
(279, '1085-1087 Boylston St Fenway/Kenmore Boston 02215 ', 'Suffolk County', 'MA'),
(280, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(281, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(282, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(283, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(284, '1260 Massachusetts Ave Arlington Heights Arlington 02476 ', 'Middlesex County', 'MA'),
(285, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(286, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(287, 'DGK Ln Factoryville Clinton Township 18419 ', 'Wyoming County', 'PA'),
(288, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(289, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(290, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(291, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(292, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(293, '120 Boylston St Downtown Boston 02116 ', 'Suffolk County', 'MA'),
(294, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(295, '1325 Boylston St West Fens Boston 02215 3909 ', 'Suffolk County', 'MA'),
(296, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(297, '1325 Boylston St West Fens Boston 02215 3909 ', 'Suffolk County', 'MA'),
(298, '1230 Massachusetts Ave Riverside Cambridge 02138 3820 ', 'Middlesex County', 'MA'),
(299, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(300, 'Northwest Washington Washington 20012 ', '', 'DC'),
(301, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(302, '1325 Boylston St West Fens Boston 02215 3909 ', 'Suffolk County', 'MA'),
(303, 'Tempe 85281 ', 'Maricopa County', 'AZ'),
(304, 'Ukiah 95482 ', 'Mendocino County', 'CA'),
(305, '', '', 'FL'),
(306, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(307, 'Chino ', 'San Bernardino County', 'CA'),
(308, 'D F G W Ln Cheraw 29520 ', 'Chesterfield County', 'SC'),
(309, '4025 Stadium Dr College Park 21, Berwyn 20742 ', 'Prince George\'s County', 'MD'),
(310, 'FDR Dr. Brooklyn ', 'Kings County', 'NY'),
(311, 'Dallas ', 'Dallas County', 'TX'),
(312, 'Daffan Ln Austin 78724 ', 'Travis County', 'TX'),
(313, 'New York ', '', 'NY'),
(314, 'J H O\'Bryan Ave Grand Rivers 42045 ', 'Livingston County', 'KY'),
(315, 'DFW Airport Grapevine 75261 ', 'Tarrant County', 'TX'),
(316, '', '', 'AZ'),
(317, '', '', 'AZ'),
(318, 'Affton 63123 ', 'St Louis County', 'MO'),
(319, 'D G Echerd Rd Taylorsville Taylorsville 28681 ', 'Alexander County', 'NC'),
(320, 'Grapevine 75261 ', 'Tarrant County', 'TX'),
(321, '404 W Orange St Lancaster 17603 3899 ', 'Lancaster County', 'PA'),
(322, '404 W Orange St Lancaster 17603 3899 ', 'Lancaster County', 'PA'),
(323, 'Dobbs Ferry Union Free School District Greenburgh ', 'Westchester County', 'NY'),
(324, 'SF ', 'San Francisco County', 'CA'),
(325, '', '', 'GA'),
(326, 'New York ', '', 'NY'),
(327, '', '', 'NY'),
(328, '', '', 'GA'),
(329, 'Flora Dungan Humanities University District Las Vegas 89119 ', 'Clark County', 'NV'),
(330, '5th Ave Manhattan New York ', 'New York County', 'NY'),
(331, 'H.J. Patterson Hall College Park 21, Berwyn 20740 ', 'Prince George\'s County', 'MD'),
(332, 'Udall Rd Bay Shore Islip ', 'Suffolk County', 'NY'),
(333, 'Dallas ', 'Dallas County', 'TX'),
(334, '1152 Marshall St NE St. Anthony West Minneapolis 55413 ', 'Hennepin County', 'MN'),
(335, '', '', 'IN'),
(336, 'Austin ', 'Travis County', 'TX'),
(337, 'Washington ', 'District of Columbia', 'DC'),
(338, 'New York ', '', 'NY'),
(339, '', '', 'FL'),
(340, '', '', 'FL'),
(341, '', '', 'FL'),
(342, 'Floating Mill Rd 38582 ', 'Dekalb County', 'TN'),
(343, '', '', 'FL'),
(344, '', '', 'FL'),
(345, '560 Broadway Manhattan New York 10012 ', 'New York County', 'NY'),
(346, 'Haven St Reading 01867 ', 'Middlesex County', 'MA'),
(347, 'dfgsg Sumrall 39482 ', 'Lamar County', 'MS'),
(348, '', '', 'FL'),
(349, '', '', 'FL');

-- --------------------------------------------------------

--
-- Table structure for table `multifamily_units`
--

CREATE TABLE `multifamily_units` (
  `unites_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `bedrooms` tinyint(2) NOT NULL,
  `bathrooms` tinyint(2) NOT NULL,
  `rent_amount` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `multifamily_units`
--

INSERT INTO `multifamily_units` (`unites_id`, `property_id`, `bedrooms`, `bathrooms`, `rent_amount`, `created_at`) VALUES
(591, 633, 1, 1, NULL, '2019-02-20 11:11:23'),
(592, 634, 4, 4, NULL, '2019-02-20 11:17:18'),
(593, 635, 6, 5, NULL, '2019-02-20 11:37:48'),
(594, 637, 6, 3, NULL, '2019-02-20 11:40:14'),
(595, 638, 4, 3, '56', '2019-02-20 11:57:00'),
(596, 640, 2, 3, NULL, '2019-02-20 12:21:16'),
(597, 643, 4, 1, NULL, '2019-02-23 07:06:04'),
(598, 643, 8, 6, NULL, '2019-03-05 05:31:15'),
(599, 648, 6, 5, NULL, '2019-02-28 05:09:17'),
(600, 649, 7, 3, '65656', '2019-02-28 05:11:53'),
(602, 652, 2, 6, NULL, '2019-03-05 11:00:22'),
(603, 654, 1, 2, '56', '2019-03-05 12:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `notification_count` int(11) NOT NULL,
  `notification_message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `property_id`, `notification_count`, `notification_message`) VALUES
(1, 653, 4, ''),
(2, 654, 5, '');

-- --------------------------------------------------------

--
-- Table structure for table `offerlane_county_zone`
--

CREATE TABLE `offerlane_county_zone` (
  `county_id` int(11) NOT NULL,
  `county_name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offerlane_county_zone`
--

INSERT INTO `offerlane_county_zone` (`county_id`, `county_name`) VALUES
(1, 'Alachua County'),
(11, 'Brevard County'),
(10, 'Bradford County'),
(9, 'Bay County'),
(8, 'Baker County'),
(12, 'Broward County'),
(13, 'Calhoun County'),
(14, 'Charlotte County'),
(15, 'Citrus County'),
(16, 'Clay County'),
(17, 'Collier County'),
(18, 'Columbia County'),
(19, 'DeSoto County'),
(20, 'Dixie County'),
(21, 'Duval County'),
(22, 'Escambia County'),
(23, 'Flagler County'),
(24, 'Franklin County'),
(25, 'Gadsden County'),
(26, 'Gilchrist County'),
(27, 'Glades County'),
(28, 'Gulf County'),
(29, 'Washington County'),
(30, 'Walton County'),
(31, 'Wakulla County'),
(32, 'Volusia County'),
(33, 'Union County'),
(34, 'Taylor County'),
(35, 'Suwannee County'),
(36, 'Sumter County'),
(37, 'Seminole County'),
(38, 'Sarasota County'),
(39, 'Santa Rosa County'),
(40, 'St. Lucie County'),
(41, 'St. Johns County'),
(42, 'Putnam County'),
(43, 'Polk County'),
(48, 'Osceola County'),
(45, 'Pinellas County'),
(46, 'Pasco County'),
(47, 'Palm Beach County'),
(49, 'Orange County'),
(50, 'Okeechobee County'),
(51, 'Okaloosa County'),
(52, 'Nassau County'),
(53, 'Monroe County'),
(54, 'Miami-Dade County'),
(55, 'Martin County'),
(56, 'Marion County'),
(57, 'Manatee County'),
(58, 'Madison County'),
(59, 'Liberty County'),
(60, 'Levy County'),
(61, 'Leon County'),
(62, 'Lee County'),
(63, 'Lake County'),
(64, 'Lafayette County'),
(65, 'Jefferson County'),
(66, 'Jackson County'),
(67, 'Indian River County'),
(68, 'Holmes County'),
(69, 'Hillsborough County'),
(70, 'Highlands County'),
(71, 'Hernando County'),
(72, 'Hendry County'),
(73, 'Hardee County'),
(74, 'Hamilton County');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `price_offered` decimal(10,2) NOT NULL,
  `deposit_offered` decimal(10,2) NOT NULL,
  `inspection_days` int(11) NOT NULL,
  `closing_days` int(11) NOT NULL,
  `other_offer_terms` varchar(255) DEFAULT NULL,
  `offer_status` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0:Reviewing, 1:Offer Accepted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offer_id`, `user_id`, `property_id`, `price_offered`, `deposit_offered`, `inspection_days`, `closing_days`, `other_offer_terms`, `offer_status`) VALUES
(1, 732, 643, '963.00', '1284.00', 4, 5, '', ''),
(2, 732, 643, '963.00', '1284.00', 4, 5, '', ''),
(3, 732, 643, '963.00', '1284.00', 4, 5, 'test offer terms', ''),
(4, 732, 643, '963.00', '1284.00', 4, 5, '', ''),
(5, 733, 643, '963.00', '1284.00', 4, 5, 'Hello test', ''),
(6, 747, 653, '1.00', '2.00', 3, 4, '55', ''),
(7, 732, 643, '7.00', '8.00', 9, 10, 'give me', ''),
(8, 732, 643, '7.00', '8.00', 9, 10, 'give me', ''),
(9, 732, 643, '4.00', '5.00', 56, 66, 'lakdfjl', ''),
(10, 732, 644, '963.00', '1284.00', 4, 5, 'test offer terms', ''),
(11, 732, 645, '963.00', '1284.00', 4, 5, 'test offer terms', ''),
(12, 734, 645, '5.00', '3.00', 89, 65, '213', '');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_title` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `county_id` int(11) NOT NULL,
  `state` varchar(20) NOT NULL,
  `zipcode` int(10) NOT NULL,
  `property_owner` enum('Owner','Agent') NOT NULL,
  `property_listedby_agent` tinyint(1) DEFAULT NULL,
  `owner_firstname` varchar(50) NOT NULL,
  `owner_lastname` varchar(50) NOT NULL,
  `property_type_id` int(11) DEFAULT NULL,
  `multifamily_units` int(11) DEFAULT NULL,
  `year_built` year(4) DEFAULT NULL,
  `sq_ft` varchar(255) DEFAULT NULL,
  `is_garage` tinyint(1) DEFAULT NULL,
  `howmany_carport` int(2) DEFAULT NULL,
  `ac_units` varchar(100) DEFAULT NULL,
  `sewer` varchar(50) DEFAULT NULL,
  `hoa` tinyint(1) DEFAULT NULL,
  `hoa_dues` text,
  `hoa_paid` text,
  `hoa_paid_other` text,
  `community_amenities` tinyint(1) DEFAULT NULL,
  `amenities_pool` tinyint(1) DEFAULT NULL,
  `amenities_gym` tinyint(1) DEFAULT NULL,
  `amenities_spa` tinyint(1) DEFAULT NULL,
  `amenities_golf` tinyint(1) DEFAULT NULL,
  `amenities_recreation_area` tinyint(1) DEFAULT NULL,
  `amenities_other` text,
  `condo_assocation` tinyint(1) DEFAULT NULL,
  `condo_paid` text,
  `condo_paid_other` text,
  `55_community` tinyint(1) DEFAULT NULL,
  `rental_restrictions` tinyint(1) DEFAULT NULL,
  `rental_restrictions_description` text,
  `cooling_system` tinyint(1) DEFAULT NULL,
  `occupancy` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_at` date DEFAULT NULL,
  `visibility` enum('0','1') NOT NULL DEFAULT '1' COMMENT '0 : Hidden , 1 : Available',
  `property_status` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: Accepting Offers , 1: Sold',
  `brokerage_name` varchar(30) DEFAULT NULL,
  `occupancy_rent_amount` text,
  `zoning_info` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`property_id`, `user_id`, `property_title`, `street_address`, `county_id`, `state`, `zipcode`, `property_owner`, `property_listedby_agent`, `owner_firstname`, `owner_lastname`, `property_type_id`, `multifamily_units`, `year_built`, `sq_ft`, `is_garage`, `howmany_carport`, `ac_units`, `sewer`, `hoa`, `hoa_dues`, `hoa_paid`, `hoa_paid_other`, `community_amenities`, `amenities_pool`, `amenities_gym`, `amenities_spa`, `amenities_golf`, `amenities_recreation_area`, `amenities_other`, `condo_assocation`, `condo_paid`, `condo_paid_other`, `55_community`, `rental_restrictions`, `rental_restrictions_description`, `cooling_system`, `occupancy`, `created_at`, `update_at`, `visibility`, `property_status`, `brokerage_name`, `occupancy_rent_amount`, `zoning_info`) VALUES
(643, 732, 'bghjnm ', '1600 Pennsylvania Avenue Northwest', 29, 'FL', 20500, 'Owner', NULL, 'Rajat', 'Doshi', 1, 0, 2013, '56', 0, 0, '', '0', 0, NULL, '', '', 1, 1, 0, 0, 0, 0, '', 0, '', '', 0, 0, '', 0, 'Vacant', '2019-04-26 13:07:03', NULL, '1', '1', '', '', NULL),
(644, 733, '', 'alauch', 0, 'FL', 656556, 'Owner', NULL, 'sdfsdf', 'sdfsd', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-26 11:35:59', NULL, '1', '0', NULL, NULL, NULL),
(645, 734, '', 'Udall Road', 9, 'FL', 65665, 'Owner', NULL, 'sfgdsfgs', 'dfgsdf', 4, NULL, NULL, '65656565', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-26 11:37:27', NULL, '1', '0', NULL, NULL, NULL),
(646, 735, '', '14008 Northwest 143 Place', 1, 'FL', 32615, 'Agent', NULL, 'Ranajit', 'Sahana', 4, NULL, NULL, '5468', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-26 11:37:27', NULL, '1', '0', NULL, NULL, NULL),
(647, 737, '', '14008 Northwest 143 Place', 1, 'FL', 32615, 'Owner', NULL, 'James', 'Jack', 2, 0, 1983, '7538738', 0, 0, '', '0', 0, NULL, '', '', 1, 1, 1, 1, 1, 0, '', 0, '', '', 0, 0, '', 0, 'Rented', '2019-04-26 11:37:47', NULL, '1', '0', '', '453456', NULL),
(648, 739, '', 'sdsd', 1, 'FL', 656565, 'Owner', NULL, 'sdfsdf', 'sdfsdf', 1, 0, 2010, '65', 0, 0, '', '1', 0, NULL, '', '', 1, 0, 0, 0, 0, 1, '', 0, '', '', 0, 0, '', 0, 'Vacant', '2019-04-26 11:37:50', NULL, '1', '0', '', '', NULL),
(649, 740, '', 'sdfsf', 1, 'FL', 656565, 'Owner', NULL, 'sdfsdf', 'sdfsdfs', 3, 1, 2016, '565', 0, 0, '', '0', 0, NULL, '', '', 1, 0, 1, 0, 1, 0, '', 0, '', '', 0, 0, '', 0, 'Vacant', '2019-04-26 11:37:53', NULL, '1', '0', '', '', NULL),
(652, 743, '', '124 Wilmer Avenue', 0, 'FL', 32811, 'Owner', NULL, 'Ranajit', 'Sahana', 2, 0, 2014, '9999999', 0, 0, '', '0', 0, NULL, '', '', 1, 1, 1, 1, 0, 0, '', 0, '', '', 1, 0, '', 0, 'Rented', '2019-04-26 11:37:55', NULL, '1', '0', '', '65886', NULL),
(653, 747, 'Title for Alachua', 'Northwest 153 Terrace', 1, 'FL', 32615, 'Owner', NULL, 'fghdfghd', 'fghdfgh', 4, NULL, NULL, '656565', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-26 11:37:58', NULL, '1', '0', NULL, NULL, 'sdfgsdfgsdf'),
(654, 747, 'title Fernandina Beach', '153 Alachua Street', 0, 'FL', 32034, 'Owner', NULL, 'cfhnxfg', 'fgghsh', 3, 1, 2012, '6565', 0, 0, '', '0', 0, NULL, '', '', 1, 0, 0, 0, 0, 1, '', 0, '', '', 0, 0, '', 0, 'Vacant', '2019-04-26 11:38:01', NULL, '1', '0', '', '', NULL),
(655, 754, 'Property Title', '154, disney street', 47, 'FL', 123456, 'Owner', 0, 'First', 'User', 3, 1, 2006, '96', 0, 0, '3', '', 0, '', '', '', 1, 1, 1, 0, 0, 0, '', 0, '', '', 0, 0, '', 0, '', '2019-04-26 11:38:03', NULL, '1', '0', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `properties_condition`
--

CREATE TABLE `properties_condition` (
  `condition_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `condition_kitchen` int(2) NOT NULL,
  `condition_bathrooms` int(2) DEFAULT NULL,
  `condition_interior_paint` int(2) NOT NULL,
  `condition_flooring` int(2) NOT NULL,
  `condition_ac_units` int(2) NOT NULL,
  `condition_roof` int(2) NOT NULL,
  `condition_exterior_paint` int(2) NOT NULL,
  `condition_windows` int(2) NOT NULL,
  `condition_electrical_panel` int(2) NOT NULL,
  `condition_water_heater` int(2) NOT NULL,
  `condition_appliances` int(2) NOT NULL,
  `condition_pool_equipment` int(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `other_condition_issue` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties_condition`
--

INSERT INTO `properties_condition` (`condition_id`, `property_id`, `condition_kitchen`, `condition_bathrooms`, `condition_interior_paint`, `condition_flooring`, `condition_ac_units`, `condition_roof`, `condition_exterior_paint`, `condition_windows`, `condition_electrical_panel`, `condition_water_heater`, `condition_appliances`, `condition_pool_equipment`, `created_at`, `other_condition_issue`) VALUES
(525, 553, 0, 0, 80, 60, 70, 40, 40, 80, 70, 60, 80, 70, '2019-02-11 05:45:49', NULL),
(526, 554, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-11 05:48:56', NULL),
(527, 555, 0, 0, 80, 50, 60, 60, 80, 30, 60, 20, 60, 20, '2019-02-11 05:52:48', NULL),
(528, 556, 100, 30, 90, 80, 70, 70, 70, 70, 70, 90, 70, 90, '2019-02-11 08:46:42', NULL),
(529, 557, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-11 09:23:20', NULL),
(530, 558, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-11 09:29:25', NULL),
(531, 559, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-12 13:11:35', NULL),
(532, 560, 90, 70, 80, 40, 50, 40, 60, 60, 80, 20, 70, 40, '2019-02-12 13:19:38', NULL),
(533, 561, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-12 13:49:12', NULL),
(534, 562, 0, 0, 70, 70, 80, 50, 90, 40, 90, 50, 70, 50, '2019-02-12 13:57:13', NULL),
(535, 563, 0, 0, 70, 40, 60, 0, 30, 30, 0, 0, 0, 0, '2019-02-12 13:59:10', NULL),
(536, 564, 0, 0, 70, 40, 60, 0, 30, 30, 0, 0, 0, 0, '2019-02-12 14:02:46', NULL),
(537, 565, 80, 30, 80, 70, 80, 80, 0, 0, 0, 0, 0, 0, '2019-02-13 05:03:22', NULL),
(538, 566, 100, 40, 40, 0, 0, 0, 60, 40, 50, 40, 60, 70, '2019-02-13 06:28:52', NULL),
(539, 567, 0, 0, 0, 0, 50, 0, 60, 80, 0, 0, 90, 70, '2019-02-13 06:31:14', NULL),
(540, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-13 08:45:41', NULL),
(541, 569, 0, 0, 80, 30, 80, 20, 20, 0, 0, 0, 0, 0, '2019-02-13 09:01:46', NULL),
(542, 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-13 09:09:31', NULL),
(543, 571, 60, 20, 80, 60, 50, 50, 90, 60, 70, 50, 0, 40, '2019-02-13 10:03:26', NULL),
(544, 572, 70, 0, 80, 20, 0, 0, 0, 0, 0, 50, 0, 0, '2019-02-13 13:19:23', NULL),
(545, 573, 0, 0, 100, 50, 0, 0, 0, 30, 0, 0, 0, 0, '2019-02-13 13:34:12', NULL),
(546, 574, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-13 13:43:30', NULL),
(547, 575, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-13 14:01:06', NULL),
(548, 576, 60, 60, 80, 30, 50, 40, 60, 50, 80, 60, 60, 50, '2019-02-14 07:54:03', NULL),
(549, 577, 70, 90, 70, 40, 100, 90, 0, 0, 100, 80, 100, 70, '2019-02-14 10:46:22', NULL),
(550, 578, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 11:25:46', NULL),
(551, 579, 60, 50, 90, 60, 80, 60, 80, 90, 80, 90, 50, 80, '2019-02-14 11:39:41', NULL),
(552, 580, 100, 0, 0, 0, 80, 0, 0, 0, 0, 0, 90, 0, '2019-02-14 11:47:06', NULL),
(553, 581, 60, 70, 70, 70, 60, 100, 70, 100, 60, 0, 0, 0, '2019-02-14 13:08:21', NULL),
(554, 582, 80, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 13:13:11', NULL),
(555, 583, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:01:34', NULL),
(556, 584, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:03:59', NULL),
(557, 585, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:08:46', NULL),
(558, 586, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:15:28', NULL),
(559, 587, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:19:27', NULL),
(560, 588, 30, 30, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:19:28', NULL),
(561, 589, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:25:47', NULL),
(562, 590, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-14 14:28:17', NULL),
(563, 591, 0, 0, 70, 70, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 05:00:19', NULL),
(564, 592, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 05:29:45', NULL),
(565, 593, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 05:46:14', NULL),
(566, 594, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 05:48:26', NULL),
(567, 595, 70, 80, 70, 80, 60, 60, 80, 0, 0, 0, 0, 0, '2019-02-15 06:39:13', NULL),
(568, 596, 60, 80, 0, 0, 70, 80, 80, 80, 90, 70, 90, 90, '2019-02-15 07:07:28', NULL),
(569, 597, 60, 60, 60, 70, 60, 80, 0, 0, 0, 0, 0, 0, '2019-02-15 07:26:10', NULL),
(570, 598, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 09:06:15', NULL),
(571, 599, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 09:11:33', NULL),
(572, 600, 70, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 11:46:55', NULL),
(573, 601, 0, 10, 90, 90, 0, 0, 40, 60, 70, 60, 0, 0, '2019-02-15 12:08:51', NULL),
(574, 602, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 14:28:26', NULL),
(575, 603, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 14:29:14', NULL),
(576, 604, 40, 30, 60, 10, 70, 40, 40, 60, 80, 20, 70, 30, '2019-02-15 14:32:00', NULL),
(577, 605, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:07:35', NULL),
(578, 606, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:10:54', NULL),
(579, 607, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:14:49', NULL),
(580, 608, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:18:40', NULL),
(581, 609, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:21:24', NULL),
(582, 610, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-15 15:24:45', NULL),
(583, 611, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 09:49:10', NULL),
(584, 612, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 09:54:51', NULL),
(585, 613, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 09:57:20', NULL),
(586, 614, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:03:16', NULL),
(587, 615, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:04:52', NULL),
(588, 616, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:06:16', NULL),
(589, 617, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:08:08', NULL),
(590, 618, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:10:08', NULL),
(591, 619, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:17:08', NULL),
(592, 620, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:17:20', NULL),
(593, 621, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:17:59', NULL),
(594, 622, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:19:05', NULL),
(595, 623, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:30:22', NULL),
(596, 624, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:33:34', NULL),
(597, 625, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:34:40', NULL),
(598, 626, 70, 60, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:39:15', NULL),
(599, 627, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:45:36', NULL),
(600, 628, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:47:35', NULL),
(601, 629, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 10:59:12', NULL),
(602, 630, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:04:08', NULL),
(603, 631, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:06:43', NULL),
(604, 632, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:07:23', NULL),
(605, 633, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:11:23', NULL),
(606, 634, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:17:18', NULL),
(607, 635, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:37:48', NULL),
(608, 636, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:38:44', NULL),
(609, 637, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:40:14', NULL),
(610, 638, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:57:00', NULL),
(611, 639, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 11:58:39', NULL),
(612, 640, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 12:21:16', NULL),
(613, 641, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 12:24:57', NULL),
(614, 642, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-20 12:38:44', NULL),
(615, 643, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-23 07:06:03', NULL),
(616, 644, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-25 11:02:55', NULL),
(617, 645, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-25 11:13:35', NULL),
(618, 646, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-26 09:18:54', NULL),
(619, 647, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-26 09:39:11', NULL),
(620, 648, 0, 0, 0, 0, 70, 20, 0, 60, 0, 0, 0, 0, '2019-02-28 05:09:17', NULL),
(621, 649, 0, 0, 0, 0, 60, 60, 0, 0, 0, 0, 0, 0, '2019-02-28 05:11:53', NULL),
(622, 650, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-02-28 09:37:57', NULL),
(624, 652, 90, 100, 70, 30, 0, 0, 0, 0, 0, 0, 0, 0, '2019-03-05 11:00:21', NULL),
(625, 653, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-03-05 12:09:35', NULL),
(626, 654, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-03-05 12:21:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property_assets`
--

CREATE TABLE `property_assets` (
  `asset_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `image_base_64` longtext NOT NULL,
  `main_image` enum('Yes','No') NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_assets`
--

INSERT INTO `property_assets` (`asset_id`, `property_id`, `image_base_64`, `main_image`) VALUES
(234, 554, 'property/554/7474cb5edd0d5a9297390e34a412861a.jpg', 'No'),
(235, 556, 'property/556/1481113531269.jpg--the_late_ms__maisie_bonner__roshine_lodge__burtonport_.jpg', 'No'),
(236, 556, 'property/556/animal-bug-butterfly-53957.jpg', 'No'),
(237, 556, 'property/556/animal-animal-photography-blur-460775.jpg', 'No'),
(238, 556, 'property/556/animal-animal-photography-bird-33101.jpg', 'No'),
(239, 556, 'property/556/8df2b9ee3edf89ae1928c4e8e98eb5fdufgdbuibhihnibiuhvuklhihjgvhjklzhjgnugusvhhvuuuhlcunhlhuighnlfhdljhvninchihvhvuhng.jpg', 'No'),
(240, 556, 'property/556/animal-animal-photography-big-cat-236599.jpg', 'No'),
(241, 560, 'property/560/HD-Sports-Car-Wallpaper.jpg', 'No'),
(242, 561, 'property/561/42739_0.jpg', 'No'),
(243, 555, 'property/555/HD-Sports-Car-Wallpaper.jpg', 'No'),
(244, 555, 'property/555/maxresdefault.jpg', 'No'),
(245, 566, 'property/566/about-block-img-1.jpg', 'No'),
(246, 566, 'property/566/about-block-img-2.jpg', 'No'),
(247, 566, 'property/566/about-block-img-3.jpg', 'No'),
(248, 566, 'property/566/aboutus-detail-right-img.png', 'No'),
(249, 566, 'property/566/login-figure.jpg', 'No'),
(250, 566, 'property/566/property-img01.jpg', 'No'),
(251, 566, 'property/566/sidebar-2.jpg', 'No'),
(252, 566, 'property/566/sidebar-1.jpg', 'No'),
(253, 567, 'property/567/login-figure.jpg', 'No'),
(254, 567, 'property/567/property-img01.jpg', 'No'),
(255, 567, 'property/567/sidebar-1.jpg', 'No'),
(256, 567, 'property/567/sidebar-2.jpg', 'No'),
(257, 568, 'property/568/lamborghini-centenario-roadster-4096x2048-rear-view-4k-lamborghini-2180.jpg', 'No'),
(258, 555, 'property/555/offerlane-work-process-image5.png', 'No'),
(259, 555, 'property/555/our-team-image1.png', 'No'),
(260, 555, 'property/555/our-team-image2.png', 'No'),
(261, 555, 'property/555/our-team-image11.png', 'No'),
(262, 555, 'property/555/sidebar-2.jpg', 'No'),
(263, 555, 'property/555/sidebar-3.jpg', 'No'),
(264, 568, 'property/568/our-team-image1.png', 'No'),
(265, 571, 'property/571/HD-Sports-Car-Wallpaper.jpg', 'No'),
(266, 572, 'property/572/animal-animal-photography-big-cat-236599.jpg', 'No'),
(267, 572, 'property/572/animal-animal-photography-bird-33101.jpg', 'No'),
(268, 572, 'property/572/advent-1883840.jpg', 'No'),
(269, 573, 'property/573/christmas-2926962_1920.jpg', 'No'),
(270, 573, 'property/573/candles-492171_1920.jpg', 'No'),
(271, 573, 'property/573/christmas-1904536_1920.jpg', 'No'),
(272, 573, 'property/573/fTgnmCSa6odXpOwHwOyw_WhiteTEa_20copy_grande.jpg', 'No'),
(273, 574, 'property/574/lamborghini-centenario-roadster-4096x2048-rear-view-4k-lamborghini-2180.jpg', 'No'),
(274, 575, 'property/575/lamborghini-centenario-roadster-4096x2048-rear-view-4k-lamborghini-2180.jpg', 'No'),
(275, 576, 'property/576/Screenshot_from_2019-01-31_12-23-23.png', 'No'),
(276, 576, 'property/576/Screenshot_from_2019-02-07_15-16-10.png', 'No'),
(277, 576, 'property/576/Screenshot_from_2019-02-11_12-39-41.png', 'No'),
(278, 577, 'property/577/Best_Colour-371.jpg', 'No'),
(279, 577, 'property/577/candle-876339_1920.jpg', 'No'),
(280, 577, 'property/577/beautiful-blur-bright-326055.jpg', 'No'),
(281, 577, 'property/577/clouds-daylight-fjord-631296.jpg', 'No'),
(282, 577, 'property/577/christmas-1904536_1920.jpg', 'No'),
(283, 578, 'property/578/candle-876339_1920.jpg', 'No'),
(284, 578, 'property/578/christmas-2926962_1920.jpg', 'No'),
(285, 578, 'property/578/christmas-market-1897200_1920.jpg', 'No'),
(286, 578, 'property/578/candle-1881144.jpg', 'No'),
(287, 578, 'property/578/candle-2766283.jpg', 'No'),
(288, 578, 'property/578/christmas-1904536_1920.jpg', 'No'),
(289, 578, 'property/578/christmas-1075128_1920.jpg', 'No'),
(290, 578, 'property/578/clouds-daylight-fjord-631296.jpg', 'No'),
(291, 579, 'property/579/candle-1881144.jpg', 'No'),
(292, 580, 'property/580/about-block-img-1.jpg', 'No'),
(293, 580, 'property/580/about-block-img-2.jpg', 'No'),
(294, 580, 'property/580/about-block-img-3.jpg', 'No'),
(295, 580, 'property/580/aboutus-detail-left-img.png', 'No'),
(296, 580, 'property/580/aboutus-banner-img.png', 'No'),
(297, 578, 'property/578/beautiful-blur-bright-326055.jpg', 'No'),
(298, 578, 'property/578/1481113531269.jpg--the_late_ms__maisie_bonner__roshine_lodge__burtonport_.jpg', 'No'),
(299, 578, 'property/578/christmas-2926962_19201.jpg', 'No'),
(300, 578, 'property/578/a-postcard-3891664_1920.jpg', 'No'),
(301, 581, 'property/581/pexels-photo-1351239.jpeg', 'No'),
(302, 577, 'property/577/pexels-photo-842567.jpeg', 'No'),
(303, 581, 'property/581/christmas-1075128_1920.jpg', 'No'),
(304, 585, 'property/585/Screenshot_from_2019-01-29_16-53-00.png', 'No'),
(305, 585, 'property/585/Screenshot_from_2019-01-12_14-33-25.png', 'No'),
(306, 585, 'property/585/Screenshot_from_2019-02-01_17-06-37.png', 'No'),
(307, 585, 'property/585/Screenshot_from_2019-02-01_17-07-59.png', 'No'),
(308, 585, 'property/585/Screenshot_from_2019-02-01_17-11-02.png', 'No'),
(309, 585, 'property/585/Screenshot_from_2019-01-31_12-23-23.png', 'No'),
(310, 585, 'property/585/Screenshot_from_2019-01-28_14-56-40.png', 'No'),
(311, 585, 'property/585/Screenshot_from_2019-01-28_16-58-57.png', 'No'),
(312, 585, 'property/585/Screenshot_from_2019-01-12_16-52-26.png', 'No'),
(313, 585, 'property/585/Screenshot_from_2019-02-07_15-15-59.png', 'No'),
(314, 585, 'property/585/Screenshot_from_2019-02-07_15-16-10.png', 'No'),
(315, 585, 'property/585/Screenshot_from_2019-02-12_16-30-22.png', 'No'),
(316, 585, 'property/585/Screenshot_from_2019-02-01_17-06-43.png', 'No'),
(317, 585, 'property/585/Screenshot_from_2019-02-13_18-59-25.png', 'No'),
(318, 585, 'property/585/Screenshot_from_2019-02-14_15-54-09.png', 'No'),
(319, 585, 'property/585/Screenshot_from_2019-02-11_12-39-41.png', 'No'),
(320, 585, 'property/585/Screenshot_from_2019-02-14_12-35-01.png', 'No'),
(321, 585, 'property/585/Screenshot_from_2019-02-04_12-10-46.png', 'No'),
(322, 585, 'property/585/Screenshot_from_2019-02-13_18-38-30.png', 'No'),
(323, 585, 'property/585/Screenshot_from_2019-02-01_17-11-25.png', 'No'),
(324, 586, 'property/586/pexels-photo-968243.jpeg', 'No'),
(325, 588, 'property/588/christmas-1075128_1920.jpg', 'No'),
(326, 588, 'property/588/candles-2628473_1920.jpg', 'No'),
(327, 588, 'property/588/christmas-1904536_1920.jpg', 'No'),
(328, 588, 'property/588/christmas-2926962_1920.jpg', 'No'),
(329, 577, 'property/577/114245.png', 'No'),
(330, 592, 'property/592/42739_0.jpg', 'No'),
(331, 592, 'property/592/fantasy-landscape-wallpaper-1080p-144103.jpg', 'No'),
(332, 592, 'property/592/2018_bugatti_chiron-HD.jpg', 'No'),
(333, 592, 'property/592/710329.jpg', 'No'),
(334, 594, 'property/594/42739_0.jpg', 'No'),
(335, 594, 'property/594/HD-Sports-Car-Wallpaper.jpg', 'No'),
(336, 594, 'property/594/maxresdefault.jpg', 'No'),
(337, 594, 'property/594/rtaImage.png', 'No'),
(338, 594, 'property/594/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(339, 594, 'property/594/fantasy-landscape-wallpaper-1080p-144103.jpg', 'No'),
(340, 594, 'property/594/2018_bugatti_chiron-HD.jpg', 'No'),
(341, 594, 'property/594/710329.jpg', 'No'),
(342, 594, 'property/594/photo-1528501028382-e587fcf3a03e.jpeg', 'No'),
(343, 594, 'property/594/ad1bed3e61b1348cb48227b20734f8ef.jpg', 'No'),
(344, 594, 'property/594/pexels-photo-145939.jpeg', 'No'),
(345, 594, 'property/594/7474cb5edd0d5a9297390e34a412861a.jpg', 'No'),
(346, 594, 'property/594/lamborghini-centenario-roadster-4096x2048-rear-view-4k-lamborghini-2180.jpg', 'No'),
(347, 596, 'property/596/beard-casual-confidence-1878687.jpg', 'No'),
(348, 596, 'property/596/adult-attractive-black-leather-jacket-1875908.jpg', 'No'),
(349, 597, 'property/597/candle-1881144.jpg', 'No'),
(350, 597, 'property/597/candle-2766283.jpg', 'No'),
(351, 598, 'property/598/42739_0.jpg', 'No'),
(352, 598, 'property/598/HD-Sports-Car-Wallpaper.jpg', 'No'),
(353, 598, 'property/598/maxresdefault.jpg', 'No'),
(354, 598, 'property/598/rtaImage.png', 'No'),
(355, 598, 'property/598/photo-1528501028382-e587fcf3a03e.jpeg', 'No'),
(356, 598, 'property/598/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(357, 598, 'property/598/pexels-photo-145939.jpeg', 'No'),
(358, 598, 'property/598/fantasy-landscape-wallpaper-1080p-144103.jpg', 'No'),
(359, 598, 'property/598/7474cb5edd0d5a9297390e34a412861a.jpg', 'No'),
(360, 598, 'property/598/ad1bed3e61b1348cb48227b20734f8ef.jpg', 'No'),
(361, 598, 'property/598/2018_bugatti_chiron-HD.jpg', 'No'),
(362, 598, 'property/598/710329.jpg', 'No'),
(363, 598, 'property/598/lamborghini-centenario-roadster-4096x2048-rear-view-4k-lamborghini-2180.jpg', 'No'),
(364, 599, 'property/599/beard-eyewear-face-874158.jpg', 'No'),
(365, 600, 'property/600/candles-2628473_1920.jpg', 'No'),
(366, 600, 'property/600/candles-1714800.jpg', 'No'),
(367, 600, 'property/600/christmas-1075128_1920.jpg', 'No'),
(368, 600, 'property/600/candles-1796739_1920.jpg', 'No'),
(369, 600, 'property/600/8df2b9ee3edf89ae1928c4e8e98eb5fdufgdbuibhihnibiuhvuklhihjgvhjklzhjgnugusvhhvuuuhlcunhlhuighnlfhdljhvninchihvhvuhng.jpg', 'No'),
(370, 601, 'property/601/pexels-photo-105254.jpeg', 'No'),
(371, 601, 'property/601/pexels-photo-306763.jpeg', 'No'),
(372, 601, 'property/601/pexels-photo-618545.jpeg', 'No'),
(373, 601, 'property/601/pexels-photo-212372.jpeg', 'No'),
(374, 601, 'property/601/pexels-photo-968243.jpeg', 'No'),
(375, 601, 'property/601/pexels-photo-1325585.jpeg', 'No'),
(376, 601, 'property/601/pexels-photo-1364060.jpeg', 'No'),
(377, 601, 'property/601/pexels-photo-1351239.jpeg', 'No'),
(378, 601, 'property/601/pexels-photo-842567.jpeg', 'No'),
(379, 601, 'property/601/pexels-photo-805452.jpeg', 'No'),
(380, 601, 'property/601/pexels-photo-210531.jpeg', 'No'),
(381, 601, 'property/601/pexels-photo-334978.jpeg', 'No'),
(382, 601, 'property/601/pexels-photo-257360.jpeg', 'No'),
(383, 601, 'property/601/pexels-photo-235615.jpeg', 'No'),
(384, 601, 'property/601/pexels-photo-145939.jpeg', 'No'),
(385, 601, 'property/601/pexels-photo-1356300.jpeg', 'No'),
(386, 601, 'property/601/pexels-photo-1358534.jpeg', 'No'),
(387, 576, 'property/576/51zN+Gik4wL._SX348_BO1,204,203,200__.jpg', 'No'),
(388, 604, 'property/604/Chrysanthemum.jpg', 'No'),
(389, 605, 'property/605/Chrysanthemum.jpg', 'No'),
(390, 606, 'property/606/51kB0sXlFvL._SX258_BO1,204,203,200__.jpg', 'No'),
(391, 608, 'property/608/51zN+Gik4wL._SX348_BO1,204,203,200__.jpg', 'No'),
(392, 608, 'property/608/51zN+Gik4wL._SX348_BO1,204,203,200__(1)_.jpg', 'No'),
(393, 609, 'property/609/51zN+Gik4wL._SX348_BO1,204,203,200__(1)_.jpg', 'No'),
(394, 625, 'property/625/pexels-photo-145939.jpeg', 'No'),
(395, 626, 'property/626/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(396, 626, 'property/626/710329.jpg', 'No'),
(397, 629, 'property/629/beard-casual-confidence-1878687.jpg', 'No'),
(398, 630, 'property/630/maxresdefault.jpg', 'No'),
(399, 634, 'property/634/beard-casual-confidence-1878687.jpg', 'No'),
(400, 635, 'property/635/710329.jpg', 'No'),
(401, 636, 'property/636/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(402, 637, 'property/637/maxresdefault.jpg', 'No'),
(403, 637, 'property/637/pexels-photo-145939.jpeg', 'No'),
(404, 638, 'property/638/maxresdefault.jpg', 'No'),
(405, 640, 'property/640/710329.jpg', 'No'),
(406, 641, 'property/641/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(407, 641, 'property/641/rtaImage.png', 'No'),
(408, 641, 'property/641/photo-1528501028382-e587fcf3a03e.jpeg', 'No'),
(409, 642, 'property/642/-gta_4_hd_wallpaper-wide.jpg', 'No'),
(410, 643, 'property/643/fantasy-landscape-wallpaper-1080p-144103.jpg', 'No'),
(411, 644, 'property/644/beard-casual-confidence-1878687.jpg', 'No'),
(412, 646, 'property/646/1481113531269.jpg--the_late_ms__maisie_bonner__roshine_lodge__burtonport_.jpg', 'No'),
(413, 646, 'property/646/animal-bug-butterfly-53957.jpg', 'No'),
(414, 646, 'property/646/candle-876339_1920.jpg', 'No'),
(415, 646, 'property/646/animal-animal-photography-blur-460775.jpg', 'No'),
(416, 646, 'property/646/candles-1714800.jpg', 'No'),
(417, 646, 'property/646/candles-492171_1920.jpg', 'No'),
(418, 646, 'property/646/a-postcard-3891664_1920.jpg', 'No'),
(419, 646, 'property/646/Best_Colour-371.jpg', 'No'),
(420, 647, 'property/647/1481113531269.jpg--the_late_ms__maisie_bonner__roshine_lodge__burtonport_.jpg', 'No'),
(421, 647, 'property/647/animal-bug-butterfly-53957.jpg', 'No'),
(422, 647, 'property/647/a-postcard-3891664_1920.jpg', 'No'),
(423, 647, 'property/647/animal-animal-photography-blur-460775.jpg', 'No'),
(424, 643, 'property/643/Screenshot_from_2019-01-31_12-23-23.png', 'No'),
(425, 643, 'property/643/Screenshot_from_2019-02-01_17-07-59.png', 'No'),
(426, 643, 'property/643/Screenshot_from_2019-02-01_17-06-37.png', 'No'),
(427, 643, 'property/643/Screenshot_from_2019-02-01_17-06-43.png', 'No'),
(428, 643, 'property/643/Screenshot_from_2019-01-28_16-58-57.png', 'No'),
(429, 643, 'property/643/Screenshot_from_2019-01-31_12-23-231.png', 'No'),
(430, 643, 'property/643/Screenshot_from_2019-02-01_17-06-371.png', 'No'),
(431, 643, 'property/643/Screenshot_from_2019-01-29_16-53-00.png', 'No'),
(432, 643, 'property/643/Screenshot_from_2019-01-31_12-23-232.png', 'No'),
(433, 643, 'property/643/Screenshot_from_2019-02-01_17-06-372.png', 'No'),
(434, 643, 'property/643/Screenshot_from_2019-02-01_17-06-431.png', 'No'),
(435, 643, 'property/643/Screenshot_from_2019-02-01_17-11-02.png', 'No'),
(436, 643, 'property/643/Screenshot_from_2019-02-04_12-10-46.png', 'No'),
(437, 643, 'property/643/Screenshot_from_2019-01-31_12-23-233.png', 'No'),
(438, 643, 'property/643/Screenshot_from_2019-02-01_17-06-373.png', 'No'),
(439, 643, 'property/643/Screenshot_from_2019-02-01_17-06-432.png', 'No'),
(440, 643, 'property/643/Screenshot_from_2019-02-01_17-11-021.png', 'No'),
(441, 643, 'property/643/Screenshot_from_2019-02-04_12-10-461.png', 'No'),
(442, 643, 'property/643/Screenshot_from_2019-02-01_17-11-022.png', 'No'),
(443, 643, 'property/643/Screenshot_from_2019-02-01_17-07-591.png', 'No'),
(444, 643, 'property/643/Screenshot_from_2019-02-01_17-07-592.png', 'No'),
(445, 643, 'property/643/Screenshot_from_2019-02-01_17-11-023.png', 'No'),
(446, 643, 'property/643/Screenshot_from_2019-02-04_12-10-462.png', 'No'),
(447, 643, 'property/643/Screenshot_from_2019-02-01_17-07-593.png', 'No'),
(448, 643, 'property/643/Screenshot_from_2019-02-01_17-07-594.png', 'No'),
(449, 643, 'property/643/Screenshot_from_2019-02-01_17-11-25.png', 'No'),
(450, 643, 'property/643/Screenshot_from_2019-02-01_17-11-024.png', 'No'),
(451, 643, 'property/643/Screenshot_from_2019-02-01_17-11-025.png', 'No'),
(452, 643, 'property/643/Screenshot_from_2019-02-01_17-06-433.png', 'No'),
(453, 643, 'property/643/Screenshot_from_2019-02-01_17-11-026.png', 'No'),
(454, 643, 'property/643/Screenshot_from_2019-01-29_16-53-001.png', 'No'),
(455, 643, 'property/643/Screenshot_from_2019-01-12_16-52-26.png', 'No'),
(456, 643, 'property/643/Screenshot_from_2019-01-28_14-56-40.png', 'No'),
(457, 643, 'property/643/Screenshot_from_2019-01-12_14-33-25.png', 'No'),
(458, 643, 'property/643/Screenshot_from_2019-01-31_12-23-234.png', 'No'),
(459, 643, 'property/643/Screenshot_from_2019-02-01_17-06-374.png', 'No'),
(460, 643, 'property/643/Screenshot_from_2019-02-01_17-06-434.png', 'No'),
(461, 643, 'property/643/Screenshot_from_2019-02-01_17-07-595.png', 'No'),
(462, 643, 'property/643/Screenshot_from_2019-02-01_17-11-027.png', 'No'),
(463, 643, 'property/643/Screenshot_from_2019-02-01_17-11-251.png', 'No'),
(464, 643, 'property/643/Screenshot_from_2019-01-28_16-58-571.png', 'No'),
(465, 643, 'property/643/Screenshot_from_2019-02-07_15-15-59.png', 'No'),
(466, 643, 'property/643/Screenshot_from_2019-02-07_15-16-10.png', 'No'),
(467, 643, 'property/643/Screenshot_from_2019-02-12_16-30-22.png', 'No'),
(468, 643, 'property/643/Screenshot_from_2019-02-13_18-59-25.png', 'No'),
(469, 643, 'property/643/Screenshot_from_2019-02-13_18-38-30.png', 'No'),
(470, 643, 'property/643/Screenshot_from_2019-02-11_12-39-41.png', 'No'),
(471, 643, 'property/643/Screenshot_from_2019-02-04_14-28-05.png', 'No'),
(472, 643, 'property/643/Screenshot_from_2019-02-11_11-25-42.png', 'No'),
(473, 643, 'property/643/Screenshot_from_2019-01-12_17-47-56.png', 'No'),
(474, 643, 'property/643/Screenshot_from_2019-01-31_12-23-235.png', 'No'),
(475, 643, 'property/643/Screenshot_from_2019-02-01_17-06-375.png', 'No'),
(476, 643, 'property/643/Screenshot_from_2019-02-01_17-06-435.png', 'No'),
(477, 643, 'property/643/Screenshot_from_2019-02-01_17-06-376.png', 'No'),
(478, 643, 'property/643/Screenshot_from_2019-02-01_17-06-436.png', 'No'),
(479, 643, 'property/643/Screenshot_from_2019-02-01_17-11-028.png', 'No'),
(480, 643, 'property/643/Screenshot_from_2019-02-01_17-11-029.png', 'No'),
(481, 643, 'property/643/Screenshot_from_2019-01-12_14-33-251.png', 'No'),
(482, 643, 'property/643/Screenshot_from_2019-02-01_17-06-377.png', 'No'),
(483, 643, 'property/643/Screenshot_from_2019-02-01_17-06-437.png', 'No'),
(484, 643, 'property/643/Screenshot_from_2019-02-01_17-07-596.png', 'No'),
(485, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0210.png', 'No'),
(486, 643, 'property/643/Screenshot_from_2019-02-01_17-11-252.png', 'No'),
(487, 643, 'property/643/Screenshot_from_2019-02-07_15-15-591.png', 'No'),
(488, 643, 'property/643/Screenshot_from_2019-02-04_14-28-051.png', 'No'),
(489, 643, 'property/643/Screenshot_from_2019-01-12_14-33-252.png', 'No'),
(490, 643, 'property/643/Screenshot_from_2019-02-01_17-06-378.png', 'No'),
(491, 643, 'property/643/Screenshot_from_2019-02-01_17-06-438.png', 'No'),
(492, 643, 'property/643/Screenshot_from_2019-02-01_17-07-597.png', 'No'),
(493, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0211.png', 'No'),
(494, 643, 'property/643/Screenshot_from_2019-02-01_17-11-253.png', 'No'),
(495, 643, 'property/643/Screenshot_from_2019-02-07_15-15-592.png', 'No'),
(496, 643, 'property/643/Screenshot_from_2019-02-04_14-28-052.png', 'No'),
(497, 643, 'property/643/Screenshot_from_2019-01-12_14-33-253.png', 'No'),
(498, 643, 'property/643/Screenshot_from_2019-02-01_17-06-379.png', 'No'),
(499, 643, 'property/643/Screenshot_from_2019-02-01_17-06-439.png', 'No'),
(500, 643, 'property/643/Screenshot_from_2019-02-01_17-07-598.png', 'No'),
(501, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0212.png', 'No'),
(502, 643, 'property/643/Screenshot_from_2019-02-01_17-11-254.png', 'No'),
(503, 643, 'property/643/Screenshot_from_2019-02-07_15-15-593.png', 'No'),
(504, 643, 'property/643/Screenshot_from_2019-02-04_14-28-053.png', 'No'),
(505, 643, 'property/643/Screenshot_from_2019-01-28_14-56-401.png', 'No'),
(506, 643, 'property/643/Screenshot_from_2019-01-31_12-23-236.png', 'No'),
(507, 643, 'property/643/Screenshot_from_2019-02-01_17-11-255.png', 'No'),
(508, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0213.png', 'No'),
(509, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0214.png', 'No'),
(510, 643, 'property/643/Screenshot_from_2019-02-01_17-07-599.png', 'No'),
(511, 643, 'property/643/Screenshot_from_2019-01-28_16-58-572.png', 'No'),
(512, 643, 'property/643/Screenshot_from_2019-02-01_17-11-256.png', 'No'),
(513, 643, 'property/643/Screenshot_from_2019-01-29_16-53-002.png', 'No'),
(514, 643, 'property/643/Screenshot_from_2019-02-01_17-06-3710.png', 'No'),
(515, 643, 'property/643/Screenshot_from_2019-02-01_17-06-3711.png', 'No'),
(516, 643, 'property/643/Screenshot_from_2019-02-01_17-06-4310.png', 'No'),
(517, 643, 'property/643/Screenshot_from_2019-02-01_17-06-3712.png', 'No'),
(518, 643, 'property/643/Screenshot_from_2019-02-01_17-06-4311.png', 'No'),
(519, 643, 'property/643/Screenshot_from_2019-02-01_17-07-5910.png', 'No'),
(520, 643, 'property/643/Screenshot_from_2019-02-01_17-11-0215.png', 'No'),
(521, 648, 'property/648/Screenshot_from_2019-02-01_17-07-59.png', 'No'),
(522, 648, 'property/648/Screenshot_from_2019-02-04_12-10-46.png', 'No'),
(523, 649, 'property/649/Screenshot_from_2019-02-07_15-15-59.png', 'No'),
(524, 649, 'property/649/Screenshot_from_2019-02-07_15-15-591.png', 'No'),
(525, 649, 'property/649/Screenshot_from_2019-02-11_12-39-41.png', 'No'),
(527, 652, 'property/652/1481113531269.jpg--the_late_ms__maisie_bonner__roshine_lodge__burtonport_.jpg', 'No'),
(528, 652, 'property/652/Best_Colour-371.jpg', 'No'),
(529, 652, 'property/652/candles-1796739_1920.jpg', 'No'),
(530, 652, 'property/652/christmas-1075128_1920.jpg', 'No'),
(531, 652, 'property/652/fTgnmCSa6odXpOwHwOyw_WhiteTEa_20copy_grande.jpg', 'No'),
(532, 652, 'property/652/candles-2628473_1920.jpg', 'No'),
(533, 652, 'property/652/animal-bug-butterfly-53957.jpg', 'No'),
(534, 652, 'property/652/christmas-market-1897200_1920.jpg', 'No'),
(535, 652, 'property/652/candles-492171_1920.jpg', 'No'),
(536, 652, 'property/652/a-postcard-3891664_1920.jpg', 'No'),
(537, 652, 'property/652/candle-876339_1920.jpg', 'No'),
(538, 652, 'property/652/beautiful-blur-bright-326055.jpg', 'No'),
(539, 652, 'property/652/8df2b9ee3edf89ae1928c4e8e98eb5fdufgdbuibhihnibiuhvuklhihjgvhjklzhjgnugusvhhvuuuhlcunhlhuighnlfhdljhvninchihvhvuhng.jpg', 'No'),
(540, 652, 'property/652/candles-1714800.jpg', 'No'),
(541, 652, 'property/652/christmas-1904536_1920.jpg', 'No'),
(542, 652, 'property/652/pexels-photo-145939.jpeg', 'No'),
(543, 652, 'property/652/gerbera-2038429_1920.jpg', 'No'),
(544, 652, 'property/652/christmas-2926962_1920.jpg', 'No'),
(545, 652, 'property/652/animal-animal-photography-blur-460775.jpg', 'No'),
(546, 653, 'property/653/Screenshot_from_2019-03-05_17-35-09.png', 'Yes'),
(547, 653, 'property/653/Screenshot_from_2019-03-05_12-35-12.png', 'No'),
(548, 654, 'property/654/Screenshot_from_2019-03-05_17-35-09.png', 'Yes'),
(549, 654, 'property/654/Screenshot_from_2019-03-05_12-35-12.png', 'No'),
(550, 654, 'property/654/Screenshot_from_2019-03-05_17-35-091.png', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `property_types`
--

CREATE TABLE `property_types` (
  `property_type_id` int(11) NOT NULL,
  `property_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_types`
--

INSERT INTO `property_types` (`property_type_id`, `property_type`) VALUES
(1, 'Single Family'),
(2, 'Townhouse'),
(3, 'Condo'),
(4, 'Multifamily'),
(5, 'Vacant Land');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `facebook_url` varchar(255) NOT NULL,
  `twitter_url` varchar(255) NOT NULL,
  `linkedin_url` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `position`, `image`, `facebook_url`, `twitter_url`, `linkedin_url`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'member edited', 'Manager', 'cms/team_members/25075f5546a2c36ccef0e15f16289d55.png', 'fb.com', 'twitter_url', 'linkedin.com', 1, '2019-04-26 05:50:04', 0, '2019-04-26 11:22:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` enum('Admin','Buyer','Seller','Agent') NOT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `interested_counties` text,
  `interested_properties` text,
  `years_experience` int(11) DEFAULT NULL,
  `recent_properties` int(11) DEFAULT NULL,
  `proof_of_funds` varchar(255) DEFAULT NULL,
  `other_notes` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`user_id`, `first_name`, `last_name`, `company_name`, `email`, `phone`, `password`, `user_type`, `user_image`, `interested_counties`, `interested_properties`, `years_experience`, `recent_properties`, `proof_of_funds`, `other_notes`, `status`, `isAdmin`, `created_at`, `updated_at`) VALUES
(732, 'Rajat', 'Doshi', '', 'rajat@evincedev.com', '7420038449', 'Evince12#', 'Seller', 'user/732/42739_0.jpg', '', '', 0, 0, '', '', 0, 0, '2019-04-10 10:44:01', NULL),
(733, 'Ramesh', 'Chauhan', '', 'ramesh@evincedev.com', '65656565', 'Evince12#', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-04-27 11:03:56', '2019-04-27 01:03:56'),
(734, 'saksham', 'Saigal', '', 'saksham@gmail.com', '65656', '1102619687Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-05-06 11:07:01', '2019-05-06 01:07:01'),
(735, 'Jonny', 'Singh', '', 'rss12@mailinator.com', '9768764546', '813423854Sec', 'Agent', '', '', '', 0, 0, '', '', 1, 0, '2019-02-26 09:18:48', NULL),
(736, 'jjjghgj', 'hdd', '', 'rss71@mailinator.com', '3435433143', '342056233Sec', 'Agent', '', '', '', 0, 0, '', '', 1, 0, '2019-02-26 09:35:14', NULL),
(737, 'James', 'Jack', '', 'zoh1@mailinator.com', '4535445678', '1321576814Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-05-06 11:07:18', '2019-05-06 01:07:18'),
(738, 'Rajat edited', 'doshi', '', 'rajat@evincedev.com', '7420038449', 'Tajmahal@123', 'Buyer', 'user/738/42739_0.jpg', '', '', 0, 0, '', '', 1, 0, '2019-04-19 06:48:47', NULL),
(739, 'Akash', 'Sharma', '', 'sdfsdf@df.com', '665665', '1487005661Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-04-30 07:15:59', '2019-04-30 09:15:59'),
(740, 'Akshay', 'sdfsdfs', '', '6666565sf@df.com', '956565666', '1271840937Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-05-01 10:04:05', '2019-05-01 12:04:05'),
(741, 'gjfghj', 'fghjfg', '', 'gjfhg@gdg.com', '656565665', '995783385Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-03-06 13:11:54', NULL),
(742, 'Ajay', 'Shah', '', 'ajay@gmail.com', '9999999999', 'Evince12#', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-04-30 09:54:20', '2019-04-30 11:54:20'),
(743, 'Ranajit', 'Sahana', '', 'ranajit@mailinator.com', '4654464643', '194103412Sec', 'Seller', '', '', '', 0, 0, '', '', 0, 0, '2019-03-06 13:11:47', NULL),
(744, 'Ranajit', 'Sahana', '', 'rss71@mailinator.com', '7799646464', 'Evince12@', 'Buyer', 'user/744/a-postcard-3891664_1920.jpg', '', '', 0, 0, '', '', 1, 0, '2019-03-05 11:48:02', NULL),
(745, 'fghdfghd', 'fghdfgh', '', 'dfgfd@df.com', '654654654', '628641029Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-03-06 13:11:45', NULL),
(746, '', '', '', '', '', '1895005481Sec', 'Agent', '', '', '', 0, 0, '', '', 1, 0, '2019-03-05 12:19:19', NULL),
(747, 'cfhnxfg', 'fgghsh', '', 'sdfgs@df.com', '455456', '1575023735Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-03-05 12:21:02', NULL),
(748, 'tjre6u', 'fgejytj', '', 'jhdtsf@yugk.ugie', '4665464464', '273544787Sec', 'Agent', '', '', '', 0, 0, '', '', 1, 0, '2019-03-06 11:15:15', NULL),
(749, 'test', 'test', '', 'test123@mail.com', '1234567890', 'Error@123', 'Seller', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-10 06:17:56', NULL),
(750, 'test', 'test', '', 'testsun@mailinator.com', '1234567890', 'Evince12@', 'Seller', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-15 04:23:30', NULL),
(751, 'lara', 'Kanwal', '', 'sunielecra@gmail.com', '9925462837', '110531197Sec', 'Seller', '', '', '', 0, 0, '', '', 1, 0, '2019-04-15 04:26:49', NULL),
(752, 'Saksham', 'Saigal', '', 'saksham@evincedev.com', '1234567891', 'Evince12#', 'Seller', 'user/752/loding-img-om.png', '', '', 0, 0, '', '', 1, 0, '2019-04-16 05:56:13', NULL),
(753, 'Ramesh', 'Chauhan', '', 'ramesh@gmail.com', '1234567890', 'A123456789', 'Seller', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-16 06:36:38', NULL),
(754, 'pallav', 'mathur', '', 'pallav@evincedev.com', '1234567890', 'Evince12#', 'Seller', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-16 07:37:27', NULL),
(755, 'Ajay', 'Chauhan', '', 'ramesh123@gmail.com', '1234567890', 'A123456789', 'Seller', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-16 14:34:48', NULL),
(756, 'Saksham', 'facility', '', 'saksham@evincedev.com', '7895461233', 'Evince12#', 'Buyer', NULL, '', '', 0, 0, '', '', 1, 0, '2019-04-18 11:35:45', NULL),
(763, 'Jhon', 'maker', 'Company', 'abc@mail.com', '8476511564', '123456', 'Buyer', 'UserImages/user51.png', '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 1, 0, '2019-05-06 11:10:26', '2019-05-06 01:10:26'),
(766, 'Jhon edited', 'asd edited', 'Company', 'b445@g.com', '841564', '123456', 'Seller', 'UserImages/ac9070bae8c21bdec517bd2fa58f688d.jpg', '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 0, 0, '2019-04-26 05:53:45', '2019-04-26 07:53:45'),
(767, 'Jhon', 'asd', 'Company', 'abbdc@mail.com', '8476511564', '123456', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 1, 0, '2019-04-22 11:55:58', NULL),
(768, 'Jhon', 'asd', 'Company', 'abbddc@mail.com', '8476511564', '123456', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 0, 0, '2019-05-02 08:15:59', '2019-05-02 10:15:59'),
(769, 'Jhon', 'asd', 'Company', 'abbdvdc@mail.com', '8476511564', '123456', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 1, 0, '2019-04-23 06:47:43', NULL),
(770, 'Jhon', 'asd', 'Company', 'ac@mail.com', '8476511564', '123456', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 1, 0, '2019-04-23 11:32:50', NULL),
(771, 'b3 Buyer', 'buyer', 'Company', 'b3@g.com', '8476511564', 'Evince12#', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 4, 5, 'Yes', '', 1, 0, '2019-05-06 11:10:47', '2019-05-06 01:10:47'),
(772, 'b4', 'buyer', 'Company', 'b4@g.com', '8476511564', 'Evince12#', 'Buyer', NULL, '[\"Alachua\",\"Bay\"]', '[\"Alachua\",\"Bay\"]', 0, 0, 'Yes', '', 0, 0, '2019-05-06 11:11:08', '2019-05-06 01:11:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_setting`
--
ALTER TABLE `account_setting`
  ADD PRIMARY KEY (`account_setting_id`);

--
-- Indexes for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_faqs`
--
ALTER TABLE `cms_faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_home`
--
ALTER TABLE `cms_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_how_it_works`
--
ALTER TABLE `cms_how_it_works`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_slider_images`
--
ALTER TABLE `cms_slider_images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`contact_us_id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`faq_id`);

--
-- Indexes for table `location_search`
--
ALTER TABLE `location_search`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `multifamily_units`
--
ALTER TABLE `multifamily_units`
  ADD PRIMARY KEY (`unites_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `offerlane_county_zone`
--
ALTER TABLE `offerlane_county_zone`
  ADD PRIMARY KEY (`county_id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`property_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `properties_condition`
--
ALTER TABLE `properties_condition`
  ADD PRIMARY KEY (`condition_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `property_assets`
--
ALTER TABLE `property_assets`
  ADD PRIMARY KEY (`asset_id`);

--
-- Indexes for table `property_types`
--
ALTER TABLE `property_types`
  ADD PRIMARY KEY (`property_type_id`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_setting`
--
ALTER TABLE `account_setting`
  MODIFY `account_setting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cms_about_us`
--
ALTER TABLE `cms_about_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cms_faqs`
--
ALTER TABLE `cms_faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cms_home`
--
ALTER TABLE `cms_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cms_how_it_works`
--
ALTER TABLE `cms_how_it_works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cms_slider_images`
--
ALTER TABLE `cms_slider_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `contact_us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `faq_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_search`
--
ALTER TABLE `location_search`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=350;

--
-- AUTO_INCREMENT for table `multifamily_units`
--
ALTER TABLE `multifamily_units`
  MODIFY `unites_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=604;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offerlane_county_zone`
--
ALTER TABLE `offerlane_county_zone`
  MODIFY `county_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=656;

--
-- AUTO_INCREMENT for table `properties_condition`
--
ALTER TABLE `properties_condition`
  MODIFY `condition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=627;

--
-- AUTO_INCREMENT for table `property_assets`
--
ALTER TABLE `property_assets`
  MODIFY `asset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=551;

--
-- AUTO_INCREMENT for table `property_types`
--
ALTER TABLE `property_types`
  MODIFY `property_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=773;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
