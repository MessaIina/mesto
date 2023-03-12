
const closeBtns = document.querySelectorAll('.popup__close-btn');
const editBtn = document.querySelector('.profile__edit-btn');
const profilePopup = document.querySelector('.profile-popup');
const editForm = document.forms['edit-profile-form'];
const nameInput = editForm.querySelector('#name');
const jobInput = editForm.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');



function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}



function handleProfileFormSubmit (evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup(profilePopup);
}

editBtn.addEventListener('click', function () {
	openPopup(profilePopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});
editForm.addEventListener('submit', handleProfileFormSubmit);

closeBtns.forEach(function (btn) {
	const popup = btn.closest('.popup');
	btn.addEventListener('click', () => closePopup(popup));
});
