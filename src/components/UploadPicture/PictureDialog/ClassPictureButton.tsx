import React from "react";
import { GrGroup } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import useAppDispatch from "hooks/useAppDispatch";
import { updatePictureType } from "features/picture/pictureAction";
import { setErrorStatus } from "features/error/errorSlice";
import { PictureType } from "config/constants";
import type { Picture } from "types/Pictures";

interface ClassPictureButtonProps {
  picture: Picture;
}

const ClassPictureButton: React.FC<ClassPictureButtonProps> = ({ picture }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const updateType = async () => {
    const updateAction = await dispatch(
      updatePictureType({
        id: picture.id,
        formData: {
          picture_type:
            picture.picture_type === PictureType.class
              ? PictureType.non_ai
              : PictureType.class,
        },
      })
    );
    if (!isFulfilled(updateAction)) {
      dispatch(setErrorStatus(""));
    }
  };
  return (
    <button
      className={`w-full flex items-center p-2 space-x-2 ${
        picture.picture_type !== PictureType.class
          ? "bg-white"
          : "bg-primary/50"
      } rounded-md border border-[#B8B8B8]`}
      onClick={updateType}
    >
      <GrGroup className="text-2xl" />
      <p>{t("_unpublished_picture_class._class_picture_button")}</p>
    </button>
  );
};

export default ClassPictureButton;
