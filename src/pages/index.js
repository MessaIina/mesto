import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
    validationConfig,
    editBtn,
    nameInput,
    aboutInput,
    addBtn,
    formNew,
    formEdit,
    avatarEditBtn,
    formAvatar,
    profileNameSelector, 
    profileAboutSelector
}
from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '08e4a66c-2356-4013-93a7-044547033190',
        'Content-Type': 'application/json'
    }
});
const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar",
    userId: "" 
});
 
api.getUserInfo().then(values => {
    userInfo.setUserInfo(values.name, values.about);
    userInfo.setUserAvatar(values.avatar);
    userInfo.setId(values);
})

let cardList;
const nameElement = document.querySelector(profileNameSelector);
const aboutElement = document.querySelector(profileAboutSelector);

const formValidatorEdit = new FormValidator(formEdit, validationConfig);
const formValidatorNew = new FormValidator(formNew, validationConfig);
const formValidatorAvatar = new FormValidator(formAvatar, validationConfig);
const popupWithFormEdit = new PopupWithForm(".profile-popup", {
    onSubmit: (formData) => {
        popupWithFormEdit.renderLoading(true);
        api.setUserInfo(formData).then((res) => {
            userInfo.setUserInfo(res.name, res.about),
            popupWithFormEdit.close();
            formValidatorEdit.resetValidation();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupWithFormEdit.renderLoading(false);
        });
    }
});
popupWithFormEdit.setEventListeners();
const popupWithFormAvatar = new PopupWithForm('.avatar-popup', {
    onSubmit: (formData) => {
        popupWithFormAvatar.renderLoading(true);
        api.setUserAvatar(formData.avatar).then((res) => {
            userInfo.setUserAvatar(res.avatar);
            popupWithFormAvatar.close();
            formValidatorAvatar.resetValidation();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupWithFormAvatar.renderLoading(false);
        });
    }
});
popupWithFormAvatar.setEventListeners();
const deletePopupImg = new PopupWithConfirmation(".delete-popup");
deletePopupImg.setSubmitAction(handleDeleteCard);
deletePopupImg.setEventListeners();

function handleDeleteClick(data) {
    deletePopupImg.open(data);
}

function handleDeleteCard(card) {
    api.deleteCard(card.id).then(() => {
        card.handleCardDelete();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        deletePopupImg.close();
    });
}

function handleLikeCard(card) {
    api.likeCard(card.id).then((data) => {
      card.numberLikes = data.likes.length;
      card.likeCounter.textContent = card.numberLikes;
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleDislikeCard(card) {
    api.dislikeCard(card.id).then((data) => {
      card.numberLikes = data.likes.length;
      card.likeCounter.textContent = card.numberLikes;
    }).catch((err) => {
      console.log(err);
    });
  }
const popupWithFormNew = new PopupWithForm(".card-popup", {
    onSubmit: (data) => {
        api.createCard({
            name: data.place,
            link: data.link,
        }).then((data) => {
            const newCard = new Card({
                name: data.name,
                link: data.link,
                caption: data.caption,
                _id: data._id
            }, handleCardClick, data.owner._id, handleDeleteClick, handleLikeCard, handleDislikeCard);
            const newCardElement = newCard.generateCard();
            cardList.addItem(newCardElement);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupWithFormNew.renderLoading(false);
            popupWithFormNew.close();
        });
    },
});
popupWithFormNew.setEventListeners();

function createCard(data, userId) {
    const card = new Card(data, handleCardClick, userId, handleDeleteClick, handleLikeCard, handleDislikeCard);
    return card.generateCard();
}
 
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        const userId = userData._id;
        userInfo.setUserAvatar(userData.avatar);
        userInfo.setUserInfo(userData.name, userData.about);
        
        cardList = new Section({
            items: cardsData.reverse(),
            renderer: (item) => {
                const cardElement = createCard(item, userId);
                cardList.addItem(cardElement);
            },
        }, '.cards__list'); 
        cardList.renderItems(); 
    })
    .catch((err) => { 
        console.log(err); 
    });
  
  function handleEditProfile() {
    formValidatorEdit.resetValidation();
    nameInput.value = nameElement.textContent;
    aboutInput.value = aboutElement.textContent;
    popupWithFormEdit.open();
  }
  editBtn.addEventListener('click', handleEditProfile);
  addBtn.addEventListener("click", () => {
    formValidatorNew.resetValidation();
    popupWithFormNew.open();
});
avatarEditBtn.addEventListener('click', () => {
    formValidatorAvatar.resetValidation();
    popupWithFormAvatar.open();
});
const popupWithImage = new PopupWithImage(".image-popup");
popupWithImage.setEventListeners();

function handleCardClick(data) {
    popupWithImage.open(data);
}
formValidatorEdit.enableValidation();
formValidatorNew.enableValidation();
formValidatorAvatar.enableValidation();