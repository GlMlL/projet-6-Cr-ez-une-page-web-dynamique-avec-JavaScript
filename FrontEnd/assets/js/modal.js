document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.modal-button-close');

    closeButton.addEventListener('click', function(event) {
        // Récupère l'élément parent le plus proche avec la classe "modal-background" à partir de l'élément déclencheur de l'événement
        const modalContainer = event.target.closest(".modal-background");

        // Définit l'attribut ariaHidden de l'élément modalContainer sur true pour masquer la modal
        modalContainer.setAttribute('aria-hidden', 'true');
    });
});