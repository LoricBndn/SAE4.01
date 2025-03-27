import { codeHexaCouleurs } from "./listCouleurs.js";
import { fetchCouleursByIdProduit } from "./NEWcouleurs.js";
import { fetchTaillesByIdProduit } from "./NEWtailles.js";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id_produit: params.get("id_produit"),
    id_couleur: params.get("id_couleur"),
  };
}

const { id_produit, id_couleur } = getQueryParams();

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

  console.log(tailles);

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
          "border-gray-200",
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
          "hover:bg-gray-50",
          "hover:border-gray-300"
        );
        tailleButton.textContent = taille.taille;
        tailleButton.addEventListener("click", () => {
          console.log("Taille sélectionnée:", taille);
        });
        tailleContainer.appendChild(tailleButton);
      }
    });
  } else {
    tailleContainer.innerHTML =
      "<p>Aucune taille disponible pour ce produit.</p>";
  }
}

afficherProduit(id_produit, id_couleur);
