/***variables***/
const gallery = document.querySelector('.gallery')

/* fonction qui retourne le tableau des works*/

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
    
}
getWorks()

/* affichage des works */
async function displayWorks() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach((Work) => {
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const figcaption = document.createElement('figcaption')
        img.src = Work.imageUrl;
        figcaption.textContent = Work.title;
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)


    });
}

displayWorks()

