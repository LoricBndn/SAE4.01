import { fetchTaillesByIdProduit } from './NEWtailles.js';
import { fetchCouleursByIdProduit } from './NEWcouleurs.js';

async function fetchArticles() {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getGenericProduits.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des articles');
        }

        const data = await response.json();

        if (data.status === 'success') {
            const articlesAvecDetails = await Promise.all(
                data.data.map(async (article) => {
                    const tailles = await fetchTaillesByIdProduit(article.id_produit);
                    return { ...article, tailles };
                })
            );

            console.log(articlesAvecDetails);
            
            afficherLesProduits(articlesAvecDetails);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}


function afficherLesProduits(articles) {
    const productsContainer = document.querySelector('#products-container'); 
    productsContainer.innerHTML = ''; 

    articles.forEach(article => {
        const articleElement = document.createElement('a');
        
        const url = `detail_produit.html?id_produit=${article.id_produit}&id_couleur=${article.id_couleur}`;
        articleElement.href = url;

        articleElement.classList.add('group');
        articleElement.setAttribute('data-category', article.id_categorie); 
        articleElement.setAttribute('data-color', JSON.stringify(article.couleurs)); 
        articleElement.setAttribute('data-size', JSON.stringify(article.tailles));

        articleElement.innerHTML = `
            <img
                width="24" max-height="24"
                src="../serveur/img/articles/${article.path_img}"
                alt="${article.nom_produit}"
                class="w-full lg:h-55 rounded-lg bg-gray-200 object-cover lg:object-fill group-hover:opacity-75"
            />
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="mt-4 text-sm text-gray-700">${article.nom_produit}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">${article.prix} €</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
            </div>
        `;

        productsContainer.appendChild(articleElement);
    });
}


fetchArticles();
