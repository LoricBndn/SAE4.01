<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$query =
"SELECT * FROM PANIER
WHERE id_us = :id_us";

$res = $db->prepare($query);

$res->bindParam(":id_us", $_POST["id_us"]);
try{
    $res->execute();
    $panier = $res->fetchAll(PDO::FETCH_ASSOC);
    //var_dump($panier);
    $query = "INSERT INTO COMMANDE
    (`id_com`, `date_com`, `id_us`)
    VALUES
    (NULL, NOW(), :id_us);
    ";
    $res = $db->prepare($query);
    $res->bindParam(":id_us", $_POST["id_us"]);
    $res->execute();
    $query ="
    SELECT MAX(id_com) as id_com
    FROM COMMANDE";
    $res = $db->prepare($query);
    $res->execute();
    $id_com = $res->fetchAll(PDO::FETCH_ASSOC)[0]["id_com"];
    for($i = 0; $i < count($panier); $i++){

        $query = "SELECT prix_unit
        FROM SELECT_PRODUITS
        WHERE id_prod = :id_prod
        AND id_col = :id_col
        AND id_tail = :id_tail";
        $res = $db->prepare($query);
        $res->bindParam(":id_prod", $panier[$i]["id_prod"]);
        $res->bindParam(":id_col", $panier[$i]["id_col"]);
        $res->bindParam(":id_tail", $panier[$i]["id_tail"]);
        $res->execute();
        $prix_unit = $res->fetchAll(PDO::FETCH_ASSOC)[0]["prix_unit"];
    
        $prix_total = $prix_unit * $panier[$i]["qte_pan"];

        $query = "INSERT INTO DETAIL_COM
        (`id_com`, `id_prod`, `id_col`, `id_tail`, `qte_com`, `prix_total`) 
        VALUES 
        (:id_com, :id_prod, :id_col, :id_tail, :quantite, :prix_total);
        ";
        $res = $db->prepare($query);
        $res->bindParam(":id_com", $id_com);
        $res->bindParam(":id_prod", $panier[$i]["id_prod"]);
        $res->bindParam(":id_col", $panier[$i]["id_col"]);
        $res->bindParam(":id_tail", $panier[$i]["id_tail"]);
        $res->bindParam(":quantite", $panier[$i]["qte_pan"]);
        $res->bindParam(":prix_total", $prix_total);

        $res->execute();

        $json["status"] = "success";
        $json["message"] = "Commande effectuée";

    }
} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}
echo json_encode($json);