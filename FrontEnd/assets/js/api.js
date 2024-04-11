// Sélectionne l'élément HTML avec la classe "gallery" et le stocke dans la variable gallery
const gallery = document.querySelector('.gallery');

// Sélectionne l'element HTML avec la classe "filters" et le stocke dans la variable Filters
const Filters = document.querySelector(".filters");

let workStore = Array(); //Initialise un tableau vide nommé workStore

// Fonction asynchrone qui recupere les works depuis l'API
async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json(); // Renvoie les works au format json
}

// Fonction asynchrone qui affiche les works
async function displayWorks() {
    // Récupere les works depuis l'API et les stocke dans WorkStore
    workStore = await getWorks();
    workStore.forEach((Work) =>{
    createWorkElement(Work); //Appelle la fonction createWorkElement pour chaque work
    });
}

displayWorks(); // Appelle la fonction displayWorks pour afficher les works au chargement de la page

// Fonction qui cree un element HTML representant un work
function createWorkElement(Work){  
    const figure = document.createElement('figure'); // Crée un élément <figure>
    const img = document.createElement('img'); // Crée un élément <img>
    const figcaption = document.createElement('figcaption'); // Crée un élément <figcaption>

    // Définit l'URL de l'image du work
    img.src = Work.imageUrl;

    // Affiche le texte de l'image du work
    figcaption.textContent = Work.title;

    // Ajoute l'element img comme 1er enfant de figure
    figure.appendChild(img);

    // Ajoute l'element figcaption comme 1er enfant de figure
    figure.appendChild(figcaption);

    // Ajoute l'element figure comme 1er enfant de gallery
    gallery.appendChild(figure);
} 

// récupération du tableau des categories

//*affichage des boutton //*

// Fonction asynchrone qui recupere les categories depuis l'API
async function GetCategorys() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json(); // Renvoie les categories au format json
}

// Fonction asynchrone qui va gerer l'affichage des bouttons
async function displayCategorysbutton() {
    // Recupere les categories depuis l'API et les stocke dans la variable categorys
    const categorys = await GetCategorys();

    // Pour chaque categorie, cree un bouton et l'ajoute à l'element Filters
    categorys.forEach((category) => {
        const btn = document.createElement("button"); // Cree un element <button>
        btn.textContent = category.name.toUpperCase(); // Definit le texte du bouton
        btn.id = category.id; // Definit l'ID du bouton
        Filters.appendChild(btn); // Ajoute le bouton à l'élément Filters
    });
}

// Fonction pour masquer les filtres si l'utilisateur est connecté
function hideFilters() {
    // Vérifie si l'utilisateur est connecté en vérifiant l'existence du jeton d'authentification dans le sessionStorage
    if (sessionStorage.getItem("Token") !== null) {
        // Masque les filtres en ajoutant la classe 'hidden' à l'élément Filters
        Filters.classList.add('hidden');
    }
}

// Appelle la fonction pour masquer les filtres si nécessaire
hideFilters();

displayCategorysbutton(); // Appelle la fonction displayCategorysbutton pour afficher les catégories en boutton

//* filtrage au click par categorie//*

// Fonction asynchrone qui filtre les travaux en fonction de la categorie selectionnée
async function filterCategory(){
    const workStore = await getWorks(); // Récupere les works depuis l'API et les stocke dans workStore
    const buttons = document.querySelectorAll(".filters button"); // Selectionne tous les boutons de categorie

    // Pour chaque bouton, ajoute un ecouteur d'evenements pour le clic
    buttons.forEach(button => {
        button.addEventListener("click",(e) => { // (e)= fonction de rappel raccourci pour event
            btnId = e.target.id; // Récupère l'ID du bouton cliqué et stocke l'Id dans btnId
            gallery.innerHTML = ""; // Nettoie le contenu de la galerie

            if (btnId !== "0") { //!== est l'opérateur de comparaison strictement différent en js
                // Filtre les works pour ne garder que ceux appartenant a la categorie selectionnée
                const sortByWork = workStore.filter((Work) => {
                    return Work.categoryId == btnId;
                });  //filtre le workStore en fonction de l'Id
                
                // Pour chaque work filtré, cree un element correspondant
                sortByWork.forEach(Work => {
                    createWorkElement(Work); // Appelle la fonction createWorkElement pour chaque work
                });
            } else {
                displayWorks(); // appelle la fonction qui tout les works quand on clique sur le boutton tous grace au 1er ftehc
            }
        });
    });
}

filterCategory(); // Appelle la fonction filterCategory pour activer le filtrage par categorie

// Fonction pour masquer "modifier" lorsque l'utilisateur est déconnecté
function hideModifierElement() {
    // Vérifiez si l'utilisateur est déconnecté en vérifiant l'absence du jeton d'authentification dans le sessionStorage
    if (sessionStorage.getItem("Token") == null) {
        //élément de modification à masquer
        const modifierElement = document.querySelector('.Bar-modif-2');
        // Vérifiez si l'élément existe dans le DOM
        if (modifierElement) {
            // Masquez l'élément en lui ajoutant la classe 'hidden'
            modifierElement.classList.add('hidden');
        }
    }
}

// Appel de la fonction pour masquer l'élément de modification si nécessaire
hideModifierElement();

// Sélectionne "myModal"  
const modal = document.querySelector(".myModal");

// Fonction pour ouvrir la modal
function openModal(e) {
    // Empêche le comportement par défaut du clic sur le bouton
    e.preventDefault();
    
    // Affiche le modal en modifiant son style CSS
    modal.style.display = "block";
    
    // Supprime l'attribut aria-hidden pour rendre le modal accessible
    modal.removeAttribute("aria-hidden");
    
    // Ajoute l'attribut aria-modal pour indiquer qu'il s'agit d'un modal
    modal.setAttribute("aria-modal", "true");
    
    // Ajoute un écouteur d'événements pour fermer la modal en cliquant dessus
    modal.addEventListener("click", closeModal);
    
    // Ajoute un écouteur d'événements pour fermer la modal en cliquant sur le bouton de fermeture
    modal.querySelector(".close-modal").addEventListener("click", closeModal);
    
    // Afficher les works dans la modal
    displayWorksInModal();
};

// Fonction pour afficher les works dans la modal
async function displayWorksInModal() {
    // Récupérer les works depuis l'API
    const works = await getWorks();

    // Sélectionner l'élément qui contiendra le contenu de la modal
    const galleryContentModalFirst = document.querySelector(".gallery-listener");

    // Effacer le contenu précédent du conteneur de la modal
    galleryContentModalFirst.innerHTML = "";

    // Vérifier si des works ont été récupérés
    if (works.length > 0) {
        // Pour chaque work, créer un élément dans la modal
        works.forEach(Work => {
            const modalFirst = document.createElement("figure");
            modalFirst.classList.add("gallery-popinFirst");
            modalFirst.id = `modal-${Work.id}`;

            const imgModalFirst = document.createElement("img");
            imgModalFirst.classList.add("modal-img");
            imgModalFirst.src = Work.imageUrl;

            modalFirst.appendChild(imgModalFirst);
            galleryContentModalFirst.appendChild(modalFirst);
        });
    } else {
        // Afficher un message si aucun work n'est disponible
        galleryContentModalFirst.innerHTML = "<p>Aucun work disponible.</p>";
    }
}

// Fonction pour fermer la modal
const closeModal = function (e) {
    // Vérifie si la modal existe
    if (modal === null) return;
    
    // Empêche le comportement par défaut du clic sur le bouton de fermeture
    e.preventDefault();
    
    // Masque la modal en modifiant son style CSS
    modal.style.display = "none";
    
    // Ajoute l'attribut aria-hidden pour masquer la modal des lecteurs d'écran
    modal.setAttribute("aria-hidden", "true");
    
    // Supprime l'attribut aria-modal car la modal n'est plus ouvert
    modal.removeAttribute("aria-modal");
    
    // Supprime les écouteurs d'événements 
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".close-modal").removeEventListener("click", closeModal);
};

// Ajoute un écouteur d'événements pour détecter la pression de la touche "Escape"
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
});

// Attend que le contenu de la page soit entièrement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne tous les boutons ayant la classe "Bar-modif-2"
    const modalButtons = document.querySelectorAll(".Bar-modif-2");
    
    // Ajoute un écouteur d'événements à chaque bouton pour détecter les clics
    modalButtons.forEach((button) => {
        button.addEventListener("click", openModal);
    });
});