<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"DELETE FROM `TAIL_PROD` 
WHERE id_prod = :id_prod
AND id_tail = :id_tail";

$res = $db->prepare($query);
$res->bindParam(":id_prod", $_POST["id_prod"]);
$res->bindParam(":id_tail", $_POST["id_tail"]);

try{
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Suppression réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);