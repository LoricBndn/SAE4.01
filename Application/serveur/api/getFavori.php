<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"SELECT *
FROM FAVORI F
INNER JOIN SELECT_PRODUITS SP ON F.id_prod = SP.id_prod
WHERE id_us = :id_us
GROUP BY SP.id_prod";

$res = $db->prepare($query);

$res->bindParam(":id_us", $_POST["id_us"]);

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