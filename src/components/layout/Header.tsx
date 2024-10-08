import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageDropdown from "components/__reusable/LanguageDropdown";
import {
  BASE_PATH,
  FACILITY_PATH,
  PICTURES_PATH,
  SYSTEM_INFO_PATH,
  SETTING_PATH,
  ACCOUNT_PATH,
  CLASS_PATH,
  UPLOAD_PATH,
  UNPUBLISHED_PICTURES_PATH,
  PICTURES_SUMMARIZATION_PATH,
  DELETE_PICTURES_PATH,
  PARENTS_MATERIAL_PATH,
  USER_MANUAL_PATH,
  FAQ_PATH,
} from "router/pathName";
import { OPEN_NAV } from "config/keywords";
import FacilityLabel from "./FacilityLabel";
import HelpButton from "./HelpButton";
import HamburgerMenuIcon from "assets/icons/HamburgerMenuIcon";

const FACILITY_PATH_REGEX = new RegExp(FACILITY_PATH);
const PICTURES_PATH_REGEX = new RegExp(PICTURES_PATH);
const SYSTEM_INFO_PATH_REGEX = new RegExp(SYSTEM_INFO_PATH);
const SETTING_PATH_REGEX = new RegExp(SETTING_PATH);
const ACCOUNT_PATH_REGEX = new RegExp(ACCOUNT_PATH);
const CLASS_PATH_REGEX = new RegExp(CLASS_PATH);
const UPLOAD_PATH_REGEX = new RegExp(UPLOAD_PATH);
const UNPUBLISHED_PICTURES_PATH_REGEX = new RegExp(UNPUBLISHED_PICTURES_PATH);
const PICTURES_SUMMARIZATION_PATH_REGEX = new RegExp(
  PICTURES_SUMMARIZATION_PATH
);
const DELETE_PICTURES_PATH_REGEX = new RegExp(DELETE_PICTURES_PATH);

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [title, setTitle] = useState("");

  const renderHeaderTitle = () => {
    const pathName = location.pathname;

    switch (true) {
      case pathName === BASE_PATH:
        setTitle("_header._home");
        break;
      case PICTURES_PATH_REGEX.test(pathName):
        setTitle("_header._picture_management");
        break;
      case CLASS_PATH_REGEX.test(pathName):
        setTitle("_header._class_management");
        break;
      case ACCOUNT_PATH_REGEX.test(pathName):
        setTitle("_header._account_management");
        break;
      case SYSTEM_INFO_PATH_REGEX.test(pathName):
        setTitle("_header._notification");
        break;
      case FACILITY_PATH_REGEX.test(pathName):
        setTitle("_header._facility_information");
        break;
      case SETTING_PATH_REGEX.test(pathName):
        setTitle("_header._setting");
        break;
      case UPLOAD_PATH_REGEX.test(pathName):
        setTitle("_header._upload");
        break;
      case DELETE_PICTURES_PATH_REGEX.test(pathName):
        setTitle("_header._delete_picture_management");
        break;
      case UNPUBLISHED_PICTURES_PATH_REGEX.test(pathName):
        setTitle("_header._unpublished_picture_management");
        break;
      case PICTURES_SUMMARIZATION_PATH_REGEX.test(pathName):
        setTitle("_header._picture_management");
        break;
      case pathName === PARENTS_MATERIAL_PATH:
        setTitle("_header._parents_material");
        break;
      case pathName === USER_MANUAL_PATH:
        setTitle("_header._user_manual");
        break;
      case pathName === FAQ_PATH:
        setTitle("_header._faq");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    renderHeaderTitle();
  }, [location]);

  return (
    <header className="bg-white flex justify-between items-center px-3 py-5 border-l border-b border-[#E0E0E0]">
      <h1 className="w-1/2 text-2xl lg:text-4xl font-semibold">{t(title)}</h1>
      <div className="w-fit lg:w-1/2 hidden lg:flex justify-end items-center space-x-3">
        <div className="w-fit">
          <LanguageDropdown />
        </div>
        <HelpButton />
        <FacilityLabel />
      </div>
      <div className="flex items-center space-x-3 lg:hidden">
        <HelpButton />
        <button onClick={() => window.dispatchEvent(new Event(OPEN_NAV))}>
          <HamburgerMenuIcon width={40} height={40} color={"#767676"} />
        </button>
      </div>
    </header>
  );
};

export default Header;
