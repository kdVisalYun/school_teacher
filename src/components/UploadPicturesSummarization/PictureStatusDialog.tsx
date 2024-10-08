import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";
import {
  getUnpublishedPictures as get,
  publishPicture as publish,
} from "services/pictureServices";
import {
  getPublishablePicture,
  getUnpublishablePicture,
} from "utilities/PictureStatusFilter";
import useAppDispatch from "hooks/useAppDispatch";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import type { Class } from "types/Class";
import type { Picture, PublishPictureFormData } from "types/Pictures";
import LoadingIcon from "assets/icons/LoadingIcon";
import { updateHashTagUsedTime } from "services/pictureServices";

interface PictureStatusDialogProps {
  classes: Class[];
  onNoClick: () => void;
  onYesClick: () => void;
}

type Status = {
  classId: number;
  className: string;
  publishablePictures: Picture[];
  unpublishablePictures: Picture[];
};

const PictureStatusDialog: React.FC<PictureStatusDialogProps> = ({
  classes,
  onNoClick,
  onYesClick,
}) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<Status[]>([]);
  const fetchStatus = async () => {
    try {
      const status: Status[] = [];
      for (let c of classes) {
        const pictures = await get(c.id);
        const publishablePictures = getPublishablePicture(pictures);
        const unpublishablePictures = getUnpublishablePicture(pictures);
        status.push({
          classId: c.id,
          className: c.name,
          publishablePictures,
          unpublishablePictures,
        });
      }
      setStatus(status);
    } catch (e) {}
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const publishPictures = async () => {
    try {
      setIsLoading(true);
      for (let s of status) {
        const formData: PublishPictureFormData = {
          picture_ids: s.publishablePictures.map((p) => p.id),
          not_good_picture_ids: s.unpublishablePictures.map((p) => p.id),
        };
        await publish(formData);
        const hashTagMap: { [key: string]: boolean } = {};

        for (let picture of s.publishablePictures) {
          for (let tag of picture.hashtags_info) {
            if (!hashTagMap[tag.id]) hashTagMap[tag.id] = true;
          }
        }

        const hashTagId: number[] = [];
        for (let id of Object.keys(hashTagMap)) {
          hashTagId.push(parseInt(id));
        }
        await updateHashTagUsedTime(hashTagId);
      }
      dispatch(
        setSuccessStatus({
          title: "_unpublished_picture._success_published",
          message: "_unpublished_picture._success_published_content",
        })
      );
      onYesClick();
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MessageDialog>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-center">
          {t("_unpublished_picture._publication")}
        </h2>
        <p>{`${t("_unpublished_picture._date")} ${formatDate(new Date(), {
          [SupportedLang.en]: "EEEE, MMMM d, yyyy, HH:mm",
          [SupportedLang.ja]: "yo Mo do (EEEEE) HH:mm",
        })}`}</p>
        {status.map((s) => (
          <p key={s.classId}>
            {s.className}　：　{s.publishablePictures.length}
            {t("_unpublished_picture._images")}
          </p>
        ))}
        {!isLoading ? (
          <div className="flex space-x-5">
            <div className="w-1/2">
              <SecondaryActionButton
                label={t("_generic._no")}
                onClick={onNoClick}
              />
            </div>
            <div className="w-1/2">
              <PrimaryActionButton
                label={t("_generic._yes")}
                onClick={() => publishPictures()}
                disabled={
                  status.length === 0 ||
                  status.filter((s) => s.publishablePictures.length > 0)
                    .length === 0
                }
              />
            </div>
          </div>
        ) : (
          <div className="w-1/6 lg:w-1/12 m-auto">
            <LoadingIcon />
          </div>
        )}
      </div>
    </MessageDialog>
  );
};

export default PictureStatusDialog;
