import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Container from "components/__reusable/Container";
import PictureSearchInput from "components/__reusable/PictureSearchInput";
import LoadingDialog from "components/__reusable/LoadingDialog";
import { getPublishedPictureSummarizationByClass } from "services/summarizationServices";
import type { SummarizationByClass } from "types/Summarization";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";
import { PICTURES_RESULTS_PATH } from "router/pathName";
import useAppDispatch from "hooks/useAppDispatch";
import { setDate, setClassId } from "features/pictureSearch/pictureSearchSlice";

const Summarization = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [summaries, setSummaries] = useState<{
    [key: string]: SummarizationByClass[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummaries = async () => {
    try {
      setIsLoading(true);
      setSummaries({});
      const summaries = await getPublishedPictureSummarizationByClass();
      const summariesMap: { [key: string]: SummarizationByClass[] } = {};
      for (let summary of summaries) {
        if (summariesMap[summary.date])
          summariesMap[summary.date].push(summary);
        else summariesMap[summary.date] = [summary];
      }
      setSummaries(summariesMap);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSummaries();
  }, []);

  const dispatch = useAppDispatch();
  const viewPictures = (date: string, classId: number) => {
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
    dispatch(setClassId({ classId }));
    navigate(PICTURES_RESULTS_PATH, {
      state: { prevPath: window.location.pathname },
    });
  };

  return (
    <div className="h-full w-full flex flex-col space-y-1 lg:space-y-3">
      <div>
        <PictureSearchInput onSearch={fetchSummaries} />
      </div>
      <div className="flex-1">
        <Container>
          <div className="h-full overflow-auto relative">
            <div className="w-full h-full absolute">
              <div className="h-[95%] overflow-y-auto space-y-3 lg:space-y-5">
                {isLoading && <LoadingDialog />}
                {Object.keys(summaries).length === 0 && (
                  <p>{t("_generic._no_data")}</p>
                )}
                {Object.keys(summaries).map((date) => (
                  <div key={date} className="space-y-1 lg:space-y-2">
                    <h3 className="text-xl font-semibold">
                      {formatDate(new Date(date), {
                        [SupportedLang.ja]: "Mo do (EEE)",
                        [SupportedLang.en]: "EEEE, MMM do",
                      })}
                    </h3>
                    {summaries[date].map((summary) => (
                      <div
                        key={summary.class_id}
                        className="flex space-x-2 text-lg"
                      >
                        <p>{summary.class_name}: </p>
                        <button
                          className="underline text-[#7093cf]"
                          onClick={() =>
                            viewPictures(summary.date, summary.class_id)
                          }
                        >
                          {summary.number_published_picture}{" "}
                          {t("_published_picture._images")}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Summarization;
