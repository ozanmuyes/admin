import ElementUI from 'element-ui';
import ElementUIEn from 'element-ui/lib/locale/lang/en';

export const name = 'ElementUI';
export const priority = 400;

function initialize({ Vue }) {
  Vue.use(ElementUI, { locale: ElementUIEn });
}

export default initialize;
