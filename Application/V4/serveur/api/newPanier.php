<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO PANIER (id_user, id_detail_prod, quantite)
VALUES (:id_user, :id_detail_prod, :quantite)";

$res = $db->prepare($query);

$res->bindParam(':id_user', $_POST['id_user']);
$res->bindParam(':id_detail_prod', $_POST['id_detail_prod']);
$res->bindParam(':quantite', $_POST['quantite']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);