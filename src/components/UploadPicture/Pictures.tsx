import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AIPictures from "./AIPictures";
import ManualPictures from "./ManualPictures";
import ActivityTagContainer from "./ActivityTagContainer";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import PublishPicturePromptDialog from "./PublishPicturePromptDialog";
import DeleteIcon from "assets/icons/DeleteIcon";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getUnpublishedPictures } from "features/picture/pictureAction";
import {
  getAIPictureToBeChecked,
  getNonAIPictureToBeChecked,
  getPublishablePicture,
} from "utilities/PictureStatusFilter";
import { DELETE_PICTURES_PATH } from "router/pathName";
import type { Picture } from "types/Pictures";

const Pictures = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchUnpublishedPictures = () => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    currentClass &&
      dispatch(getUnpublishedPictures({ classId: currentClass.id }));
  };
  const callFetchUnpublishedPictures = useCallback(fetchUnpublishedPictures, [
    id,
    classes,
    dispatch,
    getUnpublishedPictures,
  ]);
  useEffect(() => {
    callFetchUnpublishedPictures();
  }, [callFetchUnpublishedPictures]);

  const { pictures } = useAppSelector((state) => state.picture);
  const [isDisablePublish, setIsDisablePublish] = useState(false);
  const [isPublishButtonClick, setIsPublishButtonClick] = useState(false);
  useEffect(() => {
    if (pictures.length === 0) setIsDisablePublish(true);
    const publishablePicture = getPublishablePicture(pictures);
    setIsDisablePublish(publishablePicture.length === 0);
  }, [pictures]);

  const [checkedPictures, setCheckedPictures] = useState<Picture[]>([]);
  useEffect(() => {
    setCheckedPictures([
      ...getAIPictureToBeChecked(pictures),
      ...getNonAIPictureToBeChecked(pictures),
    ]);
  }, [pictures]);

  return (
    <div className="h-full space-y-3 lg:space-y-5">
      <AIPictures />
      <ManualPictures />
      <ActivityTagContainer pictures={checkedPictures} />
      <div className="flex justify-end">
        <button
          className="w-fit flex justify-end items-center space-x-1"
          onClick={() => navigate(`${DELETE_PICTURES_PATH}/${id}`)}
        >
          <DeleteIcon width={36} height={36} color={"black"} />
          <p className="text-xl">
            {t("_unpublished_picture_class._not_published_picture")}
          </p>
        </button>
      </div>
      <PrimaryActionButton
        label={t("_unpublished_picture_class._confirm")}
        disabled={isDisablePublish}
        onClick={() => setIsPublishButtonClick(true)}
      />
      {isPublishButtonClick && (
        <PublishPicturePromptDialog
          onClose={() => setIsPublishButtonClick(false)}
        />
      )}
    </div>
  );
};

export default Pictures;
