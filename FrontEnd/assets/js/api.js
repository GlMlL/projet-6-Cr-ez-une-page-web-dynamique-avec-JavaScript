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

function hideModifierElement() {
    // Vérifiez si l'utilisateur est déconnecté en vérifiant l'absence du jeton d'authentification dans le sessionStorage
    if (sessionStorage.getItem("Token") == null) {
        // Sélectionnez tous les éléments de modification à masquer
        const modifierElements = document.querySelectorAll('.Bar-modif-2, .Mode-bar');
        
        // Parcourez tous les éléments sélectionnés
        modifierElements.forEach(modifierElement => {
            // Masquez l'élément en lui ajoutant la classe 'hidden'
            modifierElement.classList.add('hidden');
        });
    }
}

// Appel de la fonction pour masquer les éléments de modification lors du chargement de la page
hideModifierElement();



