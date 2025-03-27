<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$id_user = $_POST['id_user'];

// Récupération du panier
$query = "SELECT * FROM PANIER WHERE id_user = :id_user";
$res = $db->prepare($query);
$res->bindParam(":id_user", $id_user);
try {
    $res->execute();
    $panier = $res->fetchAll(PDO::FETCH_ASSOC);
    $total = 0;

    // Insérer la commande
    $query = "INSERT INTO COMMANDE (id_commmande, id_user, date_commande, total, statut) VALUES (NULL, :id_user, NOW(), :total, :statut)";
    $res = $db->prepare($query);
    $res->bindParam(":id_user", $id_user);
    $res->bindParam(":total", $total);
    $res->bindParam(":statut", "En cours");
    $res->execute();

    // Récupérer l'ID de la commande créée
    $query = "SELECT MAX(id_commmande) as id_commmande FROM COMMANDE";
    $res = $db->prepare($query);
    $res->execute();
    $id_commmande = $res->fetch(PDO::FETCH_ASSOC)["id_commmande"];


    // Insérer les détails de commande
    foreach ($panier as $item) {
        $query = "SELECT prix FROM SELECT_PRODUITS WHERE id_detail_prod = :id_detail_prod";
        $res = $db->prepare($query);
        $res->bindParam(":id_detail_prod", $item["id_detail_prod"]);
        $res->execute();
        $prix_unit = $res->fetch(PDO::FETCH_ASSOC)["prix"];

        $prix_total = $prix_unit * $item["qte_pan"];
        $total += $prix_total;

        $query = "INSERT INTO DETAIL_COMMANDE (id_detail_com, id_commande, id_detail_prod, quantite, prix_total)
                  VALUES (NULL, :id_commande, :id_detail_prod, :quantite, :prix_total)";
        $res = $db->prepare($query);
        $res->bindParam(":id_commande", $id_commande);
        $res->bindParam(":id_detail_prod", $item["id_detail_prod"]);
        $res->bindParam(":quantite", $item["quantite"]);
        $res->bindParam(":prix_total", $prix_total);
        $res->execute();
    }

    // Mettre à jour le prix de la commande
    $query = "UPDATE COMMANDE SET total = :total WHERE id_commande = :id_commande";
    $res = $db->prepare($query);
    $res->bindParam(":total", $total);
    $res->bindParam(":id_commande", $id_commande);
    $res->execute();

    // Nettoyer le panier après commande
    $query = "DELETE FROM PANIER WHERE id_user = :id_user";
    $res = $db->prepare($query);
    $res->bindParam(":id_user", $id_user);
    $res->execute();

    echo json_encode(["status" => "success", "message" => "Commande validée et enregistrée"]);
} catch (Exception $exception) {
    echo json_encode(["status" => "error", "message" => $exception->getMessage()]);
}
