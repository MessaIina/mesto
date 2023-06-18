class Card {
  constructor(data, handleCardClick, userId, handleDeleteClick, likeCard, dislikeCard) {
      this.id = data._id;
      this._name = data.name;
      this._link = data.link;
      this._caption = data.caption;
      this._handleDeleteClick = handleDeleteClick;
      this._userId = userId;
      this._owner = data.owner;
      this._likeCard = likeCard;
      this._likes = data.likes;
      this._dislikeCard = dislikeCard;
      this._handleCardClick = handleCardClick;
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__image');
      this._likeButton = this._element.querySelector('.card__like-btn');
      this.likeCounter = this._element.querySelector('.card__like-counter');
      this._deleteBtn = this._element.querySelector('.card__delete-btn');
      this.numberLikes = data.likes === undefined ? 0 : data.likes.length;;
  }
  _getTemplate() {
      const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
      return cardElement;
  }
  _hideDeleteButton() {
      if (this._owner._id !== this._userId) {
          this._deleteBtn.classList.add('card__delete-btn_hidden');
      }
  }
  generateCard() {
      this._element = this._getTemplate(this._cardSelector);
      this._cardImage = this._element.querySelector('.card__image');
      this._likeButton = this._element.querySelector('.card__like-btn');
      this.likeCounter = this._element.querySelector('.card__like-counter');
      this._deleteBtn = this._element.querySelector('.card__delete-btn');
      this._setEventListeners();
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.card__name').textContent = this._name;
      this.likeCounter.textContent = this.numberLikes;
      if (this._owner) {
          this._hideDeleteButton();
          this._setPreLike();
      }
      return this._element;
  }
  _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
          this._handleLikeIcon();
      });
      this._deleteBtn.addEventListener('click', () => {
          this._handleDeleteClick(this);
      });
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick({
              name: this._name,
              link: this._link,
              caption: this._caption
          });
      });
  }
  _setPreLike() {
      this._likes.forEach(item => {
          if (item._id === this._userId) {
              this._likeButton.classList.add('card__like-btn_liked');
          }
      })
  }
  _handleLikeIcon() {
      this._likeButton.classList.toggle('card__like-btn_liked');
      if (this._likeButton.classList.contains('card__like-btn_liked')) {
          this._likeCard(this);
      } else {
          this._dislikeCard(this);
      }
  }
  handleCardDelete() {
      this._element.remove();
      this._element = null;
  }
}
export default Card;