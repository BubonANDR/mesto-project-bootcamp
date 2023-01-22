import { closePopup } from "./modal.js";

export const escapeKeydown = (event) => {
  if (event.key == "Escape" || event.key == "Esc") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};



export const putSavingStatus = (form) =>
  (form.querySelector(".popup__button").textContent = "Сохранение...");
export const putSavedStatus = (form) =>
  (form.querySelector(".popup__button").textContent = "Сохранить");
