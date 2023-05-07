class Card {
  constructor(data, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
      const cardElement = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
      return cardElement;
  }

  generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector(".card__name").textContent = this._name;
      this._element.querySelector(".card__image").src = this._link;
      this._element.querySelector(".card__image").alt = this._name;
      return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like-btn").addEventListener("click", ()=> {
      this._handleLikeIcon();
    });
    this._element.querySelector(".card__delete-btn").addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
    this._element.querySelector(".card__image").addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

_handleLikeIcon() {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_liked');
  }
}

export default Card;