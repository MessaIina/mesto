import Popup from './Popup.js';
class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__submit-btn');
    }
    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
    open(card) {
        this._card = card;
        super.open();
    }
    close() {
        super.close();
        this._form.removeEventListener('submit', this._handleSubmitCallback);
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback(this._card);
        });
    }
}
export default PopupWithConfirmation;