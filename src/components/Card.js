class Card {
    constructor(data, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._caption = data.caption;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like-btn');
    }
    
    _getTemplate() {
        const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    
    generateCard() {
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeIcon();
        });
        this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
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
    }
    
    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }
  }
  
  export default Card;