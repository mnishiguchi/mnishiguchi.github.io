import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

import './controllers';

// https://stimulusjs.org/handbook/installing
export default () => {
  const application = Application.start();
  const context = require.context('./controllers', true, /\.js$/);
  application.load(definitionsFromContext(context));
};
