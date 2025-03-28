<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO COMMANDE (id_commande, id_user, date_commande, total, statut)
VALUES (NULL, :id_user, NOW(), :total, :statut)";

$res = $db->prepare($query);
$res->bindParam(":id_user", $_POST["id_user"]);
$res->bindParam(":total", $_POST["total"]);
$res->bindParam(":statut", $_POST["statut"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);