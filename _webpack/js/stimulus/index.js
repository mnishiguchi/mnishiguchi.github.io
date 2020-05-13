import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

import './controllers/hello_controller';
import './controllers/icon_slideshow_controller';
import './controllers/page_scroll_controller';

// Installation: https://stimulusjs.org/handbook/installing
// API Reference: https://stimulusjs.org/reference/controllers
// Naming conventions: https://stimulusjs.org/reference/controllers#naming-conventions
export default () => {
  const application = Application.start();
  const context = require.context('./controllers', true, /\.js$/);
  application.load(definitionsFromContext(context));
};
