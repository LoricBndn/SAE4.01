import { filtrePoduits } from './NEWfiltres.js';

async function fetchColors() {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCouleurs.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des couleurs');
        }

        const data = await response.json();

        if (data.status === 'success') {
            remplirFiltreCouleurs(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function remplirFiltreCouleurs(couleurs) {
    const containers = ['#dropdownColor ul', '#dropdownColorMobile ul'];

    containers.forEach(selector => {
        const colorContainer = document.querySelector(selector);
        if (!colorContainer) return;

        colorContainer.innerHTML = '';

        couleurs.forEach(couleur => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="flex items-center">
                    <input id="color-${couleur.id_couleur}" type="checkbox" class="cursor-pointer w-4 h-4" data-color="${couleur.id_couleur}" />
                    <label for="color-${couleur.id_couleur}" class="ms-2 text-sm">${couleur.couleur}</label>
                </div>
            `;
            colorContainer.appendChild(listItem);
        });
    });

    document.querySelectorAll('#dropdownColor input[type="checkbox"], #dropdownColorMobile input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filtrePoduits);
    });
}


fetchColors();
