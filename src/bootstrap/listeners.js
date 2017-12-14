import listeners from '@/listeners';

export const name = 'Listeners';
export const priority = 800;

function initialize() {
  // It has already been initialized above (where we `import`ed it).

  // Return the listeners Promise to be handled by the
  // listener registrator ('./index.js'). Once it is
  // resolved value will be kept under the `name`.
  return listeners;
}

export default initialize;
