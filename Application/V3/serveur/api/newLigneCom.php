<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];
$prix = [];

$query = "SELECT prix_base 
FROM PRODUIT 
WHERE id_prod = :id_prod"; 

$res = $db->prepare($query);
$res->bindParam(':id_prod', $_POST['id_prod']);
try{
    $res->execute();
    $prix = $res->fetchAll();   
}
catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
    $json["data"] = "[]";
}

$prix_total = $prix[0]['prix_base'] * $_POST['qte_com'];

$query =
"INSERT INTO DETAIL_COM
(`id_com`, `id_prod`, `qte_com`, `id_col`, `id_tail`, `prix_total`)
VALUES
(:id_com, :id_prod, :qte_com, :id_col, :id_tail, :prix_total)";

$res = $db->prepare($query);

$res->bindParam(':id_com', $_POST['id_com']);
$res->bindParam(':id_prod', $_POST['id_prod']);
$res->bindParam(':qte_com', $_POST['qte_com']);
$res->bindParam(':id_col', $_POST['id_col']);
$res->bindParam(':id_tail', $_POST['id_tail']);
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