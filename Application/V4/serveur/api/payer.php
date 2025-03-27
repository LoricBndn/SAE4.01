<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$id_user = $_POST['id_user'];

// Récupération du panier
$query = "SELECT * FROM PANIER WHERE id_user = :id_user";
$res = $db->prepare($query);
$res->bindValue(":id_user", $id_user);
$res->execute();
$panier = $res->fetchAll(PDO::FETCH_ASSOC);
$total = 0;

try {
    // Insérer la commande
    $query = "INSERT INTO COMMANDE (id_commande, id_user, date_commande, total, statut) 
              VALUES (NULL, :id_user, NOW(), :total, :statut)";
    $res = $db->prepare($query);
    $res->bindValue(":id_user", $id_user);
    $res->bindValue(":total", $total);
    $res->bindValue(":statut", "En cours");
    $res->execute();

    // Récupérer l'ID de la commande créée
    $query = "SELECT MAX(id_commande) as id_commande FROM COMMANDE";
    $res = $db->prepare($query);
    $res->execute();
    $id_commande = $res->fetch(PDO::FETCH_ASSOC)["id_commande"];

    // Insérer les détails de commande
    foreach ($panier as $item) {
        $query = "SELECT prix FROM SELECT_PRODUITS WHERE id_detail_prod = :id_detail_prod";
        $res = $db->prepare($query);
        $res->bindValue(":id_detail_prod", $item["id_detail_prod"]);
        $res->execute();
        $prix_unit = $res->fetch(PDO::FETCH_ASSOC)["prix"];

        $prix_total = $prix_unit * $item["quantite"];
        $total += $prix_total;

        $query = "INSERT INTO DETAIL_COMMANDE (id_detail_com, id_commande, id_detail_prod, quantite, prix_total)
                  VALUES (NULL, :id_commande, :id_detail_prod, :quantite, :prix_total)";
        $res = $db->prepare($query);
        $res->bindValue(":id_commande", $id_commande);
        $res->bindValue(":id_detail_prod", $item["id_detail_prod"]);
        $res->bindValue(":quantite", $item["quantite"]);
        $res->bindValue(":prix_total", $prix_total);
        $res->execute();
    }

    // Mettre à jour le prix total de la commande
    $query = "UPDATE COMMANDE SET total = :total WHERE id_commande = :id_commande";
    $res = $db->prepare($query);
    $res->bindValue(":total", $total);
    $res->bindValue(":id_commande", $id_commande);
    $res->execute();

    // Nettoyer le panier après commande
    $query = "DELETE FROM PANIER WHERE id_user = :id_user";
    $res = $db->prepare($query);
    $res->bindValue(":id_user", $id_user);
    $res->execute();

    echo json_encode(["status" => "success", "message" => "Commande validée et enregistrée"]);
} catch (Exception $exception) {
    echo json_encode(["status" => "error", "message" => $exception->getMessage()]);
}
