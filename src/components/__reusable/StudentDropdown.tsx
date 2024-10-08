import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DropdownInput from "./DropdownInput";
import { getStudentsForDropdown } from "services/studentServices";
import type { DropdownInputOption } from "types/DropdownInputOption";
import { PictureStudentOption } from "config/constants";
import type { Student } from "types/Student";

interface StudentDropdownProps {
  currentClassId: number;
  currentStudentId: string | PictureStudentOption;
  onChange: (value: number | PictureStudentOption) => void;
}

const StudentDropdown: React.FC<StudentDropdownProps> = ({
  currentClassId,
  currentStudentId,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const students = await getStudentsForDropdown(currentClassId);
      setStudents(students.map((student) => student.student_info));
    } catch (e) {}
  };
  const callFetchStudents = useCallback(fetchStudents, [currentClassId]);
  useEffect(() => {
    callFetchStudents();
  }, [callFetchStudents]);

  const studentOptions = [
    {
      label: t("_published_picture._all_students"),
      value: PictureStudentOption.all,
    },
    ...students.map((student) => {
      const option: DropdownInputOption = {
        label: "",
        value: "",
      };
      option.label = `${student.last_name} ${student.first_name}`;
      option.value = student.id.toString();
      return option;
    }),
    {
      label: t("_published_picture._class_pictures"),
      value: PictureStudentOption.class,
    },
  ];

  return (
    <div className="w-full h-full">
      <DropdownInput
        placeholder={t("_published_picture._please_select_student")}
        options={isLoading ? studentOptions : []}
        value={currentStudentId}
        onChange={(value) => {
          if (isNaN(parseInt(value))) {
            if (
              value === PictureStudentOption.class ||
              value === PictureStudentOption.all
            ) {
              onChange(value);
              return;
            } else return;
          }
          onChange(parseInt(value));
        }}
      />
    </div>
  );
};

export default StudentDropdown;
