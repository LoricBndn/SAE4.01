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