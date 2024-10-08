import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

import DeleteIcon from "assets/icons/DeleteIcon";
import FileInput from "components/__reusable/FileInput";
import PictureCollection from "components/__reusable/PictureCollection";
import PictureCropDialog from "./PictureCropDialog";
import { CROPPED_PICTURE_FILE_NAME_PREFIX } from "config/constants";

type Picture = {
  id: number;
  picture: string;
};

interface TrainingPictureInputProp {
  uploadedPictures: File[];
  isUpdate: boolean;
  onChange: (files: File[]) => void;
}

const TrainingPictureInput: React.FC<TrainingPictureInputProp> = ({
  uploadedPictures,
  isUpdate,
  onChange,
}) => {
  const { t } = useTranslation();
  const pictures = uploadedPictures.map((picture, i) => ({
    id: i + 1,
    picture: picture,
  }));
  const [currentPicture, setCurrentPicture] = useState<File | null>(null);

  const uploadPicture = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setCurrentPicture(files[0]);
  };

  const cropPictureComplete = (blob: Blob) => {
    const file = new File(
      [blob],
      `${CROPPED_PICTURE_FILE_NAME_PREFIX}_${
        (uploadedPictures.length + 1) / 1000
      }.png`
    );
    const updatedPictures = [...uploadedPictures, file];
    onChange(updatedPictures);
    setCurrentPicture(null);
  };

  const [selectedPictures, setSelectedPictures] = useState<Picture[]>([]);
  const deletePictures = () => {
    const temp = [...pictures];
    for (let picture of selectedPictures) {
      const index = temp.findIndex((p) => p.id === picture.id);
      if (index >= 0) {
        temp.splice(index, 1);
      }
    }
    onChange(temp.map((picture) => picture.picture));
    setSelectedPictures([]);
  };

  return (
    <Fragment>
      <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
        <h3 className="lg:w-1/4 font-medium">
          {t("_student_form._reference_picture")}
        </h3>
        <FileInput
          label={t("_student_form._upload_reference_picture")}
          buttonLabel={t("_student_form._open")}
          acceptType={"image/png, image/jpeg"}
          onUpload={uploadPicture}
        />
      </div>
      {!isUpdate && pictures.length > 0 && (
        <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
          <h3 className="lg:w-1/4 font-medium lg:text-right">
            {t("_student_form._uploaded_picture")}
          </h3>
          <div className="w-full min-h-[4rem] max-h-36 overflow-auto p-2 bg-[#e7e6e6] rounded-lg border border-dashed border-black">
            {selectedPictures.length > 0 && (
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={() => deletePictures()}
                >
                  <DeleteIcon width={24} height={24} color={"black"} />
                  <p>{t("_student_form._delete_picture")}</p>
                </button>
              </div>
            )}
            <PictureCollection
              pictures={pictures.map((picture) => ({
                ...picture,
                picture: URL.createObjectURL(picture.picture),
              }))}
              selectedPictures={selectedPictures}
              onSelect={(pictures) => setSelectedPictures(pictures)}
            />
          </div>
        </div>
      )}
      {currentPicture && (
        <PictureCropDialog
          picture={URL.createObjectURL(currentPicture)}
          onSave={cropPictureComplete}
          onClose={() => setCurrentPicture(null)}
        />
      )}
    </Fragment>
  );
};

export default TrainingPictureInput;
