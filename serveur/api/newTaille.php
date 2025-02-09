<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO TAILLE
(`id_tail`, `nom_tail`)
VALUES
(NULL, :nom_tail)";

$res = $db->prepare($query);

$res->bindParam(':nom_tail', $_POST['nom_tail']);

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