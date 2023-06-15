class Card {
  constructor(data, handleCardClick, ownerId, deleteCard, likeCard, unlikeCard) {
  this._name = data.name;
  this._link = data.link;
  this._caption = data.caption;
  this._deleteCard = deleteCard;
  this._ownerId = ownerId;
  this._likeCard = likeCard;
  this._unlikeCard = unlikeCard;
  this._handleCardClick = handleCardClick;
  this._element = this._getTemplate();
  this._cardImage = this._element.querySelector('.card__image');
  this._likeButton = this._element.querySelector('.card__like-btn');
  this._likeCounter = this._element.querySelector('.card__like-counter');
  this._deleteBtn = this._element.querySelector('.card__delete-btn');
  this._numberLikes = 0;
  }

  _getTemplate() {
      const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
      return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate(this._cardSelector);
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteBtn = this._element.querySelector('.card__delete-btn');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    this._likeCounter.textContent = this._numberLikes;
    return this._element;
}
  
  _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
          this._handleLikeIcon();
      });
      this._deleteBtn.addEventListener('click', () => {
        this.deleteCard(this.id);
        this._handleDeleteCard();
      });
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick({
              name: this._name,
              link: this._link,
              caption: this._caption
          });
      });
  }
  
  _handleLikeIcon() {
      this._likeButton.classList.toggle('card__like-btn_liked');
      if (this._likeButton.classList.contains('card__like-btn_liked')) {
          this._numberLikes++;
      } else {
          this._numberLikes--;
      }
      this._likeCounter.textContent = this._numberLikes;
  }
  
  _handleDeleteCard() {
      this._element.remove();
      this._element = null;
  }
}

export default Card;