-- Insertion des permissions de base
INSERT INTO PERMISSION (id_perm, nom_perm) VALUES
(1, 'Utilisateur'),
(2, 'Administrateur');

-- Insertion des utilisateurs
INSERT INTO USER (id_user, id_perm, nom, prénom, email, date_naiss, mdp) VALUES
(1, 1, 'Dupont', 'Jean', 'jean.dupont@email.com', '1985-06-15', 'hashedpassword1'),
(2, 1, 'Martin', 'Claire', 'claire.martin@email.com', '1992-09-22', 'hashedpassword2'),
(3, 2, 'Admin', 'Super', 'admin@email.com', '1980-01-01', 'hashedpassword3');

-- Insertion des catégories
INSERT INTO CATEGORIE (id_categorie, nom) VALUES
(1, 'Électronique'),
(2, 'Vêtements'),
(3, 'Maison & Jardin');

-- Insertion des produits
INSERT INTO PRODUIT (id_produit, id_categorie, SKU, nom, description, photo) VALUES
(1, 1, 'ELEC123', 'Smartphone X', 'Smartphone dernière génération', 'smartphone.jpg'),
(2, 2, 'VET456', 'T-Shirt Coton', 'T-shirt 100% coton', 'tshirt.jpg');

-- Insertion des détails des produits
INSERT INTO DETAIL_PRODUIT (reference, id_produit, taille, couleur, prix, stock) VALUES
(101, 1, NULL, 'Noir', 799.99, 50),
(102, 2, 'M', 'Blanc', 19.99, 200);

-- Insertion des favoris
INSERT INTO FAVORI (id_user, reference) VALUES
(1, 101),
(2, 102);

-- Insertion des paniers
INSERT INTO PANIER (id_panier, id_user, reference, quantite) VALUES
(1, 1, 101, 1),
(2, 2, 102, 2);

-- Insertion des commandes
INSERT INTO COMMANDE (id_commande, id_user, date_commande, total, statut) VALUES
(1, 1, '2024-03-10', 799.99, 'En cours'),
(2, 2, '2024-03-11', 39.98, 'Livré');

-- Insertion des détails des commandes
INSERT INTO DETAIL_COMMANDE (id_detail, id_commande, reference, quantite, prix_unitaire) VALUES
(1, 1, 101, 1, 799.99),
(2, 2, 102, 2, 19.99);

-- Insertion des paiements
INSERT INTO PAIEMENT (id_paiement, id_commande, methode, statut, transaction_id) VALUES
(1, 1, 'Carte de crédit', 'Validé', 'TX12345'),
(2, 2, 'PayPal', 'Validé', 'TX67890');

-- Insertion des frais de port
INSERT INTO FRAIS_PORT (id_categorie, seuil_quantite, frais) VALUES
(1, 1, 5.99),
(2, 3, 4.99);

-- Insertion des soldes
INSERT INTO SOLDE (id_solde, reference, reduction, date_debut, date_fin) VALUES
(1, 102, 10, '2024-03-01', '2024-03-15');
