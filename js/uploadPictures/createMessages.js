import { isEscape } from '../utility.js';
import { unblockSubmitButton } from './uploadPictureForm.js';
const ALERT_SHOW_TIME = 5000;

const successMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const onCloseButtonClick = () => {
  unblockSubmitButton();
  hideMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)){
    evt.preventDefault();
    hideMessage();
  }
};

const onBodyClick = (evt) => {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))){
    return;
  }

  hideMessage();
};

function hideMessage() {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element
    .querySelector(buttonClass)
    .addEventListener('click', onCloseButtonClick);
};

const createSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const createErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
  setTimeout(hideMessage, ALERT_SHOW_TIME);
};

export { createErrorMessage, createSuccessMessage };
