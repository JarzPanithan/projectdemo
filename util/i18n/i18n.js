import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en';
import th from './th';

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = { en, th };

export default i18n;