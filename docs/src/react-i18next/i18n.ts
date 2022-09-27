import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales/resources';

i18n
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		lng: window.localStorage.getItem('LINGJIE_LOCALE_KEY') || 'en',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		}
	});

export default i18n;