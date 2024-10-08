import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import Container from "./Container";
import DateRangeInput from "./DateRangeInput";
import ClassDropdown from "./ClassDropdown";
import StudentDropdown from "./StudentDropdown";
import HashtagInput from "./HashtagInput";
import IsFavoriteCheckbox from "./IsFavoriteCheckbox";
import PrimaryActionButton from "./PrimaryActionButton";
import SearchIcon from "assets/icons/SearchIcon";
import {
  setDate,
  setClassId,
  setStudentId,
  setIsFavorite,
  setHashtag,
  reset,
} from "features/pictureSearch/pictureSearchSlice";
import { searchHashTag } from "services/pictureServices";
import ClearIcon from "assets/icons/ClearIcon";

interface PictureSearchInputProps {
  onSearch: () => Promise<void>;
}

const TODAY = new Date();
TODAY.setHours(23, 59, 59, 999);

const PictureSearchInput: React.FC<PictureSearchInputProps> = ({
  onSearch,
}) => {
  const { t } = useTranslation();
  const { startDate, endDate, classId, studentId, hashtagId, isFavorite } =
    useAppSelector((state) => state.pictureSearch);
  const [hashTagInputValue, setHashTagInputValue] = useState("");
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (hashTagInputValue.length > 0 && !hashtagId) {
      const hashtags = await searchHashTag(hashTagInputValue);
      dispatch(
        setHashtag({
          hashtagId:
            hashtags.find((tag) => tag.name === hashTagInputValue)?.id || null,
        })
      );
    }
    await onSearch();
    setIsLoading(false);
  };

  return (
    <Container>
      <form
        className="lg:flex lg:items-stretch space-x-0 lg:space-x-2 space-y-2 lg:space-y-0"
        onSubmit={handleSubmit}
      >
        <div className="w-full lg:w-[30%]">
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
        <div className="w-full lg:w-[15%]">
          <ClassDropdown
            currentClassId={classId?.toString() || ""}
            onChange={(id) => {
              dispatch(setClassId({ classId: id }));
              dispatch(setStudentId({ studentId: null }));
            }}
          />
        </div>
        <div className="w-full lg:w-[20%]">
          <StudentDropdown
            currentClassId={classId || 0}
            currentStudentId={studentId?.toString() || ""}
            onChange={(id) => dispatch(setStudentId({ studentId: id }))}
          />
        </div>
        <div className="w-full lg:w-[15%]">
          <HashtagInput
            inputValue={hashTagInputValue}
            onInputChange={(value) => setHashTagInputValue(value)}
            value={hashtagId}
            onChange={(value) => dispatch(setHashtag({ hashtagId: value }))}
          />
        </div>
        <div className="w-full lg:w-[10%]">
          <IsFavoriteCheckbox
            isFavorite={isFavorite || false}
            onChange={(status) =>
              dispatch(setIsFavorite({ isFavorite: status }))
            }
          />
        </div>
        <div className="w-full lg:w-[10%] flex items-center">
          <PrimaryActionButton
            isButton={false}
            label={
              <div className="w-fit m-auto flex items-center space-x-1">
                <SearchIcon width={24} height={24} color={"white"} />
                <p>{t("_published_picture._search")}</p>
              </div>
            }
            disabled={!classId || !studentId}
            loading={isLoading}
          />
        </div>
      </form>
      <div className="flex justify-end">
        <div className="w-full lg:w-[10%]">
          <button
            type="button"
            className="w-fit text-primary underline flex justify-center items-center space-x-1"
            onClick={() => {
              dispatch(reset());
              setHashTagInputValue("");
            }}
          >
            <ClearIcon width={24} height={24} />
            <p className="font-bold">{t("_published_picture._clear")}</p>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PictureSearchInput;
