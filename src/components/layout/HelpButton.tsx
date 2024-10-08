import { useState, useRef, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useWindowDimensions from "hooks/useWindowDimensions";
import HelpIcon from "assets/icons/HelpIcon";
import BookOpenIcon from "assets/icons/BookOpenIcon";
import FAQIcon from "assets/icons/FAQIcon";
import ParentsIcon from "assets/icons/ParentsIcon";
import DocumentIcon from "assets/icons/DocumentIcon";
import LockIcon from "assets/icons/LockIcon";
import LaptopIcon from "assets/icons/LaptopIcon";
import {
  PARENTS_MATERIAL_PATH,
  USER_MANUAL_PATH,
  FAQ_PATH,
} from "router/pathName";

const HelpButton = () => {
  const navigate = useNavigate();
  const OPTIONS: { label: string; icon: ReactNode; onClick: () => void }[] = [
    {
      label: "_help._user_manual",
      icon: <BookOpenIcon width={24} height={24} color={"black"} />,
      onClick: () => navigate(USER_MANUAL_PATH),
    },
    {
      label: "_help._faq",
      icon: <FAQIcon width={24} height={24} color={"black"} />,
      onClick: () => navigate(FAQ_PATH),
    },
    {
      label: "_help._parents_material",
      icon: <ParentsIcon width={24} height={24} color={"black"} />,
      onClick: () => navigate(PARENTS_MATERIAL_PATH),
    },
    {
      label: "_help._term_of_use",
      icon: <DocumentIcon width={24} height={24} color={"black"} />,
      onClick: () =>
        window.open(
          "https://www.irodoki.com/terms-of-use.html",
          "",
          "noopener"
        ),
    },
    {
      label: "_help._privacy_policy",
      icon: <LockIcon width={24} height={24} color={"black"} />,
      onClick: () =>
        window.open(
          "https://www.irodoki.com/policy-privacy.html",
          "",
          "noopener"
        ),
    },
    {
      label: "_help._recommended_env",
      icon: <LaptopIcon width={24} height={24} color={"black"} />,
      onClick: () =>
        window.open(
          "https://www.irodoki.com/recommended-environment.html",
          "",
          "noopener"
        ),
    },
  ];

  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobileView = width < 1025;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listWidth, setListWidth] = useState(0);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setListWidth(isMobileView ? width / 2 : width - rect.left);
    }
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      className="space-y-1 relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      <HelpIcon width={32} height={32} color={"black"} />
      {isOpen && (
        <ul
          className="bg-white rounded-lg p-3 overflow-auto absolute z-40 list-none shadow-xl space-y-3"
          style={{
            width: listWidth,
            left: isMobileView ? -listWidth / 2 : 0,
          }}
        >
          {OPTIONS.map((option) => (
            <li key={option.label}>
              <button
                className="w-full flex items-center space-x-2 p-2 hover:bg-[#F4F4F4]"
                onClick={option.onClick}
              >
                {option.icon}
                <p className="text-left">{t(option.label)}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default HelpButton;
