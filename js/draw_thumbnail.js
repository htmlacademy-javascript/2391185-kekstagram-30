import {generatedDescriptions} from './data';


const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;

const similarPictures = generatedDescriptions();

const similarPicturesFragment = document.createDocumentFragment();


similarPictures.forEach(({url, description, likes, comments}) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  similarPicturesFragment.appendChild(pictureItem);
});


pictures.appendChild(similarPicturesFragment);
