import { filtreProduits } from './NEWproduits.js';

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

export async function fetchTaillesByIdProduit(idProduit) {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getTaille.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id_produit=${idProduit}`
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tailles');
        }

        const data = await response.json();
        return data.status === 'success' ? data.data : [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

function afficherLesTailles(tailles) {
    const taillesContainer = document.querySelector('#dropdownSize');
    taillesContainer.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid', 'grid-cols-2', 'gap-2');
    
    tailles.forEach(taille => {
        const tailleElement = document.createElement('div');
        tailleElement.classList.add('flex', 'items-center', 'gap-2');

        tailleElement.innerHTML = `
        <div class="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="taille-${taille.id_taille}" 
                data-size="${taille.id_taille}" 
                class="taille-checkbox cursor-pointer w-4 h-4" 
            />
            <label for="taille-${taille.id_taille}" class="text-sm text-gray-700">${taille.taille}</label>
        </div>
        `;

        gridContainer.appendChild(tailleElement);
    });
    
    taillesContainer.appendChild(gridContainer);

    document.querySelectorAll('.taille-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', filtreProduits);
    });
}

fetchTailles();
