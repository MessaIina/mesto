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
export const aboutInput = editForm.querySelector("#about");
export const addBtn = document.querySelector(".profile__add-btn");
export const cardPopup = document.querySelector(".card-popup");
export const addForm = document.forms["add-card-form"];
export const cardName = addForm.querySelector("#place");
export const cardLink = addForm.querySelector("#link");
export const formNew = document.querySelector('.form_new');
export const formEdit = document.querySelector('.form_edit');
export const formAvatar = document.querySelector('.form_avatar');
export const avatarPopup = document.querySelector(".avatar-popup");
export const avatarForm = document.forms["edit-avatar-form"];
export const avatarInput = avatarForm.querySelector("#avatar");
export const deletePopup = document.querySelector(".delete-popup");
export const deleteForm = document.forms["delete"];
export const cardListSelector = '.cards__list';
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");
export const avatarImg = document.querySelector(".profile__avatar");
export const deleteButton = document.querySelector(".form__delete-btn");