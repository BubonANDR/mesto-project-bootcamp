const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

openPopup = (popapik) => popapik.classList.add("popup_opened");

closePopup = (popapik) => popapik.classList.remove("popup_opened");

const editProfile = editProfileButton.addEventListener("click", function () {
  const profilePopup = document.querySelector(".popup__profile");

  const popupCloseButton = profilePopup.querySelector(".popup__close-button");

  openPopup(profilePopup);

  popupCloseButton.addEventListener("click", () => closePopup(profilePopup));

  const formElement = profilePopup.querySelector(".popup_form");

  const nameInput = formElement.querySelector(".name__input");

  const jobInput = formElement.querySelector(".job__input");

  nameInput.value = document.querySelector(".profile__title").textContent;

  jobInput.value = document.querySelector(".profile__subtitle").textContent;

  formElement.addEventListener("submit", function (evt) {
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__subtitle").textContent = jobInput.value;
    evt.preventDefault();
    closePopup(profilePopup);
  });
});

const photoGrid = document.querySelector(".photo-grid");
const gridTemplate = document
  .querySelector("#grid-item")
  .content.querySelector(".photo-grid__item");
const photo = gridTemplate.querySelector(".photo-grid__item-image");
const photoTitle = gridTemplate.querySelector(".photo-grid__title");

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

for (i = 0; i < initialCards.length; i++) {
  photo.src = initialCards[i].link;
  photoTitle.textContent = initialCards[i].name;
  const card = gridTemplate.cloneNode(true);
  card
    .querySelector(".photo-grid__delete-button")
    .addEventListener("click", deleteCard);
  card
    .querySelector(".photo-grid__item-image")
    .addEventListener("click", openPicture);
  card
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", likePicture);

  photoGrid.append(card);
}

const addProfile = addCardButton.addEventListener("click", function () {
  const addCardPopup = document.querySelector(".popup__add-card");
  const popupCloseButton = addCardPopup.querySelector(".popup__close-button");
  openPopup(addCardPopup);

  popupCloseButton.addEventListener("click", () => closePopup(addCardPopup));
  const formElement = addCardPopup.querySelector(".popup_form");

  const card = gridTemplate.cloneNode(true);
  card.querySelector(".photo-grid__item-image").src =
    formElement.querySelector(".card-link__input").value;
  card.querySelector(".photo-grid__title").textContent =
    formElement.querySelector(".card-name__input").value;
  card
    .querySelector(".photo-grid__delete-button")
    .addEventListener("click", deleteCard);
  card
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", likePicture);

  formElement.addEventListener("submit", function (evt) {
    photoGrid.prepend(card);
    evt.preventDefault();
    closePopup(addCardPopup);
  });
});

function openPicture(event) {
  const pictPopup = document.querySelector(".popup__place-picture");
  pictPopup.querySelector(".popup__picture").src = event.target.closest(
    ".photo-grid__item-image"
  ).src;

  pictPopup.querySelector(".popup__picture-title").textContent = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__title").textContent;

  openPopup(pictPopup);
  pictPopup
    .querySelector(".popup__close-button")
    .addEventListener("click", function (evt) {
      evt.target
        .closest(".popup__place-picture")
        .classList.remove("popup_opened");
    });
}
