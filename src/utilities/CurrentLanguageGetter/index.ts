import i18n from "i18n";
import { SupportedLang } from "config/constants";
import { JA, EN } from "config/keywords";

const getCurrentLanguage = (): SupportedLang => {
  switch (i18n.language) {
    case JA:
      return SupportedLang.ja;
    case EN:
      return SupportedLang.en;
    default:
      return SupportedLang.ja;
  }
};

export { getCurrentLanguage };
