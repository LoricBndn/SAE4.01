import { cookieValue } from "./function.js";

if (cookieValue === undefined) {
    window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
}

async function afficherInfos() {

    if (cookieValue === undefined) {
        window.location.href = 'accueil.html'; //Si le cookie est vide, l'utilisateur n'est pas connecté donc on retourne à l'accueil.
    }
    try {
        const response = await fetch("https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/getUser.php", {
            method: "POST",
            body: new URLSearchParams({
                id_us: cookieValue,
            }),
        });

        const data = await response.json();
        //console.log(data);

        //console.log("Test :", data.data[0].id_us);
        if (data.status === "success") { // L'Authentification a réussi
            document.getElementById("nom").value = data.data[0].nom_us;
            document.getElementById("prenom").value = data.data[0].prenom_us;
            document.getElementById("mel").value = data.data[0].mel;
            document.getElementById("login").value = data.data[0].login;
            document.getElementById("date_naiss").value = new Date(data.data[0].date_naiss).toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
        } else { // Echec
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

afficherInfos(); // Ne pas exécuter automatiquement.