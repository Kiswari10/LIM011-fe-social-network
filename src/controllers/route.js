/* eslint-disable consistent-return */

import components from '../views/components.js';
import { showPost } from '../models/model-firebase.js';

const changeView = (route) => {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/': {
      return container.appendChild(components.login());
    }
    case '#/register': {
      return container.appendChild(components.register());
    }
    case '#/profile': {
      showPost((arrDeData) => {
        container.innerHTML = '';
        container.appendChild(components.profile(arrDeData));
      });
      break;
    }
    default:
      break;
  }
};

export default changeView;
