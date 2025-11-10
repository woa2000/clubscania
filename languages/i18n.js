import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './portuguese.json';
import en from './english.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: pt
      },
      en: {
        translation: en
      }
    },
    lng: 'pt', // Idioma padrão
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false // React já protege contra XSS
    }
  });

export default i18n;