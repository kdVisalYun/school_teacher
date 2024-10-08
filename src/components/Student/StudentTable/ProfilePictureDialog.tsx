import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import MessageDialog from "components/__reusable/MessageDialog";
import CancelIcon from "assets/icons/CancelIcon";
import PictureThumbnail from "components/__reusable/PictureThumbnail";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppDispatch from "hooks/useAppDispatch";
import { changeProfilePicture } from "features/student/studentAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { CLOUDFRONT_URL } from "config/constants";

interface ProfilePictureDialogProps {
  studentId: number;
  pictures: string[];
  onClose: () => void;
}

const ProfilePictureDialog: React.FC<ProfilePictureDialogProps> = ({
  studentId,
  pictures,
  onClose,
}) => {
  const { t } = useTranslation();
  const [selectedPicture, setSelectedPicture] = useState("");

  const dispatch = useAppDispatch();
  const changePicture = async () => {
    let photoPath = selectedPicture;
    if (selectedPicture.startsWith(CLOUDFRONT_URL)) {
      photoPath = selectedPicture.substring(CLOUDFRONT_URL.length);
    }
    const changeAction = await dispatch(
      changeProfilePicture({ id: studentId, picture: photoPath })
    );
    if (isFulfilled(changeAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._update_student_complete",
          message: "_student_form._update_student_complete_content",
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
    onClose();
  };
  return (
    <MessageDialog>
      <div className="h-[70vh] flex flex-col justify-between space-y-3">
        <div className="h-full flex flex-col space-y-2">
          <div className="w-full flex items-center justify-end">
            <h2 className="flex-1 text-2xl text-center font-semibold">
              {t("_student._please_select_picture")}
            </h2>
            <button onClick={onClose}>
              <CancelIcon width={24} height={24} color={"#777"} />
            </button>
          </div>
          <div className="flex-1 overflow-auto relative">
            <div className="w-full h-full absolute">
              {pictures.length === 0 && <p>{t("_generic._no_data")}</p>}
              {pictures.length > 0 && (
                <div className="grid grid-cols-5 gap-3">
                  {pictures.map((picture) => (
                    <button
                      key={picture}
                      className={`${
                        picture === selectedPicture
                          ? "border-4 border-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedPicture(picture)}
                    >
                      <PictureThumbnail imageSrc={picture} name={"picture"} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedPicture && (
          <div className="flex justify-end">
            <div className="w-1/2 lg:w-1/6">
              <PrimaryActionButton
                label={t("_student._change")}
                onClick={changePicture}
              />
            </div>
          </div>
        )}
      </div>
    </MessageDialog>
  );
};

export default ProfilePictureDialog;
