<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"UPDATE USER SET
nom_us = :nom,
prenom_us = :prenom,
mel = :mel,
date_naiss = :date_naiss
WHERE id_us = :id_us";

$res = $db->prepare($query);

$res->bindParam(':nom', $_POST['nom']);
$res->bindParam(':prenom', $_POST['prenom']);
$res->bindParam(':mel', $_POST['mel']);
$res->bindParam(':date_naiss', $_POST['date_naiss']);
$res->bindParam(':id_us', $_POST['id_us']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Modification réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);