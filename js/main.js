import { generatedDescriptions } from './data';
import { drawThumbnails } from './draw_thumbnail.js';
import './uploadPicture.js';

const descr = generatedDescriptions();
drawThumbnails(descr);
