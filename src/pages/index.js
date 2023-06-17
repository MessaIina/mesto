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
} from "../utils/constants.js";
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
 
const formValidatorEdit = new FormValidator(formEdit, validationConfig); 
const formValidatorNew = new FormValidator(formNew, validationConfig); 
const formValidatorAvatar = new FormValidator(formAvatar, validationConfig);
 
const popupWithFormEdit = new PopupWithForm(".profile-popup", { 
    onSubmit: (formData) => { 
        popupWithFormEdit.renderLoading(true);
        api
        .setUserInfo(formData)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about),
            popupWithFormEdit.close();
            formValidatorEdit.resetValidation();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithFormEdit.renderLoading(false);
            });
            
    }

}); 
 
popupWithFormEdit.setEventListeners(); 

const popupWithFormAvatar = new PopupWithForm('.avatar-popup', {
    onSubmit: (formData) => {
        popupWithFormAvatar.renderLoading(true);
        api
            .setUserAvatar(formData.avatar)
            .then((res) => {
                userInfo.setUserAvatar(res.avatar);
                popupWithFormAvatar.close();
                formValidatorAvatar.resetValidation();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithFormAvatar.renderLoading(false);
            });
            
    }
});

popupWithFormAvatar.setEventListeners();

function handleDeleteClick(data) { 
    deletePopupImg.open(data); 
} 

function handleDeleteCard(card) {
    api.deleteCard(card)
    .then(() => {
        card._handleDeleteCard();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        deletePopupImg.close();
    });
}

function handleLikeCard(card) {
    api.likeCard(card._id)
    .then((data) => {
        card._numberLikes = data.likes.length;
        card._likeCounter.textContent = card._numberLikes;
    })
    .catch((err) => {
        console.log(err);
    })
}

function handleDislikeCard(card) {
    api.dislikeCard(card._id)
    .then((data) => {
        card._numberLikes = data.likes.length;
        card._likeCounter.textContent = card._numberLikes;
    })
    .catch((err) => {
        console.log(err);
    })
}

const popupWithFormNew = new PopupWithForm(".card-popup", {
    onSubmit: (data) => {
        api
            .createCard({
                name: data.place,
                link: data.link,
            })
            .then((data) => {
                const newCard = new Card({
                        name: data.name,
                        link: data.link,
                        caption: data.caption,
                        _id: data._id
                    },
                    handleCardClick,
                    data.owner._id,
                    handleDeleteClick, 
                    handleLikeCard, 
                    handleDislikeCard
                );
                const newCardElement = newCard.generateCard();
                cardList.addItem(newCardElement);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithFormNew.renderLoading(false);
                popupWithFormNew.close();
            });
    },
  });
  
  popupWithFormNew.setEventListeners();

function createCard(data) {
  const card = new Card(data, handleCardClick, userInfo.userId, handleDeleteClick, handleLikeCard, handleDislikeCard);
  return card.generateCard();
}

api.getInitialCards()
  .then((cards) => {
      cardList = new Section({
          items: cards,
          renderer: (item) => {
              const cardElement = createCard(item);
              cardList.addItem(cardElement);
          },
      }, '.cards__list');
      cardList.renderItems();
  })
  .catch((err) => {
      console.log(err);
  });

editBtn.addEventListener("click", () => { 
  formValidatorEdit.resetValidation();
  nameInput.value = document.querySelector('.profile__name').textContent; 
  aboutInput.value = document.querySelector('.profile__about').textContent; 
  popupWithFormEdit.open(); 
}); 
 
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

const deletePopupImg = new PopupWithConfirmation(".delete-popup");
deletePopupImg.setSubmitAction(handleDeleteCard);
deletePopupImg.setEventListeners();

formValidatorEdit.enableValidation(); 
formValidatorNew.enableValidation(); 
formValidatorAvatar.enableValidation();