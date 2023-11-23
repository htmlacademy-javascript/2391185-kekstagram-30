import { generatedDescriptions } from './data';
import { drawThumbnails } from './draw_thumbnail.js';

const descr = generatedDescriptions();
console.log(descr[0].comments);
drawThumbnails(descr);
