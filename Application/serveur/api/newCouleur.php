<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO COULEUR
(`id_col`, `nom_col`)
VALUES
(NULL, :nom_col)";

$res = $db->prepare($query);

$res->bindParam(':nom_col', $_POST['nom_col']);

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