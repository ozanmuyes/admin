import store from 'store';

export const name = 'store';
export const priority = 100;

function initialize() {
  // It has already been initialized above (where we `import`ed it).

  // Return it to store the value in the listener registrator
  // ('./index.js'). Once it is resolved value will be
  // kept under the `name`.
  return store;
}

export default initialize;
