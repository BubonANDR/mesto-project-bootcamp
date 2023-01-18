export const closePopup = (somepopup) => {
  somepopup.classList.remove("popup_opened");
  if (somepopup.querySelector(".popup__form")) {
    somepopup.querySelector(".popup__form").reset();
    const arrErrors =Array.from(somepopup.querySelectorAll('.popup__input_type_error'));
    arrErrors.forEach((elem)=>{
      elem.classList.remove('popup__input_type_error');
      somepopup.querySelector(`#${elem.id}-error`).textContent='';
      });
      
  }

};

export const openPopup = (somepopup) => {
  somepopup.classList.add("popup_opened");
  
  if (somepopup.querySelector(".popup__form")) {
  const btn =somepopup.querySelector(".popup__button");
  btn.disabled=true;
  btn.classList.add('popup__button_disabled');
  }
  
  somepopup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(somepopup);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" || e.key == "Esc") {
      closePopup(somepopup);
    }
  });
};

export function openPicture(event) {
  document.querySelector(".popup__picture").src = event.target.closest(
    ".photo-grid__item-image"
  ).src;
  document.querySelector(".popup__picture-title").textContent = event.target
    .closest(".photo-grid__item")
    .querySelector(".photo-grid__title").textContent;
  openPopup(document.querySelector(".popup__place-picture"));
}
