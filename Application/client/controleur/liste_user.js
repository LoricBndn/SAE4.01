"use strict";
import { cookieValue } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}

class AUser extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('userRow');
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}


async function printAllUsers() {

    const allUsers = await getAllUsers();

    allUsers.data.forEach(userData => {

        let user = createUser(userData);

        let detail_button = user.shadowRoot.querySelector("button");
        detail_button.id = userData.id_us;

        buttons.push(detail_button);

        section.appendChild(user);
    });
}

function createUser(user_data) {

    const user = document.createElement("a-user");
    let nom = document.createElement("span");
    let prenom = document.createElement("span");
    let mel = document.createElement("span");
    let date_naiss = document.createElement("span");

    nom.slot = "nom";
    prenom.slot = "prenom";
    mel.slot = "mel";
    date_naiss.slot = "date_naiss";

    nom.innerText = user_data.nom_us;
    prenom.innerText = user_data.prenom_us;
    mel.innerText = user_data.mel;
    date_naiss.innerText = user_data.date_naiss;

    user.appendChild(nom);
    user.appendChild(prenom);
    user.appendChild(mel);
    user.appendChild(date_naiss);

    return user;
}

async function getAllUsers() {

    return fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getUsers.php')
        .then(reponse => reponse.json());
}


customElements.define("a-user", AUser);

const section = document.getElementById("userGrid");
let buttons = [];

printAllUsers().then(() => {

    buttons.forEach(item => {

        item.addEventListener("click", () => {

            window.location.href = '../user.html?id_us=' + item.id;
        });
    });
});
