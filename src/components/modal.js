import { pictPopupTitle, pictPopup, pictPopupLink } from "./index.js";
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
  pictPopupLink.src = event.target.closest(".photo-grid__item-image").src;
  pictPopupTitle.textContent = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__title").textContent;
  openPopup(pictPopup);
}
