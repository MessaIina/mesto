class FormValidator {
    constructor(form, {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass
    }) {
        this._form = form;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass
    }

    enableValidation() {
        this._formsInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._formButton = this._form.querySelector(this._submitButtonSelector);
        this._setEventListeners();
    }

    _setEventListeners() {
        this.toggleSubmitButtonState();
        this._formsInputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleSubmitButtonState();
            });
        });
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    }

    _hasInvalidInput() {
        return this._formsInputs.some((input) => !input.validity.valid);
    }

    _hideInputError(input) {
        const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
        currentInputErrorContainer.textContent = '';
    }

    _showInputError(input) {
        const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
        currentInputErrorContainer.textContent = input.validationMessage;
    }

    toggleSubmitButtonState() {
        if (this._hasInvalidInput()) {
            this._formButton.classList.add(this._inactiveButtonClass);
            if (!this._formButton.classList.contains(this._inactiveButtonClass)) {
                this._formButton.disabled = true;
            }
        } else {
            this._formButton.classList.remove(this._inactiveButtonClass);
            if (this._formButton.classList.contains(this._inactiveButtonClass)) {
                this._formButton.disabled = false;
            }
        }
    }

    resetValidation() {
        this._formsInputs.forEach((input) => {
            this._hideInputError(input);
        });
        this.toggleSubmitButtonState();
    }
}

export default FormValidator;