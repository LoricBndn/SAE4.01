<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"DELETE FROM FAVORI
WHERE id_user = :id_user";

$res = $db->prepare($query);
$res->bindParam(":id_user", $_POST["id_user"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Suppression réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);