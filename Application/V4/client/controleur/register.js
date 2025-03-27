document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    const inputs = {
        nom: document.getElementById("nom"),
        prenom: document.getElementById("prenom"),
        login: document.getElementById("login"),
        motdepasse: document.getElementById("motdepasse"),
        verifmotdepasse: document.getElementById("verifmotdepasse"),
        email: document.getElementById("email"),
        date_naissance: document.getElementById("date_naissance"),
    };

    const errors = {
        login: document.getElementById("loginError"),
        verifmotdepasse: document.getElementById("verifmotdepasseErreur"),
        email: document.getElementById("emailErreur"),
        date_naissance: document.getElementById("dateErreur"),
    };

    const passwordErrors = [
        document.getElementById("mdpErreur1"),
        document.getElementById("mdpErreur2"),
        document.getElementById("mdpErreur3"),
        document.getElementById("mdpErreur4"),
        document.getElementById("mdpErreur5"),
    ];



    Object.values(errors).forEach(error => {
        if (error) error.classList.add("hidden");
    });
    
    passwordErrors.forEach(error => {
        if (error) error.classList.add("hidden");
    });
    
    function showError(input, errorElement, message) {
        input.classList.add("border-red-500");
        errorElement.textContent = message;
        errorElement.classList.remove("hidden");
        errorElement.classList.add("text-red-500", "text-sm", "mt-1");
    }

    function clearError(input, errorElement) {
        input.classList.remove("border-red-500");
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
    }

    function validatePassword() {
        const value = inputs.motdepasse.value;
        const rules = [/.{8,}/, /[A-Z]/, /[a-z]/, /[!@#$%^&*(),.?":{}|<>]/, /\d/];
        let isValid = true;

        rules.forEach((rule, index) => {
            if (rule.test(value)) {
                passwordErrors[index].classList.add("hidden");
            } else {
                passwordErrors[index].classList.remove("hidden");
                passwordErrors[index].classList.add("text-red-500", "text-sm", "mt-1");
                isValid = false;
            }
        });
        return isValid;
    }

    function validateConfirmPassword() {
        if (inputs.motdepasse.value !== inputs.verifmotdepasse.value) {
            showError(inputs.verifmotdepasse, errors.verifmotdepasse, "Les mots de passe ne correspondent pas.");
            return false;
        }
        clearError(inputs.verifmotdepasse, errors.verifmotdepasse);
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email.value)) {
            showError(inputs.email, errors.email, "Adresse mail non valide.");
            return false;
        }
        clearError(inputs.email, errors.email);
        return true;
    }

    function validateAge() {
        const birthDateValue = inputs.date_naissance.value;
        
        if (!birthDateValue) {
            console.log("Aucune date de naissance entrée.");
            showError(inputs.date_naissance, errors.date_naissance, "Veuillez entrer une date de naissance.");
            return false;
        }
    
        const birthDate = new Date(birthDateValue);
        if (isNaN(birthDate.getTime())) {
            console.log("Date de naissance invalide.");
            showError(inputs.date_naissance, errors.date_naissance, "Date de naissance invalide.");
            return false;
        }
    
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
    
        console.log("Âge calculé :", age);
    
        if (age < 16) {
            console.log("Utilisateur trop jeune.");
            showError(inputs.date_naissance, errors.date_naissance, "Vous devez avoir au moins 16 ans.");
            return false;
        }
    
        console.log("Âge valide.");
        clearError(inputs.date_naissance, errors.date_naissance);
        return true;
    }
        inputs.date_naissance.addEventListener("input", validateAge);
    
    

    // function checkLoginExists() {
    //     return fetch(`https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/checkLogin.php?login=${inputs.login.value}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.exists) {
    //                 showError(inputs.login, errors.login, "Cet identifiant est déjà pris.");
    //                 return false;
    //             }
    //             clearError(inputs.login, errors.login);
    //             return true;
    //         })
    //         .catch(() => {
    //             showError(inputs.login, errors.login, "Erreur lors de la vérification du login.");
    //             return false;
    //         });
    // }





    function register() {
        if (!validatePassword() || !validateConfirmPassword() || !validateEmail() || !validateAge()) {
            return;
        }

        // const loginAvailable = await checkLoginExists();
        // if (!loginAvailable) {
        //     return;
        // }


        const user = {
            nom: inputs.nom.value,
            prenom: inputs.prenom.value,
            identifiant: inputs.login.value,  
            mdp: inputs.motdepasse.value,
            email: inputs.email.value,  
            date_naissance: inputs.date_naissance.value, 
        };
    
        fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/newUtilisateur.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(user),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {

                const loginData = new URLSearchParams({
                    identifiant: user.identifiant,
                    mdp: user.mdp,
                });
                
                return fetch("https://devweb.iutmetz.univ-lorraine.fr/~bondon3u/2A/SAE4.01/Application/V4/serveur/api/connexion.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: loginData, 
                });
            } else {
                showError(inputs.login, errors.login, data.message);
                throw new Error("Inscription échouée: " + data.message);
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse de la connexion:", data); 
            if (data.id_user) {  
                let date_expiration = new Date();
                date_expiration.setTime(date_expiration.getTime() + 1 * 60 * 60 * 1000);
                document.cookie = "id_user=" + data.id_user + ";expires=" + date_expiration.toUTCString() + ";path=/";
                window.location.href = "accueil.html";
            } else {
                console.error("Échec de la connexion. Détails:", data); 
                loginError.textContent = "Identifiant ou mot de passe incorrect.";
                loginError.classList.remove("hidden");
            }
        })
        .catch(error => {
            console.error("Erreur serveur:", error);
            loginError.textContent = "Erreur de connexion au serveur.";
            loginError.classList.remove("hidden");
        });
        
    }
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        register();
    });

    document.getElementById("togglePassword").addEventListener("click", function () {
        if (inputs.motdepasse.type === "password") {
            inputs.motdepasse.type = "text";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            inputs.motdepasse.type = "password";
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
        
    });
    document.getElementById("togglePasswordConfirm").addEventListener("click", function () {
        if (inputs.verifmotdepasse.type === "password") {
            inputs.verifmotdepasse.type = "text";
            eyeIconConfirm.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            inputs.verifmotdepasse.type = "password";
            eyeIconConfirm.classList.replace("fa-eye-slash", "fa-eye");
        }
        
    });


    inputs.email.addEventListener("input", validateEmail);
    inputs.motdepasse.addEventListener("input", validatePassword);
    inputs.verifmotdepasse.addEventListener("input", validateConfirmPassword);
});
