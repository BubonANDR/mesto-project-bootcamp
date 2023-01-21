import { closePopup } from "./modal.js";


  export const escapeKeydown =(event,somepopup)=>{
    if (event.key == "Escape" || event.key == "Esc") {
      closePopup(somepopup);
    }
  }
  
 export const putSavingStatus  =(form)=> form.querySelector('.popup__button').textContent='Сохранение...';
 export const putSavedStatus   =(form)=> form.querySelector('.popup__button').textContent='Сохранить';