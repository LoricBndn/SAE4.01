CREATE TABLE `CATEGORIE` (
  `id_cat` int(11) NOT NULL,
  `nom_cat` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `COL_PROD` (
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `diff_prix_col` float NOT NULL,
  `path_img` varchar(34) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


CREATE TABLE `COMMANDE` (
  `id_com` int(11) NOT NULL,
  `date_com` date NOT NULL,
  `id_us` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `COULEUR` (
  `id_col` int(11) NOT NULL,
  `nom_col` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `DETAIL_COM` (
  `id_com` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `qte_com` int(11) NOT NULL,
  `prix_total` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `FAVORI` (
  `id_us` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `PANIER` (
  `id_us` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_col` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `qte_pan` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `PERMISSION` (
  `id_perm` int(11) NOT NULL,
  `nom_perm` varchar(15) NOT NULL,
  `num_grade` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `PRODUIT` (
  `id_prod` int(11) NOT NULL,
  `nom_prod` varchar(50) NOT NULL,
  `description` varchar(700) NOT NULL,
  `prix_base` float NOT NULL,
  `id_cat` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `TAILLE` (
  `id_tail` int(11) NOT NULL,
  `nom_tail` varchar(13) NOT NULL,
  `id_cat` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `TAIL_PROD` (
  `id_prod` int(11) NOT NULL,
  `id_tail` int(11) NOT NULL,
  `diff_prix_tail` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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