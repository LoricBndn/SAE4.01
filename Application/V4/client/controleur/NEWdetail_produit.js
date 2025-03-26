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

        const data = await response.json();
        
        if (!data || data.error) {
            console.error("Erreur lors de la récupération des données :", data.error);
            return null;
        }
                
        return data;
    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        return null;
    }
}


async function afficherProduit() {
    const resultat = await fetchProduitDetails(id_produit, id_couleur);

    if (!resultat) {
        console.error("Produit non trouvé");
        return;
    }

    const produit = resultat.data[0];
    
    document.getElementById("titre").textContent = produit.nom_produit;
    document.querySelector(".text-2xl").textContent = `${produit.prix} €`;
    document.querySelector("p.text-gray-500").textContent = produit.description;
    document.getElementById("grande_img").src = `../serveur/img/articles/${produit.path_img}`;
    document.querySelector("img").alt = produit.nom_produit;

}

afficherProduit();
