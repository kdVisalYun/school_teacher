import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ProfileAvatar from "components/__reusable/ProfileAvatar";
import useAppSelector from "hooks/useAppSelector";
import { getTagStudent } from "services/pictureServices";
import type { TagStudent } from "types/TagStudent";
import type { Picture } from "types/Pictures";
import type { Student } from "types/Student";
import { PictureType } from "config/constants";

interface TagStudentListProps {
  picture: Picture;
}

const TagStudentList: React.FC<TagStudentListProps> = ({ picture }) => {
  const [tagStudents, setTagStudents] = useState<TagStudent[]>([]);
  const { students } = useAppSelector((state) => state.student);

  const fetchTagStudent = async () => {
    try {
      if (picture.picture_type === PictureType.class) return;
      const tagStudents = await getTagStudent(picture.id);
      setTagStudents(tagStudents);
    } catch (e) {}
  };
  useEffect(() => {
    fetchTagStudent();
  }, [picture]);

  const { t } = useTranslation();
  const renderStudentItem = (tagStudent: TagStudent) => {
    const student = students.find(
      (student) => student.id === tagStudent.student_id
    );
    if (!student) return null;
    return (
      <li
        key={tagStudent.id}
        className="flex items-center space-x-2 pb-2 border-b border-b-[#9B9B9B]"
      >
        <ProfileAvatar pictureUrl={student.profile_picture_for_admin || ""} />
        <p>{renderStudentName(student)}</p>
      </li>
    );
  };

  const renderStudentName = (student: Student) => {
    if (student.first_name_kata && student.last_name_kata)
      return `${student.last_name} ${student.first_name} (${student.last_name_kata} ${student.first_name_kata})`;
    else return `${student.last_name} ${student.first_name}`;
  };

  return (
    <div className="h-full overflow-auto relative">
      <div className="w-full h-full absolute">
        <ul className="space-y-1">
          {picture.picture_type === PictureType.class ? (
            <li className="flex items-center space-x-2 pb-2 border-b border-b-[#9B9B9B]">
              <ProfileAvatar pictureUrl={""} />
              <p>{t("_published_picture._class_picture_tag")}</p>
            </li>
          ) : (
            tagStudents.map((tagStudent) => renderStudentItem(tagStudent))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TagStudentList;
