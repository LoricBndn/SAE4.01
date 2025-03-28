import { filtreProduits } from './NEWproduits.js';

async function fetchCategories() {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCategories.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }

        const data = await response.json();

        if (data.status === 'success') {
            remplirFiltreCategories(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function remplirFiltreCategories(categories) {
    const containers = ['#dropdownCategory ul', '#dropdownCategoryMobile ul'];

    containers.forEach(selector => {
        const categoryContainer = document.querySelector(selector);
        if (!categoryContainer) return;

        categoryContainer.innerHTML = '';

        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="flex items-center">
                    <input id="category-${category.id_categorie}" type="checkbox" class="cursor-pointer w-4 h-4" data-category="${category.id_categorie}" />
                    <label for="category-${category.id_categorie}" class="ms-2 text-sm">${category.nom_categorie}</label>
                </div>
            `;
            categoryContainer.appendChild(listItem);
        });
    });

    document.querySelectorAll('#dropdownCategory input[type="checkbox"], #dropdownCategoryMobile input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filtreProduits);
    });
}


fetchCategories();
