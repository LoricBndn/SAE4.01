export const cookieValue = getUserIdFromCookie();

function getUserIdFromCookie() {
    const name = "id_user=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

async function afficherInfos() {
    if (cookieValue === null) {
        window.location.href = 'accueil.html'; 
        return;
    }

    try {
        const response = await fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/getUtilisateur.php", {
            method: "POST",
            body: new URLSearchParams({
                id_user: cookieValue,
            }),
        });

        const data = await response.json();

        console.log(data);

        if (data.status === "success" && data.data && data.data.length > 0) { 
            document.getElementById("nom").value = data.data[0].nom;
            document.getElementById("prenom").value = data.data[0].prenom;
            document.getElementById("mel").value = data.data[0].email;
            document.getElementById("login").value = data.data[0].identifiant;
            document.getElementById("date_naiss").value = new Date(data.data[0].date_naissance).toLocaleDateString('fr-FR', {  day: '2-digit',month: '2-digit', year: 'numeric'});
        } else {
            console.log("Error:", data.message); 
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

afficherInfos();
