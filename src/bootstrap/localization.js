import VueI18n from 'vue-i18n';

// import routerEn from 'router/lang/en'; // [MVLNGSTGHR]
//

import en from '@/lang/en';
// import de from '@/lang/de'; // [PSSTHOTHRSFRNW]: pass the others for now
// import tr from '@/lang/tr'; // [PSSTHOTHRSFRNW]

export const name = 'i18n';
export const priority = 500;

function initialize({ Vue }) {
  Vue.use(VueI18n);

  const messages = {
    en, // [PSSTHOTHRSFRNW]
    /*
     * [PSSTHOTHRSFRNW]
    en: {
      ...en,
      // ...routerEn, // [MVLNGSTGHR]
    }, */
    /*
    * [PSSTHOTHRSFRNW]
    de: {
      ...de,
      // route: routerDe,
    },
    tr: {
      ...tr,
      // route: routerTr,
    }, */
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
