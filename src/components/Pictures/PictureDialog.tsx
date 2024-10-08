import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import CancelIcon from "assets/icons/CancelIcon";
import LoadingIcon from "assets/icons/LoadingIcon";
import ArrowLeftIcon from "assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "assets/icons/ArrowRightIcon";
import LikeIcon from "assets/icons/LikeIcon";
import DownloadIcon from "assets/icons/DownloadIcon";
import type { Picture } from "types/Pictures";
import useAppSelector from "hooks/useAppSelector";
import { formatDate } from "utilities/DateFormatter";
import { PicturePublishStatus, SupportedLang } from "config/constants";
import IsFavoriteButton from "components/UploadPicture/PictureDialog/IsFavoriteButton";
import TagStudentList from "./TagStudentList";
import DeletePromptDialog from "./DeletePromptDialog";
import useAppDispatch from "hooks/useAppDispatch";
import { updatePicturePublishStatus } from "features/picture/pictureAction";
import { setErrorStatus } from "features/error/errorSlice";
import { setSuccessStatus } from "features/success/successSlice";

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

  const downloadPicture = () => {
    const link = document.createElement("a");
    link.href = picture.original_picture;
    link.click();
  };

  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();
  const deletePicture = async () => {
    setIsShowDeleteDialog(false);
    const updateAction = await dispatch(
      updatePicturePublishStatus({
        id: picture.id,
        formData: { public_status: PicturePublishStatus.deleted },
      })
    );
    if (!isFulfilled(updateAction)) {
      dispatch(setErrorStatus(""));
    } else {
      dispatch(
        setSuccessStatus({
          title: "_published_picture._delete_success",
          message: "",
        })
      );
    }
  };

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
            <img
              className="max-w-full max-h-full object-contain m-auto pointer-events-auto"
              src={picture.converted_picture}
              alt="picture"
              style={{
                visibility: !isLoading ? "visible" : "hidden",
              }}
              onLoad={() => setIsLoading(false)}
            />
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
          <div className="lg:w-1/4 h-[25vh] lg:h-auto py-2 pe-2 space-y-1 lg:space-y-5 flex flex-col justify-between">
            <div className="space-y-1 lg:space-y-5">
              <div className="hidden w-full lg:flex flex-row-reverse justify-between items-center">
                <button onClick={onClose}>
                  <CancelIcon width={32} height={32} color={"black"} />
                </button>
              </div>
              <div className="lg:space-y-2">
                <h2 className="text-lg lg:text-2xl font-medium">
                  {renderClassName(picture.class_id)}
                </h2>
                <p className="text-sm lg:text-base">
                  {t("_published_picture._published_date")}
                  {formatDate(new Date(picture.update_time), {
                    [SupportedLang.ja]: "yo Mo do",
                    [SupportedLang.en]: "MMMM d, yyyy",
                  })}
                </p>
              </div>
              <div className="w-1/2 flex items-center">
                <LikeIcon width={24} height={24} color={"#767676"} />
                <span className="text-sm lg:text-base">
                  {picture.total_favorite} likes
                </span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="flex items-center bg-primary text-white p-2 rounded-lg"
                  onClick={downloadPicture}
                >
                  <DownloadIcon width={32} height={32} color={"#ffffff"} />
                  <p>{t("_published_picture._download")}</p>
                </button>
                <button
                  className="underline text-[#ff0000]"
                  onClick={() => setIsShowDeleteDialog(true)}
                >
                  {t("_published_picture._delete")}
                </button>
              </div>
            </div>
            <div className="flex-1 border border-[#9B9B9B] p-1">
              <TagStudentList picture={picture} />
            </div>
            <div className="mb-10">
              <IsFavoriteButton picture={picture} />
            </div>
          </div>
        </div>
        {isShowDeleteDialog && (
          <DeletePromptDialog
            onNoClick={() => setIsShowDeleteDialog(false)}
            onYesClick={deletePicture}
          />
        )}
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default PictureDialog;
