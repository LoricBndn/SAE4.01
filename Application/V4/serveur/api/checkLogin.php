<?php

declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];
$_POST["identifiant"] = "admin";
$query =
"SELECT *
FROM SELECT_USERS
WHERE identifiant = :identifiant";

$res = $db->prepare($query);
$res->bindParam(":identifiant", $_POST["identifiant"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $res->fetchAll(PDO::FETCH_ASSOC) != [];
} catch (Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}

echo json_encode($json);