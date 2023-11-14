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

/*
Создать массив из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, опубликованной пользователем.
Структура каждого объекта:
    id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description, строка — описание фотографии. Описание придумайте самостоятельно.
    likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
    {
      id: 135,
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём',
    }

      id — любое число. Идентификаторы не должны повторяться.
      avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
      message — вам необходимо взять одно или два случайных предложения из представленных ниже:

      name Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

generatedDescriptions();
