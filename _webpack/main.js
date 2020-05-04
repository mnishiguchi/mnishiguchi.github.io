import Turbolinks from 'turbolinks';
// Only Solid (fas) and Brands (fab) are free.
// https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import '@fortawesome/fontawesome-free/js/solid.js';

import initDisqus from './js/initDisqus';
import initList from './js/initList';
import initSvgDrawingAnimation from './js/initSvgDrawingAnimation';

import './main.scss';

Turbolinks.start();

initDisqus();
initList();
initSvgDrawingAnimation();
