const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const editBtn = document.querySelector('.profile__edit-btn');
const profilePopup = document.querySelector('.profile-popup'); 
const editForm = document.forms['edit-profile-form'];
const nameInput = editForm.querySelector('#name');
const jobInput = editForm.querySelector('#job'); 
const profileName = document.querySelector('.profile__name'); 
const profileJob = document.querySelector('.profile__about');
const addBtn = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.card-popup');
const addForm = document.forms['add-card-form'];
const cardName = addForm.querySelector('#place');
const cardLink = addForm.querySelector('#link');
const imagePopup = document.querySelector('.image-popup');
const cardImage = imagePopup.querySelector('.card-zoom__image');
const cardCaption = imagePopup.querySelector('.card-zoom__caption');
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

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

popups.forEach((popup) =>
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-btn')
    ) {
      closePopup(popup);
    }
  })
);

function setLikeListener(card) {
	const cardLike = card.querySelector('.card__like-btn');
	cardLike.addEventListener('click', () => {
		cardLike.classList.toggle('card__like-btn_liked');
	});
}

function setDeleteListener(card) {
	const deleteCard = card.querySelector('.card__delete-btn');
	deleteCard.addEventListener('click', () => {
		card.remove();
	});
}

function handleCardClick(item) {
	openPopup(imagePopup);
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardCaption.textContent = item.name;
}

closeBtns.forEach(function (btn) {
	const popup = btn.closest('.popup');
	btn.addEventListener('click', () => closePopup(popup));
});

function createCard (item) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = card.querySelector('.card__image');
	const cardName = card.querySelector('.card__name');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardName.textContent = item.name;
	setLikeListener(card);
	setDeleteListener(card);
	cardImage.addEventListener('click', () => handleCardClick(item)) ;
	return card;
}

initialCards.forEach(function(item) {
	const card = createCard(item);
	cardsList.append(card);
})

function handleProfileFormSubmit (evt) {
	evt.preventDefault(); 
	profileName.textContent = nameInput.value; 
	profileJob.textContent = jobInput.value; 
	closePopup(profilePopup); 
}
editBtn.addEventListener('click', () => { 
	openPopup(profilePopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});
 
editForm.addEventListener('submit', handleProfileFormSubmit);
 
function handleAddFormSubmit (evt) {
	evt.preventDefault();
	const card = createCard({link: cardLink.value, name: cardName.value});
	cardsList.prepend(card);
	evt.target.reset();
	closePopup(cardPopup);
}

addBtn.addEventListener('click', () => openPopup(cardPopup));
addForm.addEventListener('submit', handleAddFormSubmit);