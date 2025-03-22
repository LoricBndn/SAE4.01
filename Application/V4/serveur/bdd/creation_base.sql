-- Table des permissions (rôles utilisateur)
CREATE TABLE PERMISSION (
    id_perm INT PRIMARY KEY AUTO_INCREMENT,
    nom_perm VARCHAR(50) NOT NULL UNIQUE
);

-- Table des utilisateurs
CREATE TABLE UTILISATEUR (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    id_perm INT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,    
    date_naissance DATE,
    identifiant VARCHAR(20) UNIQUE NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_perm) REFERENCES PERMISSION(id_perm) ON DELETE CASCADE
);

-- Table des catégories de produits
CREATE TABLE CATEGORIE (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom_categorie VARCHAR(50) NOT NULL UNIQUE
);

-- Table des produits
CREATE TABLE PRODUIT (
    id_produit INT PRIMARY KEY AUTO_INCREMENT,
    id_categorie INT NOT NULL,
    SKU VARCHAR(50) UNIQUE NOT NULL,
    nom_produit VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (id_categorie) REFERENCES CATEGORIE(id_categorie) ON DELETE CASCADE
);

-- Table des tailles
CREATE TABLE TAILLE (
    id_taille INT AUTO_INCREMENT PRIMARY KEY,
    taille VARCHAR(50) UNIQUE NOT NULL
);

-- Table des couleurs
CREATE TABLE COULEUR (
    id_couleur INT AUTO_INCREMENT PRIMARY KEY,
    couleur VARCHAR(50) UNIQUE NOT NULL
);

-- Table des variantes de produit (couleurs, tailles, prix, stock)
CREATE TABLE DETAIL_PRODUIT (
    id_detail_prod INT PRIMARY KEY AUTO_INCREMENT,
    id_produit INT NOT NULL,
    id_taille INT,
    id_couleur INT,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0),
    path_img VARCHAR(255),
    FOREIGN KEY (id_produit) REFERENCES PRODUIT(id_produit) ON DELETE CASCADE,
    FOREIGN KEY (id_taille) REFERENCES TAILLE(id_taille) ON DELETE CASCADE,
    FOREIGN KEY (id_couleur) REFERENCES COULEUR(id_couleur) ON DELETE CASCADE
);

-- Table de l'historique des prix d'un produit (couleurs, tailles, prix, stock)
CREATE TABLE HISTORIQUE_PRIX (
    id_historique INT PRIMARY KEY AUTO_INCREMENT,
    id_detail_prod INT NOT NULL,
    ancien_prix DECIMAL(10,2) NOT NULL,
    nouveau_prix DECIMAL(10,2) NOT NULL,
    date_modif DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_detail_prod) REFERENCES DETAIL_PRODUIT(id_detail_prod) ON DELETE CASCADE
);

-- Table des favoris (produits sauvegardés par l'utilisateur)
CREATE TABLE FAVORI (
    id_user INT NOT NULL,
    id_detail_prod INT NOT NULL,
    PRIMARY KEY (id_user, id_detail_prod),
    FOREIGN KEY (id_user) REFERENCES UTILISATEUR(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_detail_prod) REFERENCES DETAIL_PRODUIT(id_detail_prod) ON DELETE CASCADE
);

-- Table du panier (articles en attente d'achat)
CREATE TABLE PANIER (
    id_panier INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_detail_prod INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    FOREIGN KEY (id_user) REFERENCES UTILISATEUR(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_detail_prod) REFERENCES DETAIL_PRODUIT(id_detail_prod) ON DELETE CASCADE
);

-- Table des commandes
CREATE TABLE COMMANDE (
    id_commande INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('En attente', 'En cours', 'Expédiée', 'Livrée', 'Annulée') NOT NULL,
    FOREIGN KEY (id_user) REFERENCES UTILISATEUR(id_user) ON DELETE CASCADE
);

-- Table des détails de commande (articles achetés)
CREATE TABLE DETAIL_COMMANDE (
    id_detail_com INT PRIMARY KEY AUTO_INCREMENT,
    id_commande INT NOT NULL,
    id_detail_prod INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES COMMANDE(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (id_detail_prod) REFERENCES DETAIL_PRODUIT(id_detail_prod) ON DELETE CASCADE
);

-- Table des paiements
CREATE TABLE PAIEMENT (
    id_paiement INT PRIMARY KEY AUTO_INCREMENT,
    id_commande INT NOT NULL,
    methode ENUM('PayPal', 'Carte bancaire') NOT NULL,
    statut ENUM('En attente', 'Effectué', 'Échoué') NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    FOREIGN KEY (id_commande) REFERENCES COMMANDE(id_commande) ON DELETE CASCADE
);

-- Table des frais de port (en fonction de la catégorie et du volume)
CREATE TABLE FRAIS_PORT (
    id_categorie INT NOT NULL,
    seuil_quantite INT NOT NULL,
    frais DECIMAL(10,2) NOT NULL CHECK (frais >= 0),
    PRIMARY KEY (id_categorie, seuil_quantite),
    FOREIGN KEY (id_categorie) REFERENCES CATEGORIE(id_categorie) ON DELETE CASCADE
);

-- Table des soldes (promotions sur les articles)
CREATE TABLE SOLDE (
    id_solde INT PRIMARY KEY AUTO_INCREMENT,
    id_detail_prod INT NOT NULL,
    reduction DECIMAL(5,2) NOT NULL CHECK (reduction >= 0 AND reduction <= 100),
    date_debut DATE NOT NULL CHECK (date_debut < date_fin),
    date_fin DATE NOT NULL,
    FOREIGN KEY (id_detail_prod) REFERENCES DETAIL_PRODUIT(id_detail_prod) ON DELETE CASCADE
);