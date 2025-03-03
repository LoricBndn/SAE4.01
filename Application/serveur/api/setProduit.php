<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"UPDATE `PRODUIT` SET 
nom_prod = :nom_prod, 
prix_base = :prix_base, 
id_cat = :id_cat 
WHERE id_prod = :id_prod";

$res = $db->prepare($query);

$res->bindParam(':nom_prod', $_POST['nom_prod']);
$res->bindParam(':prix_base', $_POST['prix_base']);
$res->bindParam(':id_cat', $_POST['id_cat']);
$res->bindParam(':id_prod', $_POST['id_prod']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Modification réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);