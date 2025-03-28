-- Insertion dans la table PERMISSION
INSERT INTO PERMISSION (id_perm, nom_perm) VALUES
(1, "Administrateur"),
(2, "Client");

-- Insertion dans la table UTILISATEUR
INSERT INTO UTILISATEUR (id_user, id_perm, nom, prenom, email, date_naissance, identifiant, mdp) VALUES
(7, 1, "admin", "admin", "admin@gmail.com", "2010-10-10", "admin", "mdp"),
(11, 2, "Falschenbuhl", "Rémi", "remi.falschenbuhl@yahoo.fr", "2003-12-04", "remiF", "mdp"),
(16, 2, "Philippe", "Kévin", "kph@gmail.com", "2003-12-04", "new", "mdp"),
(18, 2, "Laroche", "Pierre", "laroche5@univ-lorraine.fr", "1991-02-24", "laroche5", "mdp");

-- Insertion dans la table CATEGORIE
INSERT INTO CATEGORIE (id_categorie, nom_categorie) VALUES
(1, "Bonnet"),
(2, "Pull"),
(3, "Gants"),
(4, "Chaussettes"),
(5, "Décoration"),
(6, "Schysautre");

-- Insertion dans la table PRODUIT
INSERT INTO PRODUIT (id_produit, id_categorie, SKU, nom_produit, description) VALUES
(1, 1, "BON-NOEL-001", "Bonnet du père noël", "Un bonnet du père noël classique, bien pour se déguiser et apporter la bonne ambiance."),
(2, 1, "BON-MOCHE-002", "Bonnet moche de noël", "Un bonnet pas très beau, mais qui fait l'affaire pour se réchauffer"),
(3, 2, "PULL-RENNES-003", "Pull de rennes", "Un pull avec un rennes dessus, un indémodable"),
(4, 2, "PULL-LAINE-004", "Pull en laine", "Un pull en laine très sobre, très confortable, très cosy'"),
(5, 3, "GANT-SKI-005", "Gants de ski", "Des gants adaptés à tous types de neige, de pluie ou d'intempéries diverses"),
(6, 3, "SOUS-GANT-006", "Sous-gants", "Des sous-gants adaptés au gants de ski, très léger et qui tiennent chaud"),
(7, 3, "GANT-LAINE-007", "Gants en laine", "Gants en laine adaptés à n'importe quel besoin"),
(8, 4, "CHAUS-NOEL-008", "Chaussettes du père noël", "Des chaussettes conviviales pour cacher les cadeaux et mettre près de la cheminée"),
(9, 4, "CHAUS-HAUTE-009", "Chaussettes hautes", "Chaussettes idéales pour se maintenir au chaud en toute circonstance"),
(10, 4, "CHAUS-LAINE-010", "Chaussettes en laine", "Des chaussettes classiques mais néanmoins pratiques"),
(11, 5, "GUIR-LUMI-011", "Guirlande lumineuse", "Une guirlande sympatique pour égayer les réveillons de noël"),
(12, 5, "BOULE-NOEL-012", "Boules de noël", "Des boules variées à accrocher à votre sapin"),
(13, 5, "SAPIN-PLAST-013", "Sapin de Noël en plastique", "Un sapin de noël passe partout, sans la corvée du ménage"),
(14, 5, "SAPIN-NATUR-014", "Sapin de Noël naturel", "Un sapin de noël naturel, avec les épines qui tombent et la déforestation qui va avec"),
(15, 6, "PERE-NOEL-015", "Le père noël", "Un père noël à la mode, visiblement trop cool pour ce monde. La légende dit qu'il fait trembler internet lui-même. Il est si fort qu'il a pu se battre contre Chuck Norris et Rambo en même temps et il a gagné tout en distribuant ses cadeaux. Il est tellement puissant qu'on ne peut pas lui attribuer de prix. Et si on ne peut pas lui attribuer de prix, c'est que c'est gratuit.");

-- Insertion dans la table TAILLE
INSERT INTO TAILLE (id_taille, taille) VALUES
(1, "XS"),
(2, "S"),
(3, "M"),
(4, "L"),
(5, "XL"),
(6, "30cm"),
(7, "60cm"),
(8, "50cm"),
(9, "100cm"),
(10, "150cm"),
(11, "200cm"),
(12, "32-34"),
(13, "35-38"),
(14, "39-42"),
(15, "43-46"),
(16, "47-48"),
(17, "Pas de taille");

-- Insertion dans la table COULEUR
INSERT INTO COULEUR (id_couleur, couleur) VALUES
(1, "Jaune"),
(2, "Rouge"),
(3, "Vert"),
(4, "Bleu"),
(5, "Blanc"),
(6, "Gris"),
(7, "Noir"),
(8, "Marron"),
(9, "Violet"),
(10, "Rose"),
(11, "Cyan"),
(12, "Magenta"),
(13, "Orange"),
(14, "Turquoise"),
(15, "Multicolore"),
(16, "Doré"),
(17, "Argenté");

-- Insertion dans la table DETAIL_PRODUIT
INSERT INTO DETAIL_PRODUIT (id_detail_prod, id_produit, id_taille, id_couleur, prix, stock, path_img) VALUES
-- Bonnet Nöel x1 (Taille) x2 (Couleur)
(1, 1, 17, 2, 6.0, 50, "BonnetPereNoelRouge.jpg"), -- Rouge Pas de taille
(2, 1, 17, 16, 7.2, 50, "BonnetPereNoelDoré.jpg"), -- Doré Pas de taille
-- Bonnet Moche x1 (Taille) x4 (Couleur)
(3, 2, 17, 2, 4.8, 50, "BonnetMocheRouge.jpeg"), -- Rouge Pas de taille
(4, 2, 17, 3, 4.8, 50, "BonnetMocheVert.jpg"), -- Vert Pas de taille
(5, 2, 17, 5, 4.8, 50, "BonnetMocheBlanc.webp"), -- Blanc Pas de taille
(6, 2, 17, 8, 4.8, 50, "BonnetMocheMarron.jpg"), -- Marron Pas de taille
-- Pull Rennes x5 (Taille) x1 (Couleur)
(7, 3, 1, 2, 21.6, 50, "PullRennesRouge.jpeg"), -- Rouge XS
(8, 3, 2, 2, 21.6, 50, "PullRennesRouge.jpeg"), -- Rouge S
(9, 3, 3, 2, 21.6, 50, "PullRennesRouge.jpeg"), -- Rouge M
(10, 3, 4, 2, 21.6, 50, "PullRennesRouge.jpeg"), -- Rouge L
(11, 3, 5, 2, 21.6, 50, "PullRennesRouge.jpeg"), -- Rouge XL
-- Pull Laine x5 (Taille) x4 (Couleur)
(12, 4, 1, 2, 36.0, 50, "PullLaineRouge.jpg"), -- Rouge XS
(13, 4, 2, 2, 37.2, 50, "PullLaineRouge.jpg"), -- Rouge S
(14, 4, 3, 2, 38.4, 50, "PullLaineRouge.jpg"), -- Rouge M
(15, 4, 4, 2, 39.6, 50, "PullLaineRouge.jpg"), -- Rouge L
(16, 4, 5, 2, 40.8, 50, "PullLaineRouge.jpg"), -- Rouge XL
(17, 4, 1, 3, 36.0, 50, "PullLaineVert.webp"), -- Vert XS
(18, 4, 2, 3, 37.2, 50, "PullLaineVert.webp"), -- Vert S
(19, 4, 3, 3, 38.4, 50, "PullLaineVert.webp"), -- Vert M
(20, 4, 4, 3, 39.6, 50, "PullLaineVert.webp"), -- Vert L
(21, 4, 5, 3, 40.8, 50, "PullLaineVert.webp"), -- Vert XL
(22, 4, 1, 5, 36.0, 50, "PullLaineBlanc.jpg"), -- Blanc XS
(23, 4, 2, 5, 37.2, 50, "PullLaineBlanc.jpg"), -- Blanc S
(24, 4, 3, 5, 38.4, 50, "PullLaineBlanc.jpg"), -- Blanc M
(25, 4, 4, 5, 39.6, 50, "PullLaineBlanc.jpg"), -- Blanc L
(26, 4, 5, 5, 40.8, 50, "PullLaineBlanc.jpg"), -- Blanc XL
(27, 4, 1, 7, 36.0, 50, "PullLaineNoir.jpg"), -- Noir XS
(28, 4, 2, 7, 37.2, 50, "PullLaineNoir.jpg"), -- Noir S
(29, 4, 3, 7, 38.4, 50, "PullLaineNoir.jpg"), -- Noir M
(30, 4, 4, 7, 39.6, 50, "PullLaineNoir.jpg"), -- Noir L
(31, 4, 5, 7, 40.8, 50, "PullLaineNoir.jpg"), -- Noir XL
-- Gants Ski x3 (Taille) x3 (Couleur)
(32, 5, 1, 5, 12.0, 50, "GantsSkiBlanc.webp"), -- Blanc XS
(33, 5, 2, 5, 12.6, 50, "GantsSkiBlanc.webp"), -- Blanc S
(34, 5, 3, 5, 13.2, 50, "GantsSkiBlanc.webp"), -- Blanc M
(35, 5, 1, 6, 12.0, 50, "GantsSkiGris.webp"), -- Gris XS
(36, 5, 2, 6, 12.6, 50, "GantsSkiGris.webp"), -- Gris S
(37, 5, 3, 6, 13.2, 50, "GantsSkiGris.webp"), -- Gris M
(38, 5, 1, 7, 12.0, 50, "GantsSkiNoir.jpg"), -- Noir XS
(39, 5, 2, 7, 12.6, 50, "GantsSkiNoir.jpg"), -- Noir S
(40, 5, 3, 7, 13.2, 50, "GantsSkiNoir.jpg"), -- Noir M
-- Sous-Gants x3 (Taille) x10 (Couleur)
(41, 6, 1, 2, 12.0, 50, "SousGantsRouge.webp"), -- Rouge XS
(42, 6, 2, 2, 12.6, 50, "SousGantsRouge.webp"), -- Rouge S
(43, 6, 3, 2, 13.2, 50, "SousGantsRouge.webp"), -- Rouge M
(44, 6, 1, 3, 12.0, 50, "SousGantsVert.webp"), -- Vert XS
(45, 6, 2, 3, 12.6, 50, "SousGantsVert.webp"), -- Vert S
(46, 6, 3, 3, 13.2, 50, "SousGantsVert.webp"), -- Vert M
(47, 6, 1, 4, 12.0, 50, "SousGantsBleu.jpg"), -- Bleu XS
(48, 6, 2, 4, 12.6, 50, "SousGantsBleu.jpg"), -- Bleu S
(49, 6, 3, 4, 13.2, 50, "SousGantsBleu.jpg"), -- Bleu M
(50, 6, 1, 5, 12.0, 50, "SousGantsBlanc.jpg"), -- Blanc XS
(51, 6, 2, 5, 12.6, 50, "SousGantsBlanc.jpg"), -- Blanc S
(52, 6, 3, 5, 13.2, 50, "SousGantsBlanc.jpg"), -- Blanc M
(53, 6, 1, 6, 12.0, 50, "SousGantsGris.webp"), -- Gris XS
(54, 6, 2, 6, 12.6, 50, "SousGantsGris.webp"), -- Gris S
(55, 6, 3, 6, 13.2, 50, "SousGantsGris.webp"), -- Gris M
(56, 6, 1, 7, 12.0, 50, "SousGantsNoir.jpg"), -- Noir XS
(57, 6, 2, 7, 12.6, 50, "SousGantsNoir.jpg"), -- Noir S
(58, 6, 3, 7, 13.2, 50, "SousGantsNoir.jpg"), -- Noir M
(59, 6, 1, 9, 12.0, 50, "SousGantsViolet.webp"), -- Violet XS
(60, 6, 2, 9, 12.6, 50, "SousGantsViolet.webp"), -- Violet S
(61, 6, 3, 9, 13.2, 50, "SousGantsViolet.webp"), -- Violet M
(62, 6, 1, 11, 12.0, 50, "SousGantsCyan.webp"), -- Cyan XS
(63, 6, 2, 11, 12.6, 50, "SousGantsCyan.webp"), -- Cyan S
(64, 6, 3, 11, 13.2, 50, "SousGantsCyan.webp"), -- Cyan M
(65, 6, 1, 12, 12.0, 50, "SousGantsMagenta.webp"), -- Magenta XS
(66, 6, 2, 12, 12.6, 50, "SousGantsMagenta.webp"), -- Magenta S
(67, 6, 3, 12, 13.2, 50, "SousGantsMagenta.webp"), -- Magenta M
(68, 6, 1, 14, 12.0, 50, "SousGantsTurquoise.webp"), -- Turquoise XS
(69, 6, 2, 14, 12.6, 50, "SousGantsTurquoise.webp"), -- Turquoise S
(70, 6, 3, 14, 13.2, 50, "SousGantsTurquoise.webp"), -- Turquoise M
-- Gants Laine x3 (Taille) x6 (Couleur)
(71, 7, 1, 2, 13.2, 50, "GantsLaineRouge.jpg"), -- Rouge XS
(72, 7, 2, 2, 13.8, 50, "GantsLaineRouge.jpg"), -- Rouge S
(73, 7, 3, 2, 14.4, 50, "GantsLaineRouge.jpg"), -- Rouge M
(74, 7, 1, 3, 13.2, 50, "GantsLaineVert.jpg"), -- Vert XS
(75, 7, 2, 3, 13.8, 50, "GantsLaineVert.jpg"), -- Vert S
(76, 7, 3, 3, 14.4, 50, "GantsLaineVert.jpg"), -- Vert M
(77, 7, 1, 5, 13.2, 50, "GantsLaineBlanc.webp"), -- Blanc XS
(78, 7, 2, 5, 13.8, 50, "GantsLaineBlanc.webp"), -- Blanc S
(79, 7, 3, 5, 14.4, 50, "GantsLaineBlanc.webp"), -- Blanc M
(80, 7, 1, 6, 13.2, 50, "GantsLaineGris.jpg"), -- Gris XS
(81, 7, 2, 6, 13.8, 50, "GantsLaineGris.jpg"), -- Gris S
(82, 7, 3, 6, 14.4, 50, "GantsLaineGris.jpg"), -- Gris M
(83, 7, 1, 7, 13.2, 50, "GantsLaineNoir.jpg"), -- Noir XS
(84, 7, 2, 7, 13.8, 50, "GantsLaineNoir.jpg"), -- Noir S
(85, 7, 3, 7, 14.4, 50, "GantsLaineNoir.jpg"), -- Noir M
(86, 7, 1, 8, 13.2, 50, "GantsLaineMarron.webp"), -- Marron XS
(87, 7, 2, 8, 13.8, 50, "GantsLaineMarron.webp"), -- Marron S
(88, 7, 3, 8, 14.4, 50, "GantsLaineMarron.webp"), -- Marron M
-- Chaussettes Père Nöel x5 (Taille) x3 (Couleur)
(89, 8, 12, 2, 15.6, 50, "ChaussettesPereNoelRouge.jpg"), -- Rouge 32-34
(90, 8, 13, 2, 16.2, 50, "ChaussettesPereNoelRouge.jpg"), -- Rouge 35-38
(91, 8, 14, 2, 16.2, 50, "ChaussettesPereNoelRouge.jpg"), -- Rouge 39-42
(92, 8, 15, 2, 16.8, 50, "ChaussettesPereNoelRouge.jpg"), -- Rouge 43-46
(93, 8, 16, 2, 16.8, 50, "ChaussettesPereNoelRouge.jpg"), -- Rouge 47-48
(94, 8, 12, 5, 15.6, 50, "ChaussettesPereNoelBlanc.webp"), -- Blanc 32-34
(95, 8, 13, 5, 16.2, 50, "ChaussettesPereNoelBlanc.webp"), -- Blanc 35-38
(96, 8, 14, 5, 16.2, 50, "ChaussettesPereNoelBlanc.webp"), -- Blanc 39-42
(97, 8, 15, 5, 16.8, 50, "ChaussettesPereNoelBlanc.webp"), -- Blanc 43-46
(98, 8, 16, 5, 16.8, 50, "ChaussettesPereNoelBlanc.webp"), -- Blanc 47-48
(99, 8, 12, 6, 15.6, 50, "ChaussettesPereNoelGris.jpg"), -- Gris 32-34
(100, 8, 13, 6, 16.2, 50, "ChaussettesPereNoelGris.jpg"), -- Gris 35-38
(101, 8, 14, 6, 16.2, 50, "ChaussettesPereNoelGris.jpg"), -- Gris 39-42
(102, 8, 15, 6, 16.8, 50, "ChaussettesPereNoelGris.jpg"), -- Gris 43-46
(103, 8, 16, 6, 16.8, 50, "ChaussettesPereNoelGris.jpg"), -- Gris 47-48
-- Chaussettes Hautes x5 (Taille) x5 (Couleur)
(104, 9, 12, 2, 20.4, 50, "ChaussettesHautesRouge.jpg"), -- Rouge 32-34
(105, 9, 13, 2, 21.0, 50, "ChaussettesHautesRouge.jpg"), -- Rouge 35-38
(106, 9, 14, 2, 21.0, 50, "ChaussettesHautesRouge.jpg"), -- Rouge 39-42
(107, 9, 15, 2, 21.6, 50, "ChaussettesHautesRouge.jpg"), -- Rouge 43-46
(108, 9, 16, 2, 21.6, 50, "ChaussettesHautesRouge.jpg"), -- Rouge 47-48
(109, 9, 12, 5, 20.4, 50, "ChaussettesHautesBlanc.avif"), -- Blanc 32-34
(110, 9, 13, 5, 21.0, 50, "ChaussettesHautesBlanc.avif"), -- Blanc 35-38
(111, 9, 14, 5, 21.0, 50, "ChaussettesHautesBlanc.avif"), -- Blanc 39-42
(112, 9, 15, 5, 21.6, 50, "ChaussettesHautesBlanc.avif"), -- Blanc 43-46
(113, 9, 16, 5, 21.6, 50, "ChaussettesHautesBlanc.avif"), -- Blanc 47-48
(114, 9, 12, 6, 20.4, 50, "ChaussettesHautesGris.webp"), -- Gris 32-34
(115, 9, 13, 6, 21.0, 50, "ChaussettesHautesGris.webp"), -- Gris 35-38
(116, 9, 14, 6, 21.0, 50, "ChaussettesHautesGris.webp"), -- Gris 39-42
(117, 9, 15, 6, 21.6, 50, "ChaussettesHautesGris.webp"), -- Gris 43-46
(118, 9, 16, 6, 21.6, 50, "ChaussettesHautesGris.webp"), -- Gris 47-48
(119, 9, 12, 7, 20.4, 50, "ChaussettesHautesNoir.jpg"), -- Noir 32-34
(120, 9, 13, 7, 21.0, 50, "ChaussettesHautesNoir.jpg"), -- Noir 35-38
(121, 9, 14, 7, 21.0, 50, "ChaussettesHautesNoir.jpg"), -- Noir 39-42
(122, 9, 15, 7, 21.6, 50, "ChaussettesHautesNoir.jpg"), -- Noir 43-46
(123, 9, 16, 7, 21.6, 50, "ChaussettesHautesNoir.jpg"), -- Noir 47-48
(124, 9, 12, 13, 20.4, 50, "ChaussettesHautesOrange.avif"), -- Orange 32-34
(125, 9, 13, 13, 21.0, 50, "ChaussettesHautesOrange.avif"), -- Orange 35-38
(126, 9, 14, 13, 21.0, 50, "ChaussettesHautesOrange.avif"), -- Orange 39-42
(127, 9, 15, 13, 21.6, 50, "ChaussettesHautesOrange.avif"), -- Orange 43-46
(128, 9, 16, 13, 21.6, 50, "ChaussettesHautesOrange.avif"), -- Orange 47-48
-- Chaussettes Laine x5 (Taille) x7 (Couleur)
(129, 10, 12, 2, 12.0, 50, "ChaussettesLaineRouge.webp"), -- Rouge 32-34
(130, 10, 13, 2, 12.6, 50, "ChaussettesLaineRouge.webp"), -- Rouge 35-38
(131, 10, 14, 2, 12.6, 50, "ChaussettesLaineRouge.webp"), -- Rouge 39-42
(132, 10, 15, 2, 13.2, 50, "ChaussettesLaineRouge.webp"), -- Rouge 43-46
(133, 10, 16, 2, 13.2, 50, "ChaussettesLaineRouge.webp"), -- Rouge 47-48
(134, 10, 12, 5, 12.0, 50, "ChaussettesLaineBlanc.jpg"), -- Blanc 32-34
(135, 10, 13, 5, 12.6, 50, "ChaussettesLaineBlanc.jpg"), -- Blanc 35-38
(136, 10, 14, 5, 12.6, 50, "ChaussettesLaineBlanc.jpg"), -- Blanc 39-42
(137, 10, 15, 5, 13.2, 50, "ChaussettesLaineBlanc.jpg"), -- Blanc 43-46
(138, 10, 16, 5, 13.2, 50, "ChaussettesLaineBlanc.jpg"), -- Blanc 47-48
(139, 10, 12, 6, 12.0, 50, "ChaussettesLaineGris.jpg"), -- Gris 32-34
(140, 10, 13, 6, 12.6, 50, "ChaussettesLaineGris.jpg"), -- Gris 35-38
(141, 10, 14, 6, 12.6, 50, "ChaussettesLaineGris.jpg"), -- Gris 39-42
(142, 10, 15, 6, 13.2, 50, "ChaussettesLaineGris.jpg"), -- Gris 43-46
(143, 10, 16, 6, 13.2, 50, "ChaussettesLaineGris.jpg"), -- Gris 47-48
(144, 10, 12, 7, 12.0, 50, "ChaussettesLaineNoir.jpg"), -- Noir 32-34
(145, 10, 13, 7, 12.6, 50, "ChaussettesLaineNoir.jpg"), -- Noir 35-38
(146, 10, 14, 7, 12.6, 50, "ChaussettesLaineNoir.jpg"), -- Noir 39-42
(147, 10, 15, 7, 13.2, 50, "ChaussettesLaineNoir.jpg"), -- Noir 43-46
(148, 10, 16, 7, 13.2, 50, "ChaussettesLaineNoir.jpg"), -- Noir 47-48
(149, 10, 12, 10, 12.0, 50, "ChaussettesLaineRose.webp"), -- Rose 32-34
(150, 10, 13, 10, 12.6, 50, "ChaussettesLaineRose.webp"), -- Rose 35-38
(151, 10, 14, 10, 12.6, 50, "ChaussettesLaineRose.webp"), -- Rose 39-42
(152, 10, 15, 10, 13.2, 50, "ChaussettesLaineRose.webp"), -- Rose 43-46
(153, 10, 16, 10, 13.2, 50, "ChaussettesLaineRose.webp"), -- Rose 47-48
(154, 10, 12, 12, 12.0, 50, "ChaussettesLaineMagenta.jpg"), -- Magenta 32-34
(155, 10, 13, 12, 12.6, 50, "ChaussettesLaineMagenta.jpg"), -- Magenta 35-38
(156, 10, 14, 12, 12.6, 50, "ChaussettesLaineMagenta.jpg"), -- Magenta 39-42
(157, 10, 15, 12, 13.2, 50, "ChaussettesLaineMagenta.jpg"), -- Magenta 43-46
(158, 10, 16, 12, 13.2, 50, "ChaussettesLaineMagenta.jpg"), -- Magenta 47-48
(159, 10, 12, 15, 12.0, 50, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 32-34
(160, 10, 13, 15, 12.6, 50, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 35-38
(161, 10, 14, 15, 12.6, 50, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 39-42
(162, 10, 15, 15, 13.2, 50, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 43-46
(163, 10, 16, 15, 13.2, 50, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 47-48
-- Guirlande Lumineuse x4 (Taille) x3 (Couleur)
(164, 11, 8, 2, 36.0, 50, "GuirlandeLumineuseRouge.jpg"), -- Rouge 50cm
(165, 11, 9, 2, 39.6, 50, "GuirlandeLumineuseRouge.jpg"), -- Rouge 100cm
(166, 11, 10, 2, 44.4, 50, "GuirlandeLumineuseRouge.jpg"), -- Rouge 150cm
(167, 11, 11, 2, 48.0, 50, "GuirlandeLumineuseRouge.jpg"), -- Rouge 200cm
(168, 11, 8, 5, 36.0, 50, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 50cm
(169, 11, 9, 5, 39.6, 50, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 100cm
(170, 11, 10, 5, 44.4, 50, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 150cm
(171, 11, 11, 5, 48.0, 50, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 200cm
(172, 11, 8, 15, 36.0, 50, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 50cm
(173, 11, 9, 15, 39.6, 50, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 100cm
(174, 11, 10, 15, 44.4, 50, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 150cm
(175, 11, 11, 15, 48.0, 50, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 200cm
-- Boules Nöel x3 (Taille) x6 (Couleur)
(176, 12, 1, 1, 8.4, 50, "BoulesNoelJaune.jpg"), -- Jaune XS
(177, 12, 2, 1, 9.0, 50, "BoulesNoelJaune.jpg"), -- Jaune S
(178, 12, 3, 1, 9.6, 50, "BoulesNoelJaune.jpg"), -- Jaune M
(179, 12, 1, 2, 8.4, 50, "BoulesNoelRouge.jpg"), -- Rouge XS
(180, 12, 2, 2, 9.0, 50, "BoulesNoelRouge.jpg"), -- Rouge S
(181, 12, 3, 2, 9.6, 50, "BoulesNoelRouge.jpg"), -- Rouge M
(182, 12, 1, 3, 8.4, 50, "BoulesNoelVert.jpg"), -- Vert XS
(183, 12, 2, 3, 9.0, 50, "BoulesNoelVert.jpg"), -- Vert S
(184, 12, 3, 3, 9.6, 50, "BoulesNoelVert.jpg"), -- Vert M
(185, 12, 1, 5, 8.4, 50, "BoulesNoelBlanc.jpg"), -- Blanc XS
(186, 12, 2, 5, 9.0, 50, "BoulesNoelBlanc.jpg"), -- Blanc S
(187, 12, 3, 5, 9.6, 50, "BoulesNoelBlanc.jpg"), -- Blanc M
(188, 12, 1, 16, 8.4, 50, "BoulesNoelDoré.jpg"), -- Doré XS
(189, 12, 2, 16, 9.0, 50, "BoulesNoelDoré.jpg"), -- Doré S
(190, 12, 3, 16, 9.6, 50, "BoulesNoelDoré.jpg"), -- Doré M
(191, 12, 1, 17, 8.4, 50, "BoulesNoelArgent.jpg"), -- Argent XS
(192, 12, 2, 17, 9.0, 50, "BoulesNoelArgent.jpg"), -- Argent S
(193, 12, 3, 17, 9.6, 50, "BoulesNoelArgent.jpg"), -- Argent M
-- Sapin Nöel Plastique x2 (Taille) x2 (Couleur)
(194, 13, 6, 3, 72.0, 50, "SapinNoelPlastiqueVert.jpg"), -- Vert 30cm
(195, 13, 7, 3, 96.0, 50, "SapinNoelPlastiqueVert.jpg"), -- Vert 60cm
(196, 13, 6, 5, 72.0, 50, "SapinNoelPlastiqueBlanc.jpg"), -- Blanc 30cm
(197, 13, 7, 5, 96.0, 50, "SapinNoelPlastiqueBlanc.jpg"), -- Blanc 60cm
-- Sapin Nöel Naturel x2 (Taille) x2 (Couleur)
(198, 14, 6, 3, 84.0, 50, "SapinNoelNaturelVert.jpg"), -- Vert 30cm
(199, 14, 7, 3, 108.0, 50, "SapinNoelNaturelVert.jpg"), -- Vert 60cm
(200, 14, 6, 5, 84.0, 50, "SapinNoelNaturelBlanc.jpg"), -- Blanc 30cm
(201, 14, 7, 5, 108.0, 50, "SapinNoelNaturelBlanc.jpg"), -- Blanc 60cm
-- Père Nöel x1 (Taille) x1 (Couleur)
(202, 15, 11, 2, 0.0, 50, "PereNoelRouge.png"); -- Rouge 200cm

-- Insertion dans la table HISTORIQUE_PRIX
INSERT INTO HISTORIQUE_PRIX (id_historique, id_detail_prod, prix, date_debut, date_fin) VALUES
(1, 1, 5.0, "2023-01-01", NULL), -- Rouge 
(2, 1, 6.0, "2023-01-01", NULL), -- Doré 
(3, 2, 4.0, "2023-01-01", NULL), -- Rouge 
(4, 2, 4.0, "2023-01-01", NULL), -- Vert 
(5, 2, 4.0, "2023-01-01", NULL), -- Blanc 
(6, 2, 4.0, "2023-01-01", NULL), -- Marron 
(7, 3, 15.0, "2023-01-01", NULL), -- Rouge XS
(8, 3, 15.0, "2023-01-01", NULL), -- Rouge S
(9, 3, 15.0, "2023-01-01", NULL), -- Rouge M
(10, 3, 15.0, "2023-01-01", NULL), -- Rouge L
(11, 3, 15.0, "2023-01-01", NULL), -- Rouge XL
(12, 4, 36.0, "2023-01-01", NULL), -- Rouge XS
(13, 4, 31.0, "2023-01-01", NULL), -- Rouge S
(14, 4, 32.0, "2023-01-01", NULL), -- Rouge M
(15, 4, 39.6, "2023-01-01", NULL), -- Rouge L
(16, 4, 34.0, "2023-01-01", NULL), -- Rouge XL
(17, 4, 36.0, "2023-01-01", NULL), -- Vert XS
(18, 4, 31.0, "2023-01-01", NULL), -- Vert S
(19, 4, 32.0, "2023-01-01", NULL), -- Vert M
(20, 4, 39.6, "2023-01-01", NULL), -- Vert L
(21, 4, 34.0, "2023-01-01", NULL), -- Vert XL
(22, 4, 36.0, "2023-01-01", NULL), -- Blanc XS
(23, 4, 31.0, "2023-01-01", NULL), -- Blanc S
(24, 4, 32.0, "2023-01-01", NULL), -- Blanc M
(25, 4, 39.6, "2023-01-01", NULL), -- Blanc L
(26, 4, 34.0, "2023-01-01", NULL), -- Blanc XL
(27, 4, 36.0, "2023-01-01", NULL), -- Noir XS
(28, 4, 31.0, "2023-01-01", NULL), -- Noir S
(29, 4, 32.0, "2023-01-01", NULL), -- Noir M
(30, 4, 39.6, "2023-01-01", NULL), -- Noir L
(31, 4, 34.0, "2023-01-01", NULL), -- Noir XL
(32, 5, 12.0, "2023-01-01", NULL), -- Blanc XS
(33, 5, 12.6, "2023-01-01", NULL), -- Blanc S
(34, 5, 13.2, "2023-01-01", NULL), -- Blanc M
(35, 5, 12.0, "2023-01-01", NULL), -- Gris XS
(36, 5, 12.6, "2023-01-01", NULL), -- Gris S
(37, 5, 13.2, "2023-01-01", NULL), -- Gris M
(38, 5, 12.0, "2023-01-01", NULL), -- Noir XS
(39, 5, 12.6, "2023-01-01", NULL), -- Noir S
(40, 5, 13.2, "2023-01-01", NULL), -- Noir M
(41, 6, 12.0, "2023-01-01", NULL), -- Rouge XS
(42, 6, 12.6, "2023-01-01", NULL), -- Rouge S
(43, 6, 13.2, "2023-01-01", NULL), -- Rouge M
(44, 6, 12.0, "2023-01-01", NULL), -- Vert XS
(45, 6, 12.6, "2023-01-01", NULL), -- Vert S
(46, 6, 13.2, "2023-01-01", NULL), -- Vert M
(47, 6, 12.0, "2023-01-01", NULL), -- Bleu XS
(48, 6, 12.6, "2023-01-01", NULL), -- Bleu S
(49, 6, 13.2, "2023-01-01", NULL), -- Bleu M
(50, 6, 12.0, "2023-01-01", NULL), -- Blanc XS
(51, 6, 12.6, "2023-01-01", NULL), -- Blanc S
(52, 6, 13.2, "2023-01-01", NULL), -- Blanc M
(53, 6, 12.0, "2023-01-01", NULL), -- Gris XS
(54, 6, 12.6, "2023-01-01", NULL), -- Gris S
(55, 6, 13.2, "2023-01-01", NULL), -- Gris M
(56, 6, 12.0, "2023-01-01", NULL), -- Noir XS
(57, 6, 12.6, "2023-01-01", NULL), -- Noir S
(58, 6, 13.2, "2023-01-01", NULL), -- Noir M
(59, 6, 12.0, "2023-01-01", NULL), -- Violet XS
(60, 6, 12.6, "2023-01-01", NULL), -- Violet S
(61, 6, 13.2, "2023-01-01", NULL), -- Violet M
(62, 6, 12.0, "2023-01-01", NULL), -- Cyan XS
(63, 6, 12.6, "2023-01-01", NULL), -- Cyan S
(64, 6, 13.2, "2023-01-01", NULL), -- Cyan M
(65, 6, 12.0, "2023-01-01", NULL), -- Magenta XS
(66, 6, 12.6, "2023-01-01", NULL), -- Magenta S
(67, 6, 13.2, "2023-01-01", NULL), -- Magenta M
(68, 6, 12.0, "2023-01-01", NULL), -- Turquoise XS
(69, 6, 12.6, "2023-01-01", NULL), -- Turquoise S
(70, 6, 13.2, "2023-01-01", NULL), -- Turquoise M
(71, 7, 13.2, "2023-01-01", NULL), -- Rouge XS
(72, 7, 13.8, "2023-01-01", NULL), -- Rouge S
(73, 7, 12.0, "2023-01-01", NULL), -- Rouge M
(74, 7, 13.2, "2023-01-01", NULL), -- Vert XS
(75, 7, 13.8, "2023-01-01", NULL), -- Vert S
(76, 7, 12.0, "2023-01-01", NULL), -- Vert M
(77, 7, 13.2, "2023-01-01", NULL), -- Blanc XS
(78, 7, 13.8, "2023-01-01", NULL), -- Blanc S
(79, 7, 12.0, "2023-01-01", NULL), -- Blanc M
(80, 7, 13.2, "2023-01-01", NULL), -- Gris XS
(81, 7, 13.8, "2023-01-01", NULL), -- Gris S
(82, 7, 12.0, "2023-01-01", NULL), -- Gris M
(83, 7, 13.2, "2023-01-01", NULL), -- Noir XS
(84, 7, 13.8, "2023-01-01", NULL), -- Noir S
(85, 7, 12.0, "2023-01-01", NULL), -- Noir M
(86, 7, 13.2, "2023-01-01", NULL), -- Marron XS
(87, 7, 13.8, "2023-01-01", NULL), -- Marron S
(88, 7, 12.0, "2023-01-01", NULL), -- Marron M
(89, 8, 15.6, "2023-01-01", NULL), -- Rouge 32-34
(90, 8, 16.2, "2023-01-01", NULL), -- Rouge 35-38
(91, 8, 16.2, "2023-01-01", NULL), -- Rouge 39-42
(92, 8, 16.8, "2023-01-01", NULL), -- Rouge 43-46
(93, 8, 16.8, "2023-01-01", NULL), -- Rouge 47-48
(94, 8, 15.6, "2023-01-01", NULL), -- Blanc 32-34
(95, 8, 16.2, "2023-01-01", NULL), -- Blanc 35-38
(96, 8, 16.2, "2023-01-01", NULL), -- Blanc 39-42
(97, 8, 16.8, "2023-01-01", NULL), -- Blanc 43-46
(98, 8, 16.8, "2023-01-01", NULL), -- Blanc 47-48
(99, 8, 15.6, "2023-01-01", NULL), -- Gris 32-34
(100, 8, 16.2, "2023-01-01", NULL), -- Gris 35-38
(101, 8, 16.2, "2023-01-01", NULL), -- Gris 39-42
(102, 8, 16.8, "2023-01-01", NULL), -- Gris 43-46
(103, 8, 16.8, "2023-01-01", NULL), -- Gris 47-48
(104, 9, 20.4, "2023-01-01", NULL), -- Rouge 32-34
(105, 9, 21.0, "2023-01-01", NULL), -- Rouge 35-38
(106, 9, 21.0, "2023-01-01", NULL), -- Rouge 39-42
(107, 9, 21.6, "2023-01-01", NULL), -- Rouge 43-46
(108, 9, 21.6, "2023-01-01", NULL), -- Rouge 47-48
(109, 9, 20.4, "2023-01-01", NULL), -- Blanc 32-34
(110, 9, 21.0, "2023-01-01", NULL), -- Blanc 35-38
(111, 9, 21.0, "2023-01-01", NULL), -- Blanc 39-42
(112, 9, 21.6, "2023-01-01", NULL), -- Blanc 43-46
(113, 9, 21.6, "2023-01-01", NULL), -- Blanc 47-48
(114, 9, 20.4, "2023-01-01", NULL), -- Gris 32-34
(115, 9, 21.0, "2023-01-01", NULL), -- Gris 35-38
(116, 9, 21.0, "2023-01-01", NULL), -- Gris 39-42
(117, 9, 21.6, "2023-01-01", NULL), -- Gris 43-46
(118, 9, 21.6, "2023-01-01", NULL), -- Gris 47-48
(119, 9, 20.4, "2023-01-01", NULL), -- Noir 32-34
(120, 9, 21.0, "2023-01-01", NULL), -- Noir 35-38
(121, 9, 21.0, "2023-01-01", NULL), -- Noir 39-42
(122, 9, 21.6, "2023-01-01", NULL), -- Noir 43-46
(123, 9, 21.6, "2023-01-01", NULL), -- Noir 47-48
(124, 9, 20.4, "2023-01-01", NULL), -- Orange 32-34
(125, 9, 21.0, "2023-01-01", NULL), -- Orange 35-38
(126, 9, 21.0, "2023-01-01", NULL), -- Orange 39-42
(127, 9, 21.6, "2023-01-01", NULL), -- Orange 43-46
(128, 9, 21.6, "2023-01-01", NULL), -- Orange 47-48
(129, 10, 12.0, "2023-01-01", NULL), -- Rouge 32-34
(130, 10, 12.6, "2023-01-01", NULL), -- Rouge 35-38
(131, 10, 12.6, "2023-01-01", NULL), -- Rouge 39-42
(132, 10, 13.2, "2023-01-01", NULL), -- Rouge 43-46
(133, 10, 13.2, "2023-01-01", NULL), -- Rouge 47-48
(134, 10, 12.0, "2023-01-01", NULL), -- Blanc 32-34
(135, 10, 12.6, "2023-01-01", NULL), -- Blanc 35-38
(136, 10, 12.6, "2023-01-01", NULL), -- Blanc 39-42
(137, 10, 13.2, "2023-01-01", NULL), -- Blanc 43-46
(138, 10, 13.2, "2023-01-01", NULL), -- Blanc 47-48
(139, 10, 12.0, "2023-01-01", NULL), -- Gris 32-34
(140, 10, 12.6, "2023-01-01", NULL), -- Gris 35-38
(141, 10, 12.6, "2023-01-01", NULL), -- Gris 39-42
(142, 10, 13.2, "2023-01-01", NULL), -- Gris 43-46
(143, 10, 13.2, "2023-01-01", NULL), -- Gris 47-48
(144, 10, 12.0, "2023-01-01", NULL), -- Noir 32-34
(145, 10, 12.6, "2023-01-01", NULL), -- Noir 35-38
(146, 10, 12.6, "2023-01-01", NULL), -- Noir 39-42
(147, 10, 13.2, "2023-01-01", NULL), -- Noir 43-46
(148, 10, 13.2, "2023-01-01", NULL), -- Noir 47-48
(149, 10, 12.0, "2023-01-01", NULL), -- Rose 32-34
(150, 10, 12.6, "2023-01-01", NULL), -- Rose 35-38
(151, 10, 12.6, "2023-01-01", NULL), -- Rose 39-42
(152, 10, 13.2, "2023-01-01", NULL), -- Rose 43-46
(153, 10, 13.2, "2023-01-01", NULL), -- Rose 47-48
(154, 10, 12.0, "2023-01-01", NULL), -- Magenta 32-34
(155, 10, 12.6, "2023-01-01", NULL), -- Magenta 35-38
(156, 10, 12.6, "2023-01-01", NULL), -- Magenta 39-42
(157, 10, 13.2, "2023-01-01", NULL), -- Magenta 43-46
(158, 10, 13.2, "2023-01-01", NULL), -- Magenta 47-48
(159, 10, 12.0, "2023-01-01", NULL), -- Multicolore 32-34
(160, 10, 12.6, "2023-01-01", NULL), -- Multicolore 35-38
(161, 10, 12.6, "2023-01-01", NULL), -- Multicolore 39-42
(162, 10, 13.2, "2023-01-01", NULL), -- Multicolore 43-46
(163, 10, 13.2, "2023-01-01", NULL), -- Multicolore 47-48
(164, 11, 36.0, "2023-01-01", NULL), -- Rouge 50cm
(165, 11, 39.6, "2023-01-01", NULL), -- Rouge 100cm
(166, 11, 44.4, "2023-01-01", NULL), -- Rouge 150cm
(167, 11, 48.0, "2023-01-01", NULL), -- Rouge 200cm
(168, 11, 36.0, "2023-01-01", NULL), -- Blanc 50cm
(169, 11, 39.6, "2023-01-01", NULL), -- Blanc 100cm
(170, 11, 44.4, "2023-01-01", NULL), -- Blanc 150cm
(171, 11, 48.0, "2023-01-01", NULL), -- Blanc 200cm
(172, 11, 36.0, "2023-01-01", NULL), -- Multicolore 50cm
(173, 11, 39.6, "2023-01-01", NULL), -- Multicolore 100cm
(174, 11, 44.4, "2023-01-01", NULL), -- Multicolore 150cm
(175, 11, 48.0, "2023-01-01", NULL), -- Multicolore 200cm
(176, 12, 8.4, "2023-01-01", NULL), -- Jaune XS
(177, 12, 9.0, "2023-01-01", NULL), -- Jaune S
(178, 12, 8.0, "2023-01-01", NULL), -- Jaune M
(179, 12, 8.4, "2023-01-01", NULL), -- Rouge XS
(180, 12, 9.0, "2023-01-01", NULL), -- Rouge S
(181, 12, 8.0, "2023-01-01", NULL), -- Rouge M
(182, 12, 8.4, "2023-01-01", NULL), -- Vert XS
(183, 12, 9.0, "2023-01-01", NULL), -- Vert S
(184, 12, 8.0, "2023-01-01", NULL), -- Vert M
(185, 12, 8.4, "2023-01-01", NULL), -- Blanc XS
(186, 12, 9.0, "2023-01-01", NULL), -- Blanc S
(187, 12, 8.0, "2023-01-01", NULL), -- Blanc M
(188, 12, 8.4, "2023-01-01", NULL), -- Doré XS
(189, 12, 9.0, "2023-01-01", NULL), -- Doré S
(190, 12, 8.0, "2023-01-01", NULL), -- Doré M
(191, 12, 8.4, "2023-01-01", NULL), -- Argent XS
(192, 12, 9.0, "2023-01-01", NULL), -- Argent S
(193, 12, 8.0, "2023-01-01", NULL), -- Argent M
(194, 13, 72.0, "2023-01-01", NULL), -- Vert 30cm
(195, 13, 96.0, "2023-01-01", NULL), -- Vert 60cm
(196, 13, 72.0, "2023-01-01", NULL), -- Blanc 30cm
(197, 13, 96.0, "2023-01-01", NULL), -- Blanc 60cm
(198, 14, 70.0, "2023-01-01", NULL), -- Vert 30cm
(199, 14, 90.0, "2023-01-01", NULL), -- Vert 60cm
(200, 14, 70.0, "2023-01-01", NULL), -- Vert 30cm
(201, 14, 90.0, "2023-01-01", NULL), -- Vert 60cm
(202, 15, 0.0, "2023-01-01", NULL);

-- Insertion dans la table FAVORI
INSERT INTO FAVORI (id_user, id_detail_prod) VALUES
(7, 3),
(7, 176),
(11, 1),
(11, 3), 
(11, 71),
(11, 176),
(11, 202),
(16, 89), 
(16, 129),
(16, 176),
(18, 89),
(18, 176);

-- Insertion dans la table PANIER
INSERT INTO PANIER (id_user, id_detail_prod, quantite) VALUES
(11, 124, 2),
(16, 3, 1),
(16, 104, 1),
(11, 2, 3),
(7, 2, 3),
(16, 129, 1),
(7, 129, 1),
(18, 178, 1),
(11, 193, 10),
(11, 89, 11),
(11, 202, 10),
(16, 2, 1),
(16, 167, 1),
(7, 165, 1),
(7, 202, 14);

-- Insertion dans la table COMMANDE
INSERT INTO COMMANDE (id_commande, id_user, date_commande, total, statut) VALUES
(53, 11, "2023-04-05", 218.4, "En attente"),
(54, 11, "2023-04-05", 218.4, "En cours"),
(55, 11, "2023-04-05", 218.4, "Expédiée"),
(56, 11, "2023-04-05", 218.4, "Livrée"),
(57, 11, "2023-04-05", 218.4, "Annulée"),
(58, 11, "2023-04-05", 21.6, "Livrée"),
(59, 11, "2023-04-05", 27.6, "Expédiée"),
(60, 11, "2023-04-05", 21.6, "En attente"),
(61, 7, "2023-04-05", 205.2, "Annulée"),
(62, 7, "2023-04-05", 328.8, "Livrée"),
(63, 7, "2023-04-05", 27.6, "Expédiée"),
(64, 16, "2023-04-05", 48.0, "Livrée"),
(65, 18, "2023-04-05", 86.4, "En cours"),
(66, 18, "2023-04-05", 20.4, "Livrée");

-- Insertion dans la table DETAIL_COMMANDE
INSERT INTO DETAIL_COMMANDE (id_detail_com, id_commande, id_detail_prod, quantite, prix_total) VALUES
-- Commande 53
(1, 53, 94, 1, 15.6),
(2, 53, 202, 50, 0.0),
(3, 53, 10, 9, 162.0),
(4, 53, 6, 1, 4.8),
(5, 53, 193, 1, 9.6),
(6, 53, 43, 1, 13.2),
(7, 53, 2, 1, 7.2),
(8, 53, 1, 1, 6.0),
-- Commande 54
(9, 54, 94, 1, 15.6),
(10, 54, 202, 50, 0.0),
(11, 54, 10, 9, 162.0),
(12, 54, 6, 1, 4.8),
(13, 54, 193, 1, 9.6),
(14, 54, 43, 1, 13.2),
(15, 54, 2, 1, 7.2),
(16, 54, 1, 1, 6.0),
-- Commande 55
(17, 55, 94, 1, 15.6),
(18, 55, 202, 50, 0.0),
(19, 55, 10, 9, 162.0),
(20, 55, 6, 1, 4.8),
(21, 55, 193, 1, 9.6),
(22, 55, 43, 1, 13.2),
(23, 55, 2, 1, 7.2),
(24, 55, 1, 1, 6.0),
-- Commande 56
(25, 56, 94, 1, 15.6),
(26, 56, 202, 50, 0.0),
(27, 56, 10, 9, 162.0),
(28, 56, 6, 1, 4.8),
(29, 56, 193, 1, 9.6),
(30, 56, 43, 1, 13.2),
(31, 56, 2, 1, 7.2),
(32, 56, 1, 1, 6.0),
-- Commande 57
(33, 57, 94, 1, 15.6),
(34, 57, 202, 50, 0.0),
(35, 57, 10, 9, 162.0),
(36, 57, 6, 1, 4.8),
(37, 57, 193, 1, 9.6),
(38, 57, 43, 1, 13.2),
(39, 57, 2, 1, 7.2),
(40, 57, 1, 1, 6.0),
-- Commande 58
(41, 58, 134, 1, 12.0),
(42, 58, 193, 1, 9.6),
-- Commande 59
(43, 59, 94, 1, 15.6),
(44, 59, 134, 1, 12.0),
-- Commande 60
(45, 60, 134, 1, 12.0),
(46, 60, 193, 1, 9.6),
-- Commande 61
(47, 61, 2, 1, 7.2),
(48, 61, 94, 1, 15.6),
(49, 61, 193, 19, 182.4),
-- Commande 62
(50, 62, 5, 1, 4.8),
(51, 62, 199, 3, 324.0),
-- Commande 63
(52, 63, 89, 1, 15.6),
(53, 63, 129, 1, 12.0),
-- Commande 64
(54, 64, 178, 5, 48.0),
-- Commande 65
(55, 65, 127, 4, 86.4),
-- Commande 66
(56, 66, 38, 1, 12.0),
(57, 66, 188, 1, 8.4);

-- Insertion dans la table PAIEMENT
INSERT INTO PAIEMENT (id_paiement, id_commande, methode, montant, transaction_id) VALUES
(1, 54, "Carte bancaire", 218.4, "T54CB001"),
(2, 55, "PayPal", 218.4, "T55PP002"),
(3, 56, "PayPal", 218.4, "T56PP003"),
(4, 57, "PayPal", 218.4, "T57PP004"),
(5, 58, "Carte bancaire", 21.6, "T58CB005"),
(6, 59, "Carte bancaire", 27.6, "T59CBP006"),
(7, 61, "Carte bancaire", 205.2, "T61CBP007"),
(8, 62, "PayPal", 328.8, "T62PP008"),
(9, 63, "PayPal", 27.6, "T63PP009"),
(10, 64, "Carte bancaire", 48.0, "T64CB010"),
(11, 65, "PayPal", 86.4, "T65PP011"),
(12, 66, "PayPal", 20.4, "T66PP012");

-- Insertion dans la table FRAIS_PORT
INSERT INTO FRAIS_PORT (id_categorie, seuil_quantite, frais)
VALUES
  -- Bonnet
  (1, 1, 5.00),  
  (1, 5, 12.00), 
  (1, 10, 15.00),
  (1, 20, 20.00),

  -- Pull
  (2, 1, 8.00),  
  (2, 5, 12.00), 
  (2, 10, 21.60),
  (2, 20, 25.00),

  -- Gants
  (3, 1, 3.00),  
  (3, 5, 8.40),
  (3, 10, 12.00),
  (3, 20, 15.00),

  -- Chaussettes
  (4, 1, 4.00),  
  (4, 5, 8.00),  
  (4, 10, 12.00),
  (4, 20, 21.60),

  -- Décoration
  (5, 1, 8.40),  
  (5, 5, 15.00), 
  (5, 10, 22.00),
  (5, 20, 36.00),

  -- Schysautre
  (6, 1, 12.00), 
  (6, 5, 21.60),
  (6, 10, 25.00),
  (6, 20, 35.00);


-- Insertion dans la table SOLDE
-- INSERT INTO SOLDE (id_solde, id_detail_prod, reduction, date_debut, date_fin) VALUES;

