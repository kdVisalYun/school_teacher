import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import DeleteIcon from "assets/icons/DeleteIcon";
import LoadingIcon from "assets/icons/LoadingIcon";
import PictureThumbnail from "components/__reusable/PictureThumbnail";
import PictureDialog from "./PictureDialog/PictureDialog";
import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { setViewPicture } from "features/picture/pictureSlice";
import { updatePicturePublishStatus } from "features/picture/pictureAction";
import { formatDate } from "utilities/DateFormatter";
import { PicturePublishStatus, SupportedLang } from "config/constants";
import type { PictureGroupByUploadDate, Picture } from "types/Pictures";
import LoadingDialog from "components/__reusable/LoadingDialog";

interface PictureCollectionProps {
  pictureGroup: PictureGroupByUploadDate[];
}

const PictureCollection: React.FC<PictureCollectionProps> = ({
  pictureGroup,
}) => {
  const { t } = useTranslation();
  const [pictures, setPictures] = useState<Picture[]>([]);
  const pictureState = useAppSelector((state) => state.picture);
  const [viewIndex, setViewIndex] = useState(-1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const pictures = pictureGroup.map((group) => group.pictures).flat();
    if (pictureState.viewedPicture && viewIndex > -1) {
      const updatedPicture = pictureState.pictures.find(
        (picture) => picture.id === pictureState.viewedPicture?.id
      );
      if (updatedPicture) {
        const index = pictures.findIndex(
          (picture) => picture.id === pictureState.viewedPicture?.id
        );
        if (index < 0) pictures.splice(viewIndex, 0, updatedPicture);
        else setViewIndex(index);
        dispatch(setViewPicture({ picture: updatedPicture }));
      }
    }
    setPictures(pictures);
  }, [pictureGroup, pictureState.viewedPicture]);

  const [isHasUncheckedPictures, setIsHasUncheckedPictures] = useState(false);
  const [isShowEndOfListDialog, setIsShowEndOfListDialog] = useState(false);
  useEffect(() => {
    const uncheckedPictures = pictures.filter(
      (picture) => picture.public_status === 0
    );
    if (uncheckedPictures.length > 0) setIsHasUncheckedPictures(true);
    if (uncheckedPictures.length === 0 && isHasUncheckedPictures) {
      setIsHasUncheckedPictures(false);
      setIsShowEndOfListDialog(true);
    }
  }, [pictures]);

  const viewPicture = (pictureId: number) => {
    if (!pictures.length) return;
    const index = pictures.findIndex((picture) => picture.id === pictureId);
    if (index >= 0) dispatch(setViewPicture({ picture: pictures[index] }));
    setViewIndex(index);
  };
  const closeDialog = () => {
    dispatch(setViewPicture({ picture: null }));
    setViewIndex(-1);
  };
  const viewPreviousPicture = () => {
    let index = viewIndex;
    if (index === 0) return;
    index--;
    dispatch(setViewPicture({ picture: pictures[index] }));
    setViewIndex(index);
  };
  const viewNextPicture = () => {
    if (!pictures.length) return;
    let index = viewIndex;
    if (index === pictures.length - 1) return;
    index++;
    dispatch(setViewPicture({ picture: pictures[index] }));
    setViewIndex(index);
  };
  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      //arrow right key
      viewNextPicture();
      return;
    }
    if (e.keyCode === 37) {
      //arrow left key
      viewPreviousPicture();
      return;
    }
  };
  useEffect(() => {
    window.removeEventListener("keyup", handleKeyboardEvent);
    window.addEventListener("keyup", handleKeyboardEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyboardEvent);
    };
  }, [viewIndex]);

  const [toBeDeleteGroup, setToBeDeleteGroup] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const deleteGroup = async () => {
    setToBeDeleteGroup(undefined);
    setIsLoading(true);
    const targetGroup = pictureGroup.find(
      (group) => group.uploadDate === toBeDeleteGroup
    );
    if (!targetGroup) return;
    for (let picture of targetGroup.pictures) {
      await dispatch(
        updatePicturePublishStatus({
          id: picture.id,
          formData: { public_status: PicturePublishStatus.not_good },
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-3 lg:space-y-5">
      {pictureGroup.length === 0 ? (
        <p>{t("_generic._no_data")}</p>
      ) : (
        pictureGroup.map((group) => (
          <div key={group.uploadDate} className="h-full space-y-1">
            <div className="flex items-center space-x-1">
              <h4>
                {formatDate(new Date(group.uploadDate), {
                  [SupportedLang.ja]: "yo Mo do",
                  [SupportedLang.en]: "MMMM d, yyyy",
                })}
              </h4>
              <button
                className="border border-black rounded-full"
                onClick={() => setToBeDeleteGroup(group.uploadDate)}
              >
                <DeleteIcon width={24} height={24} color={"black"} />
              </button>
            </div>
            <div className="flex flex-wrap">
              {group.pictures.map((picture) => (
                <button
                  key={picture.id}
                  className="w-16 h-16 me-3 mb-3 relative"
                  onClick={() =>
                    (picture.picture_type === 1 && picture.job_status === 2) ||
                    picture.thumbnail_picture
                      ? viewPicture(picture.id)
                      : null
                  }
                >
                  <div className="h-full cursor-pointer">
                    {picture.public_status === 1 && (
                      <div className="absolute top-[5%] left-[5%] z-10 bg-white rounded-full">
                        <FaCircleCheck className="text-[#0DB74C] text-xl" />
                      </div>
                    )}
                    {picture.picture_type === 1 && picture.job_status < 2 && (
                      <div className="w-full h-full absolute z-10 bg-black/25">
                        <div className="w-1/2 h-1/2 absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                          <LoadingIcon />
                        </div>
                      </div>
                    )}
                    <PictureThumbnail
                      imageSrc={picture.thumbnail_picture}
                      name="picture"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
      {isShowEndOfListDialog && (
        <MessageDialog>
          <div className="flex flex-col justify-center items-center space-y-3">
            <h2 className="text-2xl  font-semibold">
              {t("_unpublished_picture_class._check_end")}
            </h2>
            <pre>{t("_unpublished_picture_class._thank_you")}</pre>
            <PrimaryActionButton
              label={t("_unpublished_picture_class._close")}
              onClick={() => setIsShowEndOfListDialog(false)}
            />
          </div>
        </MessageDialog>
      )}
      {viewIndex > -1 && pictures[viewIndex] && (
        <PictureDialog
          picture={pictures[viewIndex]}
          onPrevious={viewIndex > 0 ? () => viewPreviousPicture() : null}
          onNext={
            viewIndex < pictures.length - 1 ? () => viewNextPicture() : null
          }
          onClose={closeDialog}
        />
      )}
      {isLoading && <LoadingDialog />}
      {toBeDeleteGroup && (
        <MessageDialog>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-center">
              {t("_unpublished_picture_class._move_picture")}
            </h2>
            <p className="text-center">
              {t("_unpublished_picture_class._move_picture_confirmation", {
                date: formatDate(new Date(toBeDeleteGroup), {
                  [SupportedLang.ja]: "yo Mo do",
                  [SupportedLang.en]: "MMMM d, yyyy",
                }),
              })}
            </p>
            <div className="flex space-x-5">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._no")}
                  onClick={() => setToBeDeleteGroup(undefined)}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_generic._yes")}
                  onClick={deleteGroup}
                />
              </div>
            </div>
          </div>
        </MessageDialog>
      )}
    </div>
  );
};

export default PictureCollection;
