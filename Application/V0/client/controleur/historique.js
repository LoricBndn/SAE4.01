import { cookieValue, isConnected } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}
if (!isConnected()) {
    window.location.href = "accueil.html";
} else {
    affInfos();
}
async function affInfos() {     //requete API pour récupérer les infos de l'utilisateur
    const reponse = await fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getCommandes.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: cookieValue, //Remplacer par 3 pour tester
            }),
        }
    );

    const recupDonnees = await reponse.json();
    //console.log("Message : ",recupDonnees.message);
    //console.log(recupDonnees);
    //console.log(cookieValue);
    const table = document.getElementById('commande');

    if (recupDonnees.status !== "success") {
        console.log("Erreur, données non récupérées");
        return;
    }
    if (recupDonnees.data[0] === null || recupDonnees.data[0] === undefined) {  //Si l'utilisateur n'a pas de commande, on affiche un message
        //console.log("Aucune commande");
        document.getElementById("commandeVide").innerHTML = "Vous n'avez pas encore passé de commande.";
        table.style.display = "none";
        return;
    }
    

    //console.log(recupDonnees.data);
    recupDonnees.data.forEach(commande => {
        let ligne = table.insertRow();

        let dateCommande = ligne.insertCell();
        let prixCommande = ligne.insertCell();
        let idCommande = ligne.insertCell();

        dateCommande.innerHTML = commande.date_com;
        prixCommande.innerHTML = commande.prix_total + " €";

        let btn = document.createElement("button");
        btn.textContent = "Détails";
        btn.classList.add("form_button");
        btn.addEventListener("click", () => {
            window.location.href = "historique_detail.html?id_com=" + commande.id_com; //window.location.href = "historique_detail.html?id_com=" + commande.id_com;
        });

        idCommande.appendChild(btn);
    });
}