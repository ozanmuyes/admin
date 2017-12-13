/* eslint-disable no-unused-vars */

import listeners from '@/listeners';

export const name = 'Listeners';
export const priority = 5169;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
// console.log(`BTSTR#listener | Initializing ${name} with`, params);

  // Return the initialize function to execute and wait for the Promise to resolve (there)
  return listeners;
}

export default initialize;
