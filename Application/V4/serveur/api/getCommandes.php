<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"SELECT id_com, DATE_FORMAT(date_com, '%d/%m/%Y') date_com, ROUND(SUM(prix_total), 2) prix_total
FROM `SELECT_COMMANDES`
WHERE id_us = :id_us
GROUP BY id_com";

$res = $db->prepare($query);
$res->bindParam(":id_us", $_POST["id_us"]);

try{
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "recupération réussie";
    $json["data"] = $res->fetchAll(PDO::FETCH_ASSOC);
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);