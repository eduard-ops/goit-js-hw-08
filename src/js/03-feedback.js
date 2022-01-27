import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onTextFormInputs, 500));

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
  console.log(formData);
}

function onTextFormInputs(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parcel = JSON.parse(savedMessage);
  if (parcel) {
    formEl.elements.message.value = parcel.message || '';
    formEl.elements.email.value = parcel.email || '';
  }
}

populateForm();
