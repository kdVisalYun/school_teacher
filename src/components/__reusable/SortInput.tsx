import { useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import ArrowDownIcon from "assets/icons/ArrowDownIcon";
import ArrowUpIcon from "assets/icons/ArrowUpIcon";
import type { SortInputOption } from "types/SortInputOption";

interface SortInputProp {
  options: SortInputOption[];
  value: string;
  onChange: (value: string) => void;
}

const SortInput: FC<SortInputProp> = ({ options, value, onChange }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-1 relative">
      <button
        type="button"
        className="w-full flex flex-row justify-between items-center p-2 bg-white rounded-lg border border-[#9B9B9B]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{t("_student._display_order")}</p>
        {!isOpen ? (
          <ArrowDownIcon width={32} height={32} color={"#767676"} />
        ) : (
          <ArrowUpIcon width={32} height={32} color={"#767676"} />
        )}
      </button>
      {isOpen ? (
        <ul className="w-full bg-white rounded-lg p-2 max-h-36 overflow-auto absolute z-40">
          {options.map((option) => (
            <li
              key={option.label}
              className="p-2 flex justify-between items-center"
            >
              <p>{t(option.label)}</p>
              <div className="flex items-center space-x-3">
                <button
                  className={`p-1 text-lg rounded ${
                    value === option.value.asc && "bg-primary text-white"
                  }`}
                  onClick={() => onChange(option.value.asc)}
                >
                  <TiArrowSortedDown />
                </button>
                <button
                  className={`p-1 text-lg rounded ${
                    value === option.value.desc && "bg-primary text-white"
                  }`}
                  onClick={() => onChange(option.value.desc)}
                >
                  <TiArrowSortedUp />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SortInput;
