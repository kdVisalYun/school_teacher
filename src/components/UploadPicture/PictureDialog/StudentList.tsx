import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CancelIcon from "assets/icons/CancelIcon";
import useAppSelector from "hooks/useAppSelector";
import ProfileAvatar from "components/__reusable/ProfileAvatar";
import type { Student } from "types/Student";
import type { TagStudent } from "types/TagStudent";
import { createPortal } from "react-dom";

interface StudentListProps {
  tagStudents: TagStudent[];
  onSelect: (student: Student) => void;
  onClose: () => void;
}

const StudentList: React.FC<StudentListProps> = ({
  tagStudents,
  onSelect,
  onClose,
}) => {
  const { t } = useTranslation();

  const { students } = useAppSelector((state) => state.student);
  const getAvailableStudents = () => {
    const selectedStudents: { [key: number]: boolean } = {};
    tagStudents.forEach(
      (student) => (selectedStudents[student.student_id] = true)
    );
    const availableStudents = students.filter(
      (student) => !selectedStudents[student.id] && !student.is_ng
    );
    return availableStudents.map((student) => ({
      ...student,
      fullName: `${student.last_name} ${student.first_name}`,
      fullNameKana: `${student.last_name_kata} ${student.first_name_kata}`,
    }));
  };
  let filteredStudents = getAvailableStudents();

  const [searchInputValue, setSearchInputValue] = useState("");
  if (searchInputValue) {
    const searchRegex = new RegExp(searchInputValue, "i");
    filteredStudents = filteredStudents.filter(
      (student) =>
        searchRegex.test(student.fullName) ||
        searchRegex.test(student.fullNameKana)
    );
  }

  const renderName = (fullName: string, fullNameKana: string) => {
    if (fullNameKana.trim()) return `${fullName} (${fullNameKana})`;
    return fullName;
  };

  return createPortal(
    <div
      id="student_list"
      className="absolute top-0 left-0 w-full h-full p-5 bg-white/50 z-10 pointer-events-auto"
    >
      <div className="h-full flex justify-end items-start space-x-5">
        <div className="bg-white w-[75%] h-full rounded-lg p-5 space-y-3 flex flex-col">
          <div className="w-full p-2 rounded-full bg-[#F0F0F0] flex">
            <input
              className="w-full outline-none bg-[#F0F0F0]"
              type="text"
              name={"search"}
              placeholder={t("_unpublished_picture_class._search")}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <div className="justify-self-center"></div>
          </div>
          <div className="h-0.5 bg-[#E7E5E0]"></div>
          <div className="flex-1 overflow-auto space-y-3">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                className="w-full flex space-x-2 hover:bg-[#eeeeee]"
                onClick={() => onSelect(student)}
              >
                <ProfileAvatar
                  pictureUrl={student.profile_picture_for_admin || ""}
                />
                <p>{renderName(student.fullName, student.fullNameKana)}</p>
              </button>
            ))}
          </div>
        </div>
        <button className="rounded-full bg-black/50" onClick={onClose}>
          <CancelIcon width={32} height={32} color={"white"} />
        </button>
      </div>
    </div>,
    document.getElementById("student_list")!
  );
};

export default StudentList;
