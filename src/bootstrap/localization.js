import VueI18n from 'vue-i18n';

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
      ...routerEn,
    },
    de: {
      ...de,
      // route: routerDe,
    },
    tr: {
      ...tr,
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
