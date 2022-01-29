import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formEl = document.querySelector('.feedback-form');

const btnEl = document.querySelector('button');

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onTextFormInputs, 500));

populateForm();
btnDisable();

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
  console.log(formData);
}

function onTextFormInputs(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  btnDisable();
}

function populateForm() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsed = JSON.parse(savedMessage);
  if (parsed) {
    formData.email = parsed.email;
    formData.message = parsed.message;
    formEl.elements.message.value = parsed.message || '';
    formEl.elements.email.value = parsed.email || '';
  }
}

function btnDisable() {
  btnEl.disabled = formEl.elements.message.value === '' || formEl.elements.email.value === '';
}
