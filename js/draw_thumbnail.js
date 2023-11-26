import { showBigPicture } from './bigPicture.js';
import { createRandomMassive } from './utility.js';

const RANDOM_PICTURES_AMOUNT = 10;

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({url, description, likes, comments}) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;

  return (pictureItem);
};


const compareCommentsAmount = (pictureA, pictureB) => {
  const commentsAmountA = pictureA.comments.length;
  const commentsAmountB = pictureB.comments.length;
  return commentsAmountB - commentsAmountA;
};

const getRandomPicture = (pictures) => {
  const result = [];
  const numbers = createRandomMassive(0, pictures.length - 1, RANDOM_PICTURES_AMOUNT);
  numbers.forEach((number) => result.push(pictures[number]));
  return result;
};

const implementFilter = (pictures, filter) => {
  switch (filter){
    case 'filter-default':
      return pictures;

    case 'filter-random':
      return getRandomPicture(pictures);

    case 'filter-discussed':
      return pictures.slice().sort(compareCommentsAmount);

  }
};

const drawThumbnails = (pictures) => {
  const filter = document.querySelector('.img-filters__button--active').id;
  const filteredPictures = implementFilter(pictures, filter);
  const picturesFragment = document.createDocumentFragment();
  filteredPictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });
    picturesFragment.append(thumbnail);
  });
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  picturesContainer.append(picturesFragment);
};

export {drawThumbnails};
