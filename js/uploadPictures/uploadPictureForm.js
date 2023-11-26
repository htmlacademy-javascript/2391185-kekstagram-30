import { isEscape } from '../utility.js';
import { scaleBiggerHandler, scaleSmallerHandler, scaleBiggerHandlerRemove, scaleSmallerHandlerRemove, DefaultPreviewScaleHandler} from './changeScale.js';
import { addValidatorsPristine, validateFormPristine, resetValidatorsPristine, resetFields } from './addValidators.js';
import {effectChangeHandler, effectChangeHandlerRemove, resetEffects } from './implementFilter.js';
import { sendData } from '../fetchApi.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureElement = document.querySelector('.img-upload__input');
const editPictureFormElement = document.querySelector('.img-upload__overlay');
const closePictureFormElement = document.querySelector('.img-upload__cancel');
const submitButtonElement = document.querySelector('.img-upload__submit');

const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onUploadPictureForm = (evt) => {
  evt.preventDefault();
  addValidatorsPristine();
  if (validateFormPristine()){
    resetValidatorsPristine();
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
};

const onUploadPictureChange = () => {
  editPictureFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectSliderContainerElement.classList.add('hidden');
  effectChangeHandler();
  closePictureFormElement.addEventListener('click', closePictureForm);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadPictureFormElement.addEventListener('submit', onUploadPictureForm);
  addValidatorsPristine();
  scaleBiggerHandler();
  scaleSmallerHandler();
};

function closePictureForm () {
  resetFields();
  //resetValidatorsPristine();
  editPictureFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  DefaultPreviewScaleHandler();
  uploadPictureElement.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEffects();
  effectChangeHandlerRemove();
  scaleBiggerHandlerRemove();
  scaleSmallerHandlerRemove();
}

function onDocumentKeydown (evt) {
  if(isEscape(evt) && !evt.target.closest('.img-upload__field-wrapper') &&
  !(document.body.querySelector('.error') || document.body.querySelector('.success'))){
    evt.preventDefault();
    closePictureForm();
  }
}

const setFormAction = () => uploadPictureElement.addEventListener('change', onUploadPictureChange);

export { setFormAction, unblockSubmitButton, closePictureForm };
