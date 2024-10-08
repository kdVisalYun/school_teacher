import React from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import ProfileAvatar from "components/__reusable/ProfileAvatar";
import ClassDropdown from "components/__reusable/ClassDropdown";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { setNewClass } from "features/student/studentSlice";
import { updateClasForStudent } from "features/student/studentAction";
import type { UpdateClassFormData, Student } from "types/Student";
import { setErrorStatus } from "features/error/errorSlice";
import { setSuccessStatus } from "features/success/successSlice";

interface GradeAdvancementDialogProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const GradeAdvancementDialog: React.FC<GradeAdvancementDialogProps> = ({
  onYesClick,
  onNoClick,
}) => {
  const { t } = useTranslation();
  const { selectedStudents, loading } = useAppSelector(
    (state) => state.student
  );
  const dispatch = useAppDispatch();

  const updateClass = async () => {
    const formData: UpdateClassFormData = {
      student_ids: selectedStudents.map((student) => student.id),
      class_id: selectedStudents[0].class_id,
    };
    const updateAction = await dispatch(updateClasForStudent({ formData }));
    if (isFulfilled(updateAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._update_student_complete",
          message: "_student_form._update_student_complete_content",
        })
      );
      onYesClick();
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  const renderStudentName = (student: Student) => {
    if (student.first_name_kata && student.last_name_kata)
      return `${student.last_name} ${student.first_name} (${student.last_name_kata} ${student.first_name_kata})`;
    else return `${student.last_name} ${student.first_name}`;
  };

  return (
    <MessageDialog>
      <div className="h-[75vh] flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-center">
            {t("_student._class_advancement_title")}
          </h3>
          <div>
            <p>{t("_student._set_new_class")}</p>
            <p>{t("_student._save_warning")}</p>
          </div>
        </div>
        <div className="flex-1 overflow-auto relative">
          <div className="w-full h-full absolute">
            <table className="w-full relative">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="w-[60%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                    {t("_student._student_name")}
                  </th>
                  <th className="w-[40%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                    {`${new Date().getFullYear() + 1} ${t("_student._class")}`}
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="w-[60%] p-2 border border-[#D9D9D9]">
                      <div className="w-full flex items-center space-x-2">
                        <ProfileAvatar
                          pictureUrl={student.profile_picture_for_admin || ""}
                        />
                        <p>{renderStudentName(student)}</p>
                      </div>
                    </td>
                    <td className="w-[40%] p-2 border border-[#D9D9D9]">
                      <ClassDropdown
                        currentClassId={student.class_id.toString()}
                        onChange={(classId) =>
                          dispatch(setNewClass({ id: student.id, classId }))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-5">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_generic._cancel")}
              onClick={onNoClick}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              label={t("_student._save")}
              loading={loading}
              onClick={updateClass}
            />
          </div>
        </div>
      </div>
    </MessageDialog>
  );
};

export default GradeAdvancementDialog;
