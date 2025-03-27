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


async function fetchProduits() {
    try {
        const userId = getUserIdFromCookie();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getPaniers.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits du panier');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            displayProduits(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function fetchCouleurs(produitId, couleurId) {
    try {
        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getCouleur.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_produit: produitId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des couleurs du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            const couleurSelect = document.createElement("select");
            couleurSelect.id = "couleurSelect";
            couleurSelect.classList.add('border', 'rounded-md', 'px-2', 'py-1', 'cursor-pointer')
            data.data.forEach(couleur => {
                const option = document.createElement("option");
                option.value = couleur.id_couleur;
                option.textContent = couleur.couleur;
    
                // Si c'est la couleur sélectionnée, on la marque comme "selected"
                if (couleur.id_couleur == couleurId) {
                    option.selected = true;
                }
    
                couleurSelect.appendChild(option);
            });
            return couleurSelect;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function fetchTailles(produitId, tailleId) {
    try {
        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getTaille.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_produit: produitId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tailles du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            const tailleSelect = document.createElement("select");
            tailleSelect.id = "tailleSelect";
            tailleSelect.classList.add('border', 'rounded-md', 'px-2', 'py-1', 'cursor-pointer')
            data.data.forEach(taille => {
                const option = document.createElement("option");
                option.value = taille.id_taille;
                option.textContent = taille.taille;
    
                // Si c'est la taille sélectionnée, on la marque comme "selected"
                if (taille.id_taille == tailleId) {
                    option.selected = true;
                }
    
                tailleSelect.appendChild(option);
            });
            return tailleSelect;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function displayProduits(produits) {
    const produitsContainer = document.querySelector('#produitsContainer'); 
    produitsContainer.innerHTML = ''; 
    produitsContainer.innerHTML = `
        <h2 class="font-semibold text-2xl leading-10 mb-8 sm:text-3xl text-black">
            Mon panier
        </h2>`;
    let total = 0;

    for (const produit of produits) {
        const produitElement = document.createElement('div');
        produitElement.classList.add('grid', 'grid-cols-1', 'lg:grid-cols-2', 'min-[550px]:gap-6', 'border-t', 'border-gray-200', 'py-6', 'relative');
                
        produitElement.innerHTML = `
            <button id="suppButton_${produit.id_detail_prod}" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div>
                    <img src="https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/img/articles/${produit.path_img}" alt="${produit.nom_produit}" class="xl:w-[140px] rounded-sm w-40 object-cover"/>
                </div>
                <div class=" w-full max-w-sm">
                    <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                        ${produit.nom_produit}
                    </h5>
                    <p class="font-normal text-sm leading-5 text-gray-500 max-[550px]:text-center max-[550px]:hidden">
                        ${produit.nom_categorie}
                    </p>
                </div>
            </div>

            <div class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <div class="flex items-center gap-2">
                    <div id="couleursContainer" class="flex justify-center items-center">
                        <!-- Ajout des couleurs en js -->
                    </div>
                    <div id="taillesContainer" class="flex justify-center items-center">
                        <!-- Ajout des tailles en js -->
                    </div>
                </div>
            </div>
            
            <div class="flex items-center w-full mx-auto justify-center">
              <button id="removeButton_${produit.id_detail_prod}" class="group rounded-l-full px-2 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round"/>
                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round"/>
                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
              <input type="text" class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[80px] min-w-[40px] placeholder:text-gray-900 py-[5px] text-center bg-transparent" placeholder="${produit.quantite}"/>
              <button id="addButton_${produit.id_detail_prod}" class="group rounded-r-full px-2 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round"/>
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round"/>
                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <h6 class="ffont-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                ${produit.prix_total}€
            </h6>
          </div>
        `;
        produitsContainer.appendChild(produitElement);
        total += parseFloat(produit.prix_total);

        const couleurSelectOption = await fetchCouleurs(produit.id_produit, produit.id_couleur);
        const tailleSelectOption = await fetchTailles(produit.id_produit, produit.id_taille);

        if (couleurSelectOption) {
            produitElement.querySelector('#couleursContainer').appendChild(couleurSelectOption);
        } 
        if (tailleSelectOption) {
            produitElement.querySelector('#taillesContainer').appendChild(tailleSelectOption);
        }

        const suppButtons = produitElement.querySelector(`#suppButton_${produit.id_detail_prod}`);
        const couleurSelect = produitElement.querySelector(`#couleurSelect`);
        const tailleSelect = produitElement.querySelector(`#tailleSelect`);
        const removeButton = produitElement.querySelector(`#removeButton_${produit.id_detail_prod}`);
        const addButton = produitElement.querySelector(`#addButton_${produit.id_detail_prod}`);
        
        if (suppButtons) {
            suppButtons.addEventListener('click', () => {
                delProduit(produit.id_detail_prod);
                fetchProduits();
            });
        }

        if (couleurSelect) {
            couleurSelect.addEventListener('change', async (e) => {
                const detail = await fetchDetailProduit(produit.id_produit, produit.id_taille,  e.target.value);
                if (detail) {
                    newPanier(detail[0].id_detail_prod, produit.quantite);
                    delProduit(produit.id_detail_prod);
                    fetchProduits();
                }
            });
        }

        if (tailleSelect) {
            tailleSelect.addEventListener('change', async (e) => {
                const detail = await fetchDetailProduit(produit.id_produit, e.target.value,  produit.id_couleur);
                if (detail) {
                    newPanier(detail[0].id_detail_prod, produit.quantite);
                    delProduit(produit.id_detail_prod);
                    fetchProduits();
                }
            });
        }

        if (removeButton) {
            removeButton.addEventListener('click', () => {
                updateQuantite(produit.quantite - 1, produit.id_detail_prod);
                fetchProduits();
            });
        }

        if (addButton) {
            addButton.addEventListener('click', () => {
                updateQuantite(produit.quantite + 1, produit.id_detail_prod);
                fetchProduits();
            });
        }

    };

    const prixContainer = document.createElement("div");
    prixContainer.classList.add('bg-gray-100', 'rounded-xl', 'p-6', 'w-80', 'mb-8', 'max-lg:max-w-xl', 'max-lg:mx-auto', 'ml-auto');
    prixContainer.innerHTML = `
        <div class="flex items-center justify-between w-full py-2">
            <p class="font-medium text-2xl leading-9 text-gray-900">
              Total 
            </p>
            <h6 class="font-medium text-2xl leading-9">
              ${total}€
            </h6>
        </div>
        <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
 <button id="paymentButton" class="cursor-pointer w-full max-w-[280px] py-4 text-center justify-center items-center bg-[#B43131] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#9b2929] rounded-md">
            Passer au paiement
            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        </div>
    `;

    produitsContainer.appendChild(prixContainer);
    produitsContainer.appendChild(prixContainer);

    const paymentButton = document.getElementById("paymentButton");
    if (paymentButton) {
        paymentButton.addEventListener("click", () => {
            // Afficher le modal PayPal
            document.body.classList.add("overflow-hidden");

            const modal = document.createElement("div");
            modal.id = "paypalModal";
            modal.classList.add("modal", "hidden", "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-[#000000ad]");

            modal.innerHTML = `
                <div class="modal-content bg-white p-8 rounded-md w-full max-w-md">
                    <span id="closeModal" class="close absolute top-0 right-0 p-4 text-2xl cursor-pointer text-gray-600">&times;</span>
                    <div id="paypal-button-container"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.classList.remove("hidden");

            modal.addEventListener("click", (event) => {
                // Si l'utilisateur clique à l'extérieur de la fenêtre modale (pas sur .modal-content)
                if (event.target === modal) {
                    modal.classList.add("hidden");
                    document.body.removeChild(modal);

                    // Réactiver le défilement de la page
                    document.body.classList.remove("overflow-hidden");
                }
            });

            // Ajouter l'événement de fermeture en cliquant sur la croix (close)
            const closeModalButton = document.getElementById("closeModal");
            if (closeModalButton) {
                closeModalButton.addEventListener("click", () => {
                    modal.classList.add("hidden");
                    document.body.removeChild(modal);

                    // Réactiver le défilement de la page
                    document.body.classList.remove("overflow-hidden");
                });
            }

            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total 
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                                    fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/payer.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams({ id_us: cookieValue })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === "success") {
                                alert("Commande validée avec succès !");
                                window.location.href = "accueil.html";
                            } else {
                                alert("Erreur lors de la commande : " + data.message);
                            }
                        })
                        .catch(err => {
                            console.error("Erreur lors de l'enregistrement:", err);
                            alert("Erreur réseau lors de la validation de commande");
                        });
                    });
                }
            }).render('#paypal-button-container');
        });
    }
}


async function delProduit(detailProdId) {
    try {
        const userId = getUserIdFromCookie();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/delPanier.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                    id_detail_prod: detailProdId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function updateQuantite(quantite, detailProdId) {
    try {
        const userId = getUserIdFromCookie();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        if (quantite <= 0) {
            quantite = 1;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/setPanier.php", {
                method: "POST",
                body: new URLSearchParams({
                    quantite: quantite,
                    id_user: userId,
                    id_detail_prod: detailProdId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la modification de la quantité du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function newPanier(detailProdId, quantite) {
    try {
        const userId = getUserIdFromCookie();
        if (!userId) {
            console.error('Utilisateur non authentifié ou ID utilisateur introuvable');
            window.location.href = "accueil.html";
            return;
        }

        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/newPanier.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_user: userId,
                    id_detail_prod: detailProdId,
                    quantite: quantite,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la modification de la quantité du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function fetchDetailProduit(produitId, tailleId, couleurId) {
    try {
        const response = await fetch(
            "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getDetailProduit.php", {
                method: "POST",
                body: new URLSearchParams({
                    id_produit: produitId,
                    id_taille: tailleId,
                    id_couleur: couleurId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la modification de la quantité du produit');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.data;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

fetchProduits();