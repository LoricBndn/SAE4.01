class ProduitGenerique extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
    .descProduit {
    background-color: #FFFDD0;
    display: inline-block;
    width: 10%;
    height: 10%;
    border : 3px solid #000000;
    margin: 1%;
    padding: 1%;
    }
    </style>
    <div class="descProduit">
    <input type="checkbox" class="checkbox" id="${this.getAttribute(
      "id"
    )}"> </input>
    <p> ${this.getAttribute("name")} </p>
    <img src="${this.getAttribute("img_path")}">
    <p> ${this.getAttribute("prix")}  </p>
    <a href="detail_produit.html?id=${this.getAttribute(
      "id"
    )}"> <input type="button" value="Details"> </input> </a>
     </div>
`;
  }
}

customElements.define("produit-generique", ProduitGenerique);
function afficherCategories() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCategorie.php"
  )
    .then((reponse) => console.log(reponse.json()))
    .then((data) => {
      console.log(data.data);
    })
    .catch((error) => console.log(error));
}

function afficherTousLesProduits() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getGenericProduits.php"
  )
    .then((reponse) => reponse.json())
    .then((data) => {
      imprimerTousLesProduits(data.data);
    })
    .catch((error) => console.log(error));
}

function produitsRecherche(recherche, data) {
  let dejaSortit = [];
  data.forEach((produit) => {
    if (produitContientMot(produit, recherche)) {
      dejaSortit.push(produit);
    }
  });
  data = purgerListeProduit(dejaSortit, data);
  recherche.split(" ").forEach((mot) => {
    data.forEach((produit) => {
      if (produitContientMot(produit, mot) && !dejaSortit.includes(produit)) {
        dejaSortit.push(produit);
      }
    });
  });
  return dejaSortit;
}

function purgerListeProduit(dejaSortit, data) {
  dejaSortit.forEach((produit) => {
    if (data.includes(produit)) {
      data.splice(data.indexOf(produit), 1);
    }
  });
  return data;
}

function produitsCategorie(idCategorie, data) {
  let dejaSortit = [];
  data.forEach((produit) => {
    if (produit.id_cat == idCategorie) dejaSortit.push(produit);
  });
  return dejaSortit
}
function imprimerUnProduit(produit) {
  console.log(produit)
  let path = produit.path_img
  ? "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/img/articles/"+produit.path_img
  : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  produitElement = document.createElement("produit-generique");
  produitElement.setAttribute("name", produit["nom_prod"]);
  produitElement.setAttribute("prix", produit["prix_unit"]);
  produitElement.setAttribute("id", produit["id_prod"]);
  produitElement.setAttribute("img_path", produit["img_path"]);
  
  document.querySelector(".produits").appendChild(produitElement);
}

function produitContientMot(produit, mot) {
  return produit.nom_prod
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(
      mot
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );
}

function imprimerTousLesProduits(produits) {
  const urlParams = new URLSearchParams(window.location.search);
  const recherche = urlParams.get("search");
  const categorie = urlParams.get("idCategorie");
  const id_us = 3;
  console.log(produits);
  if (recherche) {
    produits = produitsRecherche(recherche, produits);
  }
  if (categorie) {
    produits = produitsCategorie(categorie, produits);
  }

  produits.forEach((produit) => {
    imprimerUnProduit(produit);
  });
  traiterFavori(id_us);
}

async function getFavori(id_us) {
  return await fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getFavori.php",
    {
      method: "POST",
      body: new URLSearchParams({
        id_us: id_us,
      }),
    }
  )
    .then((response) => response.json().then((data) => data.data))
    .catch((error) => console.log(error));
}

function ajouterFavori(event, id_us) {
  fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/newFavori.php",
    {
      method: "POST",
      body: new URLSearchParams({
        id_us: id_us,
        id_prod: event.target.id,
      }),
    }
  ).catch((error) => console.log(error));
}

function supprimerFavorites(event, id_us) {
  fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/delFavori.php",
    {
      method: "POST",
      body: new URLSearchParams({
        id_us: id_us,
        id_prod: event.target.id,
      }),
    }
  ).catch((error) => console.log(error));
}

function traiterFavori(id_us)
{
  const id_fav = [];
  getFavori(id_us).then((data) => {
    data.forEach((fav) => {
      id_fav.push(fav["id_prod"]);
    });
    document
      .querySelector(".produits")
      .querySelectorAll("produit-generique")
      .forEach((produit) => {
        const checkbox = produit.shadowRoot.querySelector(".checkbox");
        if (id_fav.includes(parseInt(checkbox.id))) checkbox.checked = true;
        checkbox.addEventListener("click", (event) => {
          if (event.target.checked === true) {
            ajouterFavori(event, id_us);
          } else {
            supprimerFavori(event, id_us);
          }
        });
      });
  });
}

afficherTousLesProduits();
afficherCategories();
