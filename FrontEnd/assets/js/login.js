// Sélectionne l'élément HTML  <form> de l'id contact et le stocke dans ma variable formInfo
const formInfo = document.querySelector("#contact form");

// Ajoute un écouteur d'événement à la soumission du formulaire
formInfo.addEventListener("submit", (e) => {
  // Empêche le rechargement de la page (comportement par defaut du navigateur)
  e.preventDefault();
  // Appelle la fonction connect pour gérer le processus d'authentification
  connect();
});

// Définit une fonction pour gérer le processus d'authentification
const connect = () => {
  // Récupere les données du formulaire à l'aide de l'objet FormData qui créé ma paire clé/valeur
  const formData = new FormData(formInfo);
  // Convertit les données du formulaire en un objet JavaScript
  const dataUser = Object.fromEntries(formData);
  
  // Envoie une requete POST à l'API d'authentification avec les données de l'utilisateur
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },//indique qu'on envoie nos info au format json
    body: JSON.stringify(dataUser), //convertit l'objet dataUser en chaine json qui est le format attendu
  })
    // Gère la réponse de l'API
    .then((response) => {
      // Vérifie si la réponse est vraie 
      if (response.ok) {
        // Si la réponse est vraie, renvoie les données JSON de la réponse
        return response.json();
      } else {
        // Si la réponse est fausse, on génère une erreur 
        throw new Error;
      }
    })
    // Traite les données JSON renvoyées par l'API après une réponse ok
    .then((data) => {
      // Stocke le jeton d'authentification dans le sessionStorage du navigateur
      sessionStorage.setItem("Token", data.token);//(clé et valeur)
      // Redirige l'utilisateur vers la page d'accueil après une authentification réussie
      document.location.href = "./index.html";
    })
    // récupère les erreurs qu'il y a eu pendant le traitement du fetch/post
    .catch((error) => {
      
      // Affiche une alerte avec un message d'erreur pour l'utilisateur
      alert("Identifiant ou mot de passe incorrect");
      // Réinitialise le formulaire pour effacer les données saisies en cas d'échec d'authentification
      formInfo.reset();
    });
};