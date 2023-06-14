import Popup from './Popup.js';

class PopupWithForm extends Popup {
constructor(popupSelector, { onSubmit }) {
super(popupSelector);
this._form = this._popup.querySelector('.form');
this._inputList = this._form.querySelectorAll('.form__item');
this._submitButton = this._form.querySelector('.form__submit-btn');
this._onSubmit = onSubmit.bind(this);
this._buttonText = this._submitButton.textContent;
}

_getInputValues() {
const formData = {};
this._inputList.forEach(input => {
formData[input.name] = input.value;
});
return formData;
}

_setLoading(isLoading) {
if (isLoading) {
this._submitButton.setAttribute('disabled', true);
this._submitButton.textContent = 'Сохранение...';
} else {
this._submitButton.removeAttribute('disabled');
this._submitButton.textContent = this._buttonText;
}
}

renderLoading(isLoading) {
this._setLoading(isLoading);
}

setEventListeners() {
super.setEventListeners();
this._form.addEventListener('submit', (evt) => {
evt.preventDefault();
this._setLoading(true);
const formData = this._getInputValues();
this._onSubmit(formData); // вызываем функцию, переданную в конструктор
});
}
}

export default PopupWithForm;