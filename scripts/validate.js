const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__item-error',
    errorClass: 'form__item_invalid',
};

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        setEventListeners(form, rest);
    });
};

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, errorClass, ...rest }) => {
    const formsInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
    const formButton = formToValidate.querySelector(submitButtonSelector);
    disableButton(formButton, rest);
    formsInputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, errorClass);
            if (hasInvalidInput(formsInputs)) {
                disableButton(formButton, rest);
            } else {
                enableButton(formButton, rest);
            }
        });
    });
};

const hasInvalidInput = (formsInputs) => {
    return !formsInputs.every((value) => value.checkValidity());
};

const checkInputValidity = (input, errorClass) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = '';
        input.classList.remove(errorClass);
    } else {
        currentInputErrorContainer.textContent = input.validationMessage;
        input.classList.add(errorClass);
    }
};

const enableButton = (button, {inactiveButtonClass }) => {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
};

const disableButton = (button, {inactiveButtonClass }) => {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
};

enableValidation(validationConfig);