<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"DELETE FROM FAVORI
WHERE id_user = :id_user
AND id_detail_prod = :id_detail_prod";

$res = $db->prepare($query);
$res->bindParam(":id_user", $_POST["id_user"]);
$res->bindParam(":id_detail_prod", $_POST["id_detail_prod"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Suppression réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);