import { openPicture } from "./modal.js";
import { deleteCardFromServer, myOwnerId, putLike, deleteLike } from "./api.js";

function deleteCard(event) {
  const idForDel = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__item-image").id;
  deleteCardFromServer(idForDel)
    .then(event.target.closest(".photo-grid__item").remove())
    .catch((err) => {
      console.log(`Удаление карточки  ${err}`);
    });
}

function likePicture(event) {
  const idForLike = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__item-image").id;
  const like = event.target
    .closest(".photo-grid__like-button");
    
  const likesCount = event.target
    .closest(".photo-grid__like-area")
    .querySelector(".photo-grid__liked-count");
  if (!like.classList.contains("photo-grid__like-button_liked")) {
    putLike(idForLike)
      .then((data) => {likesCount.textContent = data.likes.length;
        like.classList.add("photo-grid__like-button_liked");
       })
      .catch((err) => {
        console.log(`Установка лайка  ${err}`);
      });
  } else {
    deleteLike(idForLike)
      .then((data) => {likesCount.textContent = data.likes.length;
        like.classList.remove("photo-grid__like-button_liked");
      })
      .catch((err) => {
        console.log(`Удаление лайка ${err}`);
      });
  }
}

export const createCard = (
  imglink,
  imgtitle,
  imgId,
  likecount,
  gridtemplate
) => {
  const card = gridtemplate.cloneNode(true);
  card.querySelector(".photo-grid__item-image").src = imglink;
  card.querySelector(".photo-grid__item-image").id = imgId;
  card.querySelector(".photo-grid__item-image").alt= imgtitle;
  card.querySelector(".photo-grid__title").textContent = imgtitle;
  card.querySelector(".photo-grid__liked-count").textContent = likecount;

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

export function addInitialCards(cardcolection, grid, gridtemplate) {
  cardcolection.forEach((item) => {
    const currentCard = createCard(
      item.link,
      item.name,
      item._id,
      item.likes.length,
      gridtemplate
    );
    if (item.owner._id !== myOwnerId) {
      currentCard
        .querySelector(".photo-grid__delete-area")
        .classList.add("photo-grid__delete-area_hidden");
    }
    grid.append(currentCard);
  });
}
