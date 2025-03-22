<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO COMMANDE
(`id_com`, `date_com`, `id_us`)
VALUES
(NULL, NOW(), :id_us);
";

$res = $db->prepare($query);

$res->bindParam(":id_us", $_POST["id_us"]);

try {
    $res->execute();

    $query = 
    "SELECT MAX(id_com) as id_com
    FROM COMMANDE";

    $res2 = $db->prepare($query);
    $res2->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
    $json["data"] = $res2->fetchAll();

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}


echo json_encode($json);