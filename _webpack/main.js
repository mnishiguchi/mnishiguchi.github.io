import Turbolinks from 'turbolinks';

import initStimulus from './js/stimulus';
import initDisqus from './js/disqus';
import initList from './js/list';
import initSvgDrawingAnimation from './js/svgDrawingAnimation';
import initServiceWorker from './js/serviceWorker';

import './main.scss';

// https://github.com/turbolinks/turbolinks#installation-using-npm
Turbolinks.start();

initStimulus();
initDisqus();
initList();
initSvgDrawingAnimation();
initServiceWorker();
