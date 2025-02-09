"use strict";

async function printUser() {

    const User = await getUser();
    const user_data = User.data[0]

    const id = document.getElementById("id");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const mel = document.getElementById("mel");
    const date_naiss = document.getElementById("date_naiss");
    const login = document.getElementById("login");
    const perm = document.getElementById("perm");

    id.innerText += " " + user_data.id_us;
    nom.innerText += " " + user_data.nom_us;
    prenom.innerText += " " + user_data.prenom_us;
    mel.innerText += " " + user_data.mel;
    date_naiss.innerText += " " + user_data.date_naiss;
    login.innerText += " " + user_data.login;
    perm.innerText += " " + user_data.nom_perm;
}

async function getUser() {

    return fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getUser.php', {
        method: "POST",

        body: new URLSearchParams({
            id_us: new URLSearchParams(window.location.search).get("id_us") // id_us
        })
    }).then(reponse => reponse.json());
}


const section = document.getElementById("userInfo");

printUser();