let currentPage = 1;
const itemsPerPage = 5; // Affiche 5 commandes par page
let commandesData = []; // Contiendra toutes les commandes

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

async function fetchCommandes() {
    try {
        const userId = getUserIdFromCookie();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCommandes.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commandes');
        }

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
            commandesData = data.data;
            displayCommandes(currentPage);
            displayPagination();
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function displayCommandes(page) {
    const commandesContainer = document.querySelector('#commandesContainer');
    commandesContainer.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const pageCommandes = commandesData.slice(startIndex, endIndex);

    if (pageCommandes.length > 0) {
        pageCommandes.forEach(commande => {
            const commandeElement = document.createElement('div');
            commandeElement.classList.add('flex', 'flex-wrap', 'items-center', 'gap-y-4', 'py-6');
            commandeElement.innerHTML = `
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500">Commande ID:</dt>
                    <dd class="mt-1.5 text-base font-semibold ">
                        <a href="./historique_detail.html" class="hover:underline">${commande.id_commande}</a>
                    </dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500">Date:</dt>
                    <dd class="mt-1.5 text-base font-semibold ">${formatDate(commande.date_commande)}</dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500">Prix:</dt>
                    <dd class="mt-1.5 text-base font-semibold ">${commande.total}€</dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500">Status:</dt>
                    ${getStatusBadge(commande.statut)}
                </dl>

                <div class="w-full grid lg:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <a href="./historique_detail.html?id_commande=${commande.id_commande}" class="w-full inline-flex justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-primary-700 md:w-auto">Voir en détails</a>
                </div>
            `;
            commandesContainer.appendChild(commandeElement);
        });
    } else {
        commandesContainer.innerHTML = '<p>Vous n\'avez pas encore passé de commande.</p>';
    }
}

function displayPagination() {
    const paginationContainer = document.querySelector('#paginationContainer');
    paginationContainer.innerHTML = ''; // Vider la pagination avant de la générer

    const totalPages = Math.ceil(commandesData.length / itemsPerPage);

    // Si aucune commande, ne pas afficher la pagination
    if (totalPages === 0 || totalPages === 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    // Bouton "Previous"
    const prevButton = document.createElement('li');
    prevButton.innerHTML = `
        <a href="#" class="flex h-8 items-center justify-center rounded-s-lg bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Previous</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
            </svg>
        </a>
    `;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCommandes(currentPage);
            displayPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Pages
    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('li');
        pageButton.innerHTML = `
            <a href="#" class="flex h-8 items-center justify-center bCommande bCommande-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">${page}</a>
        `;
        if (page === currentPage) {
            pageButton.querySelector('a').classList.add('bg-primary-50', 'text-primary-600', 'hover:bg-primary-100');
        }
        pageButton.addEventListener('click', () => {
            currentPage = page;
            displayCommandes(currentPage);
            displayPagination();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Bouton "Next"
    const nextButton = document.createElement('li');
    nextButton.innerHTML = `
        <a href="#" class="flex h-8 items-center justify-center rounded-e-lg bCommande bCommande-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Next</span>
            <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
            </svg>
        </a>
    `;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCommandes(currentPage);
            displayPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
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

fetchCommandes();