import './pages/index.css';

import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import Card from './components/Card.js';
import initialCards from './components/cards.js'
import FormValidator from './components/FormValidator.js';

const imagePopup = document.querySelector(".image-popup");
const cardImage = imagePopup.querySelector(".card-zoom__image");
const cardCaption = imagePopup.querySelector(".card-zoom__caption");

const editBtn = document.querySelector(".profile__edit-btn");
const profilePopup = document.querySelector(".profile-popup");
const editForm = document.forms["edit-profile-form"];
const nameInput = editForm.querySelector("#name");
const jobInput = editForm.querySelector("#job");

const addBtn = document.querySelector(".profile__add-btn");
const cardPopup = document.querySelector(".card-popup");
const addForm = document.forms["add-card-form"];
const cardName = addForm.querySelector("#place");
const cardLink = addForm.querySelector("#link");

const formNew = document.querySelector('.form_new');
const formEdit = document.querySelector('.form_edit');

const validationConfig = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__item-error',
  errorClass: 'form__item_invalid',
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
});

const formValidatorEdit = new FormValidator(formEdit, validationConfig);
const formValidatorNew = new FormValidator(formNew, validationConfig);

const popupWithFormEdit = new PopupWithForm(".profile-popup", {
  onSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    formValidatorEdit.resetValidation();
  }
});

popupWithFormEdit.setEventListeners();

const popupWithFormNew = new PopupWithForm(".card-popup", {
  onSubmit: (data) => {
    const { name, link } = data;
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