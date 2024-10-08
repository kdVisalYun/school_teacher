import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowUpIcon from "assets/icons/ArrowUpIcon";
import ArrowDownIcon from "assets/icons/ArrowDownIcon";
import RegistrationDocumentDeadlineDialog from "./RegistrationDocumentDeadlineDialog";
import GradeAdvancementDialog from "./GradeAdvancementDialog";
import DeleteStudentPromptDialog from "./DeleteStudentPromptDialog";
import useAppSelector from "hooks/useAppSelector";
import type { DropdownInputOption } from "types/DropdownInputOption";

const MENU_OPTION: DropdownInputOption[] = [
  { value: "1", label: "_student._issue_registration_form" },
  { value: "2", label: "_student._grade_advancement" },
  { value: "3", label: "_student._set_graduation_date" },
  { value: "4", label: "_student._delete_student" },
];

const OperationDropdown = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("");
  const handleMenu = () => {
    switch (selectedMenu) {
      case "1":
        return (
          <RegistrationDocumentDeadlineDialog
            onNoClick={() => setSelectedMenu("")}
            onYesClick={() => setSelectedMenu("")}
          />
        );
      case "2":
        return (
          <GradeAdvancementDialog
            onNoClick={() => setSelectedMenu("")}
            onYesClick={() => setSelectedMenu("")}
          />
        );
      case "4":
        return (
          <DeleteStudentPromptDialog
            onNoClick={() => setSelectedMenu("")}
            onYesClick={() => setSelectedMenu("")}
          />
        );
      default:
        return null;
    }
  };

  const { selectedStudents } = useAppSelector((state) => state.student);
  useEffect(() => {
    if (selectedStudents.length === 0) setIsOpen(false);
  }, [selectedStudents]);

  return (
    <div className="w-full h-full space-y-1 relative">
      <button
        type="button"
        className={`w-full h-full flex justify-between items-center p-3 text-white rounded-lg border border-[#9B9B9B] ${
          selectedStudents.length === 0 ? "bg-[#767676]" : "bg-primary"
        }`}
        onClick={() => selectedStudents.length > 0 && setIsOpen(!isOpen)}
      >
        <p className="flex-1 text-center truncate ...">
          {selectedMenu
            ? t(
                MENU_OPTION.find((option) => option.value === selectedMenu)
                  ?.label || t("_student._bulk_operation")
              )
            : t("_student._bulk_operation")}
        </p>
        {isOpen ? (
          <ArrowUpIcon width={32} height={32} color={"white"} />
        ) : (
          <ArrowDownIcon width={32} height={32} color={"white"} />
        )}
      </button>
      {isOpen && (
        <ul className="w-full bg-white rounded-lg p-2 max-h-36 overflow-auto absolute z-40 list-none">
          {MENU_OPTION.filter((option) => option.value !== selectedMenu).map(
            (option) => (
              <li
                key={option.value}
                className="p-2 cursor-pointer hover:bg-[#F4F4F4]"
                onClick={() => {
                  setSelectedMenu(option.value);
                  setIsOpen(false);
                }}
              >
                {t(option.label)}
              </li>
            )
          )}
        </ul>
      )}
      {handleMenu()}
    </div>
  );
};

export default OperationDropdown;
