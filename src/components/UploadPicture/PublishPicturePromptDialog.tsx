import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import ProfileAvatar from "components/__reusable/ProfileAvatar";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import PictureThumbnail from "components/__reusable/PictureThumbnail";
import PublishPictureAdjustmentDialog from "./PublishPictureAdjustmentDialog";
import ErrorIcon from "assets/icons/ErrorIcon";
import LoadingIcon from "assets/icons/LoadingIcon";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { formatDate } from "utilities/DateFormatter";
import { PicturePublishStatus, SupportedLang } from "config/constants";
import {
  getPublishablePicture,
  getUnpublishablePicture,
} from "utilities/PictureStatusFilter";
import type {
  PictureGroupByStudent,
  PublishPictureFormData,
} from "types/Pictures";
import {
  getPictureGroupByStudent,
  publishPicture,
  updateHashTagUsedTime,
} from "services/pictureServices";
import { setErrorStatus } from "features/error/errorSlice";
import { updatePublishStatus } from "features/picture/pictureSlice";
import { setSuccessStatus } from "features/success/successSlice";

interface PublishPicturePromptDialogProps {
  onClose: () => void;
}

const PublishPicturePromptDialog: React.FC<PublishPicturePromptDialogProps> = ({
  onClose,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { pictures } = useAppSelector((state) => state.picture);
  const [totalIndividualPictures, setTotalIndividualPictures] = useState(0);
  const [totalClassPictures, setTotalClassPictures] = useState(0);
  const [pictureGroupByStudent, setPictureByStudent] = useState<
    PictureGroupByStudent[]
  >([]);
  const [selectedPictureGroup, setSelectedPictureGroup] = useState<
    PictureGroupByStudent | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const fetchInfo = async () => {
    setIsLoading(true);
    const publishablePictures = getPublishablePicture(pictures);
    if (publishablePictures.length === 0) return;
    const individualPictures = publishablePictures.filter(
      (picture) => picture.picture_type !== 2
    );
    const classPictures = publishablePictures.filter(
      (picture) => picture.picture_type === 2
    );
    setTotalIndividualPictures(individualPictures.length);
    setTotalClassPictures(classPictures.length);

    try {
      const pictureGroupByStudent = await getPictureGroupByStudent(
        parseInt(id || "")
      );
      setPictureByStudent(pictureGroupByStudent);
      if (selectedPictureGroup) {
        setSelectedPictureGroup(
          pictureGroupByStudent.find(
            (student) => student.id === selectedPictureGroup.id
          )
        );
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, [pictures]);

  const renderStudentName = (student: PictureGroupByStudent) => {
    if (student.first_name_kata && student.last_name_kata)
      return `${student.last_name} ${student.first_name} (${student.last_name_kata} ${student.first_name_kata})`;
    else return `${student.last_name} ${student.first_name}`;
  };

  const dispatch = useAppDispatch();
  const publish = async () => {
    setIsLoading(true);
    const publishablePictures = getPublishablePicture(pictures);
    const unpublishablePictures = getUnpublishablePicture(pictures);
    try {
      const formData: PublishPictureFormData = {
        picture_ids: publishablePictures.map((p) => p.id),
        not_good_picture_ids: unpublishablePictures.map((p) => p.id),
      };
      await publishPicture(formData);
      const hashTagMap: { [key: string]: boolean } = {};
      for (let picture of publishablePictures) {
        dispatch(
          updatePublishStatus({
            id: picture.id,
            publishStatus: PicturePublishStatus.published,
          })
        );
        for (let tag of picture.hashtags_info) {
          if (!hashTagMap[tag.id]) hashTagMap[tag.id] = true;
        }
      }
      for (let picture of unpublishablePictures) {
        dispatch(
          updatePublishStatus({
            id: picture.id,
            publishStatus: PicturePublishStatus.deleted,
          })
        );
      }
      const hashTagId: number[] = [];
      for (let id of Object.keys(hashTagMap)) {
        hashTagId.push(parseInt(id));
      }
      await updateHashTagUsedTime(hashTagId);
      dispatch(
        setSuccessStatus({
          title: "_unpublished_picture_class._success_published",
          message: "_unpublished_picture_class._success_published_content",
        })
      );
      onClose();
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };

  const [isOpenAdjustmentDialog, setIsOpenAdjustmentDialog] = useState(false);

  const getTotalUnpublisablePictures = () =>
    getUnpublishablePicture(pictures).length;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
      <div className="w-[90%] lg:w-1/2 p-5 bg-white z-30">
        <div className="h-[80vh] flex flex-col space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            {t("_unpublished_picture_class._publication_confirmation")}
          </h2>
          <div className="flex items-end">
            <div className="w-1/2 space-y-1">
              <p>
                {formatDate(new Date(), {
                  [SupportedLang.ja]: "yo Mo do (EEEEE) HH:mm",
                  [SupportedLang.en]: "EEEE, MMM d, yyyy, HH:mm",
                })}
              </p>
              <p>
                <span className="font-semibold">
                  {t("_unpublished_picture_class._class_picture")}
                </span>
                {`${totalClassPictures} ${t(
                  "_unpublished_picture_class._images"
                )}`}
              </p>
              <p>
                <span className="font-semibold">
                  {t("_unpublished_picture_class._individual_picture")}
                </span>
                {`${totalIndividualPictures} ${t(
                  "_unpublished_picture_class._images"
                )}`}
              </p>
            </div>
            <div className="w-full flex justify-end items-center space-x-1">
              <ErrorIcon width={32} height={32} color={"#ff0000"} />
              <p>{`${t(
                "_unpublished_picture_class._unpublishable_picture"
              )}: ${getTotalUnpublisablePictures()}${t(
                "_unpublished_picture_class._images"
              )}`}</p>
            </div>
          </div>
          <div className="flex-1 h-full overflow-y-auto relative">
            <div className="w-full h-full absolute">
              <div className="space-y-3">
                {pictureGroupByStudent.map((student) => (
                  <li
                    key={student.id}
                    className="w-full flex items-start space-x-3"
                  >
                    <div className="w-1/2 flex space-x-2">
                      <div className="relative">
                        <ProfileAvatar
                          pictureUrl={student.profile_picture_for_admin || ""}
                        />
                        <div className="w-7 h-7 absolute -bottom-[75%] -translate-y-[75%] -right-[100%] -translate-x-[80%] rounded-full text-white text-xs bg-[#e6b941] flex justify-center items-center">
                          {student.student_pictures.length}
                        </div>
                      </div>
                      <p>{renderStudentName(student)}</p>
                    </div>
                    <div className="w-1/2 flex flex-wrap">
                      {student.student_pictures.map((picture) => (
                        <button
                          className="w-16 h-16 me-3 mb-3"
                          onClick={() => {
                            if (picture.picture.thumbnail_picture) {
                              setIsOpenAdjustmentDialog(true);
                              setSelectedPictureGroup(student);
                            }
                          }}
                        >
                          <PictureThumbnail
                            key={picture.id}
                            imageSrc={picture.picture.thumbnail_picture}
                            name="picture"
                          />
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>
          {!isLoading ? (
            <div className="flex space-x-2">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._cancel")}
                  onClick={onClose}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_unpublished_picture_class._publish_button")}
                  onClick={publish}
                />
              </div>
            </div>
          ) : (
            <div className="w-1/6 lg:w-1/12 m-auto">
              <LoadingIcon />
            </div>
          )}
        </div>
        {isOpenAdjustmentDialog && (
          <PublishPictureAdjustmentDialog
            pictureGroupByStudent={selectedPictureGroup}
            onClose={() => setIsOpenAdjustmentDialog(false)}
          />
        )}
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default PublishPicturePromptDialog;
