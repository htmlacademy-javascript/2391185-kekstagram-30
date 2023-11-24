import { generatedDescriptions } from './data';
import { drawThumbnails } from './draw_thumbnail.js';

const descr = generatedDescriptions();
drawThumbnails(descr);
