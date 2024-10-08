import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import ToggleSwitch from "components/__reusable/ToggleSwitch";
import { PicturePublishStatus, PictureType } from "config/constants";
import useAppDispatch from "hooks/useAppDispatch";
import {
  updatePicturePublishStatus,
  updatePictureType,
} from "features/picture/pictureAction";
import { setErrorStatus } from "features/error/errorSlice";
import { DELETE_PICTURES_PATH } from "router/pathName";
import type { Picture } from "types/Pictures";

interface PublishStatusToggleProps {
  picture: Picture;
}

const PublishStatusToggle: React.FC<PublishStatusToggleProps> = ({
  picture,
}) => {
  const { t } = useTranslation();
  const [isPublishable, setIsPublishable] = useState(true);

  const dispatch = useAppDispatch();
  const changePublishStatus = (isChecked: boolean) => {
    setIsPublishable(isChecked);
    const isHaveStatus =
      picture.public_status !== PicturePublishStatus.non_checked;
    setTimeout(async () => {
      const updateAction = await dispatch(
        updatePicturePublishStatus({
          id: picture.id,
          formData: {
            public_status: isChecked
              ? PicturePublishStatus.good
              : PicturePublishStatus.not_good,
          },
        })
      );
      if (!isFulfilled(updateAction)) {
        dispatch(setErrorStatus(""));
      } else {
        if (
          picture.picture_type === PictureType.ai &&
          isHaveStatus &&
          isChecked
        ) {
          dispatch(
            updatePictureType({
              id: picture.id,
              formData: { picture_type: PictureType.non_ai },
            })
          );
        }
      }
    }, 300);
  };

  useEffect(() => {
    setIsPublishable(picture.public_status === PicturePublishStatus.good);

    if (window.location.pathname.includes(DELETE_PICTURES_PATH)) {
      return;
    }

    if (picture.public_status === PicturePublishStatus.non_checked) {
      changePublishStatus(true);
    }
  }, [picture]);

  return (
    <ToggleSwitch
      leftLabel={t("_unpublished_picture_class._unpublishable")}
      rightLabel={t("_unpublished_picture_class._publishable")}
      isChecked={isPublishable}
      onChange={changePublishStatus}
    />
  );
};

export default PublishStatusToggle;
