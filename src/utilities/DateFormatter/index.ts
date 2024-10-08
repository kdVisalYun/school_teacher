import { format } from "date-fns";
import { ja } from "date-fns/locale";
import i18n from "i18n";

const LOCALE_MAP: {
  [key: string]: (date: Date, dateFormat: string) => string;
} = {
  ja: (date: Date, dateFormat: string): string =>
    format(date, dateFormat, {
      locale: ja,
    }),
  en: (date: Date, dateFormat: string): string => format(date, dateFormat),
};

const formatDate = (date: Date, format: { [key: string]: string }): string => {
  const currentLang = i18n.language;
  const dateFormat = format[currentLang];
  return LOCALE_MAP[currentLang](date, dateFormat);
};

export { formatDate };
