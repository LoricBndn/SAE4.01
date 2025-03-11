<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO PANIER
(id_us, id_prod, qte_pan, id_col, id_tail)
VALUES
(:id_us, :id_prod, :qte_pan, :id_col, :id_tail)";

$res = $db->prepare($query);

$res->bindParam(':id_us', $_POST['id_us']);
$res->bindParam(':id_prod', $_POST['id_prod']);
$res->bindParam(':qte_pan', $_POST['qte_pan']);
$res->bindParam(':id_col', $_POST['id_col']);
$res->bindParam(':id_tail', $_POST['id_tail']);


try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);