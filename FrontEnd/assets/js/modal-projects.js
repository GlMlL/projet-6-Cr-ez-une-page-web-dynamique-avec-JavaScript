async function displayGalleryContent() {
    const galleryContainer = document.getElementById("modal-gallery");

    // Récupérer les œuvres à afficher
    const works = await getWorks();

    // Effacer le contenu précédent de la galerie
    galleryContainer.innerHTML = "";

    // Pour chaque œuvre, créer un élément de galerie et l'ajouter à la galerie
    works.forEach((work) => galleryContainer.appendChild(createModalGalleryItem(work)));
}

// Fonction pour supprimer une œuvre de la galerie
async function removeWork(workId) {
    try {
        // Vérifier si l'utilisateur est authentifié avant de supprimer l'œuvre
        const isAuthenticated = await checkAuthentication();
        if (isAuthenticated) {
            // Supprimer l'œuvre correspondante
            await deleteWork(workId);
            // Rafraîchir la galerie après la suppression
            displayGalleryContent();
        } else {
            alert("Vous devez être authentifié pour supprimer une image de la galerie.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'œuvre :", error);
    }
}

// Fonction pour créer un élément de galerie pour une œuvre donnée
function createModalGalleryItem(work) {
    const container = document.createElement("div");
    const img = document.createElement("img");
    const removeButton = document.createElement("button");

    container.className = "modal-gallery-item";

    img.src = work.imageUrl;
    img.alt = work.title;
    img.className = "modal-gallery-img";

    removeButton.className = "fa-solid fa-trash-can";
    // Lorsque le bouton de suppression est cliqué, appeler removeWork avec l'ID de l'œuvre
    removeButton.addEventListener("click", () => removeWork(work.id));

    container.appendChild(img);
    container.appendChild(removeButton);

    return container;
}

// Fonction appelée lors du clic sur le bouton pour ouvrir la galerie
function onOpenModalButtonClick() {
    const modalContainer = document.getElementById("project-modal");

    modalContainer.ariaHidden = false;

    // Afficher le contenu de la galerie
    displayGalleryContent();
}

// Fonction pour vérifier l'authentification de l'utilisateur
async function checkAuthentication() {
    try {
        const token = sessionStorage.getItem("Token");
        if (!token) return false; // Si aucun jeton n'est stocké, l'utilisateur n'est pas authentifié
        // Vérifier l'authentification en envoyant une requête à l'API
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${adminToken}`,
        },
      });
        return response.ok; // Renvoie true si l'utilisateur est authentifié, sinon false
    } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        return false; // En cas d'erreur, considérer l'utilisateur comme non authentifié
    }
}