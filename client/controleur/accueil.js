import { cookieValue } from "./function.js";
export class ProduitGenerique extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        *,
        *::before,
        *::after {
            transition: 200ms;
        }
        a {
            text-decoration: none;
            color: black;
        }
        .img_prod {
            margin: 3%;
            height: auto;
            max-width: 94%;
            border-radius: 4px;
        }
        .etoile{
            /*margin: 3%;*/
            width: 20px;
            height: 20px;
        }
        .etoile, .prix {
            display: inline-block;
        }
        .etoile, .prix, label {
            vertical-align: middle;
        }
        .checkbox{
            display: none;
        }
        .descProduit {
            border-radius: 8px;
            background-color: lightgray;
            box-shadow: 3px 3px gray;
        }
        .descProduit:hover {
            box-shadow: 3px 3px green;
            background-color: #5f8755;
        }
        .name {
            margin: 3%;
        }
        .prix {
            height: 20px;
            margin: 0;
            /*rigth: -50%;
            position: relative;*/
        }
        .flex {
            display: flex;
            justify-content: space-between;
            padding: 3%;
        }
        </style>
        <a href="detail_produit.html?id=${this.getAttribute("id")}&id_col=${this.getAttribute("id_col")}" class="descProduit">
        <div class="descProduit">
            <input type="checkbox" class="checkbox" id="ch${this.getAttribute("id")}">
            <div class="flex">
                <label for="ch${this.getAttribute("id")}"><img class="etoile" src='img/icones/star_vide.png'/></label>
                <p class="prix">${this.getAttribute("prix")}€</p>
            </div>
            <p class="name">${this.getAttribute("name")}</p>
            <img class="img_prod" src="${this.getAttribute('path_img')}" alt="${this.getAttribute("path_img")}" />
        </div>
        </a>
        `;
    }
}

customElements.define("produit-generique", ProduitGenerique);

function afficherTousLesProduits() {
    const urlParams = new URLSearchParams(window.location.search);
    const taille = urlParams.get("taille");
    const couleur = urlParams.get("idCouleur");

    const produitGenerique =
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getGenericProduits.php";
    const produitComplet =
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getProduits.php";
    const url = taille || couleur ? produitComplet : produitGenerique;

    return fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
            imprimerTousLesProduits(data.data);
        })
        .catch((error) => console.log(error));
}

function produitsRecherche(recherche, data) {
    let dejaSortit = [];
    data.forEach((produit) => {
        if (produitContientMot(produit, recherche)) {
            dejaSortit.push(produit);
        }
    });
    data = purgerListeProduit(dejaSortit, data);
    recherche.split(" ").forEach((mot) => {
        data.forEach((produit) => {
            if (produitContientMot(produit, mot) && !dejaSortit.includes(produit)) {
                dejaSortit.push(produit);
            }
        });
    });
    return dejaSortit;
}

function purgerListeProduit(dejaSortit, data) {
    dejaSortit.forEach((produit) => {
        if (data.includes(produit)) {
            data.splice(data.indexOf(produit), 1);
        }
    });
    return data;
}

function produitsCategorie(idCategorie, data) {
    let dejaSortit = [];
    data.forEach((produit) => {
        if (produit.id_cat == idCategorie) dejaSortit.push(produit);
    });
    return dejaSortit;
}

function produitsCouleur(idCouleur, data) {
    let dejaSortit = [];
    data.forEach((produit) => {
        if (produit.id_col == idCouleur) dejaSortit.push(produit);
    });
    return dejaSortit;
}

function produitsTaille(idTaille, data) {
    let dejaSortit = [];
    data.forEach((produit) => {
        if (produit.id_tail == idTaille) dejaSortit.push(produit);
    });
    return dejaSortit;
}


export function imprimerUnProduit(produit) {

    let path = produit["path_img"] ?
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/img/articles/" + produit["path_img"] :
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
    // console.log(produit)
    let produitElement = document.createElement("produit-generique");
    produitElement.classList.add("col-xs-12");
    produitElement.classList.add("col-sm-6");
    produitElement.classList.add("col-md-4");
    produitElement.classList.add("col-lg-3");
    produitElement.classList.add("col-xl-2");
    produitElement.classList.add("descProduit");
    produitElement.setAttribute("name", produit["nom_prod"]);
    produitElement.setAttribute("prix", produit["prix_unit"]);
    produitElement.setAttribute("id", produit["id_prod"]);
    produitElement.setAttribute("id_col", produit["id_col"]);
    produitElement.setAttribute("path_img", path);
    // console.log(path);
    return produitElement;
}

function produitContientMot(produit, mot) {
    return produit.nom_prod
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
            mot
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
}

function imprimerTousLesProduits(produits) {
    const urlParams = new URLSearchParams(window.location.search);
    const recherche = urlParams.get("search");
    const categorie = urlParams.get("idCategorie");
    const taille = urlParams.get("idTaille");
    const couleur = urlParams.get("idCouleur");
    const id_us = cookieValue;
    if (recherche) {
        produits = produitsRecherche(recherche, produits);
    }
    if (categorie) {
        produits = produitsCategorie(categorie, produits);
    }
    if (taille) {
        produits = produitsTaille(taille, produits);
    }
    if (couleur) {
        produits = produitsCouleur(couleur, produits);
    }

    const listeProd = document.querySelector(".produits");
    // console.log(produits);

    // produits.forEach((produit) => {
    //     // console.log(produit);
    //     let produitElement = document.createElement("produit-generique");
    //     produitElement.classList.add("col-md-4");
    //     produitElement.classList.add("col-lg-3");
    //     produitElement.classList.add("col-sm-6");
    //     produitElement.classList.add("descProduit");
    //     produitElement.setAttribute("name", produit["nom_prod"]);
    //     produitElement.setAttribute("prix", produit["prix_unit"]);
    //     produitElement.setAttribute("id", produit["id_prod"]);


    //     listeProd.appendChild(produitElement);
    // });

    produits.forEach((produit) => {
        const produitElement = imprimerUnProduit(produit);
        document.querySelector(".produits").appendChild(produitElement);
    });
    traiterFavori(id_us);
}

async function getFavori(id_us) {
    return await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getFavori.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_us: id_us,
                }),
            }
        )
        .then((response) => response.json().then((data) => data.data))
        .catch((error) => console.log(error));
}

function ajouterFavori(event, id_us) {
    fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/newFavori.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: id_us,
                id_prod: event.target.id.substring(2),
            }),
        }
    ).catch((error) => console.log(error));
}

function supprimerFavori(event, id_us) {
    fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/delFavori.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: id_us,
                id_prod: event.target.id.substring(2),
            }),
        }
    ).catch((error) => console.log(error));
}

function traiterFavori(id_us) {
    const id_fav = [];
    getFavori(id_us).then((data) => {
        data.forEach((fav) => {
            id_fav.push(fav["id_prod"]);
        });
        //console.log(id_fav);
        document
            .querySelector(".produits")
            .querySelectorAll("produit-generique")
            .forEach((produit) => {
                const checkbox = produit.shadowRoot.querySelector(".checkbox");
                const img = produit.shadowRoot.querySelector("label").querySelector("img");
                //console.log(checkbox.id.substring(1));
                if (id_fav.includes(parseInt(checkbox.id.substring(2)))) {
                    checkbox.checked = true;
                    img.src = "../img/icones/star_plein.png";
                };
                checkbox.addEventListener("click", (event) => {
                    if (event.target.checked === true) {
                        ajouterFavori(event, id_us);
                        img.src = "../img/icones/star_plein.png";
                    } else {
                        supprimerFavori(event, id_us);
                        img.src = "../img/icones/star_vide.png";
                    }
                });
                document
                    .querySelector(".produits")
                    .querySelectorAll("produit-generique")
                    .forEach((produit) => {
                        const checkbox = produit.shadowRoot.querySelector(".checkbox");
                        if (id_fav.includes(parseInt(checkbox.id))) checkbox.checked = true;
                        checkbox.addEventListener("click", (event) => {
                            if (cookieValue == null) window.location.href = "login.html";
                            if (event.target.checked === true) {
                                ajouterFavori(event, id_us);
                            } else {
                                supprimerFavori(event, id_us);
                            }
                        });
                    });
            });
    });
}
afficherTousLesProduits();
