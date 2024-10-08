import React, { useState } from "react";

import type { DropdownInputOption } from "types/DropdownInputOption";
import ArrowUpIcon from "assets/icons/ArrowUpIcon";
import ArrowDownIcon from "assets/icons/ArrowDownIcon";
import CancelIcon from "assets/icons/CancelIcon";

interface MultipleValueDropdownInputProps {
  placeholder: string;
  options: DropdownInputOption[];
  value: string[];
  disable?: boolean;
  onChange: (value: string[]) => void;
}

const MultipleValueDropdownInput: React.FC<MultipleValueDropdownInputProps> = ({
  placeholder,
  options,
  value,
  disable,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full space-y-1 relative ${
        disable ? "bg-white/50 text-[#666666]" : ""
      }`}
    >
      <button
        type="button"
        className="w-full flex justify-between items-center p-3 bg-white rounded-lg border border-[#9B9B9B]"
        onClick={() => !disable && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap">
          {value.length > 0 ? (
            value.map((v) => (
              <div
                key={v}
                className="m-1 p-1 bg-[#E6E6E6] flex justify-between items-center"
              >
                {options.find((option) => option.value === v)?.label}
                <button
                  type="button"
                  className="w-5 h-5 bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(value.filter((va) => va !== v));
                  }}
                >
                  <CancelIcon
                    width={"100%"}
                    height={"100%"}
                    color={"#767676"}
                  />
                </button>
              </div>
            ))
          ) : (
            <p>{placeholder}</p>
          )}
        </div>
        {isOpen ? (
          <ArrowUpIcon width={32} height={32} color={"#767676"} />
        ) : (
          <ArrowDownIcon width={32} height={32} color={"#767676"} />
        )}
      </button>
      {isOpen && (
        <ul className="w-full bg-white rounded-lg p-2 max-h-36 overflow-auto absolute z-40 list-none shadow-xl">
          {options
            .filter((option) => !value.includes(option.value))
            .map((option) => (
              <li
                key={option.value}
                className="p-2 cursor-pointer hover:bg-[#F4F4F4]"
                onClick={() => {
                  onChange([...value, option.value]);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultipleValueDropdownInput;
