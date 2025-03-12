let id_user = -1;
let form = document.querySelector("form");
let msgErreur = document.querySelector("#MessageErreur");

msgErreur.style.display = "none";
msgErreur.style.backgroundColor = "red";
msgErreur.style.color = "white";
msgErreur.style.fontSize = "16px";
msgErreur.style.padding = "10px";
msgErreur.style.marginBottom = "10px";
msgErreur.style.borderRadius = "5px";
msgErreur.style.textAlign = "center";
msgErreur.style.justifyContent = "center";

async function authentifier() {
    var login = $("#login").val();
    var motdepasse = $("#motdepasse").val();

    if (!login || !motdepasse) {
        msgErreur.innerHTML = "Remplissez tous les champs !";
        msgErreur.style.display = "block";
        setTimeout(() => {
            msgErreur.style.display = "none";
        }, 10000);

        return;
    }
    const reponse = await fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~laroche5/SAE_401/serveur/api/connexion.php", {
            method: "POST",
            body: new URLSearchParams({
                login: login,
                mdp: motdepasse,
            }),
        }
    );

    const data = await reponse.json();
    console.log("M : ", data.message);
    console.log("Data : ", data);

    if (data.status === "success") {

        let date_expiration = new Date();
        date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));

        // console.log("User :",data.id_us);

        document.cookie = "id_user=" + data.id_us + ";expires=" + date_expiration.toUTCString() + ";path=/";

        // console.log("Cookie : ", document.cookie);
        window.location.href = "accueil.html";
        return;
    }

    // Echec
    msgErreur.innerHTML = data.message;
    msgErreur.style.display = "block";
    setTimeout(() => {
        msgErreur.style.display = "none";
    }, 10000);
}