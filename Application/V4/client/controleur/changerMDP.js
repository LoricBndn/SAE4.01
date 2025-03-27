import { userId } from "./function.js";

const eyeIcon = document.getElementById("eyeIcon");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("new-password"); // Sélecteur pour l'input du mot de passe
const eyeIconConfirm = document.getElementById("eyeIconConfirm");
const togglePasswordConfirm = document.getElementById("togglePasswordConfirm");
const confirmPasswordInput = document.getElementById("confirm-password"); 
// Sélecteur pour l'input de confirmation

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
});

togglePasswordConfirm.addEventListener("click", () => {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        eyeIconConfirm.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        confirmPasswordInput.type = "password";
        eyeIconConfirm.classList.replace("fa-eye-slash", "fa-eye");
    }
});
    function validatePassword(password) {
      const testLg = /.{8,}/;
      const testMaj = /[A-Z]/;
      const testMin = /[a-z]/;
      const testCar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const testNb = /[0-9]/;

      let valid = true;

      // Validation des différentes règles
      document.getElementById("mdpErreur1").style.display = testLg.test(password) ? "none" : "block";
      document.getElementById("mdpErreur2").style.display = testMaj.test(password) ? "none" : "block";
      document.getElementById("mdpErreur3").style.display = testMin.test(password) ? "none" : "block";
      document.getElementById("mdpErreur4").style.display = testCar.test(password) ? "none" : "block";
      document.getElementById("mdpErreur5").style.display = testNb.test(password) ? "none" : "block";

      // Vérification globale
      valid = testLg.test(password) && testMaj.test(password) && testMin.test(password) && testCar.test(password) && testNb.test(password);

      return valid;
  }

  // Événement de validation lors de l'input
  document.getElementById("new-password").addEventListener("input", function() {
      const password = this.value;
      validatePassword(password);
  });

  // Gestion de la soumission du formulaire
  document.getElementById("password-form").addEventListener("submit", function(event) {
      event.preventDefault();

      let newPassword = document.getElementById("new-password").value;
      let confirmPassword = document.getElementById("confirm-password").value;
      let errorMessage = document.getElementById("error-message");

      // Vérification des mots de passe
      if (newPassword !== confirmPassword) {
          errorMessage.classList.remove("hidden");
          return;
      } else {
          errorMessage.classList.add("hidden");
      }

      // Vérification des règles du mot de passe
      if (!validatePassword(newPassword)) {
          return;
      }

      // Envoi de la requête de changement de mot de passe
      fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/changerMDP.php", {
          method: "POST",
          body: new URLSearchParams({
              "id_user": userId,
              "mdp": newPassword,
          }),
      }).then((response) => {
          response.json().then((data) => {
              if (data["status"] === "success") {
                  alert("Votre mot de passe a bien été changé");
                  window.location.href = "accueil.html"; // Redirige vers la page d'accueil après la modification
              } else {
                  alert("Erreur lors du changement de mot de passe");
              }
          });
      });
  });