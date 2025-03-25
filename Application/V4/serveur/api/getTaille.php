<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"SELECT id_taille, taille
FROM SELECT_PRODUITS
WHERE id_categorie = :id_categorie
GROUP BY id_taille
ORDER BY id_taille";

$res = $db->prepare($query);
$res->bindParam(':id_categorie', $_POST['id_categorie']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $res->fetchAll(PDO::FETCH_ASSOC);
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}

echo json_encode($json);