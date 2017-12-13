import ElementUI from 'element-ui';

export const name = 'ElementUI';
export const priority = 400;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
console.log(`BTSTR#ElementUI | Initializing ${name} with`, params);

  this.use(ElementUI);

  return null;
}

export default initialize;
