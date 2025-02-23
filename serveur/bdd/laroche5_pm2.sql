-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : devbdd.iutmetz.univ-lorraine.fr
-- Généré le : mer. 05 avr. 2023 à 22:20
-- Version du serveur : 10.3.38-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `laroche5_pm2`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `DELETE_FAVORI` (IN `v_id_prod` INT, IN `v_id_us` INT)  NO SQL BEGIN

DECLARE v_id_prod_existe, v_id_us_existe BOOLEAN;

CALL id_prod_existe(v_id_prod, v_id_prod_existe);
CALL id_us_existe(v_id_us, v_id_us_existe);

IF v_id_prod_existe AND v_id_us_existe THEN

	DELETE FROM FAVORI
    WHERE id_prod = v_id_prod
    AND id_us = v_id_us;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_cat_existe` (IN `v_id_cat` INT, OUT `v_id_cat_existe` BOOLEAN)   BEGIN

DECLARE v_id_cat_invalide CONDITION FOR SQLSTATE "45004";
DECLARE error_message VARCHAR(80);

SELECT v_id_cat IN (SELECT id_cat FROM CATEGORIE) INTO v_id_cat_existe;

IF v_id_cat_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45004 : La catégorie n°", v_id_cat, " n'existe pas");
    SIGNAL v_id_cat_invalide SET MYSQL_ERRNO = "45004",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_col_existe` (IN `v_id_col` INT, OUT `v_id_col_existe` BOOLEAN)   BEGIN

DECLARE v_id_col_invalide CONDITION FOR SQLSTATE "45002";
DECLARE error_message VARCHAR(80);

SELECT v_id_col IN (SELECT id_col FROM COULEUR) INTO v_id_col_existe;

IF v_id_col_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45002 : La couleur n°", v_id_col, " n'existe pas");
    SIGNAL v_id_col_invalide SET MYSQL_ERRNO = "45002",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_com_existe` (IN `v_id_com` INT, OUT `v_id_com_existe` BOOLEAN)   BEGIN

DECLARE v_id_com_invalide CONDITION FOR SQLSTATE "45005";
DECLARE error_message VARCHAR(80);

SELECT v_id_com IN (SELECT id_com FROM COMMANDE) INTO v_id_com_existe;

IF v_id_com_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45005 : La commande n°", v_id_com, " n'existe pas");
    SIGNAL v_id_com_invalide SET MYSQL_ERRNO = "45005",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_perm_existe` (IN `v_id_perm` INT, OUT `v_id_perm_existe` BOOLEAN)   BEGIN

DECLARE v_id_perm_invalide CONDITION FOR SQLSTATE "45007";
DECLARE error_message VARCHAR(80);

SELECT v_id_perm IN (SELECT id_perm FROM PERMISSION) INTO v_id_perm_existe;

IF v_id_perm_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45007 : La permission n°", v_id_perm, " n'existe pas");
    SIGNAL v_id_perm_invalide SET MYSQL_ERRNO = "45007",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_prod_existe` (IN `v_id_prod` INT, OUT `v_id_prod_existe` BOOLEAN)   BEGIN

DECLARE v_id_prod_invalide CONDITION FOR SQLSTATE "45001";
DECLARE error_message VARCHAR(80);

SELECT v_id_prod IN (SELECT id_prod FROM PRODUIT) INTO v_id_prod_existe;

IF v_id_prod_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45001 : Le produit n°", v_id_prod, " n'existe pas");
    SIGNAL v_id_prod_invalide SET MYSQL_ERRNO = "45001",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_tail_existe` (IN `v_id_tail` INT, OUT `v_id_tail_existe` BOOLEAN)   BEGIN

DECLARE v_id_tail_invalide CONDITION FOR SQLSTATE "45003";
DECLARE error_message VARCHAR(80);

SELECT v_id_tail IN (SELECT id_tail FROM TAILLE) INTO v_id_tail_existe;

IF v_id_tail_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45003 : La taille n°", v_id_tail, " n'existe pas");
    SIGNAL v_id_tail_invalide SET MYSQL_ERRNO = "45003",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `id_us_existe` (IN `v_id_us` INT, OUT `v_id_us_existe` BOOLEAN)   BEGIN

DECLARE v_id_us_invalide CONDITION FOR SQLSTATE "45006";
DECLARE error_message VARCHAR(80);

SELECT v_id_us IN (SELECT id_us FROM USER) INTO v_id_us_existe;

IF v_id_us_existe = 0 THEN
    SET error_message := CONCAT("Erreur 45006 : L'user n°", v_id_us, " n'existe pas");
    SIGNAL v_id_us_invalide SET MYSQL_ERRNO = "45006",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `INSERT_FAVORI` (IN `v_id_prod` INT, IN `v_id_us` INT)  DETERMINISTIC NO SQL BEGIN

INSERT INTO FAVORI
(id_prod, id_us)
VALUES
(v_id_prod, v_id_us);

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `login_non_existe` (IN `v_login` VARCHAR(20), OUT `v_login_non_existe` BOOLEAN)  NO SQL BEGIN

DECLARE v_login_invalide CONDITION FOR SQLSTATE "45018";
DECLARE error_message VARCHAR(80);

SELECT v_login IN (SELECT login FROM USER) INTO v_login_non_existe;

IF v_login_non_existe <> 0 THEN
    SET error_message := CONCAT("Erreur 45018 : Le login ", v_login, " existe déjà");
    SIGNAL v_login_invalide SET MYSQL_ERRNO = "45018",
    MESSAGE_TEXT = error_message;
END IF;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `verifier_date` (IN `v_date` DATE, OUT `v_date_conforme` BOOLEAN)   BEGIN

DECLARE v_date_superieure CONDITION FOR SQLSTATE "45101";
DECLARE v_date_inferieure CONDITION FOR SQLSTATE "45102";
DECLARE error_message VARCHAR(80);

DECLARE v_now, v_1900 DATE;

SELECT NOW() INTO v_now;

IF v_date > v_now THEN
    SET v_date_conforme := FALSE;

    SET error_message := CONCAT("Erreur 45101 : La date ", v_date, " est supérieure à la date d'aujourd'hui");
    SIGNAL v_date_superieure SET MYSQL_ERRNO = "45101",
    MESSAGE_TEXT = error_message;
END IF;

SELECT MAKEDATE(1900, 1) INTO v_1900;

IF v_date < v_1900 THEN
    SET v_date_conforme := FALSE;

    SET error_message := CONCAT("Erreur 45102 : La date ", v_date, " est trop vieille (< 1900)");
    SIGNAL v_date_inferieure SET MYSQL_ERRNO = "45102",
    MESSAGE_TEXT = error_message;
END IF;

SET v_date_conforme := TRUE;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `verifier_prix` (IN `v_prix` FLOAT, OUT `v_prix_correct` BOOLEAN)   BEGIN

DECLARE v_prix_negatif CONDITION FOR SQLSTATE "45103";
DECLARE error_message VARCHAR(80);

IF v_prix < 0 THEN
    SET v_prix_correct := FALSE;

    SET error_message := CONCAT("Erreur 45103 : Le prix ", v_prix, " ne peut pas être négatif");
    SIGNAL v_prix_negatif SET MYSQL_ERRNO = "45103",
    MESSAGE_TEXT = error_message;
END IF;

SET v_prix_correct := TRUE;

END$$

CREATE DEFINER=`laroche5_appli`@`%` PROCEDURE `verifier_qte` (IN `v_qte` INT, OUT `v_qte_correcte` BOOLEAN)   BEGIN

DECLARE v_qte_negative CONDITION FOR SQLSTATE "45104";
DECLARE error_message VARCHAR(80);

IF v_qte < 0 THEN
    SET v_qte_correcte := FALSE;

    SET error_message := CONCAT("Erreur 45104 : La quantité ", v_qte, " ne peut pas être négative");
    SIGNAL v_qte_negative SET MYSQL_ERRNO = "45104",
    MESSAGE_TEXT = error_message;
END IF;

SET v_qte_correcte := TRUE;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `CATEGORIE`
--

CREATE TABLE `CATEGORIE` (
  `id_cat` int(11) NOT NULL,
  `nom_cat` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `CATEGORIE`
--

INSERT INTO `CATEGORIE` (`id_cat`, `nom_cat`) VALUES
(1, 'Bonnet'),
(2, 'Pull'),
(3, 'Gants'),
(4, 'Chaussettes'),
(5, 'Décoration'),
(6, 'Schysautre');

-- --------------------------------------------------------

--
-- Structure de la table `COL_PROD`
--

CREATE TABLE `COL_PROD` (
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `diff_prix_col` float NOT NULL,
  `path_img` varchar(34) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `COL_PROD`
--

INSERT INTO `COL_PROD` (`id_prod`, `id_col`, `diff_prix_col`, `path_img`) VALUES
(1, 2, 0, 'bonnet noel rouge.jpg'),
(1, 16, 1, 'bonnetNoelDoré.jpg'),
(2, 2, 0, 'BonnetMocheRouge.jpeg'),
(2, 3, 0, 'bonnet moche vert.jpg'),
(2, 8, 0, 'bonnetMocheMarron.jpg'),
(2, 5, 0, 'bonnetMocheBlanc.webp'),
(3, 2, 0, 'pull-moche-noel-renne.jpeg'),
(4, 2, 0, 'pullLaineRouge.jpg'),
(4, 3, 0, 'pullLaineVert.webp'),
(4, 7, 0, 'pullLaineNoir.jpg'),
(11, 15, 0, 'girlandeMulti.jpg'),
(11, 2, 0, 'girlandeRouge.jpg'),
(11, 5, 0, 'girlandeBlanc.jpg'),
(13, 3, 0, 'sapinPlastiqueVert.jpg'),
(13, 5, 0, 'sapinPlastiqueBlanc.jpg'),
(14, 3, 0, 'sapinNaturelVert.jpg'),
(14, 5, 0, 'sapinNaturelBlanc.jpg'),
(12, 1, 0, 'bouleNoelJaune.jpg'),
(12, 2, 0, 'bouleNoelRouge.jpg'),
(12, 3, 0, 'bouleNoelVert.jpg'),
(12, 5, 0, 'bouleNoelBlanc.jpg'),
(12, 16, 0, 'bouleNoelDoré.jpg'),
(12, 17, 0, 'bouleNoelArgent.jpg'),
(5, 5, 0, 'gants ski blanc.webp'),
(5, 6, 0, 'gantSkiGris.webp'),
(5, 7, 0, 'gantSkiNoir.jpg'),
(6, 4, 0, 'sousGantBleu.jpg'),
(6, 5, 0, 'sousGantBlanc.jpg'),
(6, 6, 0, 'sousGantGris.webp'),
(6, 7, 0, 'sous gants noirs.jpg'),
(6, 9, 0, 'sousGantViolet.webp'),
(6, 14, 0, 'sousGantTurquoise.webp'),
(6, 2, 0, 'sousGantRouge.webp'),
(6, 3, 0, 'sousGantVert.webp'),
(7, 2, 0, 'gants en laine rouge.jpg'),
(7, 3, 0, 'gantLaineVert.jpg'),
(7, 5, 0, 'gantLaineBlanc.webp'),
(7, 6, 0, 'gantLaineGris.jpg'),
(7, 7, 0, 'gantLaineNoir.jpg'),
(7, 8, 0, 'gantLaineMarron.webp'),
(8, 2, 0, 'chaussette de noel.jpg'),
(8, 5, 0, 'chaussettePereNoelblanc.webp'),
(8, 6, 0, 'chaussettePereNoelGris.jpg'),
(9, 2, 0, 'chaussetteHauteRouge.jpg'),
(9, 5, 0, 'chaussetteHauteBlanc.avif'),
(9, 6, 0, 'chaussetteHauteGris.webp'),
(9, 7, 0, 'chaussettes hautes noires.jpg'),
(9, 13, 0, 'chaussetteHauteOrange.avif'),
(10, 2, 0, 'chaussetteLaineRouge.webp'),
(10, 5, 0, 'chaussetteLaineBlanc.jpg'),
(10, 6, 0, 'chaussetteLaineGris.jpg'),
(10, 7, 0, 'chaussetteLaineNoir.jpg'),
(10, 10, 0, 'chaussetteLaineRose.webp'),
(10, 12, 0, 'chaussettelaineMagenta.jpg'),
(6, 11, 0, 'sousGantCyan.webp'),
(6, 12, 0, 'sousGantMagenta.webp'),
(10, 15, 0, 'chaussettes laine multicolores.jpg'),
(4, 6, 0, 'pull_laine_blanc.jpg'),
(15, 2, 0, 'pere_noel.png');

--
-- Déclencheurs `COL_PROD`
--
DELIMITER $$
CREATE TRIGGER `COL_PROD_BEFORE_INSERT` BEFORE INSERT ON `COL_PROD` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_col_existe, v_prix_correct BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL verifier_prix(NEW.diff_prix_col, v_prix_correct);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `COL_PROD_BEFORE_UPDATE` BEFORE UPDATE ON `COL_PROD` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_col_existe, v_prix_correct BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL verifier_prix(NEW.diff_prix_col, v_prix_correct);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `COMMANDE`
--

CREATE TABLE `COMMANDE` (
  `id_com` int(11) NOT NULL,
  `date_com` date NOT NULL,
  `id_us` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `COMMANDE`
--

INSERT INTO `COMMANDE` (`id_com`, `date_com`, `id_us`) VALUES
(54, '2023-04-05', 11),
(55, '2023-04-05', 11),
(56, '2023-04-05', 11),
(57, '2023-04-05', 11),
(58, '2023-04-05', 11),
(59, '2023-04-05', 11),
(60, '2023-04-05', 11),
(61, '2023-04-05', 7),
(62, '2023-04-05', 7),
(63, '2023-04-05', 7),
(64, '2023-04-05', 16),
(65, '2023-04-05', 18),
(66, '2023-04-05', 18);

--
-- Déclencheurs `COMMANDE`
--
DELIMITER $$
CREATE TRIGGER `COMMANDE_BEFORE_INSERT` BEFORE INSERT ON `COMMANDE` FOR EACH ROW BEGIN

DECLARE v_id_us_existe, v_date_conforme BOOLEAN;

CALL id_us_existe(NEW.id_us, v_id_us_existe);
CALL verifier_date(NEW.date_com, v_date_conforme);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `COMMANDE_BEFORE_UPDATE` BEFORE UPDATE ON `COMMANDE` FOR EACH ROW BEGIN

DECLARE v_id_us_existe, v_date_conforme BOOLEAN;

CALL id_us_existe(NEW.id_us, v_id_us_existe);
CALL verifier_date(NEW.date_com, v_date_conforme);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `COULEUR`
--

CREATE TABLE `COULEUR` (
  `id_col` int(11) NOT NULL,
  `nom_col` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `COULEUR`
--

INSERT INTO `COULEUR` (`id_col`, `nom_col`) VALUES
(1, 'Jaune'),
(2, 'Rouge'),
(3, 'Vert'),
(4, 'Bleu'),
(5, 'Blanc'),
(6, 'Gris'),
(7, 'Noir'),
(8, 'Marron'),
(9, 'Violet'),
(10, 'Rose'),
(11, 'Cyan'),
(12, 'Magenta'),
(13, 'Orange'),
(14, 'Turquoise'),
(15, 'Multicolore'),
(16, 'Doré'),
(17, 'Argenté');

-- --------------------------------------------------------

--
-- Structure de la table `DETAIL_COM`
--

CREATE TABLE `DETAIL_COM` (
  `id_com` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `qte_com` int(11) NOT NULL,
  `prix_total` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `DETAIL_COM`
--

INSERT INTO `DETAIL_COM` (`id_com`, `id_prod`, `id_col`, `id_tail`, `qte_com`, `prix_total`) VALUES
(53, 8, 5, 12, 1, 15.6),
(53, 15, 2, 17, 50, 0),
(53, 3, 2, 4, 9, 162),
(53, 2, 8, 17, 1, 4.8),
(53, 12, 17, 3, 1, 9.6),
(53, 6, 2, 3, 1, 13.2),
(53, 1, 16, 17, 1, 7.2),
(53, 1, 2, 17, 1, 6),
(54, 8, 5, 12, 1, 15.6),
(54, 15, 2, 17, 50, 0),
(54, 3, 2, 4, 9, 162),
(54, 2, 8, 17, 1, 4.8),
(54, 12, 17, 3, 1, 9.6),
(54, 6, 2, 3, 1, 13.2),
(54, 1, 16, 17, 1, 7.2),
(54, 1, 2, 17, 1, 6),
(55, 8, 5, 12, 1, 15.6),
(55, 15, 2, 17, 50, 0),
(55, 3, 2, 4, 9, 162),
(55, 2, 8, 17, 1, 4.8),
(55, 12, 17, 3, 1, 9.6),
(55, 6, 2, 3, 1, 13.2),
(55, 1, 16, 17, 1, 7.2),
(55, 1, 2, 17, 1, 6),
(56, 8, 5, 12, 1, 15.6),
(56, 15, 2, 17, 50, 0),
(56, 3, 2, 4, 9, 162),
(56, 2, 8, 17, 1, 4.8),
(56, 12, 17, 3, 1, 9.6),
(56, 6, 2, 3, 1, 13.2),
(56, 1, 16, 17, 1, 7.2),
(56, 1, 2, 17, 1, 6),
(57, 8, 5, 12, 1, 15.6),
(57, 15, 2, 17, 50, 0),
(57, 3, 2, 4, 9, 162),
(57, 2, 8, 17, 1, 4.8),
(57, 12, 17, 3, 1, 9.6),
(57, 6, 2, 3, 1, 13.2),
(57, 1, 16, 17, 1, 7.2),
(57, 1, 2, 17, 1, 6),
(58, 10, 5, 12, 1, 12),
(58, 12, 17, 3, 1, 9.6),
(59, 8, 5, 12, 1, 15.6),
(59, 10, 5, 12, 1, 12),
(60, 10, 5, 12, 1, 12),
(60, 12, 17, 3, 1, 9.6),
(61, 1, 16, 17, 1, 7.2),
(61, 8, 5, 12, 1, 15.6),
(61, 12, 17, 3, 19, 182.4),
(62, 2, 5, 17, 1, 4.8),
(62, 14, 3, 7, 3, 324),
(63, 8, 2, 12, 1, 15.6),
(63, 10, 2, 12, 1, 12),
(64, 12, 1, 3, 5, 48),
(65, 9, 13, 15, 4, 86.4),
(66, 5, 7, 1, 1, 12),
(66, 12, 16, 1, 1, 8.4);

--
-- Déclencheurs `DETAIL_COM`
--
DELIMITER $$
CREATE TRIGGER `DETAIL_COM_BEFORE_INSERT` BEFORE INSERT ON `DETAIL_COM` FOR EACH ROW BEGIN

DECLARE v_id_com_existe, v_id_prod_existe, v_id_col_existe, v_id_tail_existe, v_prix_correct, v_qte_correcte BOOLEAN;

CALL id_com_existe(NEW.id_com, v_id_com_existe);
CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_prix(NEW.prix_total, v_prix_correct);
CALL verifier_qte(NEW.qte_com, v_qte_correcte);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `DETAIL_COM_BEFORE_UPDATE` BEFORE UPDATE ON `DETAIL_COM` FOR EACH ROW BEGIN

DECLARE v_id_com_existe, v_id_prod_existe, v_id_col_existe, v_id_tail_existe, v_prix_correct, v_qte_correcte BOOLEAN;

CALL id_com_existe(NEW.id_com, v_id_com_existe);
CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_prix(NEW.prix_total, v_prix_correct);
CALL verifier_qte(NEW.qte_com, v_qte_correcte);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `FAVORI`
--

CREATE TABLE `FAVORI` (
  `id_us` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `FAVORI`
--

INSERT INTO `FAVORI` (`id_us`, `id_prod`) VALUES
(7, 2),
(7, 12),
(11, 1),
(11, 2),
(11, 7),
(11, 12),
(11, 15),
(16, 8),
(16, 10),
(16, 12),
(18, 8),
(18, 12);

--
-- Déclencheurs `FAVORI`
--
DELIMITER $$
CREATE TRIGGER `FAVORI_BEFORE_INSERT` BEFORE INSERT ON `FAVORI` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_us_existe BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_us_existe(NEW.id_us, v_id_us_existe);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `FAVORI_BEFORE_UPDATE` BEFORE UPDATE ON `FAVORI` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_us_existe BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_us_existe(NEW.id_us, v_id_us_existe);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `PANIER`
--

CREATE TABLE `PANIER` (
  `id_us` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `qte_pan` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `PANIER`
--

INSERT INTO `PANIER` (`id_us`, `id_prod`, `id_col`, `id_tail`, `qte_pan`) VALUES
(11, 9, 13, 12, 2),
(16, 2, 2, 17, 1),
(16, 9, 2, 12, 1),
(11, 1, 16, 17, 3),
(7, 1, 16, 17, 3),
(16, 10, 2, 12, 1),
(7, 10, 2, 12, 1),
(18, 12, 1, 3, 1),
(11, 12, 17, 3, 10),
(11, 8, 2, 12, 11),
(11, 15, 2, 11, 10),
(16, 1, 16, 17, 1),
(16, 11, 2, 11, 1),
(7, 11, 2, 9, 1),
(7, 15, 2, 11, 14);

--
-- Déclencheurs `PANIER`
--
DELIMITER $$
CREATE TRIGGER `PANIER_BEFORE_INSERT` BEFORE INSERT ON `PANIER` FOR EACH ROW BEGIN

DECLARE v_id_us_existe, v_id_prod_existe, v_id_col_existe, v_id_tail_existe, v_qte_correcte BOOLEAN;

CALL id_us_existe(NEW.id_us, v_id_us_existe);
CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_qte(NEW.qte_pan, v_qte_correcte);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `PANIER_BEFORE_UPDATE` BEFORE UPDATE ON `PANIER` FOR EACH ROW BEGIN

DECLARE v_id_us_existe, v_id_prod_existe, v_id_col_existe, v_id_tail_existe, v_qte_correcte BOOLEAN;

CALL id_us_existe(NEW.id_us, v_id_us_existe);
CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_col_existe(NEW.id_col, v_id_col_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_qte(NEW.qte_pan, v_qte_correcte);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `PERMISSION`
--

CREATE TABLE `PERMISSION` (
  `id_perm` int(11) NOT NULL,
  `nom_perm` varchar(15) NOT NULL,
  `num_grade` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `PERMISSION`
--

INSERT INTO `PERMISSION` (`id_perm`, `nom_perm`, `num_grade`) VALUES
(1, 'Administrateur', 0),
(2, 'Client', 1);

-- --------------------------------------------------------

--
-- Structure de la table `PRODUIT`
--

CREATE TABLE `PRODUIT` (
  `id_prod` int(11) NOT NULL,
  `nom_prod` varchar(50) NOT NULL,
  `description` varchar(700) NOT NULL,
  `prix_base` float NOT NULL,
  `id_cat` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `PRODUIT`
--

INSERT INTO `PRODUIT` (`id_prod`, `nom_prod`, `description`, `prix_base`, `id_cat`) VALUES
(1, 'Bonnet du père noël', 'Un bonnet du père noël classique, bien pour se déguiser et apporter la bonne ambiance.', 5, 1),
(2, 'Bonnet moche de noël', 'Un bonnet pas très beau, mais qui fait l\'affaire pour se réchauffer', 4, 1),
(3, 'Pull de rennes', 'Un pull avec un rennes dessus, un indémodable', 15, 2),
(4, 'Pull en laine', 'Un pull en laine très sobre, très confortable, très cosy', 30, 2),
(5, 'Gants de ski', 'Des gants adaptés à tous types de neige, de pluie ou d\'intempéries diverses', 10, 3),
(6, 'Sous-gants', 'Des sous-gants adaptés au gants de ski, très léger et qui tiennent chaud', 10, 3),
(7, 'Gants en laine', 'Gants en laine adaptés à n\'importe quel besoin', 11, 3),
(8, 'Chaussettes du père noël', 'Des chaussettes conviviales pour cacher les cadeaux et mettre près de la cheminée', 13, 4),
(9, 'Chaussettes hautes', 'Chaussettes idéales pour se maintenir au chaud en toute circonstance', 17, 4),
(10, 'Chaussettes en laine', 'Des chaussettes classiques mais néanmoins pratiques', 10, 4),
(11, 'Guirlande lumineuse', 'Une guirlande sympatique pour égayer les réveillons de noël', 30, 5),
(12, 'Boules de noël', 'Des boules variées à accrocher à votre sapin', 7, 5),
(13, 'Sapin de Noël en plastique', 'Un sapin de noël passe partout, sans la corvée du ménage', 60, 5),
(14, 'Sapin de Noël naturel', 'Un sapin de noël naturel, avec les épines qui tombent et la déforestation qui va avec', 70, 5),
(15, 'Le père noël', 'Un père noël à la mode, visiblement trop cool pour ce monde. La légende dit qu\'il fait trembler internet lui-même. Il est si fort qu\'il a pu se battre contre Chuck Norris et Rambo en même temps et il a gagné tout en distribuant ses cadeaux. Il est tellement puissant qu\'on ne peut pas lui attribuer de prix. Et si on ne peut pas lui attribuer de prix, c\'est que c\'est gratuit.', 0, 6);

--
-- Déclencheurs `PRODUIT`
--
DELIMITER $$
CREATE TRIGGER `PRODUIT_BEFORE_INSERT` BEFORE INSERT ON `PRODUIT` FOR EACH ROW BEGIN

DECLARE v_id_cat_existe, v_prix_correct BOOLEAN;

CALL id_cat_existe(NEW.id_cat, v_id_cat_existe);
CALL verifier_prix(NEW.prix_base, v_prix_correct);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `PRODUIT_BEFORE_UPDATE` BEFORE UPDATE ON `PRODUIT` FOR EACH ROW BEGIN

DECLARE v_id_cat_existe, v_prix_correct BOOLEAN;

CALL id_cat_existe(NEW.id_cat, v_id_cat_existe);
CALL verifier_prix(NEW.prix_base, v_prix_correct);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `SELECT_COMMANDES`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `SELECT_COMMANDES` (
`id_com` int(11)
,`id_us` int(11)
,`id_prod` int(11)
,`id_col` int(11)
,`id_tail` int(11)
,`date_com` date
,`qte_com` int(11)
,`prix_total` float
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `SELECT_PANIERS`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `SELECT_PANIERS` (
`id_us` int(11)
,`id_prod` int(11)
,`nom_prod` varchar(50)
,`id_cat` int(11)
,`nom_cat` varchar(30)
,`id_col` int(11)
,`nom_col` varchar(20)
,`id_tail` int(11)
,`path_img` varchar(34)
,`prix_unit` double(19,2)
,`qte_pan` int(11)
,`prix_total` double(19,2)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `SELECT_PRODUITS`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `SELECT_PRODUITS` (
`id_prod` int(11)
,`nom_prod` varchar(50)
,`description` varchar(700)
,`id_cat` int(11)
,`nom_cat` varchar(30)
,`id_col` int(11)
,`nom_col` varchar(20)
,`id_tail` int(11)
,`nom_tail` varchar(13)
,`path_img` varchar(34)
,`prix_unit` double(19,2)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `SELECT_USERS`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `SELECT_USERS` (
`id_us` int(11)
,`nom_us` varchar(30)
,`prenom_us` varchar(20)
,`mel` varchar(100)
,`date_naiss` date
,`login` varchar(20)
,`mdp` varchar(255)
,`salt` varchar(20)
,`id_perm` int(11)
,`nom_perm` varchar(15)
);

-- --------------------------------------------------------

--
-- Structure de la table `TAILLE`
--

CREATE TABLE `TAILLE` (
  `id_tail` int(11) NOT NULL,
  `nom_tail` varchar(13) NOT NULL,
  `id_cat` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `TAILLE`
--

INSERT INTO `TAILLE` (`id_tail`, `nom_tail`, `id_cat`) VALUES
(1, 'XS', 0),
(2, 'S', 0),
(3, 'M', 0),
(4, 'L', 0),
(5, 'XL', 0),
(6, '30cm', 5),
(7, '60cm', 5),
(8, '50cm', 5),
(9, '100cm', 5),
(10, '150cm', 5),
(11, '200cm', 5),
(12, '32-34', 4),
(13, '35-38', 4),
(14, '39-42', 4),
(15, '43-46', 4),
(16, '47-48', 4),
(17, 'Pas de taille', 0);

-- --------------------------------------------------------

--
-- Structure de la table `TAIL_PROD`
--

CREATE TABLE `TAIL_PROD` (
  `id_prod` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `diff_prix_tail` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `TAIL_PROD`
--

INSERT INTO `TAIL_PROD` (`id_prod`, `id_tail`, `diff_prix_tail`) VALUES
(3, 5, 0),
(3, 4, 0),
(3, 3, 0),
(3, 2, 0),
(3, 1, 0),
(4, 1, 0),
(4, 2, 1),
(4, 3, 2),
(4, 4, 3),
(4, 5, 4),
(5, 1, 0),
(5, 2, 0.5),
(5, 3, 1),
(6, 1, 0),
(6, 2, 0.5),
(6, 3, 1),
(7, 1, 0),
(7, 2, 0.5),
(7, 3, 1),
(8, 12, 0),
(8, 13, 0.5),
(8, 14, 0.5),
(8, 15, 1),
(8, 16, 1),
(9, 12, 0),
(9, 13, 0.5),
(9, 14, 0.5),
(9, 15, 1),
(9, 16, 1),
(10, 12, 0),
(10, 13, 0.5),
(10, 14, 0.5),
(10, 15, 1),
(10, 16, 1),
(11, 8, 0),
(11, 9, 3),
(11, 10, 7),
(11, 11, 10),
(12, 1, 0),
(12, 2, 0.5),
(12, 3, 1),
(13, 6, 0),
(13, 7, 20),
(14, 6, 0),
(14, 7, 20),
(1, 17, 0),
(2, 17, 0),
(15, 11, 0);

--
-- Déclencheurs `TAIL_PROD`
--
DELIMITER $$
CREATE TRIGGER `TAIL_PROD_BEFORE_INSERT` BEFORE INSERT ON `TAIL_PROD` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_tail_existe, v_prix_correct BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_prix(NEW.diff_prix_tail, v_prix_correct);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TAIL_PROD_BEFORE_UPDATE` BEFORE UPDATE ON `TAIL_PROD` FOR EACH ROW BEGIN

DECLARE v_id_prod_existe, v_id_tail_existe, v_prix_correct BOOLEAN;

CALL id_prod_existe(NEW.id_prod, v_id_prod_existe);
CALL id_tail_existe(NEW.id_tail, v_id_tail_existe);
CALL verifier_prix(NEW.diff_prix_tail, v_prix_correct);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `USER`
--

CREATE TABLE `USER` (
  `id_us` int(11) NOT NULL,
  `nom_us` varchar(30) NOT NULL,
  `prenom_us` varchar(20) NOT NULL,
  `mel` varchar(100) NOT NULL,
  `date_naiss` date NOT NULL,
  `login` varchar(20) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `salt` varchar(20) NOT NULL,
  `id_perm` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `USER`
--

INSERT INTO `USER` (`id_us`, `nom_us`, `prenom_us`, `mel`, `date_naiss`, `login`, `mdp`, `salt`, `id_perm`) VALUES
(7, 'admin', 'admin', 'admin@gmail.com', '2010-10-10', 'admin', 'skD7MyPRpfvsM', 'sk#@u%Q)-V}2^)gpSK&X', 1),
(11, 'Falschenbuhl', 'Rémi', 'remi.falschenbuhl@yahoo.fr', '2003-12-04', 'remiF', 'rOo9.RCDnsGfY', 'rOyJG[>IW$;,8LZmi=<n', 2),
(16, 'Philippe', 'Kévin', 'kph@gmail.com', '2003-12-04', 'new', '9l9KCmTBMCeDo', '9l;hSW*EN)S rm.j$/p1', 2),
(18, 'Laroche', 'Pierre', 'laroche5@univ-lorraine.fr', '1991-02-24', 'laroche5', 'Mw6FchtZ8zKKY', 'MwU86#P?T8LneEO#|~GG', 2);

--
-- Déclencheurs `USER`
--
DELIMITER $$
CREATE TRIGGER `USER_BEFORE_INSERT` BEFORE INSERT ON `USER` FOR EACH ROW BEGIN

DECLARE v_id_perm_existe, v_login_non_existe, v_date_conforme BOOLEAN;

CALL id_perm_existe(NEW.id_perm, v_id_perm_existe);
CALL login_non_existe(NEW.login, v_login_non_existe);
CALL verifier_date(NEW.date_naiss, v_date_conforme);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `USER_BEFORE_UPDATE` BEFORE UPDATE ON `USER` FOR EACH ROW BEGIN

DECLARE v_id_perm_existe, v_login_non_existe, v_date_conforme BOOLEAN;

CALL id_perm_existe(NEW.id_perm, v_id_perm_existe);
#CALL login_non_existe(NEW.login, v_login_non_existe);
CALL verifier_date(NEW.date_naiss, v_date_conforme);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la vue `SELECT_COMMANDES`
--
DROP TABLE IF EXISTS `SELECT_COMMANDES`;

CREATE ALGORITHM=UNDEFINED DEFINER=`laroche5_appli`@`%` SQL SECURITY DEFINER VIEW `SELECT_COMMANDES`  AS SELECT `C`.`id_com` AS `id_com`, `C`.`id_us` AS `id_us`, `DC`.`id_prod` AS `id_prod`, `DC`.`id_col` AS `id_col`, `DC`.`id_tail` AS `id_tail`, `C`.`date_com` AS `date_com`, `DC`.`qte_com` AS `qte_com`, `DC`.`prix_total` AS `prix_total` FROM (((`COMMANDE` `C` join `DETAIL_COM` `DC` on(`DC`.`id_com` = `C`.`id_com`)) join `COULEUR` `CO` on(`DC`.`id_col` = `CO`.`id_col`)) join `TAILLE` `T` on(`DC`.`id_tail` = `T`.`id_tail`)) ORDER BY `C`.`id_us` ASC, `C`.`id_com` ASC, `DC`.`id_prod` ASC, `DC`.`id_col` ASC, `DC`.`id_tail` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `SELECT_PANIERS`
--
DROP TABLE IF EXISTS `SELECT_PANIERS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`laroche5_appli`@`%` SQL SECURITY DEFINER VIEW `SELECT_PANIERS`  AS SELECT `PA`.`id_us` AS `id_us`, `P`.`id_prod` AS `id_prod`, `P`.`nom_prod` AS `nom_prod`, `P`.`id_cat` AS `id_cat`, `P`.`nom_cat` AS `nom_cat`, `P`.`id_col` AS `id_col`, `P`.`nom_col` AS `nom_col`, `P`.`id_tail` AS `id_tail`, `P`.`path_img` AS `path_img`, `P`.`prix_unit` AS `prix_unit`, `PA`.`qte_pan` AS `qte_pan`, `PA`.`qte_pan`* `P`.`prix_unit` AS `prix_total` FROM (`PANIER` `PA` join (select `SELECT_PRODUITS`.`id_prod` AS `id_prod`,`SELECT_PRODUITS`.`nom_prod` AS `nom_prod`,`SELECT_PRODUITS`.`id_cat` AS `id_cat`,`SELECT_PRODUITS`.`nom_cat` AS `nom_cat`,`SELECT_PRODUITS`.`id_col` AS `id_col`,`SELECT_PRODUITS`.`nom_col` AS `nom_col`,`SELECT_PRODUITS`.`id_tail` AS `id_tail`,`SELECT_PRODUITS`.`nom_tail` AS `nom_tail`,`SELECT_PRODUITS`.`path_img` AS `path_img`,`SELECT_PRODUITS`.`prix_unit` AS `prix_unit` from `SELECT_PRODUITS`) `P` on((`PA`.`id_prod`,`PA`.`id_col`,`PA`.`id_tail`) = (`P`.`id_prod`,`P`.`id_col`,`P`.`id_tail`))) ;

-- --------------------------------------------------------

--
-- Structure de la vue `SELECT_PRODUITS`
--
DROP TABLE IF EXISTS `SELECT_PRODUITS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`laroche5_appli`@`%` SQL SECURITY DEFINER VIEW `SELECT_PRODUITS`  AS SELECT `P`.`id_prod` AS `id_prod`, `P`.`nom_prod` AS `nom_prod`, `P`.`description` AS `description`, `CA`.`id_cat` AS `id_cat`, `CA`.`nom_cat` AS `nom_cat`, `CO`.`id_col` AS `id_col`, `CO`.`nom_col` AS `nom_col`, `T`.`id_tail` AS `id_tail`, `T`.`nom_tail` AS `nom_tail`, `CP`.`path_img` AS `path_img`, round((`P`.`prix_base` + coalesce(`CP`.`diff_prix_col`,0) + coalesce(`TP`.`diff_prix_tail`,0)) * 1.2,2) AS `prix_unit` FROM (((((`PRODUIT` `P` left join `COL_PROD` `CP` on(`CP`.`id_prod` = `P`.`id_prod`)) left join `TAIL_PROD` `TP` on(`TP`.`id_prod` = `P`.`id_prod`)) join `CATEGORIE` `CA` on(`CA`.`id_cat` = `P`.`id_cat`)) left join `COULEUR` `CO` on(`CO`.`id_col` = `CP`.`id_col`)) left join `TAILLE` `T` on(`T`.`id_tail` = `TP`.`id_tail`)) ORDER BY `P`.`nom_prod` ASC, `CA`.`nom_cat` ASC, `CO`.`nom_col` ASC, `T`.`nom_tail` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `SELECT_USERS`
--
DROP TABLE IF EXISTS `SELECT_USERS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`laroche5_appli`@`%` SQL SECURITY DEFINER VIEW `SELECT_USERS`  AS SELECT `U`.`id_us` AS `id_us`, `U`.`nom_us` AS `nom_us`, `U`.`prenom_us` AS `prenom_us`, `U`.`mel` AS `mel`, `U`.`date_naiss` AS `date_naiss`, `U`.`login` AS `login`, `U`.`mdp` AS `mdp`, `U`.`salt` AS `salt`, `P`.`id_perm` AS `id_perm`, `P`.`nom_perm` AS `nom_perm` FROM (`USER` `U` join `PERMISSION` `P` on(`P`.`id_perm` = `U`.`id_perm`)) ORDER BY `P`.`id_perm` ASC, `U`.`nom_us` ASC, `U`.`prenom_us` ASC ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `CATEGORIE`
--
ALTER TABLE `CATEGORIE`
  ADD PRIMARY KEY (`id_cat`);

--
-- Index pour la table `COL_PROD`
--
ALTER TABLE `COL_PROD`
  ADD PRIMARY KEY (`id_prod`,`id_col`);

--
-- Index pour la table `COMMANDE`
--
ALTER TABLE `COMMANDE`
  ADD PRIMARY KEY (`id_com`);

--
-- Index pour la table `COULEUR`
--
ALTER TABLE `COULEUR`
  ADD PRIMARY KEY (`id_col`);

--
-- Index pour la table `DETAIL_COM`
--
ALTER TABLE `DETAIL_COM`
  ADD PRIMARY KEY (`id_com`,`id_prod`,`id_col`,`id_tail`);

--
-- Index pour la table `FAVORI`
--
ALTER TABLE `FAVORI`
  ADD PRIMARY KEY (`id_us`,`id_prod`);

--
-- Index pour la table `PANIER`
--
ALTER TABLE `PANIER`
  ADD PRIMARY KEY (`id_us`,`id_prod`,`id_col`,`id_tail`);

--
-- Index pour la table `PERMISSION`
--
ALTER TABLE `PERMISSION`
  ADD PRIMARY KEY (`id_perm`);

--
-- Index pour la table `PRODUIT`
--
ALTER TABLE `PRODUIT`
  ADD PRIMARY KEY (`id_prod`);

--
-- Index pour la table `TAILLE`
--
ALTER TABLE `TAILLE`
  ADD PRIMARY KEY (`id_tail`);

--
-- Index pour la table `TAIL_PROD`
--
ALTER TABLE `TAIL_PROD`
  ADD PRIMARY KEY (`id_prod`,`id_tail`);

--
-- Index pour la table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`id_us`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `CATEGORIE`
--
ALTER TABLE `CATEGORIE`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `COMMANDE`
--
ALTER TABLE `COMMANDE`
  MODIFY `id_com` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `COULEUR`
--
ALTER TABLE `COULEUR`
  MODIFY `id_col` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `PERMISSION`
--
ALTER TABLE `PERMISSION`
  MODIFY `id_perm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `PRODUIT`
--
ALTER TABLE `PRODUIT`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `TAILLE`
--
ALTER TABLE `TAILLE`
  MODIFY `id_tail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `USER`
--
ALTER TABLE `USER`
  MODIFY `id_us` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
