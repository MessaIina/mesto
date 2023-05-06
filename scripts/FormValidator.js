class FormValidator {
    constructor(
    form,
    { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }
    ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    }
    
    enableValidation () {
        this._formsInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._formButton = this._form.querySelector(this._submitButtonSelector);
        this._setEventListeners();
    }
    
    _setEventListeners () {
        this._disableButton();
        this._formsInputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                if (this._hasInvalidInput()) {
                    this._disableButton();
                } else {
                    this._enableButton();
                }
            });
        });
    };
    
    _checkInputValidity (input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    };
    
    _hasInvalidInput () {
        return this._formsInputs.some(item => !item.validity.valid);
    }
    
    _hideInputError (input) {
        const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
        currentInputErrorContainer.textContent = '';
    }
    
    _showInputError (input) {
        const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
        currentInputErrorContainer.textContent = input.validationMessage;
    }
    
    _disableButton () {
        this._formButton.classList.add(this._inactiveButtonClass);
        this._formButton.disabled = true;
    }
    
    _enableButton () {
        this._formButton.classList.remove(this._inactiveButtonClass);
        this._formButton.disabled = false;
    }
    }
    export default FormValidator;