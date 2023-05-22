class Popup { 
  constructor(popupSelector) { 
    this._popup = document.querySelector(popupSelector); 
    this._closeButton = this._popup.querySelector('.popup__close-btn'); 
  } 
 
  open() { 
    this._popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose); 
    this._popup.addEventListener('click', this._handleOverlayClose); 
  } 
 
  close() { 
    this._popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', this._handleEscClose); 
    setTimeout(() => {
      this._popup.style.removeProperty('visibility');
    }, 200);
  }
 
  setEventListeners() {  
    this._closeButton.addEventListener('click', this.close.bind(this));  
    this._popup.addEventListener('click', this._handleOverlayClose);
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