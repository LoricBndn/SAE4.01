<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"UPDATE UTILISATEUR
SET mdp = :mdp
WHERE id_user = :id_user";

$res = $db->prepare($query);
$res->bindParam(":mdp", password_hash($_POST["mdp"], PASSWORD_DEFAULT));
$res->bindParam(":id_user", $_POST["id_user"]);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Modification réussie";
} catch (Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);
