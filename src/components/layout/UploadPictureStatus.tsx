import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import MessageDialog from "components/__reusable/MessageDialog";
import ProgressBar from "components/__reusable/ProgressBar";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppDispatch from "hooks/useAppDispatch";
import {
  removePictureFromBatch,
  removeBatchFromQueue,
  cancelUpload,
} from "features/picture/pictureSlice";
import { uploadPicture, deletePicture } from "services/pictureServices";
import { UNPUBLISHED_PICTURES_PATH } from "router/pathName";
import type { UploadPictureFormData, UploadPictureQueue } from "types/Pictures";
import CancelIcon from "assets/icons/CancelIcon";

interface UploadPictureStatusProps {
  pictureBatch: UploadPictureQueue;
}

const UploadPictureStatus: React.FC<UploadPictureStatusProps> = ({
  pictureBatch,
}) => {
  const { t } = useTranslation();
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalPictures, setTotalPictures] = useState(0);
  const [uploadedPictures, setUploadedPictures] = useState(0);

  const [currentUploadingPictureId, setCurrentUploadingPictureId] =
    useState(-1);
  const [isCancel, setIsCancel] = useState(false);
  const [lastUploadedPictureId, setLastUploadedPictureId] = useState(-1);
  const [uploadIndex, setUploadIndex] = useState(0);

  const dispatch = useAppDispatch();
  const uploadPictures = async () => {
    const { id, classId, pictureType, picturesBatch } = pictureBatch;
    if (picturesBatch.length === 0 || uploadIndex >= picturesBatch.length) {
      setIsCompleted(true);
      return;
    }
    if (picturesBatch[uploadIndex].id === currentUploadingPictureId) {
      return;
    }
    setLastUploadedPictureId(-1);
    try {
      const formData: UploadPictureFormData = {
        classId,
        pictureType: pictureType,
        picture: picturesBatch[uploadIndex].picture,
      };
      setCurrentUploadingPictureId(picturesBatch[uploadIndex].id);
      const newPicture = await uploadPicture(formData);
      setLastUploadedPictureId(newPicture[0].id);
      dispatch(
        removePictureFromBatch({
          batchId: id,
          pictureId: picturesBatch[uploadIndex].id,
        })
      );
    } catch (e) {
      let currentIndex = uploadIndex;
      currentIndex += 1;
      setUploadIndex(currentIndex);
    }
  };
  useEffect(() => {
    setIsCompleted(false);
    setTotalPictures(pictureBatch.picturesBatch.length);
  }, []);

  useEffect(() => {
    uploadPictures();
  }, [pictureBatch, uploadIndex]);

  useEffect(() => {
    if (isCancel && lastUploadedPictureId > -1) {
      deletePicture(lastUploadedPictureId);
    }
  }, [isCancel, lastUploadedPictureId]);

  const retry = () => {
    uploadPictures();
  };

  const cancel = () => {
    setIsCancel(true);
    const { id } = pictureBatch;
    dispatch(cancelUpload({ batchId: id }));
  };

  const navigate = useNavigate();
  const viewUploadedPicture = () => {
    dispatch(removeBatchFromQueue({ batchId: pictureBatch.id }));
    navigate(UNPUBLISHED_PICTURES_PATH);
  };

  useEffect(() => {
    setUploadedPictures(totalPictures - pictureBatch.picturesBatch.length);
  }, [totalPictures, pictureBatch]);

  const closeDialog = () => {
    if (isCompleted) {
      dispatch(removeBatchFromQueue({ batchId: pictureBatch.id }));
    } else {
      setIsOpenDialog(false);
    }
  };

  const renderStatus = () => {
    if (isOpenDialog) {
      return (
        <MessageDialog>
          <div className="space-y-3">
            <h2 className="text-2xl text-center font-semibold">
              {!isCompleted
                ? t("_upload._uploading")
                : t("_upload._upload_complete")}
            </h2>
            {!isCompleted && (
              <p className="text-center">{t("_upload._please_wait")}</p>
            )}
            <p className="text-sm text-center">
              {t("_upload._upload_progress", {
                totalUploaded: uploadedPictures,
                totalPictures,
              })}
            </p>
            {!isCompleted && (
              <ProgressBar
                progress={(uploadedPictures / totalPictures) * 100}
              />
            )}
            {isCompleted ? (
              <div className="w-full flex justify-center items-center space-x-3">
                <div className="w-1/3">
                  <SecondaryActionButton
                    label={t("_upload._close")}
                    onClick={() =>
                      dispatch(
                        removeBatchFromQueue({ batchId: pictureBatch.id })
                      )
                    }
                  />
                </div>
                {pictureBatch.picturesBatch.length > 0 && (
                  <div className="w-1/2">
                    <SecondaryActionButton
                      label={t("_upload._retry")}
                      onClick={retry}
                    />
                  </div>
                )}
                <div className="w-1/2">
                  <PrimaryActionButton
                    label={t("_upload._goto_view_screen")}
                    onClick={viewUploadedPicture}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center space-x-3">
                <div className="w-1/3">
                  <SecondaryActionButton
                    label={t("_upload._cancel")}
                    onClick={cancel}
                  />
                </div>
                <div className="w-1/3">
                  <PrimaryActionButton
                    label={t("_upload._close")}
                    onClick={closeDialog}
                  />
                </div>
              </div>
            )}
          </div>
        </MessageDialog>
      );
    } else {
      return (
        <div className="p-3 bg-white border border-[#E0E0E0]">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">
              {!isCompleted
                ? t("_upload._uploading")
                : t("_upload._upload_complete")}
            </h2>
            {!isCompleted ? (
              <button
                className="text-primary underline font-semibold"
                onClick={cancel}
              >
                {t("_upload._cancel")}
              </button>
            ) : (
              <button
                className="text-primary underline font-semibold"
                onClick={() =>
                  dispatch(removeBatchFromQueue({ batchId: pictureBatch.id }))
                }
              >
                {t("_generic._close")}
              </button>
            )}
          </div>
          <p className="text-sm">
            {t("_upload._upload_progress", {
              totalUploaded: uploadedPictures,
              totalPictures,
            })}
          </p>
          {!isCompleted && (
            <ProgressBar progress={(uploadedPictures / totalPictures) * 100} />
          )}
          {isCompleted && (
            <div className="w-full flex justify-end">
              <div className="w-1/4 flex justify-end space-x-2">
                {pictureBatch.picturesBatch.length > 0 && (
                  <div className="w-1/2">
                    <SecondaryActionButton
                      label={t("_upload._retry")}
                      onClick={retry}
                    />
                  </div>
                )}
                <div className="w-1/2">
                  <PrimaryActionButton
                    label={t("_upload._goto_view_screen")}
                    onClick={viewUploadedPicture}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  const renderCancelStatus = () => {
    if (isOpenDialog) {
      return (
        <MessageDialog>
          <div className="space-y-3">
            <h2 className="text-2xl text-center font-semibold">
              {!isCompleted ? t("_upload._canceling") : t("_upload._cancelled")}
            </h2>
            <PrimaryActionButton
              label={t("_upload._close")}
              onClick={closeDialog}
            />
          </div>
        </MessageDialog>
      );
    } else {
      return (
        <div className="p-3 bg-white border border-[#E0E0E0]">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">
              {!isCompleted ? t("_upload._canceling") : t("_upload._cancelled")}
            </h2>
            {isCompleted && (
              <button
                className="text-primary underline font-semibold"
                onClick={() =>
                  dispatch(removeBatchFromQueue({ batchId: pictureBatch.id }))
                }
              >
                <CancelIcon width={32} height={32} color={"black"} />
              </button>
            )}
          </div>
        </div>
      );
    }
  };

  return !isCancel ? renderStatus() : renderCancelStatus();
};

export default UploadPictureStatus;
