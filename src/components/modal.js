import { pictPopupTitle, pictPopup, pictPopupImage } from "./index.js";
import { escapeKeydown } from "./utils.js";
export const closePopup = (somepopup) => {
  somepopup.classList.remove("popup_opened");
  document.removeEventListener("keydown",escapeKeydown);
};

export const openPopup = (somepopup) => {
  somepopup.classList.add("popup_opened");
  document.addEventListener("keydown",escapeKeydown);
};

export function openPicture(event) {
  pictPopupImage.src = event.target.closest(".photo-grid__item-image").src;
  pictPopupImage.alt = event.target.closest(".photo-grid__item-image").alt;
  pictPopupTitle.textContent = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__title").textContent;
  openPopup(pictPopup);
}
