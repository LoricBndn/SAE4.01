-- Table des permissions
CREATE TABLE PERMISSION (
    id_perm INT PRIMARY KEY AUTO_INCREMENT,
    nom_perm VARCHAR(50) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE USER (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    id_perm INT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_perm) REFERENCES PERMISSION(id_perm) ON DELETE CASCADE
);

-- Table des catégories
CREATE TABLE CATEGORIE (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL
);

-- Table des produits
CREATE TABLE PRODUIT (
    id_produit INT PRIMARY KEY AUTO_INCREMENT,
    id_categorie INT NOT NULL,
    SKU VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(255),
    FOREIGN KEY (id_categorie) REFERENCES CATEGORIE(id_categorie) ON DELETE CASCADE
);

-- Table des détails des produits (tailles, couleurs, prix, stock)
CREATE TABLE DETAIL_PRODUIT (
    reference INT PRIMARY KEY AUTO_INCREMENT,
    id_produit INT NOT NULL,
    taille VARCHAR(10),
    couleur VARCHAR(20),
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (id_produit) REFERENCES PRODUIT(id_produit) ON DELETE CASCADE
);

-- Table des favoris
CREATE TABLE FAVORI (
    id_user INT NOT NULL,
    reference INT NOT NULL,
    PRIMARY KEY (id_user, reference),
    FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE,
    FOREIGN KEY (reference) REFERENCES DETAIL_PRODUIT(reference) ON DELETE CASCADE
);

-- Table du panier
CREATE TABLE PANIER (
    id_panier INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    reference INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE,
    FOREIGN KEY (reference) REFERENCES DETAIL_PRODUIT(reference) ON DELETE CASCADE
);

-- Table des commandes
CREATE TABLE COMMANDE (
    id_commande INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('En cours', 'Expédiée', 'Livrée', 'Annulée') NOT NULL,
    FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE
);

-- Table des détails des commandes
CREATE TABLE DETAIL_COMMANDE (
    id_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_commande INT NOT NULL,
    reference INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES COMMANDE(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (reference) REFERENCES DETAIL_PRODUIT(reference) ON DELETE CASCADE
);

-- Table des paiements
CREATE TABLE PAIEMENT (
    id_paiement INT PRIMARY KEY AUTO_INCREMENT,
    id_commande INT NOT NULL,
    methode ENUM('PayPal', 'Carte bancaire') NOT NULL,
    statut ENUM('En attente', 'Effectué', 'Échoué') NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    FOREIGN KEY (id_commande) REFERENCES COMMANDE(id_commande) ON DELETE CASCADE
);

-- Table des frais de port
CREATE TABLE FRAIS_PORT (
    id_categorie INT NOT NULL,
    seuil_quantite INT NOT NULL,
    frais DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_categorie, seuil_quantite),
    FOREIGN KEY (id_categorie) REFERENCES CATEGORIE(id_categorie) ON DELETE CASCADE
);

-- Table des soldes
CREATE TABLE SOLDE (
    id_solde INT PRIMARY KEY AUTO_INCREMENT,
    reference INT NOT NULL,
    reduction DECIMAL(5,2) NOT NULL CHECK (reduction >= 0 AND reduction <= 100),
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    FOREIGN KEY (reference) REFERENCES DETAIL_PRODUIT(reference) ON DELETE CASCADE
);
