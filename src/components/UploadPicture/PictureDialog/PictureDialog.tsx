import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import CancelIcon from "assets/icons/CancelIcon";
import LoadingIcon from "assets/icons/LoadingIcon";
import ArrowLeftIcon from "assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "assets/icons/ArrowRightIcon";
import HideIcon from "assets/icons/HideIcon";
import ShowIcon from "assets/icons/ShowIcon";
import type { Picture } from "types/Pictures";
import useAppSelector from "hooks/useAppSelector";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang, PictureType } from "config/constants";
import PublishStatusToggle from "./PublishStatusToggle";
import ClassPictureButton from "./ClassPictureButton";
import IsFavoriteButton from "./IsFavoriteButton";
import TaggedStudentContainer from "./TaggedStudentContainer";
import ActivityTagContainer from "../ActivityTagContainer";

interface PictureDialogProps {
  picture: Picture;
  onPrevious: (() => void) | null;
  onNext: (() => void) | null;
  onClose: () => void;
}

const PictureDialog: React.FC<PictureDialogProps> = ({
  picture,
  onPrevious,
  onNext,
  onClose,
}) => {
  const { t } = useTranslation();
  const { classes } = useAppSelector((state) => state.class);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = picture.converted_picture;
    setIsLoading(!image.complete);

    return () => {
      setIsLoading(true);
    };
  }, [picture]);

  const [isShowTag, setIsShowTag] = useState(true);

  const renderClassName = (classId: number) =>
    classes.find((c) => c.id === classId)?.name || "";
  return createPortal(
    <div className="fixed z-40 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="w-[90%] bg-white z-50">
        <div className="h-[90vh] overflow-y-scroll lg:overflow-auto lg:flex justify-between space-x-2">
          <div className="lg:hidden w-full h-[5vh] flex flex-row-reverse justify-between items-center">
            <button onClick={onClose}>
              <CancelIcon width={32} height={32} color={"black"} />
            </button>
          </div>
          <div className="lg:w-3/4 h-[70vh] lg:h-auto bg-[#fcfcfc] flex flex-col justify-center border-e border-e-[#eee] relative">
            {isLoading && (
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="w-32">
                  <LoadingIcon />
                </div>
              </div>
            )}
            <div className="max-w-full max-h-full m-auto relative">
              <img
                className="max-w-full max-h-full object-contain m-auto pointer-events-auto"
                src={picture.converted_picture}
                alt="picture"
                style={{
                  visibility: !isLoading ? "visible" : "hidden",
                }}
                onLoad={() => setIsLoading(false)}
              />
              {picture.picture_type !== PictureType.class && (
                <TaggedStudentContainer
                  picture={picture}
                  isShowTag={isShowTag}
                />
              )}
              <div id="student_list"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {onPrevious && (
                <div className="absolute top-[50%] left-5 z-20 pointer-events-auto">
                  <button
                    className="rounded-full bg-black/50 pointer-events-auto"
                    onClick={onPrevious}
                  >
                    <ArrowLeftIcon width={32} height={32} color={"white"} />
                  </button>
                </div>
              )}
              {onNext && (
                <div className="absolute top-[50%] right-5 z-20 pointer-events-auto">
                  <button
                    className="rounded-full bg-black/50 pointer-events-auto"
                    onClick={onNext}
                  >
                    <ArrowRightIcon width={32} height={32} color={"white"} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-1/4 h-[25vh] lg:h-auto flex flex-col py-2 pe-2 space-y-1 lg:space-y-5">
            <div className="hidden w-full lg:flex flex-row-reverse justify-between items-center">
              <button onClick={onClose}>
                <CancelIcon width={32} height={32} color={"black"} />
              </button>
            </div>
            <div className="pb-10 flex-1 flex flex-col justify-between">
              <div className="space-y-3 lg:space-y-5">
                <div className="space-y-1 lg:space-y-2">
                  <h2 className="text-lg lg:text-2xl font-medium">
                    {renderClassName(picture.class_id)}
                  </h2>
                  <p className="text-sm lg:text-base">
                    {`${t(
                      "_unpublished_picture_class._upload_date"
                    )} ${formatDate(new Date(picture.create_time), {
                      [SupportedLang.ja]: "yo Mo do",
                      [SupportedLang.en]: "MMMM d, yyyy",
                    })}`}
                  </p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <div className="flex justify-between">
                    <div className="w-fit">
                      <PublishStatusToggle picture={picture} />
                    </div>
                    <div>
                      <span className="group relative">
                        <span className="pointer-events-none absolute -bottom-10 left-full -translate-x-full whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-[90%] before:bottom-full before:-translate-x-[90%] before:border-4 before:border-transparent before:border-b-black before:content-[''] group-hover:opacity-100">
                          {t("_unpublished_picture_class._hide_tags")}
                        </span>
                        <button onClick={() => setIsShowTag(!isShowTag)}>
                          {isShowTag ? (
                            <HideIcon width={32} height={32} color={"black"} />
                          ) : (
                            <ShowIcon width={32} height={32} color={"black"} />
                          )}
                        </button>
                      </span>
                    </div>
                  </div>
                  <ClassPictureButton picture={picture} />
                </div>
              </div>
              <div className="space-y-2">
                <ActivityTagContainer pictures={[picture]} />
                <IsFavoriteButton picture={picture} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default PictureDialog;
