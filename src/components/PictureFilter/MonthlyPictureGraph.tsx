import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowLeftIcon from "assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "assets/icons/ArrowRightIcon";
import FlowerIcon from "assets/icons/FlowerIcon";
import Container from "components/__reusable/Container";
import ProfileAvatar from "components/__reusable/ProfileAvatar";
import useAppSelector from "hooks/useAppSelector";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang, StudentSortValue } from "config/constants";
import type { Class } from "types/Class";
import type { SummarizationByStudent } from "types/Summarization";
import { getPublishedPictureSummarizationByStudents } from "services/summarizationServices";
import { getStudents } from "services/studentServices";
import { setErrorStatus } from "features/error/errorSlice";
import useAppDispatch from "hooks/useAppDispatch";

const TODAY = new Date();

const MonthlyPictureGraph = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMaxMonth = () =>
    currentDate.getMonth() >= TODAY.getMonth() &&
    currentDate.getFullYear() >= TODAY.getFullYear();
  const setDate = (step: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + step);
    setCurrentDate(date);
  };

  const { classes } = useAppSelector((state) => state.class);
  const [currentClass, setCurrentClass] = useState<Class | undefined>(
    undefined
  );
  const renderClassButton = () => {
    return classes.map((c) => (
      <button
        key={c.id}
        className={`w-fit whitespace-nowrap ${
          currentClass?.id === c.id
            ? "text-black text-lg font-semibold py-1 border-b-4 border-b-primary"
            : "text-black/50"
        }`}
        onClick={() => setCurrentClass(c)}
      >
        {c.name}
      </button>
    ));
  };
  useEffect(() => {
    if (!currentClass) setCurrentClass(classes[0]);
  }, [classes]);

  const [studentPictures, setStudentPictures] = useState<
    SummarizationByStudent[]
  >([]);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fetchStudentPictures = async () => {
    if (!currentClass) return;
    setIsLoading(true);
    try {
      const startDate = new Date(currentDate);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(-1);
      endDate.setHours(23, 59, 59, 999);
      const studentPictures = await getPublishedPictureSummarizationByStudents(
        currentClass.id,
        startDate.toISOString(),
        endDate.toISOString()
      );

      const students = await getStudents(
        currentClass.id,
        StudentSortValue.name_asc
      );
      const summaries: SummarizationByStudent[] = [];
      for (let student of students) {
        const summary: SummarizationByStudent = {
          student_id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          first_name_kata: student.first_name_kata,
          last_name_kata: student.last_name_kata,
          profile_picture: student.profile_picture_for_admin || "",
          total_pictures:
            studentPictures.total.find((s) => s.student_id === student.id)
              ?.number_tags || 0,
        };
        summaries.push(summary);
      }
      setStudentPictures(summaries);
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentPictures();
  }, [currentDate, currentClass]);

  const renderStudentGraph = () => {
    return studentPictures.map((s) => (
      <div className="w-full flex space-x-3">
        <div className="w-1/2 lg:w-1/4 flex items-center space-x-2">
          <div className="w-10">
            <ProfileAvatar pictureUrl={s.profile_picture} />
          </div>
          <p className="flex-1 text-sm">{`${s.last_name} ${s.first_name}`}</p>
        </div>
        <div className="w-[10%]">
          <p>{s.total_pictures}</p>
          <div
            className={`flex justify-end ${
              s.total_pictures < 30 ? "invisible" : ""
            }`}
          >
            <div className="max-w-[50%]">
              <FlowerIcon width={"100%"} height={"auto"} color={"#ff0000"} />
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div
            className="h-[50%] absolute z-10 bg-primary top-1/2 -translate-y-1/2"
            style={{
              width: s.total_pictures > 100 ? "100%" : `${s.total_pictures}%`,
            }}
          ></div>
          <div className="w-full h-full flex">
            <div className="w-[30%] border-dashed border-e border-e-black"></div>
            <div className="flex-1 border-dashed border-e border-e-black"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col space-y-3 lg:space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t("_published_picture._number_published_picture")}
        </h2>
        <div className="w-1/2 lg:w-1/3 bg-white p-1 rounded border border-[#9B9B9B] flex justify-between items-center">
          <button onClick={() => setDate(-1)}>
            <ArrowLeftIcon width={32} height={32} color={"#9B9B9B"} />
          </button>
          <p className="text-xl">
            {formatDate(currentDate, {
              [SupportedLang.ja]: "yo Mo",
              [SupportedLang.en]: "yyyy MMMM",
            })}
          </p>
          <button
            className={`${isMaxMonth() && "invisible"}`}
            onClick={() => setDate(1)}
          >
            <ArrowRightIcon width={32} height={32} color={"#9B9B9B"} />
          </button>
        </div>
      </div>
      <div className="flex-1 h-full">
        <Container>
          <div className="w-full h-full flex flex-col">
            <div className="h-[10%] w-[95%] overflow-x-auto relative">
              <div className="h-full flex items-center space-x-5 absolute">
                {renderClassButton()}
              </div>
            </div>
            <div className="w-full flex space-x-3">
              <div className="w-1/2 lg:w-1/4"></div>
              <div className="w-[10%]"></div>
              <div className="flex-1 flex">
                <div className="w-[30%] text-end">30</div>
                <div className="flex-1 text-end">100</div>
              </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && studentPictures.length === 0 && (
              <p>{t("_generic._no_data")}</p>
            )}
            {!isLoading && studentPictures.length > 0 && (
              <div className="flex-1 h-full overflow-auto relative">
                <div className="w-full h-full absolute">
                  {renderStudentGraph()}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MonthlyPictureGraph;
