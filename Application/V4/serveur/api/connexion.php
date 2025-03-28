<?php declare(strict_types=1);

require_once "../bdd/connexion.php";
require_once 'header.php';

$json = [];

$query = 
"SELECT id_user, mdp
FROM UTILISATEUR
WHERE identifiant = :identifiant";

$res = $db->prepare($query);
$res->bindParam(':identifiant', $_POST['identifiant']);

try {
    $res->execute();
    $res = $res->fetch();

    if (password_verify($_POST['mdp'], $res['mdp'])) {
        setcookie("id_user", $res['id_user'], 10800 + time());
        $json["id_user"] = $res['id_user'];
        $json["status"] = "success";
        $json["message"] = "Connexion réussie";
    } else {
        $json["status"] = "failed";
        $json["message"] = "Mauvais mot de passe";
    }
} catch(Exception $exception){
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);