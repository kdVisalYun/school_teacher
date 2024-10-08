import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

import useAppSelector from "hooks/useAppSelector";
import PictureDialog from "./PictureDialog/PictureDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import { Picture, type PictureGroupByStudent } from "types/Pictures";

interface PublishPictureAdjustmentDialogProps {
  onClose: () => void;
  pictureGroupByStudent: PictureGroupByStudent | undefined;
}

const PublishPictureAdjustmentDialog: React.FC<
  PublishPictureAdjustmentDialogProps
> = ({ onClose, pictureGroupByStudent }) => {
  const { t } = useTranslation();
  const { pictures } = useAppSelector((state) => state.picture);

  const renderStudentName = (student: PictureGroupByStudent | undefined) => {
    if (!student) return "";
    if (student.first_name_kata && student.last_name_kata)
      return `${student.last_name} ${student.first_name} (${student.last_name_kata} ${student.first_name_kata})`;
    else return `${student.last_name} ${student.first_name}`;
  };

  const [selectedPicture, setSelectedPictue] = useState<Picture | undefined>();

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-30">
      <div className="w-[90%] lg:w-1/2 p-5 bg-white z-40">
        <div className="h-[80vh] flex flex-col space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            {t("_unpublished_picture_class._picture_adjustment")}
          </h2>
          <div className="space-y-1">
            <p className="font-semibold">
              {renderStudentName(pictureGroupByStudent)}
            </p>
            <p>
              <span className="font-semibold">
                {t("_unpublished_picture_class._number_picture_to_delivered")}:
              </span>
              {` ${pictureGroupByStudent?.student_pictures.length || 0} ${t(
                "_unpublished_picture_class._images"
              )}`}
            </p>
          </div>
          <div className="flex-1 h-full overflow-y-auto relative">
            <div className="w-full h-full absolute">
              {pictureGroupByStudent && (
                <div className="grid grid-cols-3 gap-3">
                  {pictureGroupByStudent.student_pictures.map((picture) => (
                    <button
                      className="flex items-start"
                      onClick={() =>
                        setSelectedPictue(
                          pictures.find((pic) => pic.id === picture.picture.id)
                        )
                      }
                    >
                      <img
                        className="max-h-full max-w-full"
                        src={
                          pictures.find((pic) => pic.id === picture.picture.id)
                            ?.converted_picture
                        }
                        alt="picture"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 lg:w-1/6">
            <SecondaryActionButton
              label={t("_generic._close")}
              onClick={onClose}
            />
          </div>
        </div>
        {selectedPicture && (
          <PictureDialog
            picture={selectedPicture}
            onPrevious={null}
            onNext={null}
            onClose={() => setSelectedPictue(undefined)}
          />
        )}
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default PublishPictureAdjustmentDialog;
