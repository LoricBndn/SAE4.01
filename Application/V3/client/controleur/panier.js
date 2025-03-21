import { cookieValue } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'login.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}

async function getPanier(id_us) {
    return await fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/getPanier.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: id_us,
            }),
        })
        //.then(reponse => console.log(reponse.json()))
        .then(reponse => reponse.json());
}

async function getProduit(id_produit) {
    return await fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/getProduit.php", {
        method: "POST",
        body: new URLSearchParams({
            id_prod: id_produit,
        }),
    });
}

function findId(id, array) {
    let test = null;
    array.forEach((element) => {
        if (element.id == id) {
            test = element;
        }
    });
    return test;
}

function delButton(id) {

    const test = findId(id, document.querySelectorAll(".del"))
        //console.log(test)

    test.addEventListener("click", (e) => {
        const id_prod = e.target.id.split("|")[0];
        const id_col = e.target.id.split("|")[1];
        const id_tail = e.target.id.split("|")[2];
        // console.log(e.target.id)
        // console.log(id_prod, id_col, id_tail);
        fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/delPanier.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: id_us,
                id_prod: id_prod,
                id_col: id_col,
                id_tail: id_tail,
            }),
        }).then((response) => {
            response.json().then((json) => {
                if (json.status !== "success") {
                    console.log("suppression échouée");
                    return;
                }
                console.log("suppression réussie");
                appelPanier();
            });
        });
    });
}

function autoUpdatePanier(id) {
    const id_prod = id.split("|")[0];
    const id_col = id.split("|")[1];
    const id_tail = id.split("|")[2];

    const inputQuantite = document.getElementById(id);
    const selectCouleur = document.getElementById(`couleur${id}`);
    const selectTaille = document.getElementById(`taille${id}`);

    function updatePanier() {
        const qte_pan = inputQuantite.value;
        let new_id_col = selectCouleur ? selectCouleur.options[selectCouleur.selectedIndex].id : id_col;
        let new_id_tail = selectTaille ? selectTaille.options[selectTaille.selectedIndex].id : id_tail;

        fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/setPanier.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: id_us,
                id_prod: id_prod,
                id_col: id_col,
                id_tail: id_tail,
                qte_pan: qte_pan,
                new_id_col: new_id_col,
                new_id_tail: new_id_tail,
            }),
        }).then(response => response.json()).then(json => {
            if (json.status !== "success") {
                console.log("Mise à jour échouée");
                appelPanier();
                return;
            }
            console.log("Mise à jour réussie");
        });
    }

    // Écoute les changements et met à jour automatiquement
    inputQuantite.addEventListener("change", updatePanier);
    if (selectCouleur) selectCouleur.addEventListener("change", updatePanier);
    if (selectTaille) selectTaille.addEventListener("change", updatePanier);
}


function rempliSelect(select, array, arrayId, def) {
    array = array.filter((value, index) => array.indexOf(value) === index);
    arrayId = arrayId.filter((value, index) => arrayId.indexOf(value) === index);
    array.forEach((element) => {
        const option = document.createElement("option");
        option.id = arrayId[array.indexOf(element)];
        if (element == def) {
            option.selected = true;
        }
        option.value = element;
        option.innerHTML = element;
        select.appendChild(option);
    });
}

function casNulltaill(id, panier) {
    if (panier === 17) {
        return ""
    }
    return `<select  id="taille${id}"></select>`
}

function affichePanier(panier, qte, taille, couleur, couleurId, tailleId) {
    const prix = document.getElementById("prixTotal");
    const panierDiv = document.createElement("div");
    panierDiv.classList.add("panierElement");
    const id = `${panier.id_prod}|${panier.id_col}|${panier.id_tail}`
        //console.log(panier)
    panierDiv.innerHTML = `

        <center><img id="img${id}" src="https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/img/articles/${panier.path_img}" alt="image du produit"></center>
        <p>${panier.nom_prod}</p>
        <div id="select">
            <select  id="couleur${id}"></select>
            ${casNulltaill(id, panier.id_tail)}
        </div> 
        <center>
            <div id="input_qte">Quantité : <input class="qte" id="${id}" type="number" value="${qte}"></div>
            <p id="prix">Prix : ${Math.round(panier.prix_unit * qte * 100) / 100}€</p>
            <div id="button">
                <button class="del form_button" id="${id}">Supprimer</button>
            </div>
        </center>
        `;
    document.getElementById("panier").appendChild(panierDiv);

    delButton(id);
    autoUpdatePanier(id);
    rempliSelect(document.getElementById(`couleur${id}`), couleur, couleurId, panier.nom_col);
    panier.id_tail !== 17 ? rempliSelect(document.getElementById(`taille${id}`), taille, tailleId, panier.nom_tail) : casNulltaill(id, panier.id_tail);
    prix.innerHTML = (Math.round((parseFloat(prix.innerHTML) + panier.prix_unit * qte) * 100) / 100);
    document.getElementById(`couleur${id}`).addEventListener("change", (e) => {
        getProduit(panier.id_prod).then((response) => {
            response.json().then(BDDproduit => {
                BDDproduit.data.forEach((element) => {
                    if (element.nom_col === e.target.value) {
                        document.getElementById(`img${id}`).src = `https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/img/articles/${element.path_img}`
                    }
                })
            })
        });
    });
}

async function appelPanier() {
    document.getElementById("panier").innerHTML = "";
    document.getElementById("prixTotal").innerHTML = 0;
    getPanier(id_us).then((panier) => {
        if (panier.data.length !== 0) {
            document.getElementById("footer").style.display = "block";
        } else {
            document.getElementById("footer").style.display = "none";
            const section = document.createElement("section");
            section.classList.add("accueil");
            const rien = document.createElement("h1");
            rien.innerHTML = "Votre panier est vide";
            section.appendChild(rien);
            document.getElementById("panier").appendChild(section);
            document.getElementById("panier").id = "accueil";
        }
        panier.data.forEach((produit) => {

            getProduit(produit.id_prod).then((response) => {
                let couleur = [];
                let couleurId = [];
                let taille = [];
                let tailleId = [];

                response.json().then((BDDproduits) => {

                    BDDproduits.data.forEach((BDDproduit) => {

                        if (BDDproduit.id_prod == produit.id_prod) {
                            couleur.push(BDDproduit.nom_col);
                            taille.push(BDDproduit.nom_tail);
                            couleurId.push(BDDproduit.id_col);
                            tailleId.push(BDDproduit.id_tail);
                        }
                    });
                    BDDproduits.data.forEach((BDDproduit) => {
                        if (BDDproduit.id_col == produit.id_col && BDDproduit.id_tail == produit.id_tail) {
                            affichePanier(BDDproduit, produit.qte_pan, taille, couleur, couleurId, tailleId);
                        }
                    });
                });
            });
        });
    })
}

document.getElementById("clear").addEventListener("click", () => {
    fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/clearPanier.php", {
        method: "POST",
        body: new URLSearchParams({
            id_us: id_us,
        }),
    }).then((response) => {
        response.json().then((data) => {
            if (data.status == "success") {
                console.log("suppression réussie");
                appelPanier();
            } else {
                console.log("suppression échouée");
            }
        });
    });
});

document.getElementById("payer").addEventListener("click", () => {
    fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/payer.php", {
        method: "POST",
        body: new URLSearchParams({
            id_us: id_us,
        }),
    }).then((reponse) => {
        reponse.json().then((data) => {
            if (data.status == "success") {
                console.log("paiement réussi");
                fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/clearPanier.php", {
                    method: "POST",
                    body: new URLSearchParams({
                        id_us: id_us,
                    }),
                }).then((response) => {
                    response.json().then((data) => {
                        if (data.status == "success") {
                            console.log("suppression réussie");
                            appelPanier();
                            window.location.href = "accueil.html";
                        } else {
                            console.log("suppression échouée");
                        }
                    });
                });

            } else {
                console.log("paiement échoué");
            }
        })
    });

});

const id_us = cookieValue; // A changer en cookieValue

appelPanier()