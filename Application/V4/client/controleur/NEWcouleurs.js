import { filtrePoduits } from './NEWfiltres.js';

async function fetchCouleurs() {
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

export async function fetchCouleursByIdProduit(idProduit) {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCouleur.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id_produit=${idProduit}`
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des couleurs');
        }

        const data = await response.json();
        return data.status === 'success' ? data.data : [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

function remplirFiltreCouleurs(couleurs) {
    const containers = ['#dropdownColor ul', '#dropdownColorMobile ul'];

    containers.forEach(selector => {
        const colorContainer = document.querySelector(selector);
        if (!colorContainer) return;

        colorContainer.innerHTML = '';

        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid', 'grid-cols-2', 'gap-2');

        couleurs.forEach(couleur => {
            const listItem = document.createElement('div');
            listItem.classList.add('flex', 'items-center', 'gap-2');
            
            listItem.innerHTML = `
                <div class="flex items-center">
                    <input id="color-${couleur.id_couleur}" type="checkbox" class="cursor-pointer w-4 h-4" data-color="${couleur.id_couleur}" />
                    <label for="color-${couleur.id_couleur}" class="ms-2 text-sm">${couleur.couleur}</label>
                </div>
            `;
            gridContainer.appendChild(listItem);
        });
        
        colorContainer.appendChild(gridContainer);
    });

    document.querySelectorAll('#dropdownColor input[type="checkbox"], #dropdownColorMobile input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filtrePoduits);
    });
}


fetchCouleurs();
