import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DropdownInput from "./DropdownInput";
import { LANG_LOCAL_STORAGE } from "config/keywords";
import { SupportedLang } from "config/constants";
import type { DropdownInputOption } from "types/DropdownInputOption";

const OPTIONS: DropdownInputOption[] = [
  {
    label: "日本語",
    value: "ja",
  },
  {
    label: "English",
    value: "en",
  },
];

const LanguageDropdown = () => {
  const [lang, setLang] = useState("");
  useEffect(() => {
    const currentLang = localStorage.getItem(LANG_LOCAL_STORAGE);
    if (!currentLang) {
      localStorage.setItem(LANG_LOCAL_STORAGE, SupportedLang.ja);
      setLang(SupportedLang.ja);
      return;
    }
    setLang(currentLang);
  }, []);

  const { i18n } = useTranslation();
  const changeLanaguage = (lang: string) => {
    setLang(lang);
    localStorage.setItem(LANG_LOCAL_STORAGE, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="w-full">
      <DropdownInput
        placeholder={""}
        options={OPTIONS}
        value={lang}
        onChange={changeLanaguage}
      />
    </div>
  );
};

export default LanguageDropdown;
