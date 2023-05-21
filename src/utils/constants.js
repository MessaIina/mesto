export const validationConfig = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__item-error',
    errorClass: 'form__item_invalid'
};
export const imagePopup = document.querySelector(".image-popup");
export const cardImage = imagePopup.querySelector(".card-zoom__image");
export const cardCaption = imagePopup.querySelector(".card-zoom__caption");
export const editBtn = document.querySelector(".profile__edit-btn");
export const profilePopup = document.querySelector(".profile-popup");
export const editForm = document.forms["edit-profile-form"];
export const nameInput = editForm.querySelector("#name");
export const jobInput = editForm.querySelector("#job");
export const addBtn = document.querySelector(".profile__add-btn");
export const cardPopup = document.querySelector(".card-popup");
export const addForm = document.forms["add-card-form"];
export const cardName = addForm.querySelector("#place");
export const cardLink = addForm.querySelector("#link");
export const formNew = document.querySelector('.form_new');
export const formEdit = document.querySelector('.form_edit');