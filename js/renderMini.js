import { getData } from './fetchApi.js';
import { drawThumbnails } from './draw_thumbnail.js';
import { debounce } from './utility.js';
import { setFilterClick } from './filter.js';

const RENDER_DELAY = 500;

const imgFilterElement = document.querySelector('.img-filters');

const renderMini = () =>{
  getData()
    .then((photos) => {
      imgFilterElement.classList.remove('img-filters--inactive');
      drawThumbnails(photos);
      setFilterClick(debounce(
        () => drawThumbnails(photos),
        RENDER_DELAY)
      );
    }).catch(()=>{});
};

export { renderMini };
