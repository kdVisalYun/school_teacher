import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Japanese } from "flatpickr/dist/l10n/ja";
import english from "flatpickr/dist/l10n/default";
import { CustomLocale } from "flatpickr/dist/types/locale";
import { useTranslation } from "react-i18next";

import CalendarIcon from "assets/icons/CalendarIcon";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";

interface DateRangeInputProps {
  name: string;
  currentStartDate: Date;
  currentEndDate: Date;
  maxDate?: Date;
  minDate?: Date;
  enableTime?: boolean;
  disable?: boolean;
  onChange: (dates: Date[]) => void;
}

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setHours(0, 0, 0, 0);

const DEFAULT_END_DATE = new Date(DEFAULT_START_DATE);
DEFAULT_END_DATE.setHours(23, 59, 59, 999);

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  name,
  currentStartDate,
  currentEndDate,
  maxDate,
  minDate,
  enableTime = false,
  disable = false,
  onChange,
}) => {
  const { i18n } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

  const getLocale = (): CustomLocale => {
    switch (i18n.language) {
      case SupportedLang.ja:
        return Japanese;
      case SupportedLang.en:
        return english;
      default:
        return Japanese;
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    flatpickr(inputRef.current, {
      mode: "range",
      locale: getLocale(),
      enableTime: enableTime,
      dateFormat: enableTime ? "Y-m-d H:i" : "Y-m-d",
      maxDate,
      minDate,
      disableMobile: true,
      onChange: (selectedDates) => {
        if (selectedDates.length < 2) return;
        const startDate = new Date(selectedDates[0]);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(selectedDates[1]);
        endDate.setHours(23, 59, 59, 999);
        onChange([startDate, endDate]);
      },
      onClose: (selectedDates) => {
        if (selectedDates.length === 0) return;
        const startDate = new Date(selectedDates[0]);
        startDate.setHours(0, 0, 0, 0);
        if (startDate.getTime() > currentEndDate.getTime()) {
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          onChange([startDate, today]);
        } else {
          onChange([startDate, currentEndDate]);
        }
        if (selectedDates[1]) {
          const endDate = new Date(selectedDates[1]);
          endDate.setHours(23, 59, 59, 999);
          onChange([startDate, endDate]);
        }
      },
    });
  }, [
    inputRef.current,
    i18n.language,
    disable,
    maxDate,
    minDate,
    enableTime,
    onChange,
  ]);

  useEffect(() => {
    setStartDate(currentStartDate);
    setEndDate(currentEndDate);
  }, [currentStartDate, currentEndDate]);

  const renderDateLabel = () =>
    `${formatDate(startDate, {
      [SupportedLang.ja]: `yo Mo do${enableTime ? "HH:mm" : ""}`,
      [SupportedLang.en]: `MMMM d, yyyy${enableTime ? "HH:mm" : ""}`,
    })} - ${formatDate(endDate, {
      [SupportedLang.ja]: `yo Mo do${enableTime ? "HH:mm" : ""}`,
      [SupportedLang.en]: `MMMM d, yyyy${enableTime ? "HH:mm" : ""}`,
    })}`;

  return (
    <div className="w-full h-full relative">
      {disable && <div className="w-full h-full absolute bg-white/50"></div>}
      <div
        ref={inputRef}
        className="w-full h-full p-3 rounded-lg bg-white flex items-center border border-[#9B9B9B]"
      >
        <input
          className="w-full outline-none disabled:bg-white/50"
          type="text"
          name={name}
          disabled={true}
          value={`${renderDateLabel()}`}
        />
        <div className="justify-self-center">
          <CalendarIcon width={32} height={32} color={"#767676"} />
        </div>
      </div>
    </div>
  );
};

export default DateRangeInput;
