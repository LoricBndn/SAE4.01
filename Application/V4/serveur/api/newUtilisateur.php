<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query =
"INSERT INTO UTILISATEUR (id_user, id_perm, nom, prenom, email, date_naissance, identifiant, mdp)
VALUES (NULL, 2, :nom, :prenom, :email, :date_naissance, :identifiant, :mdp)";

$res = $db->prepare($query);
$res->bindParam(':nom', $_POST['nom']);
$res->bindParam(':prenom', $_POST['prenom']);
$res->bindParam(':email', $_POST['email']);
$res->bindParam(':date_naissance', $_POST['date_naissance']);
$res->bindParam(':identifiant', $_POST['identifiant']);
$res->bindParam(':mdp', password_hash($_POST['mdp'], PASSWORD_DEFAULT));

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);