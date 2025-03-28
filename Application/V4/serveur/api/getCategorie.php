<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query = 
"SELECT C.id_categorie, nom_categorie
FROM CATEGORIE C, PRODUIT P
WHERE C.id_categorie = P.id_categorie
AND P.id_produit = :id_produit";

$res = $db->prepare($query);
$res->bindParam(':id_produit', $_POST['id_produit']);

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