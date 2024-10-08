import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en_translation from "./en.json";
import ja_translation from "./ja.json";
import { LANG_LOCAL_STORAGE } from "config/keywords";

const resources = {
  ja: {
    translation: ja_translation,
  },
  en: {
    translation: en_translation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(LANG_LOCAL_STORAGE) || "ja",
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
