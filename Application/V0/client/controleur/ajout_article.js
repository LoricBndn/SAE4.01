import { cookieValue } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}

function recupererInformationForm() {
  const nom = document.getElementById("nomProduit").value;
  const prix = document.getElementById("prixProduit").value;

  console.log(verifierInformationForm(nom, prix));

  return [nom, prix];
}

function verifierInformationForm(nom, prix) {
  let regex = /^[0-9]{1,4}([,.][0-9]{1,2})?$/;
  if (nom.length <= 1) {
    alert("le nom du produit doit faire au moins 2 caractères");
    return false;
  }
  if (!regex.test(prix)) {
    alert(
      "le prix du produit doit etre un nombre (potentiellement decimal) de moins de 100000€"
    );
    return false;
  }

  return true;
}

async function envoyerInformationForm() {
  const nom = recupererInformationForm()[0];
  const prix = recupererInformationForm()[1];

  console.log(nom, prix);
  if (verifierInformationForm(nom, prix)) {
    try {
      const reponse = await fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/newProduit.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom_prod: nom,
            prix_base: prix,
            id_cat:1
            //^ la categorie de produit est encore entrée en dur, je changerais ca dès que j'aurais la page de création de produit donc vite
          }),
        }
      );

      const data = await reponse.json();
      console.log(data.message);

      if (data.status === "success") {
        printHeader();
        alert("jure ca marche")
        //window.location.href = "accueil.html";
      } else {
        // Echec
        msgErreur.innerHTML = data.message;
        msgErreur.style.display = "block";
        setTimeout(() => {
          msgErreur.style.display = "none";
        }, 4000);
      }
    } catch (error) {
     /* msgErreur.innerHTML = "Une erreur serveur est survenu.";
      msgErreur.style.display = "block";
      setTimeout(() => {
        msgErreur.style.display = "none";
      }, 4000);*/
    }
  } else {
    msgErreur.innerHTML = "Remplissez tous les champs !";
    msgErreur.style.display = "block";
    setTimeout(() => {
      msgErreur.style.display = "none";
    }, 4000);
  }
}

const button = document.getElementById("envoie");

button.addEventListener("click", () => {
  envoyerInformationForm();
});
