import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DateRangeInput from "components/__reusable/DateRangeInput";
import ClassDropdown from "components/__reusable/ClassDropdown";
import StudentDropdown from "components/__reusable/StudentDropdown";
import HashtagInput from "components/__reusable/HashtagInput";
import IsFavoriteCheckbox from "components/__reusable/IsFavoriteCheckbox";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import {
  setDate,
  setClassId,
  setStudentId,
  setHashtag,
  setIsFavorite,
  reset,
} from "features/pictureSearch/pictureSearchSlice";
import { PICTURES_RESULTS_PATH } from "router/pathName";
import { searchHashTag } from "services/pictureServices";
import ClearIcon from "assets/icons/ClearIcon";

const TODAY = new Date();
TODAY.setHours(23, 59, 59, 999);

const FilterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { startDate, endDate, classId, studentId, hashtagId, isFavorite } =
    useAppSelector((state) => state.pictureSearch);
  const [hashTagInputValue, setHashTagInputValue] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (hashTagInputValue.length > 0 && !hashtagId) {
      const hashtags = await searchHashTag(hashTagInputValue);
      dispatch(
        setHashtag({
          hashtagId:
            hashtags.find((tag) => tag.name === hashTagInputValue)?.id || null,
        })
      );
    }
    navigate(PICTURES_RESULTS_PATH);
  };

  const dispatch = useAppDispatch();
  return (
    <form className="space-y-3 lg:space-y-5" onSubmit={submitForm}>
      <h2 className="text-xl font-semibold">
        {t("_published_picture._search_pictures")}
      </h2>
      <div className="w-full">
        <DateRangeInput
          name={""}
          currentStartDate={new Date(startDate)}
          currentEndDate={new Date(endDate)}
          maxDate={TODAY}
          onChange={(dates: Date[]) => {
            dispatch(
              setDate({
                startDate: dates[0].toISOString(),
                endDate: dates[1].toISOString(),
              })
            );
          }}
        />
      </div>
      <div className="w-full">
        <ClassDropdown
          currentClassId={classId?.toString() || ""}
          onChange={(id) => {
            dispatch(setClassId({ classId: id }));
            dispatch(setStudentId({ studentId: null }));
          }}
        />
      </div>
      {classId && (
        <div className="w-full">
          <StudentDropdown
            currentClassId={classId || 0}
            currentStudentId={studentId?.toString() || ""}
            onChange={(id) => dispatch(setStudentId({ studentId: id }))}
          />
        </div>
      )}
      <div className="w-full">
        <HashtagInput
          inputValue={hashTagInputValue}
          onInputChange={(value) => setHashTagInputValue(value)}
          value={hashtagId}
          onChange={(value) => dispatch(setHashtag({ hashtagId: value }))}
        />
      </div>
      <div className="w-full">
        <IsFavoriteCheckbox
          isFavorite={isFavorite || false}
          onChange={(status) => dispatch(setIsFavorite({ isFavorite: status }))}
        />
      </div>
      <div className="w-full space-y-1">
        <div className="flex justify-end">
          <button
            type="button"
            className="w-fit text-primary underline flex items-center space-x-1"
            onClick={() => {
              dispatch(reset());
              setHashTagInputValue("");
            }}
          >
            <ClearIcon width={24} height={24} />
            <p className="font-bold">{t("_published_picture._clear")}</p>
          </button>
        </div>
        <PrimaryActionButton
          isButton={false}
          label={t("_published_picture._search")}
          disabled={!classId || !studentId}
        />
      </div>
    </form>
  );
};

export default FilterForm;
