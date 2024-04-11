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

    removeButton.className = "modal-img-remove";
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

