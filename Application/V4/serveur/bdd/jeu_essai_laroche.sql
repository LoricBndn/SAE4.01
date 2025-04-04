INSERT INTO `CATEGORIE` (`id_cat`, `nom_cat`) VALUES
(1, 'Bonnet'),
(2, 'Pull'),
(3, 'Gants'),
(4, 'Chaussettes'),
(5, 'Décoration'),
(6, 'Schysautre');

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

INSERT INTO `PERMISSION` (`id_perm`, `nom_perm`, `num_grade`) VALUES
(1, 'Administrateur', 0),
(2, 'Client', 1);

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

INSERT INTO `USER` (`id_us`, `nom_us`, `prenom_us`, `mel`, `date_naiss`, `login`, `mdp`, `salt`, `id_perm`) VALUES
(7, 'admin', 'admin', 'admin@gmail.com', '2010-10-10', 'admin', 'skD7MyPRpfvsM', 'sk#@u%Q)-V}2^)gpSK&X', 1),
(11, 'Falschenbuhl', 'Rémi', 'remi.falschenbuhl@yahoo.fr', '2003-12-04', 'remiF', 'rOo9.RCDnsGfY', 'rOyJG[>IW$;,8LZmi=<n', 2),
(16, 'Philippe', 'Kévin', 'kph@gmail.com', '2003-12-04', 'new', '9l9KCmTBMCeDo', '9l;hSW*EN)S rm.j$/p1', 2),
(18, 'Laroche', 'Pierre', 'laroche5@univ-lorraine.fr', '1991-02-24', 'laroche5', 'Mw6FchtZ8zKKY', 'MwU86#P?T8LneEO#|~GG', 2);