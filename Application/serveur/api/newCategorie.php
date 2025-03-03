<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO CATEGORIE
(`id_cat`, `nom_cat`)
VALUES
(NULL, :nom_cat)";

$res = $db->prepare($query);

$res->bindParam(':nom_cat', $_POST['nom_cat']);

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