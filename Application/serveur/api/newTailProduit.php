<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO `TAIL_PROD` 
(`id_prod`, `id_tail`, `diff_prix_tail`) 
VALUES 
(:id_prod, :id_tail, :diff_prix_tail)";

$res = $db->prepare($query);
$res->bindParam(":id_prod", $_POST["id_prod"]);
$res->bindParam(":id_tail", $_POST["id_tail"]);
$res->bindParam(":diff_prix_tail", $_POST["diff_prix_tail"]);

try{
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}



echo json_encode($json);