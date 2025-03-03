export const cookieValue = document.cookie //Correspond à la valeur de la clé "id_user" dans le cookie
    .split("; ")
    .find((row) => row.startsWith("id_user="))
    ?.split("=")[1];

export function isConnected() {
    return cookieValue !== undefined;
}

function printHeader() {
    const header = document.querySelector("#printHeader");
    const connected = isConnected();

    let navLinks = `
    <a href='./accueil.html'>Accueil</a>
    <a href='./panier.html'>Panier</a>
    
  `;

    if (connected) {
        navLinks += `
        <a href='./historique.html'>Historique</a>
      <a href='./favori.html'>Favoris</a>
      <a href='./compte.html'>Compte</a>
      <a href='./logout.html'>Déconnexion</a>
    `;
    } else {
        navLinks += `
      <a href='./login.html'>Connexion</a>
      <a href='./register.html'>Inscription</a>
    `;
    }

    header.innerHTML = `
    <a><img src='./img/logo.png' alt='logo_site' class='logo'>
    <input type="image" src="./img/btn_deroul_top.png" id="btn_deroul_top" class="form_img"> </a>
    <nav>
      ${navLinks}
    </nav>
  `;
    MenuPrincipaleDeroulant(999);
}

function MenuPrincipaleDeroulant(taille) { //Taille -> Taille en px à partir de laquelle le menu se cache 
    let tailleEcran = window.matchMedia('(max-width: ' + taille + 'px)');

    if (tailleEcran.matches === true) {
        // Cache le menu de navigation si la taille d'écran est inférieure à 1000px
        document.querySelector("nav").style.display = "none";
    } else {
        // Sinon cache l'image qui sert de bouton
        document.getElementById("btn_deroul_top").style.display = "none";
    }

    // La variable select toutes les balises a qui ont dans le menu et les stock dans la variable (C'est un tableau)
    let categHeader = document.querySelectorAll("nav a");

    // Quand on appuie sur le bouton -> Lance la fonction
    document.getElementById("btn_deroul_top").addEventListener("click", function() {
        let nav = document.querySelector("nav");
        const btn_deroul_recherche = document.getElementById("btn_deroul_recherche");

        if (nav.style.display === "block") { // Si il est en bloc, cela veut dire qu'il est actuellement affiché
            nav.style.display = "none"; // On le cache 

            for (let i = 0; i < categHeader.length; i++) {
                categHeader[i].style.display = "none"; // On cache toutes les balises <a> de <nav> une par une
            }
            if (document.querySelector(".recherche")) btn_deroul_recherche.style.bottom = "3rem";
        } else {
            if (document.querySelector(".recherche")) btn_deroul_recherche.style.bottom = "0";
            nav.style.display = "block"; // Sinon on le définit en tant que block (Le nav n'est plus caché)
            for (let i = 0; i < categHeader.length; i++) {
                setTimeout(function(index) { categHeader[index].style.display = "block"; }, i * 100, i);
                // setTimeout() permet de créer un délai dans les actions : la fonction sert ici à ce que toutes les balises <a> ne s'affichent pas en même temps
            }
        }
    });
}

function menuRechercheDeroulant() {
    let tailleEcran = window.matchMedia('(max-width: 575px)');
    let form = document.querySelector(".recherche"); // Sélectionne le formulaire

    if (tailleEcran.matches === true) {
        form.style.display = "none";
        document.querySelector(".sticky").style.position = "relative";
    } else {
        document.getElementById("btn_deroul_recherche").style.display = "none";
    }

    let formImg = document.getElementById("btn_deroul_recherche");

    formImg.addEventListener("click", function() {
        if (form.style.display === "block") { // Si le formulaire est actuellement affiché
            form.style.display = "none"; // On le cache
        } else {
            form.style.display = "block"; // Sinon on le définit en tant que block (Le formulaire n'est plus caché)
        }
    });

}
if (document.querySelector(".recherche")) menuRechercheDeroulant();

function printFooter() {
    const footer = document.querySelector("#printFooter");
    footer.innerHTML = `
    <p>Paul Muller Piulls Moches - Site de vente </p>
    `;
}

printHeader();
// printFooter();
