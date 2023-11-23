import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './utility.js';

const GENERATED_PHOTO_DESCRIPTIONS_COUNT = 25;
const AVATAR_COUNT = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 30;
const MAX_COMMENTS_ID = GENERATED_PHOTO_DESCRIPTIONS_COUNT * MAX_COMMENTS_COUNT;

const DESCRIPTIONS = [
  'Погожий денек',
  'День рождения',
  'Смотрите какая красота',
  'Угадайте где я?!',
  'Меня давно просили выложить...',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Алексей',
  'Али',
  'Владимир',
  'Владислав',
  'Дмитрий',
  'Дорофей',
  'Анастасия',
  'Алёна',
  'Вика',
  'Вероника',
  'Ирина',
  'Ева',
  'Кира',
];


const generateCommentId = createRandomIdFromRangeGenerator(1,MAX_COMMENTS_ID);
const generatePhotoId = createRandomIdFromRangeGenerator(1,GENERATED_PHOTO_DESCRIPTIONS_COUNT);

const createComment = () => {
  const commentID = generateCommentId();
  return {
    id: commentID,
    avatar: `img/avatar-${getRandomInteger(1,AVATAR_COUNT)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoDescription = () => {
  const photoID = generatePhotoId();
  return {
    id: photoID,
    url: `photos/${photoID}.jpg`,
    description:  getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
    comments: Array.from({length: getRandomInteger(0,MAX_COMMENTS_COUNT)}, createComment),
  };
};

const generatedDescriptions = () => Array.from({length:GENERATED_PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription);

export {generatedDescriptions};
