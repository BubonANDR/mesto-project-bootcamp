const isValid = (formElement, inputElement, cnfg) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, cnfg);
  } else {
    hideInputError(formElement, inputElement, cnfg);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, cnfg) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(cnfg.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(cnfg.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const showInputError = (formElement, inputElement, cnfg) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(cnfg.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(cnfg.errorClass);
};

const hideInputError = (formElement, inputElement, cnfg) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(cnfg.inputErrorClass);
  errorElement.classList.remove(cnfg.errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (formElement, cnfg) => {
  const inputList = Array.from(
    formElement.querySelectorAll(cnfg.inputSelector)
  );

  const buttonElement = formElement.querySelector(cnfg.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, cnfg);

      toggleButtonState(inputList, buttonElement, cnfg);
    });
  });
};

export const enableValidation = (cnfg) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = cnfg;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, cnfg);
  });
};

export const openClear = (somepopup) => {
  somepopup.querySelector(".popup__form").reset();
  const arrErrors = Array.from(
    somepopup.querySelectorAll(".popup__input_type_error")
  );
  arrErrors.forEach((elem) => {
    elem.classList.remove("popup__input_type_error");
    somepopup.querySelector(`#${elem.id}-error`).textContent = "";
  });
  const btn = somepopup.querySelector(".popup__button");
  btn.disabled = true;
  btn.classList.add("popup__button_disabled");
};
