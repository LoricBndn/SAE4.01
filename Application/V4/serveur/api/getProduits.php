<?php declare(strict_types=1);
header('Content-Type: application/json');

require_once "../bdd/connexion.php";    
require_once 'header.php';

$json = [];

$query =
"SELECT *
FROM DETAIL_PRODUIT d1 INNER JOIN PRODUIT p
WHERE id_detail_prod = (
    SELECT MIN(d2.id_detail_prod)
    FROM DETAIL_PRODUIT d2
    WHERE d2.id_produit = d1.id_produit
)
AND d1.id_produit = p.id_produit
ORDER BY d1.id_produit";
;

$res = $db->prepare($query);

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