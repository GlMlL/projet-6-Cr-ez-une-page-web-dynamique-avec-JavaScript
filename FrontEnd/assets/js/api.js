/***variables***/
const gallery = document.querySelector('.gallery'); /* récupère ma classe css*/
const Filters = document.querySelector(".filters");
/* fonction qui retourne le tableau des works*/

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
    
}


/* affichage des works */
async function displayWorks() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach((Work) => {
    createWorkElement(Work);
   });
}

displayWorks() 


function createWorkElement(Work){  
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    img.src = Work.imageUrl;
    figcaption.textContent = Work.title;
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
} 
 

// récupération du tableau des categories

async function GetCategorys() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

async function displayCategorysbutton() {
    const categorys = await GetCategorys();
    categorys.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name.toUpperCase();
        btn.id = category.id;
        Filters.appendChild(btn);
    });
}
displayCategorysbutton();

// filtrage au click par categorie

async function filterCategory(){
    const workStore = await getWorks();
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(button => {
        button.addEventListener("click",(e) =>{
        btnId = e.target.id;
        gallery.innerHTML ="";// nettoie la gallery
        if (btnId !== "0") {
            const sortByWork = workStore.filter((Work)=>{
                return Work.categoryId == btnId;
            });
            sortByWork.forEach(Work => {
                createWorkElement(Work);
                
            });
        }else{
            displayWorks();
        }
        });
    })
}
filterCategory();
