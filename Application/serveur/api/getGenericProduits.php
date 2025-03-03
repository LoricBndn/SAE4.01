<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$query =
"SELECT *
FROM SELECT_PRODUITS
GROUP BY id_prod";

$res = $db->prepare($query);

try {
    $res->execute();
    $data["status"] = "success";
    $data["message"] = "Sélection réussie";
    $data["data"] = $res->fetchAll(PDO::FETCH_ASSOC);

} catch(Exception $exception) {
    $data["status"] = "error";
    $data["message"] = $exception->getMessage();
    $data["data"] = "[]";
}


echo json_encode($data);