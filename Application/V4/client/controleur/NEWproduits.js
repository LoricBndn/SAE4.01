import { fetchTaillesByIdProduit } from "./NEWtailles.js";

let currentPage = 1; 
const itemsPerPage = 20;
let allArticles = [];

async function fetchArticles() {
    try {
        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getGenericProduits.php"
        );
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        if (data.status === "success") {
            allArticles = await Promise.all(
                data.data.map(async (article) => {
                    const tailles = await fetchTaillesByIdProduit(article.id_produit);
                    return { ...article, tailles };
                })
            );
            displayProducts(currentPage);
            displayPagination();
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error("Erreur:", error);
    }
}

function displayProducts(page) {
    const productsContainer = document.querySelector("#products-container");
    productsContainer.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const pageArticles = allArticles.slice(startIndex, endIndex);

    if (pageArticles.length > 0) {
        pageArticles.forEach((article) => {
            const articleElement = document.createElement("a");
            articleElement.href = `detail_produit.html?id_produit=${article.id_produit}&id_couleur=${article.id_couleur}`;
            articleElement.classList.add("group");
            articleElement.setAttribute("data-category", article.id_categorie);
            articleElement.setAttribute("data-color", article.id_couleur);
            articleElement.setAttribute(
                "data-size",
                article.tailles.map((t) => t.id_taille).join(",")
            );

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
    } else {
        productsContainer.innerHTML = '<p>Aucun produit disponible.</p>';
    }
}

function displayPagination() {
    const paginationContainer = document.querySelector('#pagination-container');
    paginationContainer.innerHTML = ''; 

    const totalPages = Math.ceil(allArticles.length / itemsPerPage);

    if (totalPages === 0) {
        paginationContainer.style.display = 'none';
        return;
    }

    const prevButton = document.createElement('li');
    prevButton.innerHTML = `
        <a href="#" class="flex h-8 items-center justify-center rounded-s-lg bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Précédent</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
            </svg>
        </a>
    `;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentPage);
            displayPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('li');
        pageButton.innerHTML = `
            <a href="#" class="flex h-8 items-center justify-center bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">${page}</a>
        `;
        if (page === currentPage) {
            pageButton.querySelector('a').classList.add('bg-primary-50', 'text-primary-600', 'hover:bg-primary-100');
        }
        pageButton.addEventListener('click', () => {
            currentPage = page;
            displayProducts(currentPage);
            displayPagination();
        });
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.innerHTML = `
        <a href="#" class="flex h-8 items-center justify-center rounded-e-lg bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Suivant</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
            </svg>
        </a>
    `;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(currentPage);
            displayPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
}

fetchArticles();
