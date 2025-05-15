import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translation files
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationRU from "./locales/ru/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ru: {
    translation: translationRU,
  },
};

export const supportedLngs = Object.keys(resources); // Export supported languages

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Fallback language if user language is not available
    debug: false, // Set to false in production

    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
