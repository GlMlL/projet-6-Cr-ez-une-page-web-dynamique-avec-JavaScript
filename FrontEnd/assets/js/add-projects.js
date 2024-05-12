// Sélection du bouton de chargement de fichier
const addPhotoButton = document.querySelector(".upload");

// Ajout d'un écouteur d'événements pour le changement du bouton de chargement de fichier
addPhotoButton.addEventListener("change", () => {
    // Récupération du fichier sélectionné dans le champ d'entrée de fichier avec l'ID "image"
    const file = document.getElementById("image").files[0];
    // Sélection de l'élément img qui servira à afficher l'aperçu de l'image
    const previewImage = document.getElementById("preview-image");
    // Sélection de la div de prévisualisation qui contient l'image de prévisualisation
    const previewBox = document.querySelector(".preview");

    // Vérification si un fichier a été sélectionné
    if (file) {
        // Création d'une URL objet pour le fichier sélectionné
        const imageURL = URL.createObjectURL(file);
        // Mise à jour de la source de l'image de prévisualisation avec l'URL objet
        previewImage.src = imageURL;
        // Affichage ou masquage de la div de prévisualisation en basculant la classe 'hidden'
        previewBox.classList.toggle('hidden');
        // Masquage du contenu de chargement en basculant la classe 'hidden'
        document.querySelector(".upload-content").classList.toggle('hidden');
    } else {
        // Si aucun fichier n'est sélectionné, masquer la div de prévisualisation
        previewBox.classList.add('hidden');
    }
});

// Ajout d'un écouteur d'événements pour la soumission du formulaire
document.getElementById("photo-form").addEventListener("submit", event => {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    // Création d'un objet FormData pour récupérer les données du formulaire
    const formData = new FormData(event.target);
    
    // Récupération du token d'administrateur depuis la session
    const adminToken = sessionStorage.getItem("Token");

    // Envoi de la requête POST au serveur avec les données du formulaire
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${adminToken}`
        },
        body: formData,
    })
    .then(response => {
        // Gestion de la réponse de la requête
        if (response.ok) {
            // Si la réponse est OK, afficher une alerte de succès et actualiser la galerie d'images
            alert("Photo ajoutée avec succès !");
            displayGalleryContent();
        } else {
            // Si la réponse est différente de OK, afficher une alerte d'erreur
            alert("Une erreur s'est produite lors de l'ajout de la photo.");
        }
    })
     .catch(error => {
        // Gestion des erreurs de requête
        console.error("Une erreur s'est produite lors de l'ajout de la photo :", error);
    });
});

// Fonction pour activer ou désactiver le bouton valider
function toggleSubmitButton() {
    // Sélection des éléments du formulaire
    const previewImageInput = document.getElementById("image");
    const formSelectInput = document.getElementById("category");
    const formTitleInput = document.getElementById("title");
    const btnSubmit = document.getElementById("submit-btn");

    // Vérification si un fichier est sélectionné
    const fileSelected = previewImageInput.files && previewImageInput.files.length > 0;

    // Vérification si le formulaire est valide
    const formValid =
        (fileSelected || previewImageInput.value) &&
        formSelectInput.value.trim() !== "" &&
        formTitleInput.value.trim() !== "";

    // Activation ou désactivation du bouton valider en fonction de la validité du formulaire
    btnSubmit.disabled = !formValid;
    // Ajout ou suppression de la classe 'enabled' en fonction de la validité du formulaire
    
}
document.querySelector("#photo-form").addEventListener('change',toggleSubmitButton);