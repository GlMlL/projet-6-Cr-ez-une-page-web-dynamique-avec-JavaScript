// Récupérer le formulaire et le bouton d'ajout de photo
const photoForm = document.getElementById("photo-form");
const addPhotoButton = document.querySelector(".upload-btn");

// Ajouter un écouteur d'événements sur le bouton d'ajout de photo
addPhotoButton.addEventListener("click", () => {
    // Cliquer sur l'élément de type 'file' (input type="file") lorsque le bouton est cliqué
    document.getElementById("image").click();
});

// Ajouter un écouteur d'événements sur le changement de valeur de l'input type="file"
document.getElementById("image").addEventListener("change", () => {
    // Afficher le nom du fichier sélectionné dans l'élément de prévisualisation
    const file = document.getElementById("image").files[0];
    const preview = document.querySelector(".preview");
    preview.textContent = `Fichier sélectionné : ${file.name}`;
});

// Fonction pour gérer la soumission du formulaire
function onPhotoSubmit(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(photoForm);

    // Envoyer les données du formulaire à l'API
    fetch("http://localhost:5678/api/works", {
        method: "POST",
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