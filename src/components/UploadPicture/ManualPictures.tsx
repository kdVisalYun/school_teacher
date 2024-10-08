import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { isFulfilled } from "@reduxjs/toolkit";

import Container from "components/__reusable/Container";
import Checkbox from "components/__reusable/Checkbox";
import PictureCollection from "./PictureCollection";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import {
  updatePicturePublishStatus,
  updatePictureType,
} from "features/picture/pictureAction";
import { PicturePublishStatus, PictureType } from "config/constants";
import { setErrorStatus } from "features/error/errorSlice";
import type { PictureGroupByUploadDate, Picture } from "types/Pictures";
import LoadingDialog from "components/__reusable/LoadingDialog";
import { getNonAIPictureToBeChecked } from "utilities/PictureStatusFilter";

const ManualPictures = () => {
  const { t } = useTranslation();

  const { pictures } = useAppSelector((state) => state.picture);
  const [pictureGroup, setPictureGroup] = useState<PictureGroupByUploadDate[]>(
    []
  );
  const [pictureList, setPictureList] = useState<Picture[]>([]);
  const groupPictures = () => {
    if (pictures.length === 0) {
      setPictureGroup([]);
      setPictureList([]);
      return;
    }
    const manualPictures = getNonAIPictureToBeChecked(pictures);
    setPictureList(manualPictures);
    let groupedByDate = manualPictures.reduce(
      (groups: { [key: string]: Picture[] }, picture) => {
        const date = format(new Date(picture.create_time), "yyyy/M/d");
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(picture);
        return groups;
      },
      {}
    );
    const pictureGroup: PictureGroupByUploadDate[] = [];
    for (let [key, value] of Object.entries(groupedByDate)) {
      pictureGroup.push({
        uploadDate: key,
        pictures: value,
      });
    }
    setPictureGroup(pictureGroup);
  };
  useEffect(() => {
    groupPictures();
  }, [pictures]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const changeAllPicturesToCheckedStatus = async (isChecked: boolean) => {
    setIsLoading(true);
    let i = 0;
    for (let picture of pictureList) {
      const pictureStatus = isChecked
        ? PicturePublishStatus.good
        : PicturePublishStatus.non_checked;
      const updateAction = await dispatch(
        updatePicturePublishStatus({
          id: picture.id,
          formData: { public_status: pictureStatus },
        })
      );
      if (!isFulfilled(updateAction)) i++;
    }
    if (i > 0) {
      dispatch(setErrorStatus(""));
    }
    setIsLoading(false);
  };

  return (
    <div className={`${pictureGroup.length === 0 ? "h-[10vh]" : "h-[30vh]"}`}>
      {isLoading && <LoadingDialog />}
      <Container>
        <div className="h-full flex flex-col space-y-1">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-lg">
              {t("_unpublished_picture_class._class_classification")}
            </h3>
            <Checkbox
              name={"is_all_group"}
              label={t("_unpublished_picture_class._all_as_good_picture")}
              isChecked={
                pictureList.length > 0 &&
                pictureList.filter(
                  (picture) =>
                    picture.public_status !== PicturePublishStatus.good
                ).length === 0
              }
              disabled={pictureList.length === 0}
              onChange={changeAllPicturesToCheckedStatus}
            />
          </div>
          <div className="h-0.5 bg-[#E7E5E0]"></div>
          <div className="flex-1 h-full overflow-auto relative">
            <div className="w-full h-full absolute">
              <PictureCollection pictureGroup={pictureGroup} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManualPictures;
