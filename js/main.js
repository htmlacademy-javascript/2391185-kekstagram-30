//import { generatedDescriptions } from './data';
import { getData } from './fetchApi.js';
import { drawThumbnails } from './draw_thumbnail.js';
import { showAlert } from './utility.js';
import { setFormAction } from './uploadPictures/uploadPictureForm.js';

getData()
  .then((pictures) => {
    drawThumbnails(pictures);
  })
  .catch((err) => {
    showAlert(err);
  });

setFormAction();
