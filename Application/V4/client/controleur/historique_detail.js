function getUserIdFromCookie() {
    const name = "id_user=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length); // Retourne l'ID utilisateur
        }
    }
    return null; // Retourne null si l'ID utilisateur n'est pas trouvé
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id_commande");
}

async function fetchProduits() {
    try {
        const userId = getUserIdFromCookie();
        const commandeId = getQueryParams();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCommande.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                    id_commande: commandeId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits de la commande');
        }

        const data = await response.json();

        if (data.status === 'success') {
            displayProduits(data.data);
            displayCommande(data.data);
            displayPrix(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function displayCommande(commandes) {
    const commandeContainer = document.querySelector('#commandeContainer'); 
    commandeContainer.innerHTML = ''; 
    
    const commandeElement = document.createElement('div');
    commandeElement.classList.add('data');

    commandeElement.innerHTML = `
        <p class="font-semibold text-base leading-7 text-black">ID Commande : <span class="font-medium">${commandes[0].id_commande}</span></p>
        <p class="font-semibold text-base leading-7 text-black mt-4">Date de commande : <span class="text-gray-400 font-medium">${formatDate(commandes[0].date_commande)}</span></p>
        <dl class="font-semibold text-base leading-7 text-black mt-4">Statut : ${getStatusBadge(commandes[0].statut)}</dl>
    `;

    commandeContainer.appendChild(commandeElement);
}

function displayProduits(produits) {
    const productsContainer = document.querySelector('#produitsContainer'); 
    productsContainer.innerHTML = ''; 

    produits.forEach(produit => {
        const produitElement = document.createElement('div');
        produitElement.classList.add('flex', 'flex-col', 'lg:flex-row', 'items-center', 'py-6', 'border-b', 'border-gray-200', 'gap-6', 'w-full');

        produitElement.innerHTML = `
            <div class="img-box max-lg:w-full">
                <img src="https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/img/articles/${produit.path_img}" alt="${produit.nom_produit}" 
                    class=" w-full lg:max-w-[140px] rounded-sm object-cover">
            </div>
            <div class="flex flex-row items-center w-full ">
                <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div class="flex items-center">
                        <div class="">
                            <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                                ${produit.nom_produit}
                            <p class="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                ${produit.nom_categorie}</p>
                            <div class="flex items-center ">
                                <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Couleur : <span class="text-gray-500">${produit.couleur}</span>
                                </p>
                                <p class="font-medium text-base leading-7 text-black ">
                                    Taille : <span class="text-gray-500">${produit.taille}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-5">
                        <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm leading-7 text-black">Prix Unitaire</p>
                                <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">${produit.prix}€</p>
                            </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                            <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm leading-7 text-black">Quantité
                                </p>
                                <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                    ${produit.quantite}</p>
                            </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Prix Total</p>
                                <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    ${produit.prix_total}€</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productsContainer.appendChild(produitElement);
    });
}

function displayPrix(commandes) {
    const prixContainer = document.querySelector('#prixContainer'); 
    prixContainer.innerHTML = ''; 
    
    const prixElement = document.createElement('div');
    prixElement.classList.add('flex', 'flex-col', 'sm:flex-row', 'items-center', 'max-lg:border-b', 'border-gray-200');

    prixElement.innerHTML = `
        <p class="font-semibold text-lg text-black py-6">Prix total de la commande : 
            <span class="text-indigo-600">${commandes[0].total}€</span>
        </p>
    `;

    prixContainer.appendChild(prixElement);
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
}

function getStatusBadge(status) {
    let badge = '';
    
    switch (status) {
        case 'En attente':
            badge = `
                <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                    <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                    </svg>
                    En attente
                </dd>
            `;
            break;

        case 'En cours':
            badge = `
                <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    En cours
                </dd>
            `;
            break;

        case 'Expédiée':
            badge = `
                <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    <svg class="me-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000193" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-takeoff">
                        <path d="M2 22h20"/>
                        <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/>
                    </svg>
                    Expédiée
                </dd>
            `;
            break;

        case 'Livrée':
            badge = `
                <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                    Livrée
                </dd>
            `;
            break;

        case 'Annulée':
            badge = `
                <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Annulée
                </dd>
            `;
            break;

        default:
            badge = `<dd class="mt-1.5 text-base font-semibold text-gray-500">Statut inconnu</dd>`;
    }
    
    return badge;
}

fetchProduits();