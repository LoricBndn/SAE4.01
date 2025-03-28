import { userId } from "./function.js";

async function fetchProduits() {
    try {
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getFavoris.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits des favoris');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            displayProduits(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function displayProduits(produits) {
    const produitsContainer = document.querySelector('#produitsContainer'); 
    produitsContainer.innerHTML = ''; 

    for (const produit of produits) {
        const produitElement = document.createElement('a');
        produitElement.href = `detail_produit.html?id_produit=${produit.id_produit}&id_couleur=${produit.id_couleur}`;
        produitElement.classList.add('group');
                
        produitElement.innerHTML = `
            <img src="https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/img/articles/${produit.path_img}" 
                alt="${produit.nom_produit}" 
                class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75" />
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="mt-4 text-sm text-gray-700">${produit.nom_produit}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">${produit.prix}€</p>
                </div>
                <div class="cursor-pointer favorite-icon" data-id="${produit.id_detail_prod}" title="Retirer des favoris">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="red" stroke="currentColor" stroke-width="0" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-heart heartIcon">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>
            </div>
        `;
        produitsContainer.appendChild(produitElement);
    }

    document.querySelectorAll('.favorite-icon').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            event.preventDefault();
            const heartIcon = icon.querySelector('.heartIcon');
            const detailProdId = icon.dataset.id;

            if (heartIcon.getAttribute("fill") === "red") {
                await delProduit(detailProdId);
                fetchProduits();
            } 
        });
    });

    document.querySelector('#deleteButton').addEventListener('click', async () => { 
        clearFavori();
        fetchProduits();
    });
}

async function delProduit(detailProdId) {
    try {
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/delFavori.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                    id_detail_prod: detailProdId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function clearFavori() {
    try {
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/clearFavori.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression des favoris');
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

fetchProduits();