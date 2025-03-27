<?php

declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

header("Content-Type: application/json");

// Vérifier si l'ID de la transaction PayPal est présent
if (!isset($_POST['orderID']) || !isset($_POST['id_us'])) {
    echo json_encode(["status" => "error", "message" => "Données manquantes"]);
    exit;
}

$paypalClientID = "AYbGjopJkEbu_OiL5OSD1U9Ap-se2TzEJMJPUnxbvMXvJwVjnKnQOsY1ka00XmVsIAxkI3ejK_ZZPhpo";
$paypalSecret = "ECPrA03Rovd4xOXDUDYozxJ0dHR7mcdnB86VoENXjg-hcW5C0NK6sazTd1NKThcQrr8gvvbB2XbxyX0F";
$paypalURL = "https://api-m.sandbox.paypal.com/v2/checkout/orders/"; // Mode test (Sandbox)

// Vérification de la transaction auprès de PayPal
$orderID = $_POST['orderID'];
$id_us = $_POST['id_us'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $paypalURL . $orderID);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Basic " . base64_encode("$paypalClientID:$paypalSecret")
]);
$response = curl_exec($ch);
curl_close($ch);

$paypalResponse = json_decode($response, true);

if (!$paypalResponse || $paypalResponse['status'] !== 'COMPLETED') {
    echo json_encode(["status" => "error", "message" => "Paiement non validé"]);
    exit;
}

// Récupération du panier
$query = "SELECT * FROM PANIER WHERE id_us = :id_us";
$res = $db->prepare($query);
$res->bindParam(":id_us", $id_us);
try {
    $res->execute();
    $panier = $res->fetchAll(PDO::FETCH_ASSOC);

    // Insérer la commande
    $query = "INSERT INTO COMMANDE (`id_com`, `date_com`, `id_us`) VALUES (NULL, NOW(), :id_us)";
    $res = $db->prepare($query);
    $res->bindParam(":id_us", $id_us);
    $res->execute();

    // Récupérer l'ID de la commande créée
    $query = "SELECT MAX(id_com) as id_com FROM COMMANDE";
    $res = $db->prepare($query);
    $res->execute();
    $id_com = $res->fetch(PDO::FETCH_ASSOC)["id_com"];

    // Insérer les détails de commande
    foreach ($panier as $item) {
        $query = "SELECT prix_unit FROM SELECT_PRODUITS WHERE id_prod = :id_prod AND id_col = :id_col AND id_tail = :id_tail";
        $res = $db->prepare($query);
        $res->bindParam(":id_prod", $item["id_prod"]);
        $res->bindParam(":id_col", $item["id_col"]);
        $res->bindParam(":id_tail", $item["id_tail"]);
        $res->execute();
        $prix_unit = $res->fetch(PDO::FETCH_ASSOC)["prix_unit"];

        $prix_total = $prix_unit * $item["qte_pan"];

        $query = "INSERT INTO DETAIL_COM (`id_com`, `id_prod`, `id_col`, `id_tail`, `qte_com`, `prix_total`) 
                  VALUES (:id_com, :id_prod, :id_col, :id_tail, :quantite, :prix_total)";
        $res = $db->prepare($query);
        $res->bindParam(":id_com", $id_com);
        $res->bindParam(":id_prod", $item["id_prod"]);
        $res->bindParam(":id_col", $item["id_col"]);
        $res->bindParam(":id_tail", $item["id_tail"]);
        $res->bindParam(":quantite", $item["qte_pan"]);
        $res->bindParam(":prix_total", $prix_total);
        $res->execute();
    }

    // Nettoyer le panier après commande
    $query = "DELETE FROM PANIER WHERE id_us = :id_us";
    $res = $db->prepare($query);
    $res->bindParam(":id_us", $id_us);
    $res->execute();

    echo json_encode(["status" => "success", "message" => "Commande validée et enregistrée"]);
} catch (Exception $exception) {
    echo json_encode(["status" => "error", "message" => $exception->getMessage()]);
}
