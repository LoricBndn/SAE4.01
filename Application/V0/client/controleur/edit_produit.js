"use strict";
import { cookieValue } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}

class Color extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('type_col');
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

customElements.define("some-col", Color);

class Taille extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('type_tail');
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

customElements.define("some-tail", Taille);

function createCol(nom_col) {
    const some_color = document.createElement("some-col");
    const p_nom_col = document.createElement("p");

    p_nom_col.slot = "name_col";
    p_nom_col.innerText = nom_col;

    some_color.appendChild(p_nom_col);

    return some_color;
}

function createTail(nom_tail) {
    const some_color = document.createElement("some-tail");
    const p_nom_tail = document.createElement("p");

    p_nom_tail.slot = "name_tail";
    p_nom_tail.innerText = nom_tail;

    some_color.appendChild(p_nom_tail);

    return some_color;
}

async function getInfoProd(id_prod) {
    if (!id_prod) return;

    return await fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getProduit.php', {
        method: "POST",

        body: new URLSearchParams({
            id_prod: id_prod
        })
    }).then(reponse => reponse.json());
}

async function printCouleurs(infos_prod) {
    const div = document.getElementById("col");

    const json = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCouleurs.php')
        .then(reponse => reponse.json());

    const data = json.data;
    data.forEach(element => {

        const some_col = createCol(element.nom_col);
        const button = some_col.shadowRoot.querySelector("[class='col_enabler']");


        button.addEventListener("click", () => {
            const displayed = some_col.shadowRoot.querySelectorAll("[class='col_enabled']");

            displayed.forEach(element => {

                if (element.style.display === "none") {
                    element.style.display = "block";
                    element.disabled = false;
                } else {
                    element.style.display = "none";
                    element.disabled = true;
                }
            });
        });

        div.appendChild(some_col);
    });
}


async function printTailles(infos_prod) {
    // console.log(infos_prod)
    const div = document.getElementById("tail");

    const json = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getTailles.php')
        .then(reponse => reponse.json());

    const data = json.data;
    data.forEach(element => {

        const some_tail = createTail(element.nom_tail);

        const button = some_tail.shadowRoot.querySelector("[class='tail_enabler']");


        button.addEventListener("click", () => {
            const displayed = some_tail.shadowRoot.querySelectorAll("[class='tail_enabled']");

            displayed.forEach(element => {

                if (element.style.display === "none") element.style.display = "block";
                else element.style.display = "none";
            });
        });
        div.appendChild(some_tail);
    });
}

async function printOptionCat(id_cat) {
    const select = document.getElementById("cat");

    const json = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCategories.php')
        .then(reponse => reponse.json());

    const data = json.data;
    data.forEach(element => {
        const option = document.createElement("option");

        option.innerHTML = element.nom_cat;

        if (element.id_cat === id_cat) {
            option.selected = true;
        }

        select.appendChild(option);
    });
}

function ajouterProd(infos_prod) {
    fetch('https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/ajoutProduit.php', {
        method: "POST",

        body: new URLSearchParams({
            data: infos_prod
        })
    })
}

async function main() {

    const id_prod = new URLSearchParams(window.location.search).get("id_prod");
    const json = await getInfoProd(id_prod);
    // console.log(json);
    const infos_prod = json ? json.data : [{ id_cat: 0, id_tail: 0, id_col: 0 }];

    // console.log(infos_prod);

    if (id_prod) {
        const submit = document.querySelector("[type='submit']");
        document.title = "";
        submit.value = "Modifier";
    }

    printOptionCat(infos_prod[0].id_cat);
    printCouleurs(infos_prod);
    printTailles(infos_prod);
}

printOptionCat();
printCouleurs();
printTailles();
main();