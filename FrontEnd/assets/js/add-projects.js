// Récupérer le formulaire et le bouton d'ajout de photo

const addPhotoButton = document.querySelector(".upload-btn");



document.getElementById("image").addEventListener("change", () => {
    const file = document.getElementById("image").files[0];
    const previewImage = document.getElementById("preview-image");
    const previewBox = document.querySelector(".preview"); //div qui englobe l'image et le texte

    // Vérifier si un fichier est sélectionné
    if (file) {
        // Créer un objet URL pour l'image sélectionnée
        const imageURL = URL.createObjectURL(file);

        // Afficher l'image en prévisualisation
        previewImage.src = imageURL;
        previewBox.classList.toggle('hidden');
        document.querySelector(".upload-content").classList.toggle('hidden');

       
    } else {
        // Cacher l'image et le texte de prévisualisation si aucun fichier n'est sélectionné
        
        previewBox.classList.add('hidden');
    }
});

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
document.getElementById("photo-form").addEventListener( 'submit', onPhotoSubmit);

