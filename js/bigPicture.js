const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.social__comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const body = document.querySelector('body');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentCountElement = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPicture.querySelector('.social__comment-total-count');
const commentsAmount = parseInt(commentCounter.textContent, 10);

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
}
const createComment = ({avatar, message, username}) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = username;
  commentItem.querySelector('.social__text').textContent = message;
  return commentItem;
};

function drawCommentsList (comments, loadsCounter = 1) {
  commentsList.innerHTML = '';
  let i = 0;
  //const planedCommentsCount = commentsAmount * loadsCounter;
  for (i; i < (commentsAmount * loadsCounter) && i < comments.length; i++){
    const commentItem = createComment(comments[i]);
    commentsList.append(commentItem);
  }

  commentCountElement.textContent = i;
  totalCommentCountElement.textContent = comments.length;

  if (i === comments.length) {
    commentLoader.classList.add('hidden');
  }else {
    commentLoader.classList.remove('hidden');
  }
}


const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsAmount;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  drawCommentsList(picture.comments);

  bigPicture.querySelector('.social__caption').textContent = picture.description;

  body.classList.add('modal-open');

  closeBigPictureButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', onDocumentKeydown);

  let counter = 1;
  commentLoader.addEventListener('click', () => {
    counter++;
    drawCommentsList(picture.comments, counter);
  });
};

export {showBigPicture};

