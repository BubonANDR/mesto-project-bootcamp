import './../pages/index.css';
import { initialCards } from './utils.js';
import {addInitialCards, createCard}  from './cards.js';
import { openPopup,closePopup } from './modal.js';
import { enableValidation } from './validation.js';




const formProfile = document.forms.profileform;
const nameInput = formProfile.elements.nameinput;
const jobInput = formProfile.elements.aboutinput;
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup__profile");
profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__subtitle").textContent;
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__subtitle").textContent = jobInput.value;
  closePopup(formProfile.closest(".popup"));
});



const cardAddButton = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup__add-card");
cardAddButton.addEventListener("click", () => openPopup(cardAddPopup));
const formCard = document.forms.cardform;
formCard.addEventListener("submit", function (evt) {
     photoGrid.prepend(
      createCard(
        formCard.querySelector(".card-link__input").value,
        formCard.querySelector(".card-name__input").value,
        gridTemplate 
      )
    );
    closePopup(formCard.closest(".popup"));
  evt.preventDefault();
  formCard.reset();
});


const pictPopup = document.querySelector(".popup__place-picture");
const photoGrid = document.querySelector(".photo-grid");
const gridTemplate = document
  .querySelector("#grid-item")
  .content.querySelector(".photo-grid__item");

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });


addInitialCards(initialCards,photoGrid,gridTemplate);

