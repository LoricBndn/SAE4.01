<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query = 
"SELECT id_commande, date_commande, path_img, nom_produit, couleur, taille, quantite, prix_total
FROM SELECT_COMMANDES SC
INNER JOIN SELECT_PRODUITS SP ON SP.id_detail_prod = SC.id_detail_prod
WHERE id_user = :id_user
AND id_commande = :id_commande";

$res = $db->prepare($query);
$res ->bindParam(":id_user", $_POST["id_user"]);
$res ->bindParam(":id_commande", $_POST["id_commande"]);

try{
    $res->execute();
    $details = $res->fetchAll(PDO::FETCH_ASSOC);

    // Calcul du total de la commande
    $totalQuery = "SELECT SUM(prix_total) AS total FROM SELECT_COMMANDES WHERE id_commande = :id_commande";
    $totalStmt = $db->prepare($totalQuery);
    $totalStmt->bindParam(":id_commande", $_POST["id_commande"]);
    $totalStmt->execute();
    $total = $totalStmt->fetch(PDO::FETCH_ASSOC)["total"] ?? 0;

    $json["status"] = "success";
    $json["message"] = "Récupération réussie";
    $json["data"] = $details;
    $json["total"] = $total;
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);