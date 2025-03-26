import { codeHexaCouleurs } from "./listCouleurs.js"
import { fetchCouleursByIdProduit } from "./NEWcouleurs.js"

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id_produit: params.get('id_produit'),
        id_couleur: params.get('id_couleur')
    };
}

const { id_produit, id_couleur } = getQueryParams();

async function fetchProduitDetails(id_produit, id_couleur) {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getGenericProduit.php', {
            method: "POST",
                body: new URLSearchParams({
                    id_produit: id_produit,
                    id_couleur: id_couleur
                }),
        });

        const resultat = await response.json();
        
        if (!resultat || resultat.error) {
            console.error("Erreur lors de la récupération des données :", resultat.error);
            return null;
        }
                
        return resultat.data[0];
    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        return null;
    }
}


async function afficherProduit() {
    const produit = await fetchProduitDetails(id_produit, id_couleur);
    const couleurs = await fetchCouleursByIdProduit(id_produit);

    if (!produit) {
        console.error("Produit non trouvé");
        return;
    }

    document.getElementById("titre").textContent = produit.nom_produit;
    document.querySelector(".text-2xl").textContent = `${produit.prix} €`;
    document.querySelector("p.text-gray-500").textContent = produit.description;
    document.getElementById("grande_img").src = `../serveur/img/articles/${produit.path_img}`;
    
    const couleursContainer = document.getElementById("couleurs_produits");
    couleursContainer.innerHTML = "";

    couleurs.forEach(({ id_couleur, couleur }) => {
        const hexa = codeHexaCouleurs.get(id_couleur)?.hex || "#000000";
        const isActive = id_couleur == id_couleur ? "border-4 border-black" : "border-gray-200";

        const button = document.createElement("button");
        button.className = `cursor-pointer p-2.5 border rounded-full transition-all duration-300 hover:border-gray-500 ${isActive}`;
        button.innerHTML = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="${hexa}" /></svg>`;
        button.addEventListener("click", () => {
            window.location.search = `?id_produit=${id_produit}&id_couleur=${id_couleur}`;
        });

        couleursContainer.appendChild(button);
    });
}

afficherProduit();

