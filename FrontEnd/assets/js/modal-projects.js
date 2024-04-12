async function displayGalleryContent() {
    const galleryContainer = document.getElementById("modal-gallery");

    // Récupérer les works à afficher
    const works = await getWorks();

    // Effacer le contenu précédent de la modal
    galleryContainer.innerHTML = "";

    // Pour chaque work, créer un élément de galerie et l'ajouter à la modal
    works.forEach((work) => galleryContainer.appendChild(createModalGalleryItem(work)));
}

// Fonction pour supprimer un work de la modal
async function removeWork(workId) {
    try {
        // Supprimer le work correspondant
        await deleteWork(workId);
        // Rafraîchir la modal après la suppression
        await displayGalleryContent();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'œuvre :", error);
    }
}

// Fonction pour créer un élément dans la modal 
function createModalGalleryItem(work) {
    const container = document.createElement("div");
    const img = document.createElement("img");
    const removeButton = document.createElement("button");

    container.className = "modal-gallery-item";

    img.src = work.imageUrl;
    img.alt = work.title;
    img.className = "modal-gallery-img";

    removeButton.className = "fa-solid fa-trash-can";
    // Lorsque le bouton de suppression est cliqué, appeler removeWork avec l'ID du work
    removeButton.addEventListener("click", () => removeWork(work.id));

    container.appendChild(img);
    container.appendChild(removeButton);

    return container;
}

// Fonction appelée lors du clic sur le bouton pour ouvrir la modal
function onOpenModalButtonClick() {
    const modalContainer = document.getElementById("project-modal");

    modalContainer.ariaHidden = false;

    // Afficher le contenu de la galerie
    displayGalleryContent();
}

async function deleteWork(workId) {
    try {
      // Afficher une boîte de dialogue de confirmation
      const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  
      // Vérifier si l'utilisateur a confirmé la suppression
      if (confirmation) {
        const adminToken = sessionStorage.getItem("Token");
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
          headers: {
            accept: "*!/!*",
            Authorization: `Bearer ${adminToken}`,
          },
        });
        if (!response.ok) {
            alert("Erreur lors de la suppression du travail.");
        }
      }
    } catch (error) {
      alert("Erreur lors de la suppression du travail.");
    }
  }
