import './../pages/index.css';
import { addInitialCards, createCard } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, openClear } from "./validation.js";
import {
  getCards,
  getUser,
  saveEditProfile,
  saveEditAvatar,
  saveCard,
} from "./api.js";
import { escapeKeydown, putSavedStatus, putSavingStatus } from "./utils.js";

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formProfile = document.forms.profileform;
const avatarForm = document.forms.avatarform;
const nameInput = formProfile.elements.nameinput;
const aboutInput = formProfile.elements.aboutinput;
const avatarLinkInput = avatarForm.elements.avatarlink;
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup__profile");
const avatarPopup = document.querySelector(".popup__edit-avatar");
const avatarPicture = document.querySelector(".profile__avatar");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup__add-card");
export const pictPopupLink = document.querySelector(".popup__picture");
export const pictPopupTitle = document.querySelector(".popup__picture-title");
export const pictPopup = document.querySelector(".popup__place-picture");
const photoGrid = document.querySelector(".photo-grid");
const gridTemplate = document
  .querySelector("#grid-item")
  .content.querySelector(".photo-grid__item");

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    addInitialCards(cards, photoGrid, gridTemplate);
  })
  .catch((err) => {
    console.log(`Загрузка ${err}`);
  });

profileEditButton.addEventListener("click", () => {
  openClear(profilePopup);
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
});

avatarPicture.addEventListener("click", () => {
  openClear(avatarPopup);
  openPopup(avatarPopup);
  avatarLinkInput.value = avatarPicture.src;
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  putSavingStatus(avatarForm);
  saveEditAvatar(avatarLinkInput.value)
    .then((data) => {
      avatarPicture.src = data.avatar;
      putSavedStatus(avatarForm);
      closePopup(avatarForm.closest(".popup"));
    })
    .catch((err) => {
      console.log(`Загрузка аватара ${err}`);
    });
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  putSavingStatus(formProfile);
  saveEditProfile(nameInput.value, aboutInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      putSavedStatus(formProfile);
      closePopup(formProfile.closest(".popup"));
    })
    .catch((err) => {
      console.log(`Редактирование профиля ${err}`);
    });
});

cardAddButton.addEventListener("click", () => {
  openClear(cardAddPopup);
  openPopup(cardAddPopup);
});
const formCard = document.forms.cardform;
const cardLinkInput = formCard.elements.placelink;
const cardNameInput = formCard.elements.placeinput;

formCard.addEventListener("submit", function (evt) {
  putSavingStatus(formCard);
  saveCard(cardNameInput.value, cardLinkInput.value).then((data) => {
    photoGrid.prepend(
      createCard(data.link, data.name, data._id, 0, gridTemplate)
    );
    putSavedStatus(formCard);
    closePopup(formCard.closest(".popup"));
    formCard.reset();
  }).catch((err) => {
    console.log(`Сохранение карточки ${err}`);
  });
  evt.preventDefault();
});

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(evt.target.closest(".popup"));
  }
});



enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// document.addEventListener("click", (evt) => console.log(evt.target));
