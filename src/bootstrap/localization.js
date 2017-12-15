import VueI18n from 'vue-i18n';

import elementEn from 'element-ui/lib/locale/lang/en';
// import elementDe from 'element-ui/lib/locale/lang/de';
// import elementTr from 'element-ui/lib/locale/lang/tr-TR';

import routerEn from 'router/lang/en';
//

import en from '@/lang/en';
import de from '@/lang/de';
import tr from '@/lang/tr';

export const name = 'i18n';
export const priority = 500;

function initialize({ Vue }) {
  Vue.use(VueI18n);

  const messages = {
    en: {
      ...en,
      ...elementEn,
      ...routerEn,
    },
    de: {
      ...de,
      // ...elementDe,
      // route: routerDe,
    },
    tr: {
      ...tr,
      // ...elementTr,
      // route: routerTr,
    },
  };

  const i18n = new VueI18n({
    locale: 'en',
    // locale: 'de',
    fallbackLocale: 'en',
    messages, // Load each json file as locale messages
  });

  return i18n;
}

export default initialize;
