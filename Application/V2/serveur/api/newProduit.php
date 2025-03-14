<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO PRODUIT
(`id_prod`, `nom_prod`, `prix_base`, `id_cat`)
VALUES
(NULL, :nom_prod, :prix_base, :id_cat)";

$res = $db->prepare($query);

$res->bindParam(':nom_prod', $_POST['nom_prod']);
$res->bindParam(':prix_base', $_POST['prix_base']);
$res->bindParam(':id_cat', $_POST['id_cat']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
    $json["data"] = $res->fetchAll();

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}


echo json_encode($json);