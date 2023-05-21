class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._caption = data.caption;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#card-template')
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const image = this._element.querySelector(".card__image");
    const name = this._element.querySelector(".card__name");
    image.src = this._link;
    image.alt = this._name;
    name.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleLikeIcon();
    });
    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
        caption: this._caption
      });
    });
  }

  _handleLikeIcon() {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_liked');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;