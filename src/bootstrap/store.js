import store from 'store';

export const name = 'store';
export const priority = 100;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
console.log(`BTSTR#store | Initializing ${name} with`, params);

  return store;
}

export default initialize;
