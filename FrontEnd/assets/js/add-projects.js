// Récupérer le formulaire et le bouton d'ajout de photo
const photoForm = document.getElementById("photo-form");
const addPhotoButton = document.querySelector(".upload-btn");

// Désactiver le bouton d'ajout de photo par défaut
addPhotoButton.disabled = true;

// Fonction pour gérer la sélection de fichier
function handleFileSelection() {
    const files = document.getElementById("image").files;
    
    // Activer le bouton si des fichiers sont sélectionnés, sinon le désactiver
    addPhotoButton.disabled = files.length === 0;
}

// Ajouter un écouteur d'événements sur le changement de sélection de fichier
document.getElementById("image").addEventListener("change", handleFileSelection);

// Fonction pour gérer la soumission du formulaire
function onPhotoSubmit(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(event.target);

    // Envoyer les données du formulaire à l'API
    const adminToken = sessionStorage.getItem("Token");
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${adminToken}`, // Utilisation du token récupéré depuis la session
        },
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                alert("Photo ajoutée avec succès !");
                // Rafraîchir la galerie après l'ajout de la photo (si nécessaire)
                displayGalleryContent();
            } else {
                alert("Une erreur s'est produite lors de l'ajout de la photo.");
            }
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de l'ajout de la photo :", error);
        });
}

// Ajouter un écouteur d'événements pour la soumission du formulaire
photoForm.addEventListener('submit', onPhotoSubmit);

