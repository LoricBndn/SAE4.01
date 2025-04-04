
function showCookieBanniere() {
  if (!document.cookie.includes("cookiesAccepted=true")) {
      let banniere = document.createElement("div");
      banniere.innerHTML = `
          <div id="cookie-banniere" style="position:fixed; bottom:0; left:0; width:100%; background:rgba(0,0,0,0.8); color:white; text-align:center; padding:10px;">
              Ce site utilise des cookies pour améliorer votre expérience. <button class="cursor-pointer" id="acceptCookies">Accepter</button>
          </div>`;
      document.body.appendChild(banniere);

      document.getElementById("acceptCookies").addEventListener("click", () => {
          document.cookie = "cookiesAccepted=true; path=/; max-age=31536000"; 
          document.getElementById("cookie-banniere").remove();
      });
  }
}
showCookieBanniere();

export const userId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("id_user="))
  ?.split("=")[1];

 export function isConnected() {
  return userId !== undefined;
}

function printHeader() {
  const header = document.querySelector("#printHeader");
  const connected = isConnected();

  let navLinks = `
    <li><a href='./accueil.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Accueil</a></li>
  `;

  if (connected) {
    navLinks += `
      <li><a href='./panier.html' class="block py-2 px-3 text-black hover:text-[#B43131]">Panier</a></li>
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
          <ul class="font-medium flex flex-col items-start lg:p-0 mt-4 lg:flex-row lg:space-x-8 lg:mt-0 text-md">
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

function printFooter() {
  const footer = document.querySelector("#printFooter");
  footer.innerHTML = `
<footer class="mt-15 bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="flex flex-col items-center text-center gap-2 lg:flex-row lg:justify-between">
                    <span class="block text-sm text-gray-500 sm:text-center">Paul Muller Pulls Moches - Site de vente</span>

            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                <li>
                    <a href="./mentionsLegales.html" class="hover:underline me-4 md:me-6">Mentions Légales</a>
                </li>
            </ul>
        </div>
    </div>
</footer>

`;
}

printHeader();
initMenu();
printFooter();
