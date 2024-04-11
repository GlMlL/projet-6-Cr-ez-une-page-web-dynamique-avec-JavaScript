function onCloseButtonClick() {
    const modalContainer = event.target.closest(".modal-background");

    modalContainer.ariaHidden = true;
}
