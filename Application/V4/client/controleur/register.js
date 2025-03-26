document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const msgErreur = document.getElementById("MessageErreur");

  let mdpOK = false;
  let melOK = false;
  let testConfirm = false;

  // Validation de l'email
  document.getElementById("email").addEventListener("input", (e) => {
      let mel_conforme = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let msgErreurMail = document.getElementById("melErreur");
      melOK = mel_conforme.test(document.getElementById("email").value);

      if (melOK) {
          msgErreurMail.style.color = "green";
          msgErreurMail.innerHTML = "";
      } else {
          msgErreurMail.style.color = "red";
          msgErreurMail.innerHTML = "Adresse mail non conforme";
      }
  });

  // Validation du mot de passe
  document.getElementById("motdepasse").addEventListener("input", (e) => {
      let testLg = /.{8,}/;
      let testMaj = /[A-Z]/;
      let testMin = /[a-z]/;
      let testCar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      let testNb = /[0-9]/;

      let valeurTester = document.getElementById("motdepasse").value;
      mdpOK =
          testLg.test(valeurTester) &&
          testMaj.test(valeurTester) &&
          testMin.test(valeurTester) &&
          testCar.test(valeurTester) &&
          testNb.test(valeurTester);

      // Alerte sur les erreurs de mot de passe
      if (testLg.test(valeurTester)) msgErreur.style.color = "green";
      else msgErreur.style.color = "red";
  });

  // Vérification du mot de passe
  document.getElementById("verifmotdepasse").addEventListener("input", (e) => {
      let confirmPasswordField = document.getElementById("verifmotdepasse").value;
      let errorMessageConfirm = document.getElementById("motdepasseErreur");
      testConfirm = confirmPasswordField === document.getElementById("motdepasse").value;
      if (testConfirm) {
          errorMessageConfirm.style.color = "green";
          errorMessageConfirm.innerHTML = "";
      } else {
          errorMessageConfirm.style.color = "red";
          errorMessageConfirm.innerHTML = "Les mots de passe ne correspondent pas";
      }
  });

  // Gestion du formulaire
  form.addEventListener("submit", (e) => {
      e.preventDefault();

      let nom = document.getElementById("nom").value;
      let prenom = document.getElementById("prenom").value;
      let login = document.getElementById("login").value;
      let motdepasse = document.getElementById("motdepasse").value;
      let email = document.getElementById("email").value;
      let date_naissance = document.getElementById("date_naissance").value;

      // Vérification des champs
      if (!melOK || !mdpOK || !testConfirm) {
          msgErreur.innerHTML = "Veuillez vérifier vos informations.";
          msgErreur.style.display = "block";
          return;
      }

      // Envoi de la requête d'inscription
      fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V1/serveur/api/newUser.php", {
          method: "POST",
          body: new URLSearchParams({
              nom,
              prenom,
              login,
              motdepasse,
              email,
              date_naissance
          }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === "success") {
              window.location.href = "connexion.html";
          } else {
              msgErreur.innerHTML = data.message;
              msgErreur.style.display = "block";
          }
      })
      .catch(error => {
          msgErreur.innerHTML = "Une erreur est survenue lors de l'inscription.";
          msgErreur.style.display = "block";
      });
  });
});
