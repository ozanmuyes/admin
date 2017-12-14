import router from 'router';

export const name = 'router';
export const priority = 90;

function initialize() {
  // It has already been initialized above (where we `import`ed it).

  // Return it to store the value in the listener registrator
  // ('./index.js'). Once it is resolved value will be
  // kept under the `name`.
  return router;
}

export default initialize;
