/* eslint-disable no-unused-vars */

import router from 'router';

export const name = 'router';
export const priority = 90;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
// console.log(`BTSTR#router | Initializing ${name} with`, params);

  return router;
}

export default initialize;
