import { openPicture } from "./modal.js";



function deleteCard(event) {
  console.log(event.target);
  event.target.closest(".photo-grid__item").remove();
}
function likePicture(event) {
  console.log(event.target);
  event.target
    .closest(".photo-grid__like-button")
    .classList.toggle("photo-grid__like-button_liked");
}
export const createCard = (imglink, imgtitle,gridtemplate) => {
  const card = gridtemplate.cloneNode(true);
  card.querySelector(".photo-grid__item-image").src = imglink;
  card.querySelector(".photo-grid__title").textContent = imgtitle;
  card
    .querySelector(".photo-grid__delete-button")
    .addEventListener("click", deleteCard);
  card
    .querySelector(".photo-grid__item-image")
    .addEventListener("click", openPicture);
  card
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", likePicture);
  return card;
};

export function addInitialCards(cardcolection,grid,gridtemplate) {
  cardcolection.forEach((item) => {
    grid.append(createCard(item.link, item.name,gridtemplate));
  });
}


