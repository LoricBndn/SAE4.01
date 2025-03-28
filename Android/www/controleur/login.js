document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");
    const passwordError = document.getElementById("passwordError");
    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");

    // Afficher/Masquer le mot de passe
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });

    // Gestion du formulaire
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        loginError.classList.add("hidden");
        passwordError.classList.add("hidden");

        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (login === "" || password === "") {
            if (login === "") loginError.classList.remove("hidden");
            if (password === "") passwordError.classList.remove("hidden");
            return;
        }

        // Envoi des données
        fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/connexion.php", {
            method: "POST",
            body: new URLSearchParams({
                identifiant: login,
                mdp: password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                let date_expiration = new Date();
                date_expiration.setTime(date_expiration.getTime() + 1 * 60 * 60 * 1000);
                document.cookie = `id_user=${data.id_user};expires=${date_expiration.toUTCString()};path=/`;
                window.location.href = "accueil.html";
            } else {
                loginError.textContent = "Identifiant ou mot de passe incorrect.";
                loginError.classList.remove("hidden");
            }
        })
        .catch((error) => {
            console.log(error);
            loginError.textContent = "Erreur de connexion au serveur.";
            loginError.classList.remove("hidden");
        });
    });
});
