import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import RadioButton from "components/__reusable/RadioButton";
import ClassMultipleValueDropdownInput from "components/__reusable/ClassMultipleValueDropdownInput";
import PictureUploadInput from "./PictureUploadInput";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import { PictureType } from "config/constants";
import useAppDispatch from "hooks/useAppDispatch";
import { addToUploadQueue } from "features/picture/pictureSlice";
import type { UploadPicture } from "types/Pictures";

const PICTURE_TYPE_OPTIONS = [
  { value: PictureType.ai, label: "_upload._individual_picture" },
  { value: PictureType.class, label: "_upload._entire_class_picture" },
];

const Form = () => {
  const { t } = useTranslation();
  const [pictureType, setPictureType] = useState<PictureType>(1);
  const [classId, setClassId] = useState<string[]>([]);
  const [pictures, setPictures] = useState<UploadPicture[]>([]);

  const dispatch = useAppDispatch();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      addToUploadQueue({ uploadPictures: pictures, classId, pictureType })
    );
    setPictureType(1);
    setClassId([]);
    setPictures([]);
  };

  return (
    <form
      className="h-full flex flex-col space-y-3 lg:space-y-5"
      onSubmit={submit}
    >
      <div className="space-y-1">
        <h2 className="text-xl lg:text-2xl  font-semibold">
          {t("_upload._classification_select")}
        </h2>
        <div className="flex space-x-5">
          {PICTURE_TYPE_OPTIONS.map((typeOption) => (
            <div key={typeOption.value} className="space-x-2">
              <RadioButton
                name={"picture_type"}
                label={t(typeOption.label)}
                value={typeOption.value.toString()}
                isChecked={typeOption.value === pictureType}
                disabled={false}
                onChange={(value) => {
                  setClassId([]);
                  setPictureType(parseInt(value));
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl lg:text-2xl  font-semibold">
          {t("_upload._class_select")}
        </h2>
        <ClassMultipleValueDropdownInput
          classId={classId}
          onChange={(classId) => setClassId(classId)}
        />
      </div>
      <div className="flex-1 space-y-1 flex flex-col">
        <h2 className="text-xl lg:text-2xl  font-semibold">
          {t("_upload._picture_select")}
        </h2>
        <div className="flex-1">
          <PictureUploadInput
            pictures={pictures}
            onUpload={(pictures) => setPictures([...pictures])}
          />
        </div>
      </div>
      <PrimaryActionButton
        isButton={false}
        label={t("_upload._upload")}
        disabled={classId.length === 0 || pictures.length === 0}
      />
    </form>
  );
};

export default Form;
