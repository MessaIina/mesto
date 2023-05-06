class Card {
    constructor({ data, handleCardClick }, cardSelector) {
      this._data = data;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement;
    }
  
    _setEventListeners() {
      const cardImage = this._card.querySelector('.card__image');
      const cardDeleteButton = this._card.querySelector('.card__delete-button');
      const cardLikeButton = this._card.querySelector('.card__like-button');
      cardImage.addEventListener('click', () => {
        this._handleCardClick(this._data);
      });
      cardDeleteButton.addEventListener('click', this._handleDeleteButtonClick.bind(this));
      cardLikeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
    }
  
    _handleDeleteButtonClick() {
      this._card.remove();
      this._card = null;
    }
  
    _handleLikeButtonClick() {
      const cardLikeButton = this._card.querySelector('.card__like-button');
      cardLikeButton.classList.toggle('card__like-button_active');
    }
  
    generateCard() {
      this._card = this._getTemplate();
      const cardImage = this._card.querySelector('.card__image');
      const cardTitle = this._card.querySelector('.card__title');
      cardImage.src = this._data.link;
      cardImage.alt = this._data.name;
      cardTitle.textContent = this._data.name;
      this._setEventListeners();
      return this._card;
    }
  }
  export default Card;