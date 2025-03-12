<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"DELETE FROM FAVORI
WHERE id_us = :id_us
AND id_prod = :id_prod";

$res = $db->prepare($query);

$res->bindParam(":id_us", $_POST["id_us"]);
$res->bindParam(":id_prod", $_POST["id_prod"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Suppression réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);