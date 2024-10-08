import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Japanese } from "flatpickr/dist/l10n/ja";

import CalendarIcon from "assets/icons/CalendarIcon";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";

interface DateInputProps {
  name: string;
  currentDate: Date;
  maxDate?: Date;
  minDate?: Date;
  enableTime?: boolean;
  disable?: boolean;
  onChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  currentDate,
  maxDate,
  minDate,
  enableTime = false,
  disable = false,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!inputRef.current) return;
    flatpickr(inputRef.current, {
      locale: Japanese,
      enableTime: enableTime,
      dateFormat: enableTime ? "Y-m-d H:i" : "Y-m-d",
      maxDate,
      minDate,
      disableMobile: true,
      onChange: (selectedDates) => {
        if (!enableTime) selectedDates[0].setHours(0, 0, 0, 0);
        setDate(selectedDates[0]);
        onChange(selectedDates[0]);
      },
    });
  }, [inputRef.current, disable, maxDate, minDate, enableTime, onChange]);

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  return (
    <div className="w-full relative">
      {disable && <div className="w-full h-full absolute bg-white/50"></div>}
      <div
        ref={inputRef}
        className="w-full p-3 rounded-lg bg-white flex flex-row border border-[#9B9B9B]"
      >
        <input
          className="w-full outline-none disabled:bg-white/50"
          type="text"
          name={name}
          disabled={true}
          value={formatDate(date, {
            [SupportedLang.ja]: `yo Mo do${enableTime ? " HH:mm" : ""}`,
            [SupportedLang.en]: `MMMM d, yyyy${enableTime ? " HH:mm" : ""}`,
          })}
        />
        <div className="justify-self-center">
          <CalendarIcon width={32} height={32} color={"#767676"} />
        </div>
      </div>
    </div>
  );
};

export default DateInput;
