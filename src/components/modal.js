import { pictPopupTitle, pictPopup, pictPopupLink } from "./index.js";
export const closePopup = (somepopup) => {
  somepopup.classList.remove("popup_opened");
};

export const openPopup = (somepopup) => {
  somepopup.classList.add("popup_opened");
};

export function openPicture(event) {
  pictPopupLink.src = event.target.closest(".photo-grid__item-image").src;
  pictPopupTitle.textContent = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__title").textContent;
  openPopup(pictPopup);
}
