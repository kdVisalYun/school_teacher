import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowUpIcon from "assets/icons/ArrowUpIcon";
import ArrowDownIcon from "assets/icons/ArrowDownIcon";
import type { DropdownInputOption } from "types/DropdownInputOption";

interface DropdownInputProps {
  placeholder: string;
  options: DropdownInputOption[];
  value: string;
  disable?: boolean;
  onChange: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  placeholder,
  options,
  value,
  disable,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full h-full space-y-1 relative ${
        disable ? "bg-white/50 text-[#666666]" : ""
      }`}
    >
      <button
        type="button"
        className="w-full h-full flex justify-between items-center p-3 bg-white rounded-lg border border-[#9B9B9B]"
        onClick={() => !disable && setIsOpen(!isOpen)}
      >
        <p className="truncate ...">
          {value
            ? t(
                options.find((option) => option.value === value)?.label ||
                  placeholder
              )
            : placeholder}
        </p>
        {isOpen ? (
          <ArrowUpIcon width={32} height={32} color={"#767676"} />
        ) : (
          <ArrowDownIcon width={32} height={32} color={"#767676"} />
        )}
      </button>
      {isOpen && (
        <ul className="w-full bg-white rounded-lg p-2 max-h-36 overflow-auto absolute z-40 list-none shadow-xl">
          {options
            .filter((option) => option.value !== value)
            .map((option) => (
              <li
                key={option.value}
                className="p-2 cursor-pointer hover:bg-[#F4F4F4]"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {t(option.label)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
