import { FormEvent, ReactNode, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import Container from "components/__reusable/Container";
import ClassDropdown from "components/__reusable/ClassDropdown";
import TextInput from "components/__reusable/TextInput";
import DateInput from "components/__reusable/DateInput";
import TrainingPictureInput from "./TrainingPictureInput";
import SavedTrainingPictures from "./SavedTraningPictures";
import Checkbox from "components/__reusable/Checkbox";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import type { StudentFormData } from "types/Student";
import type { UpdatedTrainingPicture } from "types/TrainingPicture";
import { calculateGraduateDate } from "utilities/GraduateDateCalculator";

const MAX_DATE = new Date();
MAX_DATE.setHours(0, 0, 0, 0);

interface FormProps {
  isUpdate: boolean;
  student: StudentFormData;
  onSubmit: (
    data: StudentFormData,
    pictures: File[],
    updatedPicture?: UpdatedTrainingPicture[]
  ) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ isUpdate, student, onSubmit }) => {
  const { t } = useTranslation();

  const [classId, setClassId] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [graduateDate, setGraduateDate] = useState(new Date());
  const [isSetToNotPublish, setIsSetToNotPublish] = useState(false);
  const [trainingPictures, setTrainingPictures] = useState<File[]>([]);
  const [updatedTrainingPictures, setUpdatedTrainingPictures] = useState<
    UpdatedTrainingPicture[]
  >([]);
  const { loading } = useAppSelector((state) => state.student);

  useEffect(() => {
    if (!isUpdate) {
      setClassId(student.class_id);
    } else {
      setFirstName(student.first_name);
      setLastName(student.last_name);
      setFirstNameKana(student.first_name_kata);
      setLastNameKana(student.last_name_kata);
      setBirthday(student.birthday ? new Date(student.birthday) : new Date());
      setGraduateDate(
        student.graduation_date ? new Date(student.graduation_date) : new Date()
      );
      setClassId(student.class_id);
      setIsSetToNotPublish(student.is_ng);
    }
  }, [isUpdate, student]);

  useEffect(() => {
    setGraduateDate(calculateGraduateDate(birthday));
  }, [birthday]);

  const renderInput = (label: string, inputElemet: ReactNode) => (
    <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
      <h3 className="lg:w-1/4 font-medium">{label}</h3>
      {inputElemet}
    </div>
  );

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setIsDisabled(
      !classId ||
        !firstName ||
        !lastName ||
        !firstNameKana ||
        !lastNameKana ||
        birthday.toDateString() === new Date().toDateString()
    );
  }, [classId, firstName, lastName, firstNameKana, lastNameKana, birthday]);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const formattedBirthday = format(birthday, "yyyy-MM-dd");
    const formattedGraduateDate = format(graduateDate, "yyyy-MM-dd");
    const formData: StudentFormData = {
      first_name: firstName,
      last_name: lastName,
      first_name_kata: firstNameKana,
      last_name_kata: lastNameKana,
      birthday: formattedBirthday,
      graduation_date: formattedGraduateDate,
      class_id: classId,
      is_ng: isSetToNotPublish,
    };
    await onSubmit(formData, trainingPictures, updatedTrainingPictures);
    if (!isUpdate) {
      setFirstName("");
      setLastName("");
      setFirstNameKana("");
      setLastNameKana("");
      setClassId("");
      setBirthday(new Date());
      setTrainingPictures([]);
    }
  };

  return (
    <Container>
      <form className="space-y-3 lg:space-y-5" onSubmit={submitForm}>
        {renderInput(
          `${t("_student_form._class_name")}(*)`,
          <ClassDropdown
            currentClassId={classId}
            onChange={(value) => setClassId(value.toString())}
          />
        )}
        {renderInput(
          `${t("_student_form._student_name")}(*)`,
          <div className="w-full flex space-x-3">
            <div className="w-1/2">
              <TextInput
                name={"last_name"}
                placeholder={t("_student_form._last_name")}
                value={lastName}
                onChange={(value) => setLastName(value)}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name={"first_name"}
                placeholder={t("_student_form._first_name")}
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />
            </div>
          </div>
        )}
        {renderInput(
          "",
          <div className="w-full space-y-3">
            <div className="w-full flex space-x-3">
              <div className="w-1/2">
                <TextInput
                  name={"last_name_kata"}
                  placeholder={t("_student_form._last_name_kana")}
                  value={lastNameKana}
                  onChange={(value) => setLastNameKana(value)}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  name={"first_name_kata"}
                  placeholder={t("_student_form._first_name_kana")}
                  value={firstNameKana}
                  onChange={(value) => setFirstNameKana(value)}
                />
              </div>
            </div>
          </div>
        )}
        {renderInput(
          `${t("_student_form._birthday")}(*)`,
          <DateInput
            name={"birthday"}
            currentDate={birthday}
            maxDate={MAX_DATE}
            onChange={(value) => setBirthday(value)}
          />
        )}
        {renderInput(
          `${t("_student_form._graduate_date")}`,
          <div className="w-full">
            <DateInput
              name={"graduate_date"}
              currentDate={graduateDate}
              onChange={(value) => setGraduateDate(value)}
            />
            <p className="text-[#ff0000]">
              {t("_student_form._auto_delete_warning")}
            </p>
          </div>
        )}
        <TrainingPictureInput
          uploadedPictures={trainingPictures}
          isUpdate={isUpdate}
          onChange={(files) => setTrainingPictures(files)}
        />
        {isUpdate && (
          <SavedTrainingPictures
            uploadPictures={trainingPictures}
            onUploadPicturesChange={(pictures) => setTrainingPictures(pictures)}
            updatedTrainingPictures={updatedTrainingPictures}
            onUpdate={(pictures) => setUpdatedTrainingPictures(pictures)}
          />
        )}
        {renderInput(
          `${t("_student_form._published_setting")}`,
          <div className="w-full">
            <Checkbox
              name={"not_publish"}
              label={t("_student_form._do_not_publish")}
              isChecked={isSetToNotPublish}
              onChange={(status) => setIsSetToNotPublish(status)}
            />
          </div>
        )}
        <PrimaryActionButton
          isButton={false}
          label={t("_student_form._submit")}
          loading={loading}
          disabled={isDisabled}
        />
      </form>
    </Container>
  );
};

export default Form;
