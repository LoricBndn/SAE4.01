import { codeHexaCouleurs } from "./listCouleurs.js";
import { fetchCouleursByIdProduit } from "./NEWcouleurs.js";
import { fetchTaillesByIdProduit } from "./NEWtailles.js";

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
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id_produit: params.get("id_produit"),
    id_couleur: params.get("id_couleur"),
  };
}

const { id_produit, id_couleur } = getQueryParams();

let selectedTaille = null;
let selectedCouleur = parseInt(id_couleur);

const inputQte = document.getElementById("qte");
const btnMoins = document.getElementById("moins");
const btnPlus = document.getElementById("plus");

btnMoins.addEventListener("click", () => {
  let quantity = parseInt(inputQte.value);
  if (quantity > 1) {
    inputQte.value = quantity - 1;
  }
});

btnPlus.addEventListener("click", () => {
  let quantity = parseInt(inputQte.value);
  inputQte.value = quantity + 1;
});

inputQte.addEventListener("input", () => {
  let quantity = parseInt(inputQte.value);
  if (isNaN(quantity) || quantity < 1) {
    inputQte.value = 1;
  }
});

const ajouterPanierButton = document.getElementById("ajouter_panier");

ajouterPanierButton.addEventListener("click", () => {
  if (!selectedTaille) {
    alert("Veuillez sélectionner une taille et une couleur.");
    return;
  }

  ajouterAuPanier(id_produit, selectedTaille, selectedCouleur);
});

async function fetchProduitDetails(id_produit, id_couleur) {
  try {
    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getGenericProduit.php",
      {
        method: "POST",
        body: new URLSearchParams({
          id_produit: id_produit,
          id_couleur: id_couleur,
        }),
      }
    );

    const resultat = await response.json();

    if (!resultat || resultat.error) {
      console.error(
        "Erreur lors de la récupération des données :",
        resultat.error
      );
      return null;
    }

    return resultat.data[0];
  } catch (error) {
    console.error("Erreur de connexion à l'API :", error);
    return null;
  }
}

async function fetchIdDetailProduit(id_produit, id_taille, id_couleur) {
  try {
    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getDetailProduit.php",
      {
        method: "POST",
        body: new URLSearchParams({
          id_produit: id_produit,
          id_taille: id_taille,
          id_couleur: id_couleur,
        }),
      }
    );

    const result = await response.json();

    if (!result || result.error) {
      console.error(
        "Erreur lors de la récupération du détail du produit :",
        result.error
      );
      return null;
    }

    return result.data[0].id_detail_prod;
  } catch (error) {
    console.error("Erreur de connexion à l'API :", error);
    return null;
  }
}

async function afficherProduit(id_produit, id_couleur) {
  const produit = await fetchProduitDetails(id_produit, id_couleur);
  const couleurs = await fetchCouleursByIdProduit(id_produit);

  if (!produit) {
    console.error("Produit non trouvé");
    return;
  }

  document.getElementById("titre").textContent = produit.nom_produit;
  document.querySelector(".text-2xl").textContent = `${produit.prix} €`;
  document.querySelector("p.text-gray-500").textContent = produit.description;
  document.getElementById(
    "grande_img"
  ).src = `../serveur/img/articles/${produit.path_img}`;

  const couleursContainer = document.getElementById("couleurs_produits");
  couleursContainer.innerHTML = "";

  couleurs.forEach((couleur) => {
    const bouton = document.createElement("button");
    bouton.classList.add(
      "cursor-pointer",
      "p-2.5",
      "border",
      "rounded-full",
      "transition-all",
      "duration-300"
    );

    if (couleur.id_couleur == id_couleur) {
      bouton.classList.add(`border-black-500`);
    } else {
      bouton.classList.add("border-gray-200", "hover:border-gray-500");
    }

    bouton.addEventListener("click", () => {
      const newUrl = `?id_produit=${id_produit}&id_couleur=${couleur.id_couleur}`;
      window.history.pushState({}, "", newUrl);

      selectedCouleur = couleur.id_couleur;

      afficherProduit(id_produit, couleur.id_couleur);
    });

    bouton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="${
                  codeHexaCouleurs.get(couleur.id_couleur).hex
                }" />
            </svg>
        `;

    couleursContainer.appendChild(bouton);
  });

  afficherTailles(id_produit);
}

async function afficherTailles(id_produit) {
  const tailles = await fetchTaillesByIdProduit(id_produit);
  const tailleContainer = document.getElementById("taille-container");
  const titreTaille = document.getElementById("p_taille");

  tailleContainer.innerHTML = "";

  if (tailles && tailles.length > 0) {
    tailles.forEach((taille) => {
      if (taille.taille != "Pas de taille") {
        titreTaille.innerHTML = "Taille";
        const tailleButton = document.createElement("button");
        tailleButton.classList.add(
          "cursor-pointer",
          "border",
          "text-gray-900",
          "text-lg",
          "py-2",
          "rounded-full",
          "px-1.5",
          "sm:px-6",
          "w-full",
          "font-semibold",
          "whitespace-nowrap",
          "shadow-sm",
          "shadow-transparent",
          "transition-all",
          "duration-300",
          "hover:shadow-gray-300",
          "hover:bg-gray-50"
        );

        if (selectedTaille === taille.id_taille) {
          tailleButton.classList.add("border-black-500");
        } else {
          tailleButton.classList.add("border-gray-200");
        }

        tailleButton.textContent = taille.taille;

        tailleButton.addEventListener("click", () => {
          selectedTaille = taille.id_taille;
          afficherProduit(id_produit, selectedCouleur);
        });

        tailleContainer.appendChild(tailleButton);
      } else {
        selectedTaille = 17;
      }
    });
  } else {
    tailleContainer.innerHTML =
      "<p>Aucune taille disponible pour ce produit.</p>";
  }
}

async function ajouterAuPanier(id_produit, id_taille, id_couleur) {
  console.log(id_produit, id_taille, id_couleur);

  const id_user = getUserIdFromCookie();

  if (!id_user) {
    window.location.href = "login.html";
    return;
  }

  const id_detail_prod = await fetchIdDetailProduit(
    id_produit,
    id_taille,
    id_couleur
  );

  if (!id_detail_prod) {
    alert("Erreur lors de la récupération du détail produit.");
    return;
  }

  const quantite = inputQte.value;

  const data = {
    id_user: id_user,
    id_detail_prod: id_detail_prod,
    quantite: quantite,
  };

  try {
    const response = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/newPanier.php",
      {
        method: "POST",
        body: new URLSearchParams(data),
      }
    );

    const result = await response.json();
    console.log(result);
    

    if (result.status == "success") {
      alert("Produit ajouté au panier !");
    } 
    else if(result.message.includes("Duplicate")) {
        alert("Article déjà dans le panier");
    }
    else {
      alert("Erreur lors de l'ajout au panier : " + result.error);
    }
  } catch (error) {
    console.error("Erreur de requête :", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
}

afficherProduit(id_produit, id_couleur);
