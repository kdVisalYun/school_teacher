import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ExpandInIcon from "assets/icons/ExpandInIcon";
import ExpandOutIcon from "assets/icons/ExpandOutIcon";
import CancelIcon from "assets/icons/CancelIcon";
import HomeIcon from "assets/icons/HomeIcon";
import PhotoIcon from "assets/icons/PhotoIcon";
import ClassIcon from "assets/icons/ClassIcon";
import AccountIcon from "assets/icons/AccountIcon";
import NotificationIcon from "assets/icons/NotificationIcon";
import KidIcon from "assets/icons/KidIcon";
import SettingIcon from "assets/icons/SettingIcon";
import ArrowDownIcon from "assets/icons/ArrowDownIcon";
import ArrowRightIcon from "assets/icons/ArrowRightIcon";
import LeaveIcon from "assets/icons/LeaveIcon";
import NavbarItem from "components/__reusable/NavbarItem";
import useWindowDimensions from "hooks/useWindowDimensions";
import {
  BASE_PATH,
  PICTURES_PATH,
  CLASS_PATH,
  ACCOUNT_PATH,
  SYSTEM_INFO_PATH,
  FACILITY_PATH,
  SETTING_PATH,
  LOGIN_PATH,
} from "router/pathName";
import { OPEN_NAV } from "config/keywords";
import LanguageDropdown from "components/__reusable/LanguageDropdown";
import useIsPrincipal from "hooks/useIsPrincipal";
import useAppDispatch from "hooks/useAppDispatch";
import { reset } from "features/pictureSearch/pictureSearchSlice";

const Navbar = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isClosed, setIsClosed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpenContactInfo, setIsOpenContactInfo] = useState(false);
  const isPrincipal = useIsPrincipal();

  useEffect(() => {
    const isMobileView = width < 1025;
    setIsClosed(isMobileView);
    setIsMobileView(isMobileView);
  }, [width]);

  const openNavbar = () => {
    setIsClosed(false);
  };
  useEffect(() => {
    window.addEventListener(OPEN_NAV, openNavbar);

    return () => {
      window.removeEventListener(OPEN_NAV, openNavbar);
    };
  }, []);

  const applyNavStyle = () => {
    let className = [
      "bg-white",
      "h-screen",
      "flex",
      "flex-col",
      "justify-between",
      "transition-[width]",
      "ease-linear",
      "duration-200",
      "lg:min-w-[5%]",
    ];
    if (isClosed) className.push("w-0", "lg:w-0");
    else className.push("px-3", "py-5", "w-full", "lg:w-1/5");
    return className.join(" ");
  };

  const renderNavHeader = () => {
    if (!isClosed) {
      return (
        <div className="flex space-x-5 justify-between">
          <div className={"w-[75%] h-auto"}>
            <img
              className="max-w-full max-h-full"
              src="/images/irodoki_logo.svg"
              alt="logo"
            />
          </div>
          <button
            className="w-8 h-8 justify-self-end self-center hidden lg:block"
            onClick={() => setIsClosed(!isClosed)}
          >
            <ExpandOutIcon width={32} height={32} color={"#767676"} />
          </button>
          <button
            className="w-8 h-8 justify-self-end self-center block lg:hidden"
            onClick={() => setIsClosed(true)}
          >
            <CancelIcon width={32} height={32} color={"#767676"} />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-0 justify-center">
          <div className={"w-0 h-auto"}>
            <img
              className="max-w-full max-h-full"
              src="/logo/irodoki.svg"
              alt="logo"
            />
          </div>
          <button
            className="w-8 h-8 justify-self-end self-center hidden lg:block"
            onClick={() => setIsClosed(!isClosed)}
          >
            <ExpandInIcon width={32} height={32} color={"#767676"} />
          </button>
          <button
            className="w-8 h-8 justify-self-end self-center block lg:hidden"
            onClick={() => setIsClosed(true)}
          >
            <CancelIcon width={32} height={32} color={"#767676"} />
          </button>
        </div>
      );
    }
  };

  const dispatch = useAppDispatch();
  const renderNavItem = (
    path: string,
    label: string,
    icon: React.ReactNode,
    replace: boolean
  ) => (
    <NavbarItem
      link={path}
      icon={icon}
      label={!isClosed ? label : null}
      onClick={() => {
        dispatch(reset());
        if (isMobileView) setIsClosed(true);
      }}
    />
  );

  const renderContactInfo = () => {
    const renderInfo = () => (
      <ul>
        <li className="text-[#767676]">{t("_navigation._sakura_company")}</li>
        <li className="text-[#767676]">
          {t("_navigation._irodoki_support_office")}
        </li>
        <li className="text-[#767676]">
          {t("_navigation._email")}：support@irodoki.com
        </li>
        <li className="text-[#767676]">TEL:06-4967-1283</li>
        <li className="text-[#767676]">{t("_navigation._working_hour")}</li>
      </ul>
    );

    return (
      <div className="flex flex-col space-y-3">
        <h2
          className="text-xl font-semibold flex items-center space-x-3 cursor-pointer"
          onClick={() => setIsOpenContactInfo(!isOpenContactInfo)}
        >
          {!isOpenContactInfo ? (
            <ArrowRightIcon width={20} height={20} color={"black"} />
          ) : (
            <ArrowDownIcon width={20} height={20} color={"black"} />
          )}
          {t("_navigation._contact_us")}
        </h2>
        {isOpenContactInfo && renderInfo()}
      </div>
    );
  };

  return (
    <nav className={applyNavStyle()}>
      {renderNavHeader()}
      <div className="h-full flex flex-col justify-between">
        <div className="flex-1 space-y-3">
          <div>
            {renderNavItem(
              BASE_PATH,
              t("_navigation._home"),
              <HomeIcon width={"100%"} height={"100%"} color={"#767676"} />,
              false
            )}
            {renderNavItem(
              PICTURES_PATH,
              t("_navigation._picture_management"),
              <PhotoIcon width={"100%"} height={"100%"} color={"#767676"} />,
              false
            )}
            {renderNavItem(
              CLASS_PATH,
              t("_navigation._class_management"),
              <ClassIcon width={"100%"} height={"100%"} color={"#767676"} />,
              false
            )}
            {renderNavItem(
              ACCOUNT_PATH,
              t("_navigation._account_management"),
              <AccountIcon width={"100%"} height={"100%"} color={"#767676"} />,
              false
            )}
          </div>
          <div className="h-0.5 bg-[#E7E5E0]"></div>
          <div>
            {renderNavItem(
              SYSTEM_INFO_PATH,
              t("_navigation._notification"),
              <NotificationIcon
                width={"100%"}
                height={"100%"}
                color={"#767676"}
              />,
              false
            )}
            {isPrincipal &&
              renderNavItem(
                FACILITY_PATH,
                t("_navigation._facility_information"),
                <KidIcon width={"100%"} height={"100%"} color={"#767676"} />,
                false
              )}
            {renderNavItem(
              SETTING_PATH,
              t("_navigation._setting"),
              <SettingIcon width={"100%"} height={"100%"} color={"#767676"} />,
              false
            )}
          </div>
          <div className="h-0.5 bg-[#E7E5E0]"></div>
          {!isClosed && renderContactInfo()}
        </div>
        <div>
          {!isClosed && (
            <div className="lg:hidden w-full">
              <LanguageDropdown />
            </div>
          )}
          {renderNavItem(
            LOGIN_PATH,
            t("_navigation._logout"),
            <LeaveIcon width={"100%"} height={"100%"} color={"#ff0000"} />,
            false
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
