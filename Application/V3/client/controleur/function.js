export const cookieValue = document.cookie
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
    <li><a href='./accueil.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Accueil</a></li>
    <li><a href='./panier.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Panier</a></li>
  `;

  if (connected) {
    navLinks += `
      <li><a href='./historique.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Historique</a></li>
      <li><a href='./favori.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Favoris</a></li>
      <li><a href='./compte.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Compte</a></li>
      <li><a href='./logout.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Déconnexion</a></li>
    `;
  } else {
    navLinks += `
      <li><a href='./login.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Connexion</a></li>
      <li><a href='./register.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Inscription</a></li>
    `;
  }

  header.innerHTML = `
    <nav class="z-10 w-full absolute bg-gradient-to-r from-[#f5f5f5] via-[#f2f2f2] to-[#ededed] border-[#d5d5d5] border-b-2">
      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-15 lg:px-30">
        <a href="./accueil.html">
          <img src="./img/logo.png" class="h-11" />
        </a>
        <button
          id="menu-button"
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#B43131] rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div class="hidden w-full lg:block lg:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col items-center p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
            ${navLinks}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

function toggleMenu() {
  const menu = document.getElementById("navbar-default");
  const button = document.getElementById("menu-button");

  // Vérifie si le menu est actuellement affiché
  const isOpen = menu.classList.contains("hidden");

  // Ouvre ou ferme le menu en fonction de son état actuel
  if (isOpen) {
    menu.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
  } else {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  }
}

// Fonction d'initialisation pour ajouter l'événement au bouton
function initMenu() {
  const button = document.getElementById("menu-button");

  if (button) {
    button.addEventListener("click", toggleMenu);
  }
}

function menuRechercheDeroulant() {
  let tailleEcran = window.matchMedia("(max-width: 575px)");
  let form = document.querySelector(".recherche"); // Sélectionne le formulaire

  if (tailleEcran.matches === true) {
    form.style.display = "none";
    document.querySelector(".sticky").style.position = "relative";
  } else {
    document.getElementById("btn_deroul_recherche").style.display = "none";
  }

  let formImg = document.getElementById("btn_deroul_recherche");

  formImg.addEventListener("click", function () {
    if (form.style.display === "block") {
      // Si le formulaire est actuellement affiché
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
initMenu();
//printFooter();
