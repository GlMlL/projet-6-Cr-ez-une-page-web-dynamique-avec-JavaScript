function logout() {
    // Supprime le jeton d'authentification du sessionStorage
    sessionStorage.removeItem("Token");
    // Redirige l'utilisateur vers la page d'accueil
    window.location.href = "index.html";
}
 
 // Gestion logout
 function modifyToLogout() {
    
    const login = document.querySelector(".loginPage");
    // Vérifie si l'utilisateur est déjà connecté
    if (sessionStorage.getItem("Token")) {
      login.innerHTML = "logout";
    } else {
      login.innerHTML = "login"; // Modifie le texte du bouton en "login"
    }
    login.addEventListener("click", (e) => {
      e.preventDefault();
      // Si l'utilisateur est déjà connecté, appelle la fonction de déconnexion
      if (sessionStorage.getItem("Token")) {
        logout();
      } else {
        // Sinon, redirige l'utilisateur vers la page de connexion
        window.location.href = "login.html"; 
      }
    });
   
   }

   modifyToLogout()