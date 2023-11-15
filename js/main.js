import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './utility.js';
import {GENERATED_PHOTO_DESCRIPTIONS_COUNT, AVATAR_COUNT, MIN_LIKES_COUNT, MAX_LIKES_COUNT, MAX_COMMENTS_COUNT, MAX_COMMENTS_ID, DESCRIPTIONS, MESSAGES, NAMES} from './constantsdata.js';


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
