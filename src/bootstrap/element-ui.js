import ElementUI from 'element-ui';

export const name = 'ElementUI';
export const priority = 400;

function initialize({ Vue }) {
  Vue.use(ElementUI);
}

export default initialize;
