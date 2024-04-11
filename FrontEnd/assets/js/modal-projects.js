async function displayGalleryContent() {
    const galleryContainer = document.getElementById("modal-gallery");

    const works = await getWorks();

    galleryContainer.innerHTML = "";

    works.forEach((work) => galleryContainer.appendChild(createModalGalleryItem(work)));
}

async function removeWork(workId) {

    displayGalleryContent();
}

function createModalGalleryItem(work) {
    const container = document.createElement("div");
    const img = document.createElement("img");
    const  removeButton = document.createElement("button");

    container.className = "modal-gallery-item";

    img.src = work.imageUrl;
    img.alt = work.title;
    img.className = "modal-gallery-img";

    removeButton.className = "fa-solid fa-trash-can";
    removeButton.addEventListener("click", () => removeWork(work.id));

    container.appendChild(img);
    container.appendChild(removeButton);

    return container;
}


function onOpenModalButtonClick() {
    const modalContainer = document.getElementById("project-modal");

    modalContainer.ariaHidden = false;

    displayGalleryContent();
}
async function removeWork(workId) {
    try {
        const isAuthenticated = await checkAuthentication(); // Vérifie si l'utilisateur est authentifié
        if (isAuthenticated) {
            await deleteWork(workId);
            displayGalleryContent(); // Rafraîchir la galerie après la suppression
        } else {
            alert("Vous devez être authentifié pour supprimer une image de la galerie.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'œuvre :", error);
    }
}

async function checkAuthentication() {
    try {
        const token = sessionStorage.getItem("Token");
        if (!token) return false; // Si aucun jeton n'est stocké, l'utilisateur n'est pas authentifié
        const response = await fetch("http://localhost:5678/api/users/authenticate", {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.ok; // Renvoie vrai si la requête a réussi (utilisateur authentifié), sinon faux
    } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        return false; // En cas d'erreur, considérer l'utilisateur comme non authentifié
    }
}

