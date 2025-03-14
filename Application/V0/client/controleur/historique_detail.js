import { cookieValue } from "./function.js";

async function getCommande(id_com) { //Fonction qui récupère les données de la commande en fct de l'id de la commande & de l'id de l'utilisateur
    const body = new URLSearchParams({
        id_us: cookieValue, //Remplacer par 3 pour tester
        id_com: id_com,
    });
    const response = await fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCommande.php", { method: "POST", body });
    const { data } = await response.json();
    //console.log(data);
    return data;
}

// async function getProduit(id_prod) { //Fonction qui récupère les données du produit en fct de ceux que l'utilisateur a commandé
//     const body = new URLSearchParams({ 
//         id_prod: id_prod,
//      });
//     const response = await fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getProduit.php", { method: "POST", body });
//     const { data } = await response.json();
//     console.log("Data cmd :",data);
//     return data;
// }

async function recupDonnees() { //récupère les données de la commande et des produits commandés
    const id_com = new URLSearchParams(window.location.search).get('id_com');
    const commande = await getCommande(id_com);
    //const produits = await Promise.all(commande.map(({ id_prod }) => getProduit(id_prod))); //recupere les produits associés à la commande
    // console.log("Commande :",commande);
    // console.log("Produits :",produits);
    console.log("Commande :", commande);
    afficherLesProduits(commande);
}

function afficherLesProduits(produits) { //Fonction qui affiche les produits commandés avec leurs noms, catégories et descriptions, ajoute du meme css que sur la page d'accueil
    const produitsDiv = document.querySelector('.produits');
    produits.forEach(({ nom_prod, description, path_img, prix_unit, qte_com }) => {
        // console.log("Path :",path_img);
        const produitDiv = document.createElement('div');
        produitDiv.classList.add('produit');
        let path = path_img ? "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/img/articles/" + path_img : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
        let prix = prix_unit * qte_com;

        produitDiv.innerHTML = `
            <h2>${nom_prod}</h2>
            <img id="img_prod" src="${path}" style="width:auto; height:250px; display:block; margin: 10px auto;">
            <p>${description}</p>
            <p>Prix : ${prix}€</p><p>Quantité : ${qte_com}</p>
        `;
        produitDiv.classList.add("descProduit")
        produitsDiv.appendChild(produitDiv);
    });
}

recupDonnees();