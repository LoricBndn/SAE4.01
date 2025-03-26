document.addEventListener("DOMContentLoaded", () => {
    const eyeIcon = document.getElementById("eyeIcon");
    const togglePassword = document.getElementById("motdepasse");
    const passwordInput = document.getElementById("motdepasse");

    const eyeIconConfirm = document.getElementById("eyeIconConfirm");
    const togglePasswordConfirm = document.getElementById("verifmotdepasse");
    const confirmPasswordInput = document.getElementById("verifmotdepasse");

    // Fonction de basculement du mot de passe (afficher/masquer)
    eyeIcon.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });

    eyeIconConfirm.addEventListener("click", () => {
        if (confirmPasswordInput.type === "password") {
            confirmPasswordInput.type = "text";
            eyeIconConfirm.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            confirmPasswordInput.type = "password";
            eyeIconConfirm.classList.replace("fa-eye-slash", "fa-eye");
        }
    });

    // Fonction de validation du mot de passe
    function validatePassword(password) {
        const testLg = /.{8,}/;
        const testMaj = /[A-Z]/;
        const testMin = /[a-z]/;
        const testCar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const testNb = /[0-9]/;

        let valid = true;

        // Validation des règles de mot de passe
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
    document.getElementById("motdepasse").addEventListener("input", function() {
        const password = this.value;
        validatePassword(password);
    });

    // Vérification de la correspondance des mots de passe
    document.getElementById("verifmotdepasse").addEventListener("input", function() {
        let confirmPassword = this.value;
        let password = document.getElementById("motdepasse").value;
        let errorMessageConfirm = document.getElementById("motdepasseErreur");

        if (confirmPassword !== password) {
            errorMessageConfirm.style.color = "red";
            errorMessageConfirm.innerHTML = "Les mots de passe ne correspondent pas";
        } else {
            errorMessageConfirm.style.color = "green";
            errorMessageConfirm.innerHTML = "Les mots de passe correspondent";
        }
    });

    // Fonction de vérification de l'âge (minimum 16 ans)
    function validateAge(birthDate) {
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        const day = today.getDate() - birthDate.getDate();

        // Si l'anniversaire n'est pas encore passé cette année, soustraire un an de l'âge
        if (month < 0 || (month === 0 && day < 0)) {
            return age - 1;
        }
        return age;
    }

    // Validation de la date de naissance (16 ans minimum)
    document.getElementById("date_naissance").addEventListener("input", function() {
        const dateNaissance = new Date(this.value);
        const age = validateAge(dateNaissance);
        const errorMessageDate = document.getElementById("dateErreur");

        if (age < 16) {
            errorMessageDate.innerHTML = "Vous devez avoir au moins 16 ans pour vous inscrire.";
            errorMessageDate.style.display = "block";
        } else {
            errorMessageDate.innerHTML = "";
            errorMessageDate.style.display = "none";
        }
    });

    // Gestion de la soumission du formulaire
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let password = document.getElementById("motdepasse").value;
        let confirmPassword = document.getElementById("verifmotdepasse").value;

        let dateNaissance = new Date(document.getElementById("date_naissance").value);
        const age = validateAge(dateNaissance);
        let errorMessageDate = document.getElementById("dateErreur");

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Veuillez respecter les critères du mot de passe.");
            return;
        }

        // Vérification de l'âge
        if (age < 16) {
            alert("Vous devez avoir au moins 16 ans pour vous inscrire.");
            return;
        }

        // Envoi de la requête d'inscription (vous pouvez ajouter votre code API ici)
        alert("Inscription réussie!");
    });
});
