<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query = "SELECT id_prod ,nom_prod, prix_base
FROM CATEGORIE,PRODUIT 
WHERE CATEGORIE.id_cat = PRODUIT.id_cat 
AND PRODUIT.id_cat = :id_cat"; //on peut mettre le nom de la catégorie en paramètre mais pas sur que ca soit utile

$res = $db->prepare($query);
$res->bindParam(':id_cat', $_POST['id_cat']);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
    $json["data"] = $res->fetchAll(PDO::FETCH_ASSOC);

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}


echo json_encode($json);