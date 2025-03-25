<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];
$prix = [];

$query = 
"SELECT prix 
FROM DETAIL_PRODUIT 
WHERE id_detail_prod = :id_detail_prod"; 

$res = $db->prepare($query);
$res->bindParam(':id_detail_prod', $_POST['id_detail_prod']);

try {
    $res->execute();
    $prix = $res->fetchAll();   
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}

$prix_total = $prix[0]['prix'] * $_POST['quantite'];

$query =
"INSERT INTO DETAIL_COMMANDE (id_detail_com, id_commande, id_detail_prod, quantite, prix_total)
VALUES (NULL, :id_commande, :id_detail_prod, :quantite, :prix_total)";

$res = $db->prepare($query);

$res->bindParam(':id_commande', $_POST['id_commande']);
$res->bindParam(':id_detail_prod', $_POST['id_detail_prod']);
$res->bindParam(':quantite', $_POST['quantite']);
$res->bindParam(':prix_total', $prix_total);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);