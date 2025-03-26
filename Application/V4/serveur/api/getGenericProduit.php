<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$query =
"SELECT *
FROM SELECT_PRODUITS
WHERE id_produit = :id_produit
AND id_couleur = :id_couleur
GROUP BY id_produit, id_couleur";

$res = $db->prepare($query);
$res->bindParam(":id_produit", $_POST["id_produit"]);
$res->bindParam(":id_couleur", $_POST["id_couleur"]);

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