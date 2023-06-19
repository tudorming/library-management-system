-- --------------------------------------------------------
-- Server:                       127.0.0.1
-- Versiune server:              5.7.17-log - MySQL Community Server (GPL)
-- SO server:                    Win64
-- HeidiSQL Versiune:            11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Download database structure for library
CREATE DATABASE IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `library`;

-- Download structure for table library.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `author` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(50) NOT NULL DEFAULT '',
  `nrcopy` int(11) NOT NULL DEFAULT '0',
  `timesordered` int(11) NOT NULL DEFAULT '0',
  `studyfield` varchar(100) DEFAULT '',
  `studyyear` varchar(100) DEFAULT '',
  `publisher` varchar(100) NOT NULL DEFAULT '',
  `front` varchar(100) DEFAULT NULL,
  `back` varchar(100) DEFAULT NULL,
  `side` varchar(100) DEFAULT NULL,
  `page` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- Download data for table library.books: ~44 rows (aproximativ)
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`id`, `title`, `author`, `category`, `nrcopy`, `timesordered`, `studyfield`, `studyyear`, `publisher`, `front`, `back`, `side`, `page`) VALUES
	(3, 'The Last Tudor', 'Philippa Gregory', 'History', 17, 44, '', '', 'Simon ', 'tudor-f.jpeg', 'tudor-b.jpeg', 'tudor-side.jpeg', 'tudor-page.jpeg'),
	(4, 'Electromagnetism', 'I. S. Grant', 'Education', 12, 25, 'Physics', '2nd', 'John Wiley and Sons', NULL, NULL, NULL, NULL),
	(5, 'Introduction to mechanics', 'David J. Morin', 'Education', 6, 18, 'Physics', '2nd', 'Cambridge Press', NULL, NULL, NULL, NULL),
	(6, 'Advanced engineering mathematics', 'K. A. Strout', 'Education', 9, 25, 'Physics', '2nd', 'Red Globe Press', NULL, NULL, NULL, NULL),
	(7, 'AC The Secret Crusade', 'Oliver Bowden', 'Fiction', 6, 37, '', '', 'Pinguin Fiction', 'thesecretcrusade-f.jpeg', 'thesecretcrusade-b.jpeg', 'thesecretcrusade-side.jpeg', 'thesecretcrusade-page.jpeg'),
	(8, 'AC Renaissance', 'Oliver Bowden', 'Fiction', 6, 33, '', '', 'Pinguin Fiction', 'renaissance-f.jpeg', 'renaissance-b.jpeg', 'renaissance-side.jpeg', 'renaissance-page.jpeg'),
	(9, 'AC Origins', 'Oliver Bowden', 'Fiction', 3, 31, '', '', 'Pinguin Fiction', 'origins-f.jpeg', 'origins-b.jpeg', 'origins-side.jpeg', 'origins-page.jpeg'),
	(10, 'AC Brotherhood', 'Oliver Bowden', 'Fiction', 7, 39, '', '', 'Penguin Fiction', 'brotherhood-f.jpeg', 'brotherhood-b.jpeg', 'brotherhood-side.jpeg', 'brotherhood-page.jpeg'),
	(11, 'Mathematical methods in physical sciences', 'Mary L . Boas', 'Education', 6, 24, 'Physics', '2nd', 'John Wiley and Sons', NULL, NULL, NULL, NULL),
	(12, 'Mathematical methods for physics and engineering', 'K.F. Riley', 'Education', 7, 21, 'Physics', '2nd', 'Cambridge University', NULL, NULL, NULL, NULL),
	(13, 'Optics', 'Eugene Hecht', 'Education', 3, 23, 'Physics', '4th', 'Pearson Higher Education', NULL, NULL, NULL, NULL),
	(14, 'Optics and photonics', 'Francis Graham Smith', 'Education', 6, 14, 'Physics', '4th', 'Hoboken', NULL, NULL, NULL, NULL),
	(15, 'Modern particle physics', 'Mark Thomson', 'Education', 7, 22, 'Physics', '4th', 'Cambridge University', NULL, NULL, NULL, NULL),
	(16, 'Introducation to elementary particles', 'David J. Griffiths', 'Education', 1, 24, 'Physics', '4th', 'Wiley-VCH', NULL, NULL, NULL, NULL),
	(17, 'Particle physics', 'B. R. Martin', 'Education', 5, 17, 'Physics', '4th', 'Wiley', NULL, NULL, NULL, NULL),
	(18, 'Intorduction to cosmology', 'Barbara Ryden', 'Education', 7, 25, 'Physics', '3rd', 'Cambridge University Press', NULL, NULL, NULL, NULL),
	(19, 'Galaxies in the univers', 'Linda S. Spark', 'Education', 2, 25, 'Physics', '3rd', 'Cambridge University Press', NULL, NULL, NULL, NULL),
	(20, 'Introduction to quantum mechaniscs', 'David J. Griffiths', 'Education', 7, 15, 'Physics', '3rd', 'Cambridge University Press', NULL, NULL, NULL, NULL),
	(21, 'Atoms and molecules interacting with light', 'Peter van der Straten', 'Education', 7, 23, 'Physics', '3rd', 'Cambridge University Press', NULL, NULL, NULL, NULL),
	(22, 'Computer Science: An Overview', 'Glenn Brookshear', 'Education', 4, 25, 'Computer Science', '1st', 'Pearson', NULL, NULL, NULL, NULL),
	(23, 'Computer Organization and Architecture: Designing for Performance', 'William Stallings', 'Education', 7, 23, 'Computer Science', '1st', 'Pearson', NULL, NULL, NULL, NULL),
	(24, 'Computer Science Illuminated', 'Nell Dale and John Lewis', 'Education', 1, 19, 'Computer Science', '1st', 'Jones ', NULL, NULL, NULL, NULL),
	(25, 'Introduction to Algorithms', 'Thomas H. Cormen', 'Education', 4, 16, 'Computer Science', '1st', 'MIT Press', NULL, NULL, NULL, NULL),
	(26, 'Computer Networks: A Systems Approach', 'Larry L. Peterson', 'Education', 7, 23, 'Computer Science', '1st', 'Morgan Kaufmann', NULL, NULL, NULL, NULL),
	(27, 'Classical Mechanics', 'Herbert Goldstein', 'Education', 7, 25, 'Physics', '1st', 'Addison Wesley', NULL, NULL, NULL, NULL),
	(28, 'Introduction to Electrodynamics', 'David J. Griffiths', 'Education', 9, 23, 'Physics', '1st', 'Pearson', NULL, NULL, NULL, NULL),
	(29, 'Fundamentals of Physics', 'David Halliday', 'Education', 7, 23, 'Physics', '1st', 'Wiley', NULL, NULL, NULL, NULL),
	(30, 'University Physics with Modern Physics', 'Hugh D. Young', 'Education', 5, 21, 'Physics', '1st', 'Pearson', NULL, NULL, NULL, NULL),
	(31, 'Physics for Scientists and Engineers with Modern Physics', 'Raymond A. Serway', 'Education', 7, 15, 'Physics', '1st', 'Cengage Learning', NULL, NULL, NULL, NULL),
	(32, 'Operating System Concepts', 'Abraham Silberschatz', 'Education', 7, 22, 'Computer Science', '2nd', 'Wiley', NULL, NULL, NULL, NULL),
	(33, 'Database System Concepts', 'Abraham Silberschatz', 'Education', 5, 23, 'Computer Science', '2nd', 'McGraw-Hill Education', NULL, NULL, NULL, NULL),
	(34, 'Artificial Intelligence: A Modern Approach', 'Stuart Russell', 'Education', 4, 21, 'Computer Science', '2nd', 'Pearson Education', NULL, NULL, NULL, NULL),
	(35, 'Computer Security: Principles and Practice', 'William Stallings', 'Education', 7, 23, 'Computer Science', '3rd', 'Pearson Education', NULL, NULL, NULL, NULL),
	(36, 'Introduction to Cryptography with Coding Theory', 'Wade Trappe', 'Education', 5, 22, 'Computer Science', '3rd', 'Pearson Education', NULL, NULL, NULL, NULL),
	(37, 'Computer Graphics: Principles and Practice', 'John F. Hughes', 'Education', 7, 17, 'Computer Science', '3rd', 'Addison-Wesley Professional', NULL, NULL, NULL, NULL),
	(38, 'Compilers: Principles, Techniques, and Tools', 'Alfred V. Aho', 'Education', 6, 16, 'Computer Science', '3rd', 'Pearson Education', NULL, NULL, NULL, NULL),
	(39, 'Introduction to Machine Learning', 'Alpaydin', 'Education', 6, 24, 'Computer Science', '4th', 'MIT Press', NULL, NULL, NULL, NULL),
	(40, 'Distributed Systems: Principles and Paradigms', 'Andrew S. Tanenbaum', 'Education', 4, 27, 'Computer Science', '4th', 'Pearson Education', NULL, NULL, NULL, NULL),
	(41, 'The Art of Computer Programming', 'Donald E. Knuth', 'Education', 3, 16, 'Computer Science', '4th', 'Addison-Wesley Professional', NULL, NULL, NULL, NULL),
	(42, 'Programming Language Pragmatics', 'Michael L. Scott', 'Education', 8, 25, 'Computer Science', '4th', 'Morgan Kaufmann Publishers', NULL, NULL, NULL, NULL),
	(43, 'Computer Architecture: A Quantitative Approach', 'John L. Hennessy', 'Education', 6, 23, 'Computer Science', '4th', 'Morgan Kaufmann Publishers', NULL, NULL, NULL, NULL),
	(44, 'The Tudor Secret', 'C.W. Gortner', 'History', 7, 24, '', '', ' St. Martin\'s Griffin', NULL, NULL, NULL, NULL),
	(45, 'The Kingmaker\'s Daughter', 'Philippa Gregory', 'History', 5, 11, '', '', 'Touchstone', NULL, NULL, NULL, NULL),
	(46, 'The King\'s Grace', 'Anne Easter Smith', 'History', 7, 23, '', '', 'Touchstone', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- Download structure for table library.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uemail` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(150) NOT NULL DEFAULT '',
  `timestamp` bigint(20) NOT NULL DEFAULT '0',
  `orderedbooks` varchar(200) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Download data for table library.orders: ~25 rows (aproximativ)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `uemail`, `description`, `timestamp`, `orderedbooks`) VALUES
	(1, 'tmingheras@gmail.com', 'RETURNED', 1679496780217, 'Introduction to mechanics,Advanced engineering mathematics'),
	(2, 'pateu.sunca@gmail.com', 'RETURNED', 1679171363651, 'AC The Secret Crusade,AC Renaissance,The Last Tudor'),
	(3, 'tmingheras@gmail.com', 'PICK UP', 1679080907350, 'Electromagnetism,Advanced engineering mathematics,Introduction to mechanics'),
	(4, 'tmingheras@gmail.com', 'PICK UP', 1679080917759, 'The Last Tudor,AC The Secret Crusade,Introducation to elementary particles'),
	(5, 'tmingheras@gmail.com', 'LENT', 1679498806913, 'Distributed Systems: Principles and Paradigms,Introduction to Machine Learning,The Art of Computer Programming'),
	(6, 'tmingheras@gmail.com', 'RETURNED', 1679348238979, 'Introduction to mechanics,Advanced engineering mathematics'),
	(7, 'tmingheras@gmail.com', 'RETURNED', 1679324483124, 'Electromagnetism,Mathematical methods in physical sciences,Mathematical methods in physical sciences'),
	(8, 'pateu.sunca@gmail.com', 'LENT', 1679498805073, 'Introduction to mechanics,Advanced engineering mathematics'),
	(9, 'pateu.sunca@gmail.com', 'PICK UP', 1679348168315, 'AC The Secret Crusade,The Last Tudor'),
	(10, 'tmingheras@gmail.com', 'RETURNED', 1679498530060, 'The Last Tudor,Electromagnetism'),
	(11, 'tmingheras@gmail.com', 'RETURNED', 1679497930522, 'The Last Tudor,Electromagnetism'),
	(12, 'tmingheras@gmail.com', 'RETURNED', 1679498112597, 'The Last Tudor,Electromagnetism'),
	(13, 'tmingheras@gmail.com', 'LENT', 1679533697890, 'The Last Tudor,Electromagnetism'),
	(14, 'tmingheras@gmail.com', 'RETURNED', 1679499144096, 'The Last Tudor,Electromagnetism'),
	(15, 'tmingheras@gmail.com', 'PICK UP', 1679533445508, 'AC The Secret Crusade,Advanced engineering mathematics,Introduction to mechanics'),
	(16, 'tmingheras@gmail.com', 'LENT', 1679533700902, 'Particle physics,Galaxies in the univers,The Kingmaker\'s Daughter'),
	(17, 'tmingheras@gmail.com', 'PICK UP', 1679533471525, 'Optics and photonics,Particle physics,Introduction to Algorithms'),
	(18, 'tmingheras@gmail.com', 'PICK UP', 1679533712951, 'Mathematical methods in physical sciences,AC Origins,Introducation to elementary particles'),
	(19, 'tmingheras@gmail.com', 'PICK UP', 1679533724678, 'Galaxies in the univers,Computer Science: An Overview,Introduction to Algorithms'),
	(20, 'tmingheras@gmail.com', 'PICK UP', 1679533742062, 'Electromagnetism,AC The Secret Crusade,Distributed Systems: Principles and Paradigms'),
	(21, 'tmingheras@gmail.com', 'RETURNED', 1679575739598, 'Electromagnetism,Advanced engineering mathematics'),
	(22, 'tmingheras@gmail.com', 'PICK UP', 1679588555494, 'Introduction to mechanics,AC Renaissance'),
	(23, 'tmingheras@gmail.com', 'RETURNED', 1679589031042, 'Introduction to mechanics,AC Renaissance'),
	(24, 'tmingheras@gmail.com', 'RETURNED', 1679590305109, 'The Last Tudor'),
	(25, 'tmingheras@gmail.com', 'PICK UP', 1681083052887, 'Introduction to Algorithms,Introduction to Machine Learning');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Download structure for table library.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(100) NOT NULL DEFAULT '0',
  `permissions` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Download data for table library.users: ~4 rows (aproximativ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `password`, `email`, `permissions`) VALUES
	(1, 'Tudor', '$2a$08$64VxwFPDzPjCp9DdceMr7OKPnbi.9t09qBhPMgPGP7rBbFJR5zR3S', 'admin@admin.com', 0),
	(2, 'Tudor Mingheras', '$2a$08$16IL.PXfEAbQrK48CYuFZOi1ftsi8VWPq1wEBg0UsIwLFjgmb8KVO', 'tmingheras@gmail.com', 0),
	(3, 'Pateu Sunca', '$2a$08$0WhQLVL6gyLgLSTFspWCAuv0tSRRCaEZm7zIp7xDBOgJlmVl6odM.', 'pateu.sunca@gmail.com', 0),
	(5, 'Tudor', '$2a$08$LbLVgNkbJIGWOnES.Agr6O177PYiqsm8hyn0RzPnl/OAFzz5btZiC', 'tudormingheras@yahoo.com', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
