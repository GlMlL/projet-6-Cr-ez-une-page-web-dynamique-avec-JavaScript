/**variables**/

// Sélectionne l'élément HTML avec la classe "gallery" et le stocke dans la variable gallery
const gallery = document.querySelector('.gallery'); /* récupère ma classe css*/

// Sélectionne l'element HTML avec la classe "filters" et le stocke dans la variable Filters
const Filters = document.querySelector(".filters");

let workStore = Array(); //Initialise un tableau vide nommé workStore

/* fonction qui retourne le tableau des works*/

// Fonction asynchrone qui recupere les works depuis l'API
async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json(); // Renvoie les works au format json
}

                /* affichage des works */

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

// Sélectionnez l'élément parent contenant le titre "Mes Projets"
const projectsTitle = document.querySelector('#portfolio h2');

// Fonction pour créer le bouton "Modifier"
function createModifierButton() {
    // Vérifiez si l'utilisateur est connecté en vérifiant la présence du jeton d'authentification dans le sessionStorage
    if (sessionStorage.getItem("Token")) {
        // Créez un bouton pour la modification
        const modifierButton = document.createElement('button');
        modifierButton.textContent = 'Modifier';
        modifierButton.classList.add('modifier-button');

        // Ajoutez un gestionnaire d'événements pour le clic sur le bouton Modifier
        modifierButton.addEventListener('click', () => {
            const modal = document.getElementById("myModal");
            modal.style.display = "block"; // Affiche la modal lorsque le bouton "Modifier" est cliqué
        });

        // Insérez le bouton Modifier après le titre "Mes Projets"
        projectsTitle.insertAdjacentElement('afterend', modifierButton);
    }
}

// Fonction pour créer l'icône de fermeture
function createCloseIcon() {
    // Créez une balise <i> pour l'icône de fermeture
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark', 'close-icon');
    
    // Ajoutez un gestionnaire d'événements pour la fermeture de la modal lors du clic sur l'icône
    closeIcon.addEventListener('click', () => {
        closeModal(); // Appel de la fonction pour fermer la modal
    });

    return closeIcon; // Retourne l'icône créée
}

// Fonction pour fermer la modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none"; // Cache la modal
}

// Création et ajout de l'icône de fermeture à la modal
const closeIcon = createCloseIcon();
const modalContent = document.querySelector('.modal-content');
modalContent.insertBefore(closeIcon, modalContent.firstChild);

// Appel de la fonction pour créer le bouton "Modifier"
createModifierButton();