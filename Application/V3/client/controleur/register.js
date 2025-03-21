let form = document.querySelector('form');
let msgErreur = document.getElementById("MessageErreur");
const mdpErreurs = document.querySelectorAll('span[id^="mdpErreur"]');

let mdpOK = false;
let melOK = false;
let testConfirm = false;

mdpErreurs.forEach((mdpErreur) => {
    mdpErreur.style.display = "none";
  });

msgErreur.style.display = "none";
msgErreur.style.backgroundColor = "red";
msgErreur.style.color = "white";
msgErreur.style.fontSize = "16px";
msgErreur.style.padding = "10px";
msgErreur.style.marginBottom = "10px";
msgErreur.style.borderRadius = "5px";
msgErreur.style.textAlign = "center";
msgErreur.style.justifyContent = "center";

    document.getElementById("mel").addEventListener("input", (e) => {
        let mel_conforme = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let msgErreurMail = document.getElementById("melErreur");
        melOK = mel_conforme.test(document.getElementById("mel").value);
        

        if (melOK) {
            msgErreurMail.style.color = "green";
            msgErreurMail.innerHTML = "";
        }
        else{
            msgErreurMail.style.color = "red";
            msgErreurMail.innerHTML = "Adresse mail non conforme";
        }
    });


    document.getElementById("mdp").addEventListener("input", (e) => {
        mdpErreurs.forEach((mdpErreur) => {
            mdpErreur.style.display = "block";
        });

        let testLg = /.{8,}/;
        let testMaj = /[A-Z]/;
        let testMin = /[a-z]/;
        let testCar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let testNb = /[0-9]/;
        
        let valeurTester = document.getElementById("mdp").value;
        mdpOK = testLg.test(valeurTester) && testMaj.test(valeurTester) && testMin.test(valeurTester) && testCar.test(valeurTester) && testNb.test(valeurTester);
        console.log(mdpOK);

        if (testLg.test(valeurTester)) mdpErreurs[0].style.color = "green";
        else {
            mdpErreurs[0].style.color = "red";
        }

        if (testMaj.test(valeurTester)) mdpErreurs[1].style.color = "green";
        else {
            mdpErreurs[1].style.color = "red";
        }

        if (testMin.test(valeurTester)) mdpErreurs[2].style.color = "green";
        else {
            mdpErreurs[2].style.color = "red";
        }

        if (testCar.test(valeurTester)) mdpErreurs[3].style.color = "green";
        else {
            mdpErreurs[3].style.color = "red";
        }

        if (testNb.test(valeurTester)) mdpErreurs[4].style.color = "green";
        else {
            mdpErreurs[4].style.color = "red";
        }
        
    });


    
    document.getElementById("confirm_mdp").addEventListener('input', (e) => {
        let confirmPasswordField = document.getElementById("confirm_mdp").value;
        let errorMessageConfirm = document.getElementById("motdepasseErreur");
        testConfirm = (confirmPasswordField === document.getElementById("mdp").value);
        if (testConfirm) {
            errorMessageConfirm.style.color = "green";
            errorMessageConfirm.innerHTML = "";
        }
        else{
            errorMessageConfirm.style.color = "red";
            errorMessageConfirm.innerHTML = "Les mots de passe ne correspondent pas";
        }
    });
function showErrorModal(message) {
    document.getElementById("modalErrorMessage").innerHTML = "⚠️ " + message;
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

function register() {
    let erreur = 0;

    const inputs = document.querySelectorAll('form input[type="text"], form input[type="password"], form input[type="date"]');
    const values = [];
    const confirmPasswordField = document.getElementById("confirm_mdp").value;
    let testConfirm = (confirmPasswordField === document.getElementById("mdp").value);
    let dateInput = document.getElementById("date_naissance");

    if (!testConfirm) {
        showErrorModal("Les mots de passe ne correspondent pas !");
        return;
    }
    if (erreur !== 0) {
        showErrorModal("Remplissez tous les champs !");
        return;
    }
    if (!melOK || !mdpOK) {
        showErrorModal("Votre mot de passe ou votre adresse mail n'est pas conforme !");
        return;
    }
    if (age < 16) {
        showErrorModal("Vous devez avoir au moins 16 ans pour vous inscrire.");
        return;
    }
    
    let date = new Date(dateInput.value);
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    let monthDiff = today.getMonth() - date.getMonth();
    let dayDiff = today.getDate() - date.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }


    const user = { nom: values[0], prenom: values[1], login: values[2], mdp: values[3], mel: values[5], date_naiss: values[6] }
    console.log(user);
    fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/newUser.php', {
            method: 'POST',
            body: new URLSearchParams({
                nom: user.nom,
                prenom: user.prenom,
                login: user.login,
                mdp: user.mdp,
                mel: user.mel,
                date_naiss: user.date_naiss,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 'success') {
                // L'Authentification a réussi
                fetch('https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/connexion.php', {
                    method: 'POST',
                    body: new URLSearchParams({
                        login: user.login,
                        mdp: user.mdp,
                    }),
                }).then(response => response.json().then(data => {

                    let date_expiration = new Date();
                    date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));
                    document.cookie = "id_user=" + data.id_us + ";expires=" + date_expiration.toUTCString() + ";path=/";

                    window.location.href = 'accueil.html';
                    return;
                }));
            }

            // Echec
            msgErreur.innerHTML = data.message;
            msgErreur.style.display = "block";
            setTimeout(() => {
                msgErreur.style.display = "none";
            }, 10000);
        })
        .catch(error => {
            msgErreur.innerHTML = "Une erreur serveur est survenue.";
            msgErreur.style.display = "block";
            setTimeout(() => {
                msgErreur.style.display = "none";
            }, 10000);
        });
};

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    register();
});