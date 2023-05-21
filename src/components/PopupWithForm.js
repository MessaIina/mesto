import Popup from './Popup.js';

class PopupWithForm extends Popup {
constructor(popupSelector, { onSubmit }) {
super(popupSelector);
this._form = this._popup.querySelector('.form');
this._inputList = this._form.querySelectorAll('.form__item');
this._submitButton = this._form.querySelector('.form__submit-btn');
this._onSubmit = onSubmit;
}

_getInputValues() {
const formData = {};
this._inputList.forEach(input => {
formData[input.name] = input.value;
});
return formData;
}

setEventListeners() {
super.setEventListeners();
this._form.addEventListener('submit', (evt) => {
evt.preventDefault();
const formData = this._getInputValues();
this._onSubmit(formData);
this.close();
});
}

close() {
super.close();
}
}

export default PopupWithForm;