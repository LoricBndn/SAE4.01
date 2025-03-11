<?php
    require_once '../bdd/connexion.php';
    require_once 'header.php';

    // function Mycrypt($mdp, $salt){
    //     $verif = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/";
    //     $S = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    //     $res["mdp"] = "";
    //     if(preg_match($verif, $mdp)) {
    //         for($i = 0; $i < strlen($mdp); $i++) {
    //             $pos = (strpos($S, $mdp[$i]) + strpos($S, $salt[$i])) % strlen($S);
    //             $res["mdp"] .= $S[$pos];
    //         }
    //         $res["salt"] = $salt;
    //         return $res;
    //     }
    //     else {
    //         $res["status"] = "failed";
    //         return $res;
    //     }        
    // }

$json = [];
$query = "
SELECT mdp, salt, id_us
FROM USER
WHERE login = :login";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login']);
try{
    $res->execute();
    $res = $res->fetch();
    $mdp = crypt($_POST['mdp'], $res['salt']);

    if($mdp == $res['mdp']){
        setcookie("id_us", $res['id_us'], 10800 + time());
        $json["id_us"] = $res['id_us'];
        $json["status"] = "success";
        $json["message"] = "Connexion réussie";
    }
    else{
        $json["status"] = "failed";
        $json["message"] = "Mauvais mot de passe";
    }
}
catch(Exception $exception){
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);