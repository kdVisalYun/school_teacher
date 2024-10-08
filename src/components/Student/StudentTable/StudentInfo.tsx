import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Student } from "types/Student";
import { CLASS_PATH } from "router/pathName";
import { STUDENT } from "config/keywords";
import ProfileAvatar from "components/__reusable/ProfileAvatar";
import { getTrainingPictures } from "services/trainingPictureServices";
import ProfilePictureDialog from "./ProfilePictureDialog";
import type { TrainingPicture } from "types/TrainingPicture";

interface StudentInfoProps {
  student: Student;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student }) => {
  const { t } = useTranslation();
  const renderStudentName = (student: Student) => {
    if (student.first_name_kata && student.last_name_kata)
      return `${student.last_name} ${student.first_name} (${student.last_name_kata} ${student.first_name_kata})`;
    else return `${student.last_name} ${student.first_name}`;
  };

  const [trainingPictures, setTrainingPictures] = useState<TrainingPicture[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchTrainingPictures = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const pictures = await getTrainingPictures(student.id.toString());
      setTrainingPictures(pictures.filter((picture) => picture.is_usable));
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTrainingPictures();
  }, []);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <ProfileAvatar pictureUrl={student.profile_picture_for_admin || ""} />
        <button
          className="w-4 h-4 absolute bottom-0 right-0 text-white text-xs bg-[#4192ee] rounded-full"
          onClick={() => setIsOpenDialog(true)}
        >
          +
        </button>
      </div>
      <div>
        <Link
          to={`${CLASS_PATH}/${student.class_id}/${STUDENT}/${student.id}`}
          className="underline"
        >
          {renderStudentName(student)}
        </Link>
        <p className="text-sm">
          {t("_student._reference_picture")}
          {isLoading && "Loading..."}
          {error && t("_generic._unknown_error")}
          {!isLoading && !error && trainingPictures.length}
        </p>
      </div>
      {isOpenDialog && (
        <ProfilePictureDialog
          studentId={student.id}
          pictures={trainingPictures.map((picture) => picture.original_picture)}
          onClose={() => setIsOpenDialog(false)}
        />
      )}
    </div>
  );
};

export default StudentInfo;
