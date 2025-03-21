<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query ="SELECT nom_tail, nom_col, nom_prod, path_img, prix_unit, description, qte_com
FROM `SELECT_COMMANDES` SC
INNER JOIN SELECT_PRODUITS SP ON
(SP.id_prod, SP.id_col, SP.id_tail) = (SC.id_prod, SC.id_col, SC.id_tail)
WHERE `id_us` = :id_us
AND `id_com` = :id_com
";

$res = $db->prepare($query);
$res ->bindParam(":id_us", $_POST["id_us"]);
$res ->bindParam(":id_com", $_POST["id_com"]);

try{
    $res->execute();
    $details = $res->fetchAll(PDO::FETCH_ASSOC);

    // Calcul du total de la commande
    $totalQuery = "SELECT SUM(prix_total) AS total FROM SELECT_COMMANDES WHERE id_com = :id_com";
    $totalStmt = $db->prepare($totalQuery);
    $totalStmt->bindParam(":id_com", $_POST["id_com"]);
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