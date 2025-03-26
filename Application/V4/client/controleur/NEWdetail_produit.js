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
            method: 'POST',
            body: JSON.stringify({
                id_produit: id_produit,
                id_couleur: id_couleur
            })
        });

        const data = await response.json();
        
        if (!data || data.error) {
            console.error("Erreur lors de la récupération des données :", data.error);
            return null;
        }
        
        console.log(data);
        
        return data;
    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        return null;
    }
}


async function afficherProduit() {
    const produit = await fetchProduitDetails(id_produit, id_couleur);

    if (!produit) {
        console.error("Produit non trouvé");
        return;
    }

    document.querySelector("h2").textContent = produit.nom_produit;
    document.querySelector(".text-2xl").textContent = `${produit.prix} €`;
    document.querySelector("p.text-gray-500").textContent = produit.description;
    document.querySelector("img").src = `../serveur/img/articles/${produit.path_img}`;
    document.querySelector("img").alt = produit.nom_produit;

    const couleursContainer = document.querySelector(".flex.items-center.justify-start.gap-3");
    couleursContainer.innerHTML = ""; // Efface l'ancien contenu

    produit.couleurs.forEach(couleur => {
        const boutonCouleur = document.createElement("button");
        boutonCouleur.classList.add("cursor-pointer", "p-2.5", "border", "border-gray-200", "rounded-full", "transition-all", "duration-300", "hover:border-emerald-500");
        boutonCouleur.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="${couleur.id_couleur === "2" ? "#F43F5E" : "#FBBF24"}" />
            </svg>
        `;
        boutonCouleur.addEventListener("click", () => {
            window.location.href = `detail_produit.html?id_produit=${produit.id_produit}&id_couleur=${couleur.id_couleur}`;
        });
        couleursContainer.appendChild(boutonCouleur);
    });

    const taillesContainer = document.querySelector(".grid.grid-cols-2.min-\\[400px\\]\\:grid-cols-3.gap-3");
    taillesContainer.innerHTML = "";

    produit.tailles.forEach(taille => {
        const boutonTaille = document.createElement("button");
        boutonTaille.classList.add("cursor-pointer", "border", "border-gray-200", "text-gray-900", "text-lg", "py-2", "rounded-full", "px-1.5", "sm:px-6", "w-full", "font-semibold", "whitespace-nowrap", "shadow-sm", "shadow-transparent", "transition-all", "duration-300", "hover:shadow-gray-300", "hover:bg-gray-50", "hover:border-gray-300");
        boutonTaille.textContent = taille;
        taillesContainer.appendChild(boutonTaille);
    });
}

afficherProduit();
