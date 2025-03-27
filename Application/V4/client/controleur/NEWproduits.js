import { fetchTaillesByIdProduit } from "./NEWtailles.js";

let currentPage = 1;
const itemsPerPage = 20;
let allArticles = [];
let favoris = [];
const userId = getUserIdFromCookie();

function getUserIdFromCookie() {
  const name = "id_user=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length); // Retourne l'ID utilisateur
    }
  }
  return null; // Retourne null si l'ID utilisateur n'est pas trouvé
}

async function fetchFavoris() {
  try {
    if (!userId) {
      console.error(
        "Utilisateur non authentifié ou ID utilisateur introuvable"
      );
      return;
    }

    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getFavoris.php",
      {
        method: "POST",
        body: new URLSearchParams({
          id_user: userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des produits des favoris"
      );
    }

    const data = await response.json();

    if (data.status === "success") {
      favoris = data.data.map((fav) => fav.id_detail_prod);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

async function fetchArticles() {
  await fetchFavoris();

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
          return {
            ...article,
            tailles,
            favori: userId ? favoris.includes(article.id_detail_prod) : false,
          };
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

function displayProducts(page, articles = allArticles) {
  const productsContainer = document.querySelector("#products-container");
  productsContainer.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const pageArticles = articles.slice(startIndex, endIndex);

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
                        <h3 class="mt-4 text-sm text-gray-700">${
                          article.nom_produit
                        }</h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">${
                          article.prix
                        } €</p>
                    </div>
                    ${
                      userId
                        ? `
                <div class="cursor-pointer favorite-icon" data-id="${
                  article.id_detail_prod
                }" title="${
                            article.favori
                              ? "Retirer des favoris"
                              : "Ajouter au favori"
                          }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="${
                          article.favori ? "red" : "none"
                        }" stroke="currentColor" stroke-width="${
                            article.favori ? "0" : "1"
                          }" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-heart heartIcon">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>
                    `
                        : ""
                    }
                </div>
            `;

      productsContainer.appendChild(articleElement);
    });
    if (userId) {
      document.querySelectorAll(".favorite-icon").forEach((icon) => {
        icon.addEventListener("click", async (event) => {
          event.preventDefault();
          const heartIcon = icon.querySelector(".heartIcon");
          const detailProdId = icon.dataset.id;

          if (heartIcon.getAttribute("fill") === "red") {
            await delProduit(detailProdId);
            heartIcon.setAttribute("fill", "none");
            heartIcon.setAttribute("stroke-width", "1");
            icon.setAttribute("title", "Ajouter au favori");
          } else {
            await newFavori(detailProdId);
            heartIcon.setAttribute("fill", "red");
            heartIcon.setAttribute("stroke-width", "0");
            icon.setAttribute("title", "Retirer des favoris");
          }
        });
      });
    }
  } else {
    productsContainer.innerHTML = "<p>Aucun produit disponible.</p>";
  }
}

export function filtreProduits() {
    const searchInput = document
    .getElementById("default-search")
    .value.trim()
    .toLowerCase();

  // Appliquer les filtres
  const selectedCategories = Array.from(
    document.querySelectorAll(
      '#dropdownCategory input[type="checkbox"]:checked, #dropdownCategoryMobile input[type="checkbox"]:checked'
    )
  ).map((checkbox) => checkbox.getAttribute("data-category"));

  const selectedColors = Array.from(
    document.querySelectorAll(
      '#dropdownColor input[type="checkbox"]:checked, #dropdownColorMobile input[type="checkbox"]:checked'
    )
  ).map((checkbox) => checkbox.getAttribute("data-color"));

  const selectedSizes = Array.from(
    document.querySelectorAll(
      '#dropdownSize input[type="checkbox"]:checked, #dropdownSizeMobile input[type="checkbox"]:checked'
    )
  ).map((checkbox) => checkbox.getAttribute("data-size"));

  // Filtrer les articles en fonction des filtres
  let filteredArticles = allArticles.filter((article) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(String(article.id_categorie));
    const colorMatch =
      selectedColors.length === 0 ||
      selectedColors.includes(String(article.id_couleur));
    const sizeMatch =
      selectedSizes.length === 0 ||
      article.tailles.some((size) =>
        selectedSizes.includes(String(size.id_taille))
      );

    return categoryMatch && colorMatch && sizeMatch;
  });

  // Appliquer la recherche sur les articles filtrés
  filteredArticles = filteredArticles.filter((article) => {
    const articleName = article.nom_produit.toLowerCase();
    return articleName.includes(searchInput);
  });

  currentPage = 1;
  displayProducts(currentPage, filteredArticles);
  displayPagination(filteredArticles);
}

document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", filtreProduits);
  });
  
  const rechercher = document.getElementById("default-search");
  if (rechercher) rechercher.addEventListener("input", filtreProduits);

document.addEventListener("DOMContentLoaded", () => {
  const openFilterModal = document.getElementById("openFilterModal");
  const closeFilterModal = document.getElementById("closeFilterModal");
  const filterModal = document.getElementById("filterModal");

  if (openFilterModal && closeFilterModal && filterModal) {
    openFilterModal.addEventListener("click", () => {
      filterModal.classList.remove("hidden");
      filterModal.classList.add("flex");
    });

    closeFilterModal.addEventListener("click", () => {
      filterModal.classList.add("hidden");
      filterModal.classList.remove("flex");
    });

    filterModal.addEventListener("click", (event) => {
      if (event.target === filterModal) {
        filterModal.classList.add("hidden");
        filterModal.classList.remove("flex");
      }
    });
  }
});

function displayPagination(filteredArticles = allArticles) {
  const paginationContainer = document.querySelector("#pagination-container");
  paginationContainer.innerHTML = "";

  if (filteredArticles.length <= itemsPerPage) {
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "flex";
  }

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  if (totalPages === 0) return;

  const prevButton = document.createElement("li");
  prevButton.innerHTML = `
        <a href="#products" class="flex h-8 items-center justify-center rounded-s-lg bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Précédent</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
            </svg>
        </a>
    `;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(currentPage, filteredArticles);
      displayPagination(filteredArticles);
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("li");
    pageButton.innerHTML = `
            <a href="#products" class="flex h-8 items-center justify-center bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">${page}</a>
        `;
    if (page === currentPage) {
      pageButton
        .querySelector("a")
        .classList.add(
          "bg-primary-50",
          "text-primary-600",
          "hover:bg-primary-100"
        );
    }
    pageButton.addEventListener("click", () => {
      currentPage = page;
      displayProducts(currentPage, filteredArticles);
      displayPagination(filteredArticles);
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("li");
  nextButton.innerHTML = `
        <a href="#products" class="flex h-8 items-center justify-center rounded-e-lg bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Suivant</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
            </svg>
        </a>
    `;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(currentPage, filteredArticles);
      displayPagination(filteredArticles);
    }
  });
  paginationContainer.appendChild(nextButton);
}

async function delProduit(detailProdId) {
  try {
    const userId = getUserIdFromCookie();
    if (!userId) {
      console.error(
        "Utilisateur non authentifié ou ID utilisateur introuvable"
      );
      return;
    }

    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/delFavori.php",
      {
        method: "POST",
        body: new URLSearchParams({
          id_user: userId,
          id_detail_prod: detailProdId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }

    const data = await response.json();

    if (data.status === "success") {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

async function newFavori(detailProdId) {
  try {
    const userId = getUserIdFromCookie();
    if (!userId) {
      console.error(
        "Utilisateur non authentifié ou ID utilisateur introuvable"
      );
      return;
    }

    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/newFavori.php",
      {
        method: "POST",
        body: new URLSearchParams({
          id_user: userId,
          id_detail_prod: detailProdId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout d'un favori");
    }

    const data = await response.json();

    if (data.status === "success") {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

if (window.location.pathname.includes("accueil")) {
  fetchArticles();
}
