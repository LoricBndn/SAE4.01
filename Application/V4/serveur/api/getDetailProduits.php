<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"SELECT *
FROM DETAIL_PRODUIT
WHERE  id_produit = :id_produit
AND id_couleur = :id_couleur";

$res = $db->prepare($query);
$res->bindParam(":id_produit", $_POST["id_produit"]);
$res->bindParam(":id_couleur", $_POST["id_couleur"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $res->fetchAll(PDO::FETCH_ASSOC);

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}

echo json_encode($json);