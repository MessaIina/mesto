class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
    this._form = this._popup.querySelector('.form');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._closeButton.removeEventListener('click', this.close.bind(this));
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
    setTimeout(() => {
      this._popup.style.removeProperty('visibility');
    }, 200);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === this._popup) {
      this.close();
    }
  }
}

export default Popup