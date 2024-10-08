import React from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import useAppDispatch from "hooks/useAppDispatch";
import { updateIsFavoriteStatus } from "features/picture/pictureAction";
import { setErrorStatus } from "features/error/errorSlice";
import type { Picture } from "types/Pictures";

interface IsFavoriteButtonProps {
  picture: Picture;
}

const IsFavoriteButton: React.FC<IsFavoriteButtonProps> = ({ picture }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const updateIsFavorite = async () => {
    const updateAction = await dispatch(
      updateIsFavoriteStatus({
        id: picture.id,
        formData: { is_favorite: !picture.is_favorite },
      })
    );
    if (!isFulfilled(updateAction)) {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <button onClick={updateIsFavorite}>
      <div className="flex items-center space-x-1">
        {!picture.is_favorite ? (
          <div className="w-24 h-10 border border-dashed border-[#ccc]"></div>
        ) : (
          <img
            className="w-24 h-10"
            alt="sticky"
            src="/images/sticky_icon.png"
          />
        )}
        <p className="text-lg text-black">
          {t("_unpublished_picture_class._sensei_fusen")}
        </p>
      </div>
    </button>
  );
};

export default IsFavoriteButton;
