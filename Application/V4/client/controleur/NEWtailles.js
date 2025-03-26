import { filtrePoduits } from './NEWfiltres.js';

async function fetchTailles() {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getTailles.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tailles');
        }

        const data = await response.json();

        if (data.status === 'success') {
            afficherLesTailles(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function afficherLesTailles(tailles) {
    const containers = ['#dropdownSize ul', '#dropdownSizeMobile ul'];

    containers.forEach(selector => {
        const sizeContainer = document.querySelector(selector);
        if (!sizeContainer) return; 

        sizeContainer.innerHTML = '';

        tailles.forEach(taille => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="flex items-center">
                    <input id="color-${taille.id_taille}" type="checkbox" class="cursor-pointer w-4 h-4" data-color="${taille.id_taille}" />
                    <label for="color-${taille.id_taille}" class="ms-2 text-sm">${taille.taille}</label>
                </div>
            `;
            sizeContainer.appendChild(listItem);
        });
    });

    document.querySelectorAll('#dropdownSize input[type="checkbox"], #dropdownSizeMobile input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filtrePoduits);
    });
}

fetchTailles();
