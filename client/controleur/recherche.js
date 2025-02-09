const divRecherche = document.querySelectorAll(".recherche")[0];
const barreRecherche = document.createElement("input");
const boutonRechercher = document.createElement("input");
const selectCategorie = document.createElement("select");
const selectCouleur = document.createElement("select");
const selectTaille = document.createElement("select");

const maps = await fillMaps();
const tailleByCategorie = maps[0];
const couleurByCategorie = maps[1];

barreRecherche.setAttribute("type", "text");
boutonRechercher.setAttribute("type", "button");
boutonRechercher.setAttribute("value", "Rechercher");
boutonRechercher.classList.add("form_button");

const searchValue = new URLSearchParams(window.location.search).get("search");

barreRecherche.value = searchValue ? searchValue.replaceAll("+", " ") : "";
barreRecherche.classList.add("col-xl-7");
barreRecherche.classList.add("col-sm-12");
selectCategorie.classList.add("col-xl-2");
selectCategorie.classList.add("col-sm-4");
selectCouleur.classList.add("col-xl-1");
selectCouleur.classList.add("col-sm-4");
selectTaille.classList.add("col-xl-1");
selectTaille.classList.add("col-sm-4");
boutonRechercher.classList.add("col-xl-1");
boutonRechercher.classList.add("col-sm-12");

// xs, sm, md, lg, xl

async function getInfoProd() {
    return await fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getGenericProduits.php", {
            method: "POST",
            body: new URLSearchParams({}),
        }
    ).then((reponse) => reponse.json());
}
async function fillMaps() {
    var tailleByCategorie = new Map();
    var couleurByCategorie = new Map();
    const produits = (await getInfoProd()).data;

    produits.forEach((produit) => {
        if (tailleByCategorie.has(produit.id_cat)) {
            const categorie = tailleByCategorie.get(produit.id_cat);
            if (!categorie.includes(produit.id_tail)) {
                categorie.push(produit.id_tail);
            }
            tailleByCategorie.set(produit.id_cat, categorie);
        } else {
            tailleByCategorie.set(produit.id_cat, [produit.id_tail]);
        }
    });

    produits.forEach((produit) => {
        if (couleurByCategorie.has(produit.id_cat)) {
            const categorie = couleurByCategorie.get(produit.id_cat);
            if (!categorie.includes(produit.id_coul)) {
                categorie.push(produit.id_coul);
            }
            couleurByCategorie.set(produit.id_coul, categorie);
        } else {
            couleurByCategorie.set(produit.id_cat, [produit.id_coul]);
        }
    });
    return [couleurByCategorie, tailleByCategorie];
}

fetchSpecification(
    selectCategorie,
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCategories.php",
    "Catégorie",
    "idCategorie"
);
fetchSpecification(
    selectCouleur,
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCouleurs.php",
    "Couleur",
    "idCouleur"
);
fetchSpecification(
    selectTaille,
    "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getTailles.php",
    "Taille",
    "idTaille"
);

divRecherche.appendChild(barreRecherche);
divRecherche.appendChild(selectCategorie);
divRecherche.appendChild(selectCouleur);
divRecherche.appendChild(selectTaille);
divRecherche.appendChild(boutonRechercher);

barreRecherche.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        rechercher();
    }
});
boutonRechercher.addEventListener("click", (e) => {
    e.preventDefault();
    rechercher();
});

function rechercher() {
    window.location.href =
        window.location.href.split("?")[0] +
        "?search=" +
        traiterChaine(barreRecherche) +
        "&idCategorie=" +
        selectCategorie.value +
        "&idCouleur=" +
        selectCouleur.value +
        "&idTaille=" +
        selectTaille.value;
}

function fetchSpecification(select, url, default_name, searchParam) {
    return fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
            if (default_name == "Catégorie") ajouterOptions(select, data.data, default_name, searchParam);
            else ajouterOptions(select, [], default_name, searchParam);
        })
        .catch((error) => console.log(error));
}

function ajouterOptions(select, data, default_name, searchParam) {
    const searchParams = new URLSearchParams(window.location.search);

    let option = document.createElement("option");
    option.value = "";
    option.text = default_name;
    select.add(option, null);
    data.forEach((type) => {
        type = Object.values(type);
        const selected = parseInt(searchParams.get(searchParam)) == type[0];
        let option = document.createElement("option");
        option.value = type[0];
        option.text = type[1];
        option.selected = selected;
        select.add(option, null);
    });
}

function removeAll(selectBox) {
    while (selectBox.options.length > 0) {
        select.remove(0);
    }
}

function traiterChaine(barreRecherche) {
    let chaine = barreRecherche;
    if (chaine.value.includes("  ")) {
        chaine.value = chaine.value.replaceAll("  ", " ");
        return traiterChaine(chaine);
    } else return chaine.value.replaceAll(" ", "+");
}

selectCategorie.addEventListener("change", (e) => {
    e.preventDefault();
    fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getProduits.php")
        .then((reponse) => reponse.json().then((data) => {
            const prod_cat = data.data.filter((produit) => produit.id_cat == selectCategorie.value);
            let couleur = []
            let taille = []
            prod_cat.forEach((produit) => {
                couleur.push(produit.id_col);
                taille.push(produit.id_tail);
            });
            couleur = couleur.filter((v, i, a) => a.indexOf(v) === i);
            taille = taille.filter((v, i, a) => a.indexOf(v) === i);
            fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCouleurs.php").then((reponse) => reponse.json().then((data) => {
                const nom_couleur = data.data.filter((couleu) => couleur.includes(couleu.id_col));
                selectCouleur.innerHTML = "";
                ajouterOptions(selectCouleur, nom_couleur, "Couleur", "idCouleur");
            }))
            fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getTailles.php").then((reponse) => reponse.json().then((data) => {
                const nom_tail = data.data.filter((taill) => taille.includes(taill.id_tail));
                selectTaille.innerHTML = "";
                ajouterOptions(selectTaille, nom_tail, "Taille", "idTaille");
            }))
        }));
});