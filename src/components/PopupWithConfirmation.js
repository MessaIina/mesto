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
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitCallback();
        });
    }
    close() {
        super.close();
        this._form.removeEventListener('submit', this._handleSubmitCallback);
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback(this._card);
          });
    }
}
export default PopupWithConfirmation;