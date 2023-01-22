const MainUrl = "https://nomoreparties.co/v1/wbf-cohort-4";

export const myOwnerId = "fb4f164cb7425743afcd59f4";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ОШИБКА: ${res.status}`);
};

export const getUser = () =>
  fetch(`${MainUrl}/users/me`, {
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
    },
  }).then(getResponse);

export const getCards = () =>
  fetch(`${MainUrl}/cards`, {
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
    },
  }).then(getResponse);

export const saveEditProfile = (profName, profAbout) =>
  fetch(`${MainUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profName,
      about: profAbout,
    }),
  }).then(getResponse);

export const saveEditAvatar = (avatarLink) =>
  fetch(`${MainUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(getResponse);

export const saveCard = (cardName, cardLink) =>
  fetch(`${MainUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(getResponse);

export const deleteCardFromServer = (cardId) =>
  fetch(`${MainUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
    },
  }).then(getResponse);

export const putLike = (cardId) =>
  fetch(`${MainUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
    },
  }).then(getResponse);

export const deleteLike = (cardId) =>
  fetch(`${MainUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b976a8cc-ba22-46b5-85e7-81e7fb97574a",
    },
  }).then(getResponse);
