-- Vue SELECT_COMMANDES
CREATE VIEW SELECT_COMMANDES AS
SELECT
    C.id_commande AS id_commande,
    C.id_user AS id_user,
    DC.id_detail_prod AS id_detail_prod,
    DC.quantite AS quantite,
    DC.prix_total AS prix_total,
    C.date_commande AS date_commande
FROM
    COMMANDE C, 
    DETAIL_COMMANDE DC, 
    DETAIL_PRODUIT DP
WHERE C.id_commande = DC.id_commande
AND DC.id_detail_prod = DP.id_detail_prod
ORDER BY
    C.id_user,
    C.id_commande,
    DC.id_detail_prod

-- Vue SELECT_FAVORIS
CREATE VIEW SELECT_FAVORIS AS
SELECT
    F.id_user AS id_user,
    P.id_produit AS id_produit,
    P.nom_produit AS nom_produit,
    C.id_categorie AS id_categorie,
    C.nom_categorie AS nom_categorie,
    DP.id_detail_prod AS id_detail_prod,
    DP.id_couleur AS id_couleur,
    CO.couleur AS couleur,
    DPD.id_taille AS id_taille,
    T.taille AS taille,
    DP.path_img AS path_img,
    DP.prix AS prix
FROM 
    FAVORI F, 
    PRODUIT P, 
    CATEGORIE C, 
    DETAIL_PRODUIT DP,
    COULEUR CO, 
    TAILLE T
WHERE F.id_detail_prod = DP.id_detail_prod 
AND DP.id_produit = P.id_produit 
AND P.id_categorie = C.id_categorie 
AND DP.id_couleur = CO.id_couleur 
AND DP.id_taille = T.id_taille
ORDER BY 
    F.id_user, 
    DP.id_detail_prod

-- Vue SELECT_PANIERS
CREATE VIEW SELECT_PANIERS AS
SELECT
    PA.id_user AS id_user,
    P.id_produit AS id_produit,
    P.nom_produit AS nom_produit,
    C.id_categorie AS id_categorie,
    C.nom_categorie AS nom_categorie,
    DP.id_detail_prod AS id_detail_prod,
    DP.id_couleur AS id_couleur,
    CO.couleur AS couleur,
    DP.id_taille AS id_taille,
    T.taille AS taille,
    DP.path_img AS path_img,
    DP.prix AS prix,
    PA.quantite AS quantite,
    PA.quantite * D.prix AS prix_total
FROM
    PANIER PA,
    DETAIL_PRODUIT DP
    PRODUIT P,
    CATEGORIE C,
    COULEUR CO,
    TAILLE T
WHERE PA.id_detail_prod = DP.id_detail_prod 
AND DP.id_produit = P.id_produit 
AND P.id_categorie = C.id_categorie 
AND DP.id_couleur = CO.id_couleur 
AND DP.id_taille = T.id_taille
ORDER BY
    PA.id_user,
    D.id_detail_prod

-- Vue SELECT_PRODUITS
CREATE VIEW SELECT_PRODUITS AS
SELECT
    P.id_produit AS id_produit,
    P.nom_produit AS nom_produit,
    P.description AS description,
    C.id_categorie AS id_categorie,
    C.nom_categorie AS nom_categorie,
    DP.id_detail_prod AS id_detail_prod,
    DP.id_couleur AS id_couleur,
    CO.couleur AS couleur,
    DP.id_taille AS id_taille,
    T.taille AS taille,
    DP.path_img AS path_img,
    DP.prix AS prix,
    DP.stock AS stock
FROM  
    PRODUIT P, 
    CATEGORIE C, 
    DETAIL_PRODUIT DP,
    COULEUR CO, 
    TAILLE T
WHERE DP.id_produit = P.id_produit 
AND P.id_categorie = C.id_categorie 
AND DP.id_couleur = CO.id_couleur 
AND DP.id_taille = T.id_taille
ORDER BY
    DP.id_detail_prod

-- Vue SELECT_USERS
CREATE VIEW SELECT_USERS AS
SELECT
    U.id_user AS id_user,
    U.nom AS nom,
    U.prenom AS prenom,
    U.email AS email,
    U.date_naissance AS date_naissance,
    U.identifiant AS identifiant,
    U.mdp AS mdp,
    PE.id_perm AS id_perm,
    PE.nom_perm AS nom_perm
FROM
    UTILISATEUR U,
    PERMISSION PE,
WHERE U.id_perm = PE.id_perm
ORDER BY
    PE.id_perm,
    U.nom,
    U.prenom