import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
import Card from "./Card.js";

const popups = document.querySelectorAll(".popup");
const closeBtns = document.querySelectorAll(".popup__close-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profilePopup = document.querySelector(".profile-popup");
const editForm = document.forms["edit-profile-form"];
const nameInput = editForm.querySelector("#name");
const jobInput = editForm.querySelector("#job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about");
const addBtn = document.querySelector(".profile__add-btn");
const cardPopup = document.querySelector(".card-popup");
const addForm = document.forms["add-card-form"];
const cardName = addForm.querySelector("#place");
const cardLink = addForm.querySelector("#link");
const imagePopup = document.querySelector(".image-popup");
const cardImage = imagePopup.querySelector(".card-zoom__image");
const cardCaption = imagePopup.querySelector(".card-zoom__caption");
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const formNew = document.querySelector('.form_new');
const formEdit = document.querySelector('.form_edit');

const validationConfig = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__item-error',
    errorClass: 'form__item_invalid',
};

function closePopupWhenPressEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    document.addEventListener('keydown', closePopupWhenPressEsc);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupWhenPressEsc);
    popup.classList.remove('popup_opened');
}
popups.forEach((popup) => popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}))

closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => closePopup(btn.closest(".popup")));
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
}

function handleCardClick(name, link) {
    cardImage.src = link;
    cardImage.alt = name;
    cardCaption.textContent = name;
    openPopup(imagePopup);
}

editBtn.addEventListener("click", () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

editForm.addEventListener("submit", handleProfileFormSubmit);

const addFormValidator = new FormValidator(addForm, validationConfig);

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = new Card({
        name: cardName.value,
        link: cardLink.value
    }, handleCardClick).generateCard();
    cardsList.prepend(cardElement);
    evt.target.reset();
    closePopup(cardPopup);
    addFormValidator.enableValidation();
    addFormValidator.toggleSubmitButtonState();
}

initialCards.forEach(function(item) {
    const cardElement = new Card(item, handleCardClick).generateCard();
    cardsList.append(cardElement);
});

const formNewInstance = new FormValidator(formNew, validationConfig);
const formEditInstance = new FormValidator(formEdit, validationConfig);

formNewInstance.enableValidation();
formEditInstance.enableValidation();

addBtn.addEventListener("click", () => openPopup(cardPopup));
addForm.addEventListener("submit", handleAddFormSubmit);