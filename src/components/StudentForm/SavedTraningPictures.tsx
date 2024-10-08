import React, { useState, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PersonAddIcon from "assets/icons/PersonAddIcon";
import DeleteIcon from "assets/icons/DeleteIcon";
import PersonRemoveIcon from "assets/icons/PersonRemoveIcon";
import PictureCollection from "components/__reusable/PictureCollection";
import { getTrainingPictures } from "services/trainingPictureServices";
import {
  TrainingPictureOperation,
  CROPPED_PICTURE_FILE_NAME_PREFIX,
} from "config/constants";
import type {
  TrainingPicture,
  UpdatedTrainingPicture,
} from "types/TrainingPicture";

type Picture = {
  id: number;
  picture: string;
};

interface SavedTrainingPicturesProps {
  uploadPictures: File[];
  onUploadPicturesChange: (pictures: File[]) => void;
  updatedTrainingPictures: UpdatedTrainingPicture[];
  onUpdate: (pictures: UpdatedTrainingPicture[]) => void;
}

const SavedTrainingPictures: React.FC<SavedTrainingPicturesProps> = ({
  uploadPictures,
  onUploadPicturesChange,
  updatedTrainingPictures,
  onUpdate,
}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [trainingPictures, setTrainingPictures] = useState<TrainingPicture[]>(
    []
  );

  const fetchTrainingPictures = async () => {
    if (isNaN(parseInt(id || ""))) return;
    try {
      const pictures = await getTrainingPictures(id || "");
      setTrainingPictures(pictures);
    } catch (e) {}
  };
  useEffect(() => {
    fetchTrainingPictures();
  }, [id]);

  const usedPictures = trainingPictures.filter((picture) => picture.is_usable);
  const parentsUploadedPictures = trainingPictures.filter(
    (picture) => picture.is_parent_data
  );
  const [selectedUsedPictures, setSelectedUsedPictures] = useState<Picture[]>(
    []
  );
  const [selectedParentsUploadedPictures, setSelectedParentsUploadedPictures] =
    useState<Picture[]>([]);

  const markAsUsedPictures = async () => {
    const pictures = [...trainingPictures];
    const temp = [...updatedTrainingPictures];
    for (let picture of selectedParentsUploadedPictures) {
      const updatedInfo: UpdatedTrainingPicture = {
        id: picture.id,
        operation: TrainingPictureOperation.use,
      };
      temp.push(updatedInfo);

      const index = pictures.findIndex((pic) => pic.id === picture.id);
      pictures[index].is_usable = true;
    }
    onUpdate(temp);
    setTrainingPictures(pictures);
    setSelectedParentsUploadedPictures([]);
  };

  const deletePictures = async (selectedPictures: Picture[]) => {
    const pictures = [...trainingPictures];
    const uploadedPictures = [...uploadPictures];
    const temp = [...updatedTrainingPictures];
    for (let picture of selectedPictures) {
      if (picture.id < 1) {
        const index = uploadedPictures.findIndex(
          (pic) =>
            pic.name === `${CROPPED_PICTURE_FILE_NAME_PREFIX}_${picture.id}.png`
        );
        if (index >= 0) uploadedPictures.splice(index, 1);
      } else {
        const index = pictures.findIndex((pic) => pic.id === picture.id);
        if (index < 0) return;
        const updatedInfo: UpdatedTrainingPicture = {
          id: picture.id,
          operation: pictures[index].is_parent_data
            ? TrainingPictureOperation.unuse
            : TrainingPictureOperation.delete,
        };
        temp.push(updatedInfo);
        if (pictures[index].is_parent_data) {
          pictures[index].is_usable = false;
        } else {
          pictures.splice(index, 1);
        }
      }
    }
    onUpdate(temp);
    setTrainingPictures(pictures);
    onUploadPicturesChange(uploadedPictures);
    setSelectedUsedPictures([]);
  };

  return trainingPictures.length > 0 || uploadPictures.length > 0 ? (
    <Fragment>
      <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
        <h3 className="lg:w-1/4 font-medium lg:text-right">
          {t("_student_form._parents_upload_picture")}
        </h3>
        <div className="w-full min-h-[4rem] max-h-36 overflow-auto p-2 bg-[#e7e6e6] rounded-lg border border-dashed border-black">
          {selectedParentsUploadedPictures.length > 0 && (
            <div className="w-full flex items-center justify-end space-x-2">
              <button
                type="button"
                className="flex items-center space-x-1"
                onClick={markAsUsedPictures}
              >
                <PersonAddIcon width={24} height={24} color={"black"} />
                <p>{t("_student_form._add_to_registration_picture")}</p>
              </button>
            </div>
          )}
          <PictureCollection
            pictures={parentsUploadedPictures.map((picture) => ({
              id: picture.id,
              picture: picture.original_picture,
            }))}
            selectedPictures={selectedParentsUploadedPictures}
            onSelect={(pictures) =>
              setSelectedParentsUploadedPictures(pictures)
            }
          />
        </div>
      </div>
      <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
        <h3 className="lg:w-1/4 font-medium lg:text-right">
          {t("_student_form._registration_picture")}
        </h3>
        <div className="w-full min-h-[4rem] max-h-36 overflow-auto p-2 rounded-lg border border-black">
          {selectedUsedPictures.length > 0 && (
            <div className="w-full flex items-center justify-end space-x-2">
              <button
                type="button"
                className="flex items-center space-x-1"
                onClick={() => deletePictures(selectedUsedPictures)}
              >
                <DeleteIcon width={24} height={24} color={"black"} />
                <p>{t("_student_form._delete_picture")}</p>
              </button>
            </div>
          )}
          <PictureCollection
            pictures={[
              ...usedPictures.map((picture) => ({
                id: picture.id,
                picture: picture.original_picture,
              })),
              ...uploadPictures.map((pictureFile) => ({
                id: parseFloat(pictureFile.name.split("_")[1]),
                picture: URL.createObjectURL(pictureFile),
              })),
            ]}
            selectedPictures={selectedUsedPictures}
            onSelect={(pictures) => {
              setSelectedUsedPictures(pictures);
            }}
          />
        </div>
      </div>
    </Fragment>
  ) : null;
};

export default SavedTrainingPictures;
