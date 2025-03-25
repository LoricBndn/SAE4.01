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
(1, 1, 17, 2, 5.0, 0, "BonnetPereNoelRouge.jpg"), -- Rouge Pas de taille
(2, 1, 17, 16, 6.0, 0, "BonnetPereNoelDoré.jpg"), -- Doré Pas de taille
-- Bonnet Moche x1 (Taille) x4 (Couleur)
(3, 2, 17, 2, 4.0, 0, "BonnetMocheRouge.jpeg"), -- Rouge Pas de taille
(4, 2, 17, 3, 4.0, 0, "BonnetMocheVert.jpg"), -- Vert Pas de taille
(5, 2, 17, 5, 4.0, 0, "BonnetMocheBlanc.webp"), -- Blanc Pas de taille
(6, 2, 17, 8, 4.0, 0, "BonnetMocheMarron.jpg"), -- Marron Pas de taille
-- Pull Rennes x5 (Taille) x1 (Couleur)
(7, 3, 1, 2, 15.0, 0, "PullRennesRouge.jpeg"), -- Rouge XS
(8, 3, 2, 2, 15.0, 0, "PullRennesRouge.jpeg"), -- Rouge S
(9, 3, 3, 2, 15.0, 0, "PullRennesRouge.jpeg"), -- Rouge M
(10, 3, 4, 2, 15.0, 0, "PullRennesRouge.jpeg"), -- Rouge L
(11, 3, 5, 2, 15.0, 0, "PullRennesRouge.jpeg"), -- Rouge XL
-- Pull Laine x5 (Taille) x4 (Couleur)
(12, 4, 1, 2, 30.0, 0, "PullLaineRouge.jpg"), -- Rouge XS
(13, 4, 2, 2, 31.0, 0, "PullLaineRouge.jpg"), -- Rouge S
(14, 4, 3, 2, 32.0, 0, "PullLaineRouge.jpg"), -- Rouge M
(15, 4, 4, 2, 33.0, 0, "PullLaineRouge.jpg"), -- Rouge L
(16, 4, 5, 2, 34.0, 0, "PullLaineRouge.jpg"), -- Rouge XL
(17, 4, 1, 3, 30.0, 0, "PullLaineVert.webp"), -- Vert XS
(18, 4, 2, 3, 31.0, 0, "PullLaineVert.webp"), -- Vert S
(19, 4, 3, 3, 32.0, 0, "PullLaineVert.webp"), -- Vert M
(20, 4, 4, 3, 33.0, 0, "PullLaineVert.webp"), -- Vert L
(21, 4, 5, 3, 34.0, 0, "PullLaineVert.webp"), -- Vert XL
(22, 4, 1, 5, 30.0, 0, "PullLaineBlanc.jpg"), -- Blanc XS
(23, 4, 2, 5, 31.0, 0, "PullLaineBlanc.jpg"), -- Blanc S
(24, 4, 3, 5, 32.0, 0, "PullLaineBlanc.jpg"), -- Blanc M
(25, 4, 4, 5, 33.0, 0, "PullLaineBlanc.jpg"), -- Blanc L
(26, 4, 5, 5, 34.0, 0, "PullLaineBlanc.jpg"), -- Blanc XL
(27, 4, 1, 7, 30.0, 0, "PullLaineNoir.jpg"), -- Noir XS
(28, 4, 2, 7, 31.0, 0, "PullLaineNoir.jpg"), -- Noir S
(29, 4, 3, 7, 32.0, 0, "PullLaineNoir.jpg"), -- Noir M
(30, 4, 4, 7, 33.0, 0, "PullLaineNoir.jpg"), -- Noir L
(31, 4, 5, 7, 34.0, 0, "PullLaineNoir.jpg"), -- Noir XL
-- Gants Ski x3 (Taille) x3 (Couleur)
(32, 5, 1, 5, 10.0, 0, "GantsSkiBlanc.webp"), -- Blanc XS
(33, 5, 2, 5, 10.5, 0, "GantsSkiBlanc.webp"), -- Blanc S
(34, 5, 3, 5, 11.0, 0, "GantsSkiBlanc.webp"), -- Blanc M
(35, 5, 1, 6, 10.0, 0, "GantsSkiGris.webp"), -- Gris XS
(36, 5, 2, 6, 10.5, 0, "GantsSkiGris.webp"), -- Gris S
(37, 5, 3, 6, 11.0, 0, "GantsSkiGris.webp"), -- Gris M
(38, 5, 1, 7, 10.0, 0, "GantsSkiNoir.jpg"), -- Noir XS
(39, 5, 2, 7, 10.5, 0, "GantsSkiNoir.jpg"), -- Noir S
(40, 5, 3, 7, 11.0, 0, "GantsSkiNoir.jpg"), -- Noir M
-- Sous-Gants x3 (Taille) x10 (Couleur)
(41, 6, 1, 2, 10.0, 0, "SousGantsRouge.webp"), -- Rouge XS
(42, 6, 2, 2, 10.5, 0, "SousGantsRouge.webp"), -- Rouge S
(43, 6, 3, 2, 11.0, 0, "SousGantsRouge.webp"), -- Rouge M
(44, 6, 1, 3, 10.0, 0, "SousGantsVert.webp"), -- Vert XS
(45, 6, 2, 3, 10.5, 0, "SousGantsVert.webp"), -- Vert S
(46, 6, 3, 3, 11.0, 0, "SousGantsVert.webp"), -- Vert M
(47, 6, 1, 4, 10.0, 0, "SousGantsBleu.jpg"), -- Bleu XS
(48, 6, 2, 4, 10.5, 0, "SousGantsBleu.jpg"), -- Bleu S
(49, 6, 3, 4, 11.0, 0, "SousGantsBleu.jpg"), -- Bleu M
(50, 6, 1, 5, 10.0, 0, "SousGantsBlanc.jpg"), -- Blanc XS
(51, 6, 2, 5, 10.5, 0, "SousGantsBlanc.jpg"), -- Blanc S
(52, 6, 3, 5, 11.0, 0, "SousGantsBlanc.jpg"), -- Blanc M
(53, 6, 1, 6, 10.0, 0, "SousGantsGris.webp"), -- Gris XS
(54, 6, 2, 6, 10.5, 0, "SousGantsGris.webp"), -- Gris S
(55, 6, 3, 6, 11.0, 0, "SousGantsGris.webp"), -- Gris M
(56, 6, 1, 7, 10.0, 0, "SousGantsNoir.jpg"), -- Noir XS
(57, 6, 2, 7, 10.5, 0, "SousGantsNoir.jpg"), -- Noir S
(58, 6, 3, 7, 11.0, 0, "SousGantsNoir.jpg"), -- Noir M
(59, 6, 1, 9, 10.0, 0, "SousGantsViolet.webp"), -- Violet XS
(60, 6, 2, 9, 10.5, 0, "SousGantsViolet.webp"), -- Violet S
(61, 6, 3, 9, 11.0, 0, "SousGantsViolet.webp"), -- Violet M
(62, 6, 1, 11, 10.0, 0, "SousGantsCyan.webp"), -- Cyan XS
(63, 6, 2, 11, 10.5, 0, "SousGantsCyan.webp"), -- Cyan S
(64, 6, 3, 11, 11.0, 0, "SousGantsCyan.webp"), -- Cyan M
(65, 6, 1, 12, 10.0, 0, "SousGantsMagenta.webp"), -- Magenta XS
(66, 6, 2, 12, 10.5, 0, "SousGantsMagenta.webp"), -- Magenta S
(67, 6, 3, 12, 11.0, 0, "SousGantsMagenta.webp"), -- Magenta M
(68, 6, 1, 14, 10.0, 0, "SousGantsTurquoise.webp"), -- Turquoise XS
(69, 6, 2, 14, 10.5, 0, "SousGantsTurquoise.webp"), -- Turquoise S
(70, 6, 3, 14, 11.0, 0, "SousGantsTurquoise.webp"), -- Turquoise M
-- Gants Laine x3 (Taille) x6 (Couleur)
(71, 7, 1, 2, 11.0, 0, "GantsLaineRouge.jpg"), -- Rouge XS
(72, 7, 2, 2, 11.5, 0, "GantsLaineRouge.jpg"), -- Rouge S
(73, 7, 3, 2, 12.0, 0, "GantsLaineRouge.jpg"), -- Rouge M
(74, 7, 1, 3, 11.0, 0, "GantsLaineVert.jpg"), -- Vert XS
(75, 7, 2, 3, 11.5, 0, "GantsLaineVert.jpg"), -- Vert S
(76, 7, 3, 3, 12.0, 0, "GantsLaineVert.jpg"), -- Vert M
(77, 7, 1, 5, 11.0, 0, "GantsLaineBlanc.webp"), -- Blanc XS
(78, 7, 2, 5, 11.5, 0, "GantsLaineBlanc.webp"), -- Blanc S
(79, 7, 3, 5, 12.0, 0, "GantsLaineBlanc.webp"), -- Blanc M
(80, 7, 1, 6, 11.0, 0, "GantsLaineGris.jpg"), -- Gris XS
(81, 7, 2, 6, 11.5, 0, "GantsLaineGris.jpg"), -- Gris S
(82, 7, 3, 6, 12.0, 0, "GantsLaineGris.jpg"), -- Gris M
(83, 7, 1, 7, 11.0, 0, "GantsLaineNoir.jpg"), -- Noir XS
(84, 7, 2, 7, 11.5, 0, "GantsLaineNoir.jpg"), -- Noir S
(85, 7, 3, 7, 12.0, 0, "GantsLaineNoir.jpg"), -- Noir M
(86, 7, 1, 8, 11.0, 0, "GantsLaineMarron.webp"), -- Marron XS
(87, 7, 2, 8, 11.5, 0, "GantsLaineMarron.webp"), -- Marron S
(88, 7, 3, 8, 12.0, 0, "GantsLaineMarron.webp"), -- Marron M
-- Chaussettes Père Nöel x5 (Taille) x3 (Couleur)
(89, 8, 12, 2, 13.0, 0, "ChaussettesPereNoelRouge.jpg"), -- Rouge 32-34
(90, 8, 13, 2, 13.5, 0, "ChaussettesPereNoelRouge.jpg"), -- Rouge 35-38
(91, 8, 14, 2, 13.5, 0, "ChaussettesPereNoelRouge.jpg"), -- Rouge 39-42
(92, 8, 15, 2, 14.0, 0, "ChaussettesPereNoelRouge.jpg"), -- Rouge 43-46
(93, 8, 16, 2, 14.0, 0, "ChaussettesPereNoelRouge.jpg"), -- Rouge 47-48
(94, 8, 12, 5, 13.0, 0, "ChaussettesPereNoelBlanc.webp"), -- Blanc 32-34
(95, 8, 13, 5, 13.5, 0, "ChaussettesPereNoelBlanc.webp"), -- Blanc 35-38
(96, 8, 14, 5, 13.5, 0, "ChaussettesPereNoelBlanc.webp"), -- Blanc 39-42
(97, 8, 15, 5, 14.0, 0, "ChaussettesPereNoelBlanc.webp"), -- Blanc 43-46
(98, 8, 16, 5, 14.0, 0, "ChaussettesPereNoelBlanc.webp"), -- Blanc 47-48
(99, 8, 12, 6, 13.0, 0, "ChaussettesPereNoelGris.jpg"), -- Gris 32-34
(100, 8, 13, 6, 13.5, 0, "ChaussettesPereNoelGris.jpg"), -- Gris 35-38
(101, 8, 14, 6, 13.5, 0, "ChaussettesPereNoelGris.jpg"), -- Gris 39-42
(102, 8, 15, 6, 14.0, 0, "ChaussettesPereNoelGris.jpg"), -- Gris 43-46
(103, 8, 16, 6, 14.0, 0, "ChaussettesPereNoelGris.jpg"), -- Gris 47-48
-- Chaussettes Hautes x5 (Taille) x5 (Couleur)
(104, 9, 12, 2, 17.0, 0, "ChaussettesHautesRouge.jpg"), -- Rouge 32-34
(105, 9, 13, 2, 17.5, 0, "ChaussettesHautesRouge.jpg"), -- Rouge 35-38
(106, 9, 14, 2, 17.5, 0, "ChaussettesHautesRouge.jpg"), -- Rouge 39-42
(107, 9, 15, 2, 18.0, 0, "ChaussettesHautesRouge.jpg"), -- Rouge 43-46
(108, 9, 16, 2, 18.0, 0, "ChaussettesHautesRouge.jpg"), -- Rouge 47-48
(109, 9, 12, 5, 17.0, 0, "ChaussettesHautesBlanc.avif"), -- Blanc 32-34
(110, 9, 13, 5, 17.5, 0, "ChaussettesHautesBlanc.avif"), -- Blanc 35-38
(111, 9, 14, 5, 17.5, 0, "ChaussettesHautesBlanc.avif"), -- Blanc 39-42
(112, 9, 15, 5, 18.0, 0, "ChaussettesHautesBlanc.avif"), -- Blanc 43-46
(113, 9, 16, 5, 18.0, 0, "ChaussettesHautesBlanc.avif"), -- Blanc 47-48
(114, 9, 12, 6, 17.0, 0, "ChaussettesHautesGris.webp"), -- Gris 32-34
(115, 9, 13, 6, 17.5, 0, "ChaussettesHautesGris.webp"), -- Gris 35-38
(116, 9, 14, 6, 17.5, 0, "ChaussettesHautesGris.webp"), -- Gris 39-42
(117, 9, 15, 6, 18.0, 0, "ChaussettesHautesGris.webp"), -- Gris 43-46
(118, 9, 16, 6, 18.0, 0, "ChaussettesHautesGris.webp"), -- Gris 47-48
(119, 9, 12, 7, 17.0, 0, "ChaussettesHautesNoir.jpg"), -- Noir 32-34
(120, 9, 13, 7, 17.5, 0, "ChaussettesHautesNoir.jpg"), -- Noir 35-38
(121, 9, 14, 7, 17.5, 0, "ChaussettesHautesNoir.jpg"), -- Noir 39-42
(122, 9, 15, 7, 18.0, 0, "ChaussettesHautesNoir.jpg"), -- Noir 43-46
(123, 9, 16, 7, 18.0, 0, "ChaussettesHautesNoir.jpg"), -- Noir 47-48
(124, 9, 12, 13, 17.0, 0, "ChaussettesHautesOrange.avif"), -- Orange 32-34
(125, 9, 13, 13, 17.5, 0, "ChaussettesHautesOrange.avif"), -- Orange 35-38
(126, 9, 14, 13, 17.5, 0, "ChaussettesHautesOrange.avif"), -- Orange 39-42
(127, 9, 15, 13, 18.0, 0, "ChaussettesHautesOrange.avif"), -- Orange 43-46
(128, 9, 16, 13, 18.0, 0, "ChaussettesHautesOrange.avif"), -- Orange 47-48
-- Chaussettes Laine x5 (Taille) x7 (Couleur)
(129, 10, 12, 2, 10.0, 0, "ChaussettesLaineRouge.webp"), -- Rouge 32-34
(130, 10, 13, 2, 10.5, 0, "ChaussettesLaineRouge.webp"), -- Rouge 35-38
(131, 10, 14, 2, 10.5, 0, "ChaussettesLaineRouge.webp"), -- Rouge 39-42
(132, 10, 15, 2, 11.0, 0, "ChaussettesLaineRouge.webp"), -- Rouge 43-46
(133, 10, 16, 2, 11.0, 0, "ChaussettesLaineRouge.webp"), -- Rouge 47-48
(134, 10, 12, 5, 10.0, 0, "ChaussettesLaineBlanc.jpg"), -- Blanc 32-34
(135, 10, 13, 5, 10.5, 0, "ChaussettesLaineBlanc.jpg"), -- Blanc 35-38
(136, 10, 14, 5, 10.5, 0, "ChaussettesLaineBlanc.jpg"), -- Blanc 39-42
(137, 10, 15, 5, 11.0, 0, "ChaussettesLaineBlanc.jpg"), -- Blanc 43-46
(138, 10, 16, 5, 11.0, 0, "ChaussettesLaineBlanc.jpg"), -- Blanc 47-48
(139, 10, 12, 6, 10.0, 0, "ChaussettesLaineGris.jpg"), -- Gris 32-34
(140, 10, 13, 6, 10.5, 0, "ChaussettesLaineGris.jpg"), -- Gris 35-38
(141, 10, 14, 6, 10.5, 0, "ChaussettesLaineGris.jpg"), -- Gris 39-42
(142, 10, 15, 6, 11.0, 0, "ChaussettesLaineGris.jpg"), -- Gris 43-46
(143, 10, 16, 6, 11.0, 0, "ChaussettesLaineGris.jpg"), -- Gris 47-48
(144, 10, 12, 7, 10.0, 0, "ChaussettesLaineNoir.jpg"), -- Noir 32-34
(145, 10, 13, 7, 10.5, 0, "ChaussettesLaineNoir.jpg"), -- Noir 35-38
(146, 10, 14, 7, 10.5, 0, "ChaussettesLaineNoir.jpg"), -- Noir 39-42
(147, 10, 15, 7, 11.0, 0, "ChaussettesLaineNoir.jpg"), -- Noir 43-46
(148, 10, 16, 7, 11.0, 0, "ChaussettesLaineNoir.jpg"), -- Noir 47-48
(149, 10, 12, 10, 10.0, 0, "ChaussettesLaineRose.webp"), -- Rose 32-34
(150, 10, 13, 10, 10.5, 0, "ChaussettesLaineRose.webp"), -- Rose 35-38
(151, 10, 14, 10, 10.5, 0, "ChaussettesLaineRose.webp"), -- Rose 39-42
(152, 10, 15, 10, 11.0, 0, "ChaussettesLaineRose.webp"), -- Rose 43-46
(153, 10, 16, 10, 11.0, 0, "ChaussettesLaineRose.webp"), -- Rose 47-48
(154, 10, 12, 12, 10.0, 0, "ChaussettesLaineMagenta.jpg"), -- Magenta 32-34
(155, 10, 13, 12, 10.5, 0, "ChaussettesLaineMagenta.jpg"), -- Magenta 35-38
(156, 10, 14, 12, 10.5, 0, "ChaussettesLaineMagenta.jpg"), -- Magenta 39-42
(157, 10, 15, 12, 11.0, 0, "ChaussettesLaineMagenta.jpg"), -- Magenta 43-46
(158, 10, 16, 12, 11.0, 0, "ChaussettesLaineMagenta.jpg"), -- Magenta 47-48
(159, 10, 12, 15, 10.0, 0, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 32-34
(160, 10, 13, 15, 10.5, 0, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 35-38
(161, 10, 14, 15, 10.5, 0, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 39-42
(162, 10, 15, 15, 11.0, 0, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 43-46
(163, 10, 16, 15, 11.0, 0, "ChaussettesLaineMulticolore.jpg"), -- Multicolore 47-48
-- Guirlande Lumineuse x4 (Taille) x3 (Couleur)
(164, 11, 8, 2, 30.0, 0, "GuirlandeLumineuseRouge.jpg"), -- Rouge 50cm
(165, 11, 9, 2, 33.0, 0, "GuirlandeLumineuseRouge.jpg"), -- Rouge 100cm
(166, 11, 10, 2, 37.0, 0, "GuirlandeLumineuseRouge.jpg"), -- Rouge 150cm
(167, 11, 11, 2, 40.0, 0, "GuirlandeLumineuseRouge.jpg"), -- Rouge 200cm
(168, 11, 8, 5, 30.0, 0, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 50cm
(169, 11, 9, 5, 33.0, 0, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 100cm
(170, 11, 10, 5, 37.0, 0, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 150cm
(171, 11, 11, 5, 40.0, 0, "GuirlandeLumineuseBlanc.jpg"), -- Blanc 200cm
(172, 11, 8, 15, 30.0, 0, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 50cm
(173, 11, 9, 15, 33.0, 0, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 100cm
(174, 11, 10, 15, 37.0, 0, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 150cm
(175, 11, 11, 15, 40.0, 0, "GuirlandeLumineuseMulticolore.jpg"), -- Multicolore 200cm
-- Boules Nöel x3 (Taille) x6 (Couleur)
(176, 12, 1, 1, 7.0, 0, "BoulesNoelJaune.jpg"), -- Jaune XS
(177, 12, 2, 1, 7.5, 0, "BoulesNoelJaune.jpg"), -- Jaune S
(178, 12, 3, 1, 8.0, 0, "BoulesNoelJaune.jpg"), -- Jaune M
(179, 12, 1, 2, 7.0, 0, "BoulesNoelRouge.jpg"), -- Rouge XS
(180, 12, 2, 2, 7.5, 0, "BoulesNoelRouge.jpg"), -- Rouge S
(181, 12, 3, 2, 8.0, 0, "BoulesNoelRouge.jpg"), -- Rouge M
(182, 12, 1, 3, 7.0, 0, "BoulesNoelVert.jpg"), -- Vert XS
(183, 12, 2, 3, 7.5, 0, "BoulesNoelVert.jpg"), -- Vert S
(184, 12, 3, 3, 8.0, 0, "BoulesNoelVert.jpg"), -- Vert M
(185, 12, 1, 5, 7.0, 0, "BoulesNoelBlanc.jpg"), -- Blanc XS
(186, 12, 2, 5, 7.5, 0, "BoulesNoelBlanc.jpg"), -- Blanc S
(187, 12, 3, 5, 8.0, 0, "BoulesNoelBlanc.jpg"), -- Blanc M
(188, 12, 1, 16, 7.0, 0, "BoulesNoelDoré.jpg"), -- Doré XS
(189, 12, 2, 16, 7.5, 0, "BoulesNoelDoré.jpg"), -- Doré S
(190, 12, 3, 16, 8.0, 0, "BoulesNoelDoré.jpg"), -- Doré M
(191, 12, 1, 17, 7.0, 0, "BoulesNoelArgent.jpg"), -- Argent XS
(192, 12, 2, 17, 7.5, 0, "BoulesNoelArgent.jpg"), -- Argent S
(193, 12, 3, 17, 8.0, 0, "BoulesNoelArgent.jpg"), -- Argent M
-- Sapin Nöel Plastique x2 (Taille) x2 (Couleur)
(194, 13, 6, 3, 60.0, 0, "SapinNoelPlastiqueVert.jpg"), -- Vert 30cm
(195, 13, 7, 3, 80.0, 0, "SapinNoelPlastiqueVert.jpg"), -- Vert 60cm
(196, 13, 6, 5, 60.0, 0, "SapinNoelPlastiqueBlanc.jpg"), -- Blanc 30cm
(197, 13, 7, 5, 80.0, 0, "SapinNoelPlastiqueBlanc.jpg"), -- Blanc 60cm
-- Sapin Nöel Naturel x2 (Taille) x2 (Couleur)
(198, 14, 6, 3, 70.0, 0, "SapinNoelNaturelVert.jpg"), -- Vert 30cm
(199, 14, 7, 3, 90.0, 0, "SapinNoelNaturelVert.jpg"), -- Vert 60cm
(200, 14, 6, 5, 70.0, 0, "SapinNoelNaturelVert.jpg"), -- Vert 30cm
(201, 14, 7, 5, 90.0, 0, "SapinNoelNaturelVert.jpg"), -- Vert 60cm
-- Père Nöel x1 (Taille) x1 (Couleur)
(202, 15, 11, 2, 0.0, 0, "PereNoelRouge.png"); -- Rouge 200cm

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
(12, 4, 30.0, "2023-01-01", NULL), -- Rouge XS
(13, 4, 31.0, "2023-01-01", NULL), -- Rouge S
(14, 4, 32.0, "2023-01-01", NULL), -- Rouge M
(15, 4, 33.0, "2023-01-01", NULL), -- Rouge L
(16, 4, 34.0, "2023-01-01", NULL), -- Rouge XL
(17, 4, 30.0, "2023-01-01", NULL), -- Vert XS
(18, 4, 31.0, "2023-01-01", NULL), -- Vert S
(19, 4, 32.0, "2023-01-01", NULL), -- Vert M
(20, 4, 33.0, "2023-01-01", NULL), -- Vert L
(21, 4, 34.0, "2023-01-01", NULL), -- Vert XL
(22, 4, 30.0, "2023-01-01", NULL), -- Blanc XS
(23, 4, 31.0, "2023-01-01", NULL), -- Blanc S
(24, 4, 32.0, "2023-01-01", NULL), -- Blanc M
(25, 4, 33.0, "2023-01-01", NULL), -- Blanc L
(26, 4, 34.0, "2023-01-01", NULL), -- Blanc XL
(27, 4, 30.0, "2023-01-01", NULL), -- Noir XS
(28, 4, 31.0, "2023-01-01", NULL), -- Noir S
(29, 4, 32.0, "2023-01-01", NULL), -- Noir M
(30, 4, 33.0, "2023-01-01", NULL), -- Noir L
(31, 4, 34.0, "2023-01-01", NULL), -- Noir XL
(32, 5, 10.0, "2023-01-01", NULL), -- Blanc XS
(33, 5, 10.5, "2023-01-01", NULL), -- Blanc S
(34, 5, 11.0, "2023-01-01", NULL), -- Blanc M
(35, 5, 10.0, "2023-01-01", NULL), -- Gris XS
(36, 5, 10.5, "2023-01-01", NULL), -- Gris S
(37, 5, 11.0, "2023-01-01", NULL), -- Gris M
(38, 5, 10.0, "2023-01-01", NULL), -- Noir XS
(39, 5, 10.5, "2023-01-01", NULL), -- Noir S
(40, 5, 11.0, "2023-01-01", NULL), -- Noir M
(41, 6, 10.0, "2023-01-01", NULL), -- Rouge XS
(42, 6, 10.5, "2023-01-01", NULL), -- Rouge S
(43, 6, 11.0, "2023-01-01", NULL), -- Rouge M
(44, 6, 10.0, "2023-01-01", NULL), -- Vert XS
(45, 6, 10.5, "2023-01-01", NULL), -- Vert S
(46, 6, 11.0, "2023-01-01", NULL), -- Vert M
(47, 6, 10.0, "2023-01-01", NULL), -- Bleu XS
(48, 6, 10.5, "2023-01-01", NULL), -- Bleu S
(49, 6, 11.0, "2023-01-01", NULL), -- Bleu M
(50, 6, 10.0, "2023-01-01", NULL), -- Blanc XS
(51, 6, 10.5, "2023-01-01", NULL), -- Blanc S
(52, 6, 11.0, "2023-01-01", NULL), -- Blanc M
(53, 6, 10.0, "2023-01-01", NULL), -- Gris XS
(54, 6, 10.5, "2023-01-01", NULL), -- Gris S
(55, 6, 11.0, "2023-01-01", NULL), -- Gris M
(56, 6, 10.0, "2023-01-01", NULL), -- Noir XS
(57, 6, 10.5, "2023-01-01", NULL), -- Noir S
(58, 6, 11.0, "2023-01-01", NULL), -- Noir M
(59, 6, 10.0, "2023-01-01", NULL), -- Violet XS
(60, 6, 10.5, "2023-01-01", NULL), -- Violet S
(61, 6, 11.0, "2023-01-01", NULL), -- Violet M
(62, 6, 10.0, "2023-01-01", NULL), -- Cyan XS
(63, 6, 10.5, "2023-01-01", NULL), -- Cyan S
(64, 6, 11.0, "2023-01-01", NULL), -- Cyan M
(65, 6, 10.0, "2023-01-01", NULL), -- Magenta XS
(66, 6, 10.5, "2023-01-01", NULL), -- Magenta S
(67, 6, 11.0, "2023-01-01", NULL), -- Magenta M
(68, 6, 10.0, "2023-01-01", NULL), -- Turquoise XS
(69, 6, 10.5, "2023-01-01", NULL), -- Turquoise S
(70, 6, 11.0, "2023-01-01", NULL), -- Turquoise M
(71, 7, 11.0, "2023-01-01", NULL), -- Rouge XS
(72, 7, 11.5, "2023-01-01", NULL), -- Rouge S
(73, 7, 12.0, "2023-01-01", NULL), -- Rouge M
(74, 7, 11.0, "2023-01-01", NULL), -- Vert XS
(75, 7, 11.5, "2023-01-01", NULL), -- Vert S
(76, 7, 12.0, "2023-01-01", NULL), -- Vert M
(77, 7, 11.0, "2023-01-01", NULL), -- Blanc XS
(78, 7, 11.5, "2023-01-01", NULL), -- Blanc S
(79, 7, 12.0, "2023-01-01", NULL), -- Blanc M
(80, 7, 11.0, "2023-01-01", NULL), -- Gris XS
(81, 7, 11.5, "2023-01-01", NULL), -- Gris S
(82, 7, 12.0, "2023-01-01", NULL), -- Gris M
(83, 7, 11.0, "2023-01-01", NULL), -- Noir XS
(84, 7, 11.5, "2023-01-01", NULL), -- Noir S
(85, 7, 12.0, "2023-01-01", NULL), -- Noir M
(86, 7, 11.0, "2023-01-01", NULL), -- Marron XS
(87, 7, 11.5, "2023-01-01", NULL), -- Marron S
(88, 7, 12.0, "2023-01-01", NULL), -- Marron M
(89, 8, 13.0, "2023-01-01", NULL), -- Rouge 32-34
(90, 8, 13.5, "2023-01-01", NULL), -- Rouge 35-38
(91, 8, 13.5, "2023-01-01", NULL), -- Rouge 39-42
(92, 8, 14.0, "2023-01-01", NULL), -- Rouge 43-46
(93, 8, 14.0, "2023-01-01", NULL), -- Rouge 47-48
(94, 8, 13.0, "2023-01-01", NULL), -- Blanc 32-34
(95, 8, 13.5, "2023-01-01", NULL), -- Blanc 35-38
(96, 8, 13.5, "2023-01-01", NULL), -- Blanc 39-42
(97, 8, 14.0, "2023-01-01", NULL), -- Blanc 43-46
(98, 8, 14.0, "2023-01-01", NULL), -- Blanc 47-48
(99, 8, 13.0, "2023-01-01", NULL), -- Gris 32-34
(100, 8, 13.5, "2023-01-01", NULL), -- Gris 35-38
(101, 8, 13.5, "2023-01-01", NULL), -- Gris 39-42
(102, 8, 14.0, "2023-01-01", NULL), -- Gris 43-46
(103, 8, 14.0, "2023-01-01", NULL), -- Gris 47-48
(104, 9, 17.0, "2023-01-01", NULL), -- Rouge 32-34
(105, 9, 17.5, "2023-01-01", NULL), -- Rouge 35-38
(106, 9, 17.5, "2023-01-01", NULL), -- Rouge 39-42
(107, 9, 18.0, "2023-01-01", NULL), -- Rouge 43-46
(108, 9, 18.0, "2023-01-01", NULL), -- Rouge 47-48
(109, 9, 17.0, "2023-01-01", NULL), -- Blanc 32-34
(110, 9, 17.5, "2023-01-01", NULL), -- Blanc 35-38
(111, 9, 17.5, "2023-01-01", NULL), -- Blanc 39-42
(112, 9, 18.0, "2023-01-01", NULL), -- Blanc 43-46
(113, 9, 18.0, "2023-01-01", NULL), -- Blanc 47-48
(114, 9, 17.0, "2023-01-01", NULL), -- Gris 32-34
(115, 9, 17.5, "2023-01-01", NULL), -- Gris 35-38
(116, 9, 17.5, "2023-01-01", NULL), -- Gris 39-42
(117, 9, 18.0, "2023-01-01", NULL), -- Gris 43-46
(118, 9, 18.0, "2023-01-01", NULL), -- Gris 47-48
(119, 9, 17.0, "2023-01-01", NULL), -- Noir 32-34
(120, 9, 17.5, "2023-01-01", NULL), -- Noir 35-38
(121, 9, 17.5, "2023-01-01", NULL), -- Noir 39-42
(122, 9, 18.0, "2023-01-01", NULL), -- Noir 43-46
(123, 9, 18.0, "2023-01-01", NULL), -- Noir 47-48
(124, 9, 17.0, "2023-01-01", NULL), -- Orange 32-34
(125, 9, 17.5, "2023-01-01", NULL), -- Orange 35-38
(126, 9, 17.5, "2023-01-01", NULL), -- Orange 39-42
(127, 9, 18.0, "2023-01-01", NULL), -- Orange 43-46
(128, 9, 18.0, "2023-01-01", NULL), -- Orange 47-48
(129, 10, 10.0, "2023-01-01", NULL), -- Rouge 32-34
(130, 10, 10.5, "2023-01-01", NULL), -- Rouge 35-38
(131, 10, 10.5, "2023-01-01", NULL), -- Rouge 39-42
(132, 10, 11.0, "2023-01-01", NULL), -- Rouge 43-46
(133, 10, 11.0, "2023-01-01", NULL), -- Rouge 47-48
(134, 10, 10.0, "2023-01-01", NULL), -- Blanc 32-34
(135, 10, 10.5, "2023-01-01", NULL), -- Blanc 35-38
(136, 10, 10.5, "2023-01-01", NULL), -- Blanc 39-42
(137, 10, 11.0, "2023-01-01", NULL), -- Blanc 43-46
(138, 10, 11.0, "2023-01-01", NULL), -- Blanc 47-48
(139, 10, 10.0, "2023-01-01", NULL), -- Gris 32-34
(140, 10, 10.5, "2023-01-01", NULL), -- Gris 35-38
(141, 10, 10.5, "2023-01-01", NULL), -- Gris 39-42
(142, 10, 11.0, "2023-01-01", NULL), -- Gris 43-46
(143, 10, 11.0, "2023-01-01", NULL), -- Gris 47-48
(144, 10, 10.0, "2023-01-01", NULL), -- Noir 32-34
(145, 10, 10.5, "2023-01-01", NULL), -- Noir 35-38
(146, 10, 10.5, "2023-01-01", NULL), -- Noir 39-42
(147, 10, 11.0, "2023-01-01", NULL), -- Noir 43-46
(148, 10, 11.0, "2023-01-01", NULL), -- Noir 47-48
(149, 10, 10.0, "2023-01-01", NULL), -- Rose 32-34
(150, 10, 10.5, "2023-01-01", NULL), -- Rose 35-38
(151, 10, 10.5, "2023-01-01", NULL), -- Rose 39-42
(152, 10, 11.0, "2023-01-01", NULL), -- Rose 43-46
(153, 10, 11.0, "2023-01-01", NULL), -- Rose 47-48
(154, 10, 10.0, "2023-01-01", NULL), -- Magenta 32-34
(155, 10, 10.5, "2023-01-01", NULL), -- Magenta 35-38
(156, 10, 10.5, "2023-01-01", NULL), -- Magenta 39-42
(157, 10, 11.0, "2023-01-01", NULL), -- Magenta 43-46
(158, 10, 11.0, "2023-01-01", NULL), -- Magenta 47-48
(159, 10, 10.0, "2023-01-01", NULL), -- Multicolore 32-34
(160, 10, 10.5, "2023-01-01", NULL), -- Multicolore 35-38
(161, 10, 10.5, "2023-01-01", NULL), -- Multicolore 39-42
(162, 10, 11.0, "2023-01-01", NULL), -- Multicolore 43-46
(163, 10, 11.0, "2023-01-01", NULL), -- Multicolore 47-48
(164, 11, 30.0, "2023-01-01", NULL), -- Rouge 50cm
(165, 11, 33.0, "2023-01-01", NULL), -- Rouge 100cm
(166, 11, 37.0, "2023-01-01", NULL), -- Rouge 150cm
(167, 11, 40.0, "2023-01-01", NULL), -- Rouge 200cm
(168, 11, 30.0, "2023-01-01", NULL), -- Blanc 50cm
(169, 11, 33.0, "2023-01-01", NULL), -- Blanc 100cm
(170, 11, 37.0, "2023-01-01", NULL), -- Blanc 150cm
(171, 11, 40.0, "2023-01-01", NULL), -- Blanc 200cm
(172, 11, 30.0, "2023-01-01", NULL), -- Multicolore 50cm
(173, 11, 33.0, "2023-01-01", NULL), -- Multicolore 100cm
(174, 11, 37.0, "2023-01-01", NULL), -- Multicolore 150cm
(175, 11, 40.0, "2023-01-01", NULL), -- Multicolore 200cm
(176, 12, 7.0, "2023-01-01", NULL), -- Jaune XS
(177, 12, 7.5, "2023-01-01", NULL), -- Jaune S
(178, 12, 8.0, "2023-01-01", NULL), -- Jaune M
(179, 12, 7.0, "2023-01-01", NULL), -- Rouge XS
(180, 12, 7.5, "2023-01-01", NULL), -- Rouge S
(181, 12, 8.0, "2023-01-01", NULL), -- Rouge M
(182, 12, 7.0, "2023-01-01", NULL), -- Vert XS
(183, 12, 7.5, "2023-01-01", NULL), -- Vert S
(184, 12, 8.0, "2023-01-01", NULL), -- Vert M
(185, 12, 7.0, "2023-01-01", NULL), -- Blanc XS
(186, 12, 7.5, "2023-01-01", NULL), -- Blanc S
(187, 12, 8.0, "2023-01-01", NULL), -- Blanc M
(188, 12, 7.0, "2023-01-01", NULL), -- Doré XS
(189, 12, 7.5, "2023-01-01", NULL), -- Doré S
(190, 12, 8.0, "2023-01-01", NULL), -- Doré M
(191, 12, 7.0, "2023-01-01", NULL), -- Argent XS
(192, 12, 7.5, "2023-01-01", NULL), -- Argent S
(193, 12, 8.0, "2023-01-01", NULL), -- Argent M
(194, 13, 60.0, "2023-01-01", NULL), -- Vert 30cm
(195, 13, 80.0, "2023-01-01", NULL), -- Vert 60cm
(196, 13, 60.0, "2023-01-01", NULL), -- Blanc 30cm
(197, 13, 80.0, "2023-01-01", NULL), -- Blanc 60cm
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
  (1, 5, 10.00), 
  (1, 10, 15.00),
  (1, 20, 20.00),

  -- Pull
  (2, 1, 8.00),  
  (2, 5, 12.00), 
  (2, 10, 18.00),
  (2, 20, 25.00),

  -- Gants
  (3, 1, 3.00),  
  (3, 5, 7.00),
  (3, 10, 12.00),
  (3, 20, 15.00),

  -- Chaussettes
  (4, 1, 4.00),  
  (4, 5, 8.00),  
  (4, 10, 12.00),
  (4, 20, 18.00),

  -- Décoration
  (5, 1, 7.00),  
  (5, 5, 15.00), 
  (5, 10, 22.00),
  (5, 20, 30.00),

  -- Schysautre
  (6, 1, 10.00), 
  (6, 5, 18.00),
  (6, 10, 25.00),
  (6, 20, 35.00);


-- Insertion dans la table SOLDE
-- INSERT INTO SOLDE (id_solde, id_detail_prod, reduction, date_debut, date_fin) VALUES;

