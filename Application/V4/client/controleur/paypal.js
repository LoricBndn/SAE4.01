
paypal.Buttons({
    createOrder: function (data, actions) {
        const totalPanier = document.getElementById("prixTotal").innerText;
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalPanier
                }
            }]
        });
    },

    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            alert('Paiement approuvé par : ' + details.payer.name.given_name);

            // Envoi au backend pour enregistrer la commande
            fetch("https://devweb.iutmetz.univ-lorraine.fr/~ruiz41u/SAE4.01/sae401_2425/serveur/api/payer.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ id_us: cookieValue })
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Commande validée avec succès !");
                    window.location.href = "accueil.html";
                } else {
                    alert("Erreur lors de la commande : " + data.message);
                }
            })
            .catch(err => {
                console.error("Erreur lors de l'enregistrement:", err);
                alert("Erreur réseau lors de la validation de commande");
            });
        });
    }
}).render('#paypal-button-container');