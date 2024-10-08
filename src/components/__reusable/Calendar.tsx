import React, { useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";
import ArrowLeftIcon from "assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "assets/icons/ArrowRightIcon";

const HOLIDAY: { [key: string]: string } = {
  "2023-1-1": "元日",
  "2023-1-2": "休日 元日",
  "2023-1-9": "成人の日",
  "2023-2-11": "建国記念の日",
  "2023-2-23": "天皇誕生日",
  "2023-3-21": "春分の日",
  "2023-4-29": "昭和の日",
  "2023-5-3": "憲法記念日",
  "2023-5-4": "みどりの日",
  "2023-5-5": "こどもの日",
  "2023-7-17": "海の日",
  "2023-8-11": "山の日",
  "2023-9-18": "敬老の日",
  "2023-9-23": "秋分の日",
  "2023-10-9": "スポーツの日",
  "2023-11-3": "文化の日",
  "2023-11-23": "勤労感謝の日",
  "2024-1-1": "元日",
  "2024-1-8": "成人の日",
  "2024-2-11": "建国記念の日",
  "2024-2-12": "建国記念の日 振替休日",
  "2024-2-23": "天皇誕生日",
  "2024-3-20": "春分の日",
  "2024-4-29": "昭和の日",
  "2024-5-3": "憲法記念日",
  "2024-5-4": "みどりの日",
  "2024-5-5": "こどもの日",
  "2024-5-6": "こどもの日 振替休日",
  "2024-7-15": "海の日",
  "2024-8-11": "山の日",
  "2024-8-12": "休日 山の日",
  "2024-9-16": "敬老の日",
  "2024-9-22": "秋分の日",
  "2024-9-23": "秋分の日 振替休日",
  "2024-10-14": "スポーツの日",
  "2024-11-3": "文化の日",
  "2024-11-4": "文化の日 振替休日",
  "2024-11-23": "勤労感謝の日",
  "2025-1-1": "元日",
  "2025-1-13": "成人の日",
  "2025-2-11": "建国記念の日",
  "2025-2-23": "天皇誕生日",
  "2025-2-24": "天皇誕生日 振替休日",
  "2025-3-20": "春分の日",
  "2025-4-29": "昭和の日",
  "2025-5-3": "憲法記念日",
  "2025-5-4": "みどりの日",
  "2025-5-5": "こどもの日",
  "2025-5-6": "みどりの日 振替休日",
  "2025-7-21": "海の日",
  "2025-8-11": "山の日",
  "2025-9-15": "敬老の日",
  "2025-9-23": "秋分の日",
  "2025-10-13": "スポーツの日",
  "2025-11-3": "文化の日",
  "2025-11-23": "勤労感謝の日",
  "2025-11-24": "勤労感謝の日 振替休日",
};

const TODAY = new Date();

interface CalendarProps {
  renderedElement: { [key: string]: ReactNode };
  placeHolderElement: ReactNode;
  onMonthChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  renderedElement,
  placeHolderElement,
  onMonthChange,
}) => {
  const { t } = useTranslation();

  const [dates, setDates] = useState<Date[][]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const getAllDateOfMonth = () => {
    const lastDateOfMonth = new Date(currentDate);
    lastDateOfMonth.setMonth(lastDateOfMonth.getMonth() + 1);
    lastDateOfMonth.setDate(0);

    const dateArray: Date[] = [];
    for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
      const date = new Date(currentDate);
      date.setDate(i);
      dateArray.push(date);
    }
    while (dateArray[0].getDay() > 0) {
      const date = new Date(dateArray[0]);
      date.setDate(date.getDate() - 1);
      dateArray.unshift(date);
    }
    while (dateArray[dateArray.length - 1].getDay() < 6) {
      const date = new Date(dateArray[dateArray.length - 1]);
      date.setDate(date.getDate() + 1);
      dateArray.push(date);
    }

    let weeks = [];
    for (let i = 0; i < dateArray.length; i += 7) {
      weeks.push(dateArray.slice(i, i + 7));
    }
    setDates(weeks);
  };
  useEffect(() => {
    getAllDateOfMonth();
  }, [currentDate]);

  const renderDate = (date: Date) => {
    let textColor = "";
    const dayIndex = date.getDay();
    if (dayIndex === 0) {
      textColor = "text-[#c13439]";
    }
    if (dayIndex === 6) {
      textColor = "text-[#247ec0]";
    }

    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    if (HOLIDAY[formattedDate]) {
      textColor = "text-[#c13439]";
    }

    return <p className={`text-left ${textColor}`}>{date.getDate()}</p>;
  };

  const isMaxMonth = () =>
    currentDate.getMonth() >= TODAY.getMonth() &&
    currentDate.getFullYear() >= TODAY.getFullYear();

  const setDate = (step: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + step);
    setCurrentDate(date);
    onMonthChange(date);
  };

  const renderElement = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return renderedElement[formattedDate] || placeHolderElement;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-3/4 m-auto flex justify-between">
        <button onClick={() => setDate(-1)}>
          <ArrowLeftIcon width={32} height={32} color={"black"} />
        </button>
        <h3 className="font-semibold text-xl">
          <span className="text-base">
            {formatDate(currentDate, {
              [SupportedLang.ja]: "yo",
              [SupportedLang.en]: "yyyy",
            })}
          </span>{" "}
          {formatDate(currentDate, {
            [SupportedLang.ja]: "Mo",
            [SupportedLang.en]: "MMMM",
          })}
        </h3>
        <button
          className={`${isMaxMonth() && "invisible"}`}
          onClick={() => setDate(1)}
        >
          <ArrowRightIcon width={32} height={32} color={"black"} />
        </button>
      </div>
      <table className="flex-1 w-full m-auto table-fixed">
        <thead>
          <tr>
            <th className="text-[#c13439]">{t("_calendar._sun")}</th>
            <th>{t("_calendar._mon")}</th>
            <th>{t("_calendar._tue")}</th>
            <th>{t("_calendar._wed")}</th>
            <th>{t("_calendar._thu")}</th>
            <th>{t("_calendar._fri")}</th>
            <th className="text-[#247ec0]">{t("_calendar._sat")}</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((week, i) => (
            <tr key={i} className="align-top">
              {week.map((date) => (
                <td
                  key={`${date.getDate()}-${date.getMonth()}`}
                  className={`border border-black ${
                    date.getMonth() !== currentDate.getMonth() && `opacity-50`
                  }`}
                >
                  <div>{renderDate(date)}</div>
                  <div className="w-full">{renderElement(date)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
