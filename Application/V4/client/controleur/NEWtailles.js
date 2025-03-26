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
    const taillesContainer = document.querySelector('#dropdownSize');
    taillesContainer.innerHTML = '';

    tailles.forEach(taille => {
        const tailleElement = document.createElement('div');
        tailleElement.classList.add('flex', 'items-center', 'gap-2');

        tailleElement.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" id="taille-${taille.id_taille}" data-size="${taille.id_taille}" class="taille-checkbox">
            <label for="taille-${taille.id_taille}" class="text-sm text-gray-700">${taille.taille}</label>
        </div>
        `;

        taillesContainer.appendChild(tailleElement);
    });

    document.querySelectorAll('.taille-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', filtrePoduits);
    });
}

fetchTailles();

