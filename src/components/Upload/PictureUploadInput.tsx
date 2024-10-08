import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CancelIcon from "assets/icons/CancelIcon";
import DeleteIcon from "assets/icons/DeleteIcon";
import PhotoIcon from "assets/icons/PhotoIcon";
import Container from "components/__reusable/Container";
import FileInput from "components/__reusable/FileInput";
import PictureCollection from "components/__reusable/PictureCollection";
import type { UploadPicture } from "types/Pictures";
import type { Picture } from "types/PictureCollection";
import { convert } from "utilities/HeicConverter";
import LoadingDialog from "components/__reusable/LoadingDialog";

interface PictureUploadInputProps {
  pictures: UploadPicture[];
  onUpload: (picture: UploadPicture[]) => void;
}

const PictureUploadInput: React.FC<PictureUploadInputProps> = ({
  pictures,
  onUpload,
}) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleUploadFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsLoading(true);
    const currentUploadedPictures = pictures;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "image/heic") {
        const thumbnail = await convert(files[i]);
        if (!thumbnail) continue;
        currentUploadedPictures.push({
          id: currentUploadedPictures.length,
          picture: files[i],
          thumbnailPicture: thumbnail,
        });
      } else {
        currentUploadedPictures.push({
          id: currentUploadedPictures.length,
          picture: files[i],
          thumbnailPicture: files[i],
        });
      }
    }
    onUpload(currentUploadedPictures);
    setIsLoading(false);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dropPicture = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    if (!dt) return;
    const files = dt.files;
    handleUploadFile(files);
  };

  const [selectedPictures, setSelectedPictures] = useState<
    { id: number; picture: string }[]
  >([]);
  const deleteSelectedPicture = () => {
    const temp = [...pictures];
    for (let picture of selectedPictures) {
      const index = temp.findIndex((pic) => pic.id === picture.id - 10);
      if (index >= 0) temp.splice(index, 1);
    }
    onUpload(temp);
    setSelectedPictures([]);
  };

  const [displayedPictures, setDisplayedPictures] = useState<Picture[]>([]);
  const modifyPictureExtension = async () => {
    const displayPictures = [];
    for (let pictureFile of pictures) {
      displayPictures.push({
        id: pictureFile.id + 10,
        picture: URL.createObjectURL(pictureFile.thumbnailPicture),
      });
    }
    setDisplayedPictures(displayPictures);
  };
  useEffect(() => {
    modifyPictureExtension();
  }, [pictures]);

  return (
    <Container>
      {isLoading && <LoadingDialog />}
      <div className="h-full flex flex-col space-y-1">
        <FileInput
          label={t("_upload._picture_type_instruction")}
          buttonLabel={t("_upload._select_file")}
          acceptType="image/png, image/jpeg, image/heic"
          multipleSelect={true}
          onUpload={handleUploadFile}
        />
        <div
          className="flex-1 w-full h-full p-3 border-2 border-[#A0A0A0] border-dashed rounded-lg"
          onDragEnter={dragEnter}
          onDragOver={dragOver}
          onDrop={dropPicture}
        >
          {pictures.length === 0 && (
            <div className="w-1/2 h-full m-auto flex flex-col items-center justify-center">
              <PhotoIcon width={64} height={64} color={"#767676"} />
              <p className="text-center">{t("_upload._drop_file")}</p>
            </div>
          )}
          {pictures.length > 0 && (
            <div className="h-full flex flex-col space-y-1">
              <div className="flex justify-end space-x-2">
                {selectedPictures.length > 0 && (
                  <button
                    type="button"
                    className="flex items-center space-x-1"
                    onClick={deleteSelectedPicture}
                  >
                    <DeleteIcon width={24} height={24} color={"#ff0000"} />
                    <p>{t("_upload._clear")}</p>
                  </button>
                )}
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={() => onUpload([])}
                >
                  <CancelIcon width={24} height={24} color={"#ff0000"} />
                  <p>{t("_upload._clear_all")}</p>
                </button>
              </div>
              <div className="flex-1 h-full overflow-auto relative">
                <div className="w-full h-full absolute">
                  <PictureCollection
                    pictures={displayedPictures}
                    selectedPictures={selectedPictures}
                    onSelect={(pictures) => setSelectedPictures(pictures)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PictureUploadInput;
