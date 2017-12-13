import listeners from '@/listeners';

export const name = 'Listeners';
export const priority = 5169;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
console.log(`BTSTR#listener | Initializing ${name} with`, params);
// debugger;
  return listeners;
}

export default initialize;
