import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { isDevelopmentMode } from './utils';
import deTranslations from '../public/locales/de.json';
import ruTranslations from '../public/locales/ru.json';
import enTranslations from '../public/locales/en.json';

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: isDevelopmentMode(),
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		defaultNS: '',
		resources: {
			en: enTranslations, // Use translations for English
			ru: ruTranslations, // Use translations for Russian
			de: deTranslations, // Use translations for German
		},
	});

export default i18n;
