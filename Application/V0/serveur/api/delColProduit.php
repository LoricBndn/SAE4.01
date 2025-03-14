<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"DELETE FROM `COL_PROD` 
WHERE id_prod = :id_prod
AND id_col = :id_col";

$res = $db->prepare($query);
$res->bindParam(":id_prod", $_POST["id_prod"]);
$res->bindParam(":id_col", $_POST["id_col"]);

try{
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Suppression réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);