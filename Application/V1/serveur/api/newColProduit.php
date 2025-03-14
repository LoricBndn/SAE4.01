<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO `COL_PROD` 
(`id_prod`, `id_col`, `diff_prix_col`, `path_img`) 
VALUES 
(:id_prod, :id_col, :diff_prix_col, :path_img)";

$res = $db->prepare($query);
$res->bindParam(":id_prod", $_POST["id_prod"]);
$res->bindParam(":id_col", $_POST["id_col"]);
$res->bindParam(":diff_prix_col", $_POST["diff_prix_col"]);
$res->bindParam(":path_img", $_POST["path_img"]);


try{
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}



echo json_encode($json);