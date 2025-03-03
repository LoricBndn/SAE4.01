import { cookieValue } from "./function.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const id_col = urlParams.get("id_col");

class ProduitDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
    <style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
        width: 20px;
        background-color: whitesmoke;
        border: none;
    }
    input[type=button] {
        text-align: center;
        background-color: whitesmoke;
        color: black;
        border: none;
        padding: 14px 20px;
        margin: 8px 0;
        cursor: pointer;
        text-decoration: none;
        font-size: medium;
        border-radius: 4px;
    }
    .produitDetail {
        margin: 30px auto;
        text-align: center;
        background-color: #5f8755;
        box-shadow: 5px 5px green;
        max-width: 800px;
        border-radius: 10px;
        padding: 15px;
    }
    .main_info_prod, .sub_info_prod {
        /*display: flex;
        justify-content: space-around;
        flex-wrap: wrap;*/
        display: grid;
        grid-template-columns: repeat(auto-fill, 380px);
        column-gap: 10px;
    }
    @media screen and (max-width: 840px) {
        .produitDetail {
            margin: 20px;
        }
        .main_info_prod, .sub_info_prod {
            grid-template-columns: none;
        }
    }
    .img_prod, .desc_prod {
        vertical-align: top;
        margin: 5px;
        max-width: 400px;
        max-height: 300px;
    }
    .img_prod {
        height: auto;
        width: auto;
        aspect-ratio: auto;
        max-width: 100%;
        border-radius: 4px;
    }
    #taille, #couleur {
        display: inline-block;
    }
    p {
        font-size: 20px;
        ${/*overflow: scroll;*/""}
    }
    </style>
    <div class="produitDetail">
        <center><h1>${this.getAttribute("name")}</h1></center>
        <span class="main_info_prod">
            <center><img class="img_prod" alt="../img/Placeholder.png" src="${this.getAttribute("path_img")}"></center>
            <center><p class="desc_prod">${this.getAttribute("description")}</p></center>
        </span>
        <br>
        <div class="sub_info_prod">
            <div style="margin-bottom: 15px;">
                <p>prix : <span id="prix">${this.getAttribute("prix")}</span> €</p>
                <div id="taille">Taille : </div>
                <div id="couleur">Couleur : </div>
            </div>
            <div>
                <label for="nbrCommande">Quantité :</label>
                <input type="number" id="nbrCommande" name="nbrCommande" step="1" value="1" size="5" requiered>
                <p>Prix total : <span id="prix_tot">${this.getAttribute("prix")}</span>€</p>
                <input type="button" value="Ajouter au panier">
            </div>
        </div>
    </div>
    `;
        document.title = this.getAttribute("name") + " - PM2";

        const nbrCommande = this.shadowRoot.getElementById("nbrCommande");

        nbrCommande.addEventListener("input", (event) => {
            const prix = this.shadowRoot.getElementById("prix").innerHTML;
            console.log(prix);
            const contenu = event.target.value;
            const prixTotal = this.shadowRoot.getElementById("prix_tot");
            if (!quantiteCommandeeValide(contenu)) {
                event.target.style.background = "red";
                prixTotal.innerHTML = prix;
            } else {
                event.target.style.background = "whitesmoke";
                prixTotal.innerHTML = Math.round(prix * parseInt(contenu) * 100) / 100;
            }
        });
    }
}

customElements.define("produit-detail", ProduitDetail);
async function AfficherProd() {
    return fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getProduit.php", {
                method: "POST",

                body: new URLSearchParams({
                    id_prod: new URLSearchParams(window.location.search).get("id"), // id_prod
                }),
            }
        )
        .then((reponse) => reponse.json())
        .then((data) => {

            imprimerProduit(data.data.filter((produit) => produit.id_col == id_col)[0]);
            imprimerSelectionCouleur(data.data);
            imprimerSelectionTaille(data.data);
            boutonCommander(data.data.filter((produit) => produit.id_col == id_col)[0].id_prod);
        });
}

function quantiteCommandeeValide(qtte) {
    return !(parseInt(qtte) <= 0 || isNaN(parseInt(qtte)));
}

function imprimerSelectionCouleur(produits) {
    let couleurs = new Map();
    produits.forEach((produit) => {
        if (!couleurs.has(produit["nom_col"])) {
            couleurs.set(produit["id_col"], produit["nom_col"]);
        }
    });
    console.log(produits);
    const selecteur = document.createElement("select");
    selecteur.setAttribute("id", "selectCouleur");
    couleurs.forEach((couleur, id) => {
        let option = document.createElement("option");
        option.text = couleur;
        if (id == id_col) {
            option.selected = true;
        }
        option.value = id;
        selecteur.add(option);
    });
    const root = document.querySelector("produit-detail").shadowRoot;
    root.getElementById("couleur").appendChild(selecteur);
    root.getElementById("selectCouleur").addEventListener("change", (event) => {
        let id = event.target.value;
        let produit = produits.find((produit) => {
            return produit.id_col == id;
        });
        let path = produit.path_img ?
            "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/img/articles/" + produit.path_img :
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
        root.querySelector("img").setAttribute("src", path);
        //root.setAttribute("prix", produit.prix_unit);
    });
}

function imprimerSelectionTaille(produits) {
    let tailles = new Map();
    produits.forEach((produit) => {
        if (!tailles.has(produit["id_tail"])) {
            tailles.set(produit["id_tail"], produit["nom_tail"]);
        }
    });
    const selecteur = document.createElement("select");
    selecteur.setAttribute("id", "selectTaille");
    tailles.forEach((taille, id) => {
        let option = document.createElement("option");
        option.text = taille;
        option.value = id;
        selecteur.add(option);
    });
    const root = document.querySelector("produit-detail").shadowRoot;
    root.getElementById("taille").appendChild(selecteur);
    root.getElementById("selectTaille").addEventListener("change", (event) => {
        const produit = produits.find((produit) => {
            return produit.id_tail == event.target.value
        });
        console.log(produit);
        const qte = root.querySelector("#nbrCommande").value;
        root.querySelector("#prix").innerHTML = produit.prix_unit * qte;
        root.querySelector("#prix_tot").innerHTML = produit.prix_unit * qte;
    });
}

function imprimerProduit(produit) {

    let path = produit.path_img ?
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/img/articles/" + produit.path_img :
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
    //console.log(path)
    const prod_affiche = document.createElement("produit-detail");
    prod_affiche.setAttribute("name", produit.nom_prod);
    prod_affiche.setAttribute("description", produit.description);
    prod_affiche.setAttribute("prix", produit.prix_unit);
    prod_affiche.setAttribute("couleur", produit.nom_col);
    prod_affiche.setAttribute("taille", produit.nom_tail);
    prod_affiche.setAttribute("path_img", path);
    prod_affiche.setAttribute("id", "produit");
    document.querySelector("#detail").appendChild(prod_affiche);
}

function boutonCommander(id_produit) {
    const root = document.querySelector("produit-detail").shadowRoot;

    const boutton = root.querySelector("input[type=button]");
    boutton.addEventListener("click", (event) => {
        const nbCommandee = root.getElementById("nbrCommande").valueAsNumber;
        if (quantiteCommandeeValide(nbCommandee)) {
            const tailleSelect = root
                .getElementById("taille")
                .querySelector("select");
            const couleurSelect = root
                .getElementById("couleur")
                .querySelector("select");
            const tailleID = tailleSelect.options[tailleSelect.selectedIndex].value;
            const couleurID =
                couleurSelect.options[couleurSelect.selectedIndex].value;
            // console.log(nbCommandee, tailleID, couleurID)
            // console.log(JSON.stringify({ id_cl: 3, id_prod: id_produit, id_taille: tailleID, couleur: couleurID, qte_pan: nbCommandee }))
            fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/newPanier.php", {
                    method: "POST",
                    body: new URLSearchParams({
                        id_us: cookieValue,
                        id_prod: id,
                        id_tail: tailleID,
                        id_col: couleurID,
                        qte_pan: nbCommandee,
                    }),
                })
                .then((reponse) => {
                    reponse.json().then((data) => {
                        if (data.status === "error") {
                            alert("vous avez déjà ce produit dans votre panier")
                        } else if (data.status === "success") {
                            window.location.href = "accueil.html";
                        }
                    })
                })
                .catch((error) => { console.log(error) });
        };
        console.log(nbCommandee, tailleID, couleurID);
        console.log(
            JSON.stringify({
                id_cl: 1,
                id_prod: id_produit,
                id_taille: tailleID,
                couleur: couleurID,
                qte_pan: nbCommandee,
            })
        );
    });

}

// function verifierPanierUtilisateur() {
//     fetch(
//             "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getPanier.php", {
//                 method: "POST",

//                 body: new URLSearchParams({
//                     id_us: cookieValue,
//                 }),
//             }
//         )
//         .then((reponse) => reponse.json())
//         .then((data) => {
//             console.log(data.data);
//         });
// }

AfficherProd();
// verifierPanierUtilisateur();
