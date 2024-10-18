// BOUTTON DE REMONTE DE PAGE 

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Animation fluide
    });
}

// Affiche le bouton de retour en haut lorsqu'on fait défiler vers le bas
window.onscroll = function() {
    const button = document.getElementById('back-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.classList.add('show'); 
    } else {
        button.classList.remove('show'); 
    }
};

// CITATION ALEATOIRE

const quotes = [
    "Le code est comme de l'humour. Quand il faut l'expliquer, c'est mauvais. – Cory House",
    "La meilleure façon de prédire l'avenir est de l'inventer. – Alan Kay",
    "Les programmes doivent être écrits pour que les gens puissent les lire et seulement accessoirement pour que les machines puissent les exécuter. – Harold Abelson",
    "La simplicité est l'âme de l'efficacité. – Austin Freeman",
    "En programmation, la clarté est plus importante que la brièveté. – Inconnu",
    "Tout imbécile peut écrire du code que l'ordinateur peut comprendre. Les bons programmeurs écrivent du code que les humains peuvent comprendre. – Martin Fowler",
    "La programmation est une danse entre le code et la créativité. – Inconnu",
    "Il n'y a pas de code parfait. Il n'y a que des itérations. – Inconnu",
    "La meilleure façon de résoudre un problème est d'écrire un programme qui le résout. – Inconnu",
    "La passion et la curiosité sont les véritables moteurs d'un bon développeur. – Inconnu"
];

let currentQuoteIndex = 0;

function showQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.classList.remove('show'); // Masque la citation actuelle

    setTimeout(() => {
        quoteElement.innerText = quotes[currentQuoteIndex];
        quoteElement.classList.add('show'); // Affiche la nouvelle citation
    }, 500); // Délai pour masquer la citation précédente

    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length; // Passe à la citation suivante
}

// Afficher la première citation au chargement de la page
showQuote();

// Changer de citation automatiquement toutes les 5 secondes
setInterval(showQuote, 5000);

// PROGRESS BAR

document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(function(bar) {
        const value = bar.getAttribute('aria-valuenow');
        setTimeout(function() {
            bar.style.width = value + '%';
        }, 500);
    });
});


// FORMULAIRE
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Réinitialiser les erreurs
    resetErrors();

    let formIsValid = true;

    // Validation de la civilité
    const civilite = document.querySelector('input[name="civilite"]:checked');
    if (!civilite) {
        formIsValid = false;
        showError('civilite', 'Veuillez sélectionner une civilité.');
    }

    // Validation du nom
    const nom = document.getElementById('nom');
    if (nom.value.trim() === "") {
        formIsValid = false;
        showError('nom', 'Veuillez entrer votre nom.');
    }

    // Validation du prénom
    const prenom = document.getElementById('prenom');
    if (prenom.value.trim() === "") {
        formIsValid = false;
        showError('prenom', 'Veuillez entrer votre prénom.');
    }

    // Validation de l'email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex basique pour vérifier les emails
    if (!emailPattern.test(email.value)) {
        formIsValid = false;
        showError('email', 'Veuillez entrer une adresse email valide.');
    }

    // Validation du message
    const message = document.getElementById('message');
    if (message.value.trim() === "") {
        formIsValid = false;
        showError('message', 'Veuillez entrer votre message.');
    }

    // Si tout est valide, on peut soumettre le formulaire
    if (formIsValid) {
        // Soumission du formulaire via fetch API
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                Accept: 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Redirection vers la page de remerciement
                window.location.href = "merci.html"; // Remplacez par votre page de remerciement
            } else {
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi du formulaire : ", error);
            alert("Une erreur s'est produite. Veuillez réessayer.");
        });
    }
});

function resetErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(function(error) {
        error.style.display = 'none';
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
        
    