import Turbolinks from 'turbolinks';

import initDisqus from './js/initDisqus';
import initList from './js/initList';
import initSvgDrawingAnimation from './js/initSvgDrawingAnimation';

import './main.scss';

Turbolinks.start();

initDisqus();
initList();
initSvgDrawingAnimation();
