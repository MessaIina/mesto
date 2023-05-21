import './index.css';
import {
    validationConfig,
    imagePopup,
    cardImage,
    cardCaption,
    editBtn,
    profilePopup,
    editForm,
    nameInput,
    jobInput,
    addBtn,
    cardPopup,
    addForm,
    cardName,
    cardLink,
    formNew,
    formEdit
}
from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import initialCards from '../utils/cards.js'
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__about",
});

const formValidatorEdit = new FormValidator(formEdit, validationConfig);
const formValidatorNew = new FormValidator(formNew, validationConfig);

const popupWithFormEdit = new PopupWithForm(".profile-popup", {
    onSubmit: (formData) => {
        userInfo.setUserInfo(formData);
        popupWithFormEdit.close()
        formValidatorEdit.resetValidation();
    }
});

popupWithFormEdit.setEventListeners();

const popupWithFormNew = new PopupWithForm(".card-popup", {
    onSubmit: (data) => {
        const {
            name,
            link
        } = data;
        const newCardData = {
            name: name,
            link: link
        };
        const cardElement = createCard(newCardData);
        cardList.addItem(cardElement);
        popupWithFormNew.close();
        formValidatorNew.resetValidation();
    }
});

popupWithFormNew.setEventListeners();

function createCard(data) {
    const card = new Card(data, handleCardClick);
    return card.generateCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    },
}, '.cards__list');

cardList.renderItems();

editBtn.addEventListener("click", () => {
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__about').textContent;
  popupWithFormEdit.open();
});

addBtn.addEventListener("click", () => {
    popupWithFormNew.open();
});

const popupWithImage = new PopupWithImage(".image-popup");

popupWithImage.setEventListeners();

function handleCardClick(data) {
    popupWithImage.open(data);
}

formValidatorEdit.enableValidation();
formValidatorNew.enableValidation();