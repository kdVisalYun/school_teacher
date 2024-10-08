import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Container from "components/__reusable/Container";
import Calendar from "components/__reusable/Calendar";
import { getPublishedPictureSummarizationByDate } from "services/summarizationServices";
import { PICTURES_SUMMARIZATION_PATH } from "router/pathName";
import useAppDispatch from "hooks/useAppDispatch";
import { setDate } from "features/pictureSearch/pictureSearchSlice";
import { SummarizationByDate } from "types/Summarization";

const PublishedPictureCalendar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [summaries, setSummaries] = useState<SummarizationByDate[]>([]);

  const fetchStatus = async () => {
    try {
      const startDate = new Date(currentMonth);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);

      const summaries = await getPublishedPictureSummarizationByDate(
        startDate.toISOString(),
        endDate.toISOString()
      );
      setSummaries(summaries);
    } catch (e) {
      console.error(e);
    }
  };

  const renderElement = () => {
    const renderedElements: {
      [key: string]: ReactNode;
    } = {};
    for (let summary of summaries) {
      renderedElements[summary.date] = (
        <button
          className="w-full"
          onClick={() => handleSummaryClick(summary.date)}
        >
          <img
            className="max-w-1/2 m-auto"
            src="/images/sakura.svg"
            alt="sakura"
          />
          <p className="text-sm text-center">
            {summary.number_published_picture} {t("_home._images")}
          </p>
        </button>
      );
    }
    return renderedElements;
  };

  const dispatch = useAppDispatch();
  const handleSummaryClick = (date: string) => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    dispatch(
      setDate({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    );
    navigate(PICTURES_SUMMARIZATION_PATH);
  };

  useEffect(() => {
    fetchStatus();
  }, [currentMonth]);

  return (
    <Container>
      <Calendar
        renderedElement={renderElement()}
        placeHolderElement={
          <div className="w-full invisible">
            <img className="max-w-1/2" src="/images/sakura.svg" alt="sakura" />
            <p className="text-sm text-center">0 {t("_home._images")}</p>
          </div>
        }
        onMonthChange={(date) => setCurrentMonth(date)}
      />
    </Container>
  );
};

export default PublishedPictureCalendar;
