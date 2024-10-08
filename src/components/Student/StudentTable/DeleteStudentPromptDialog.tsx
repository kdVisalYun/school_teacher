import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { deleteStudent } from "features/student/studentAction";
import { resetSelectedStudents } from "features/student/studentSlice";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { SupportedLang } from "config/constants";

interface DeleteStudentPromptDialogProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const DeleteStudentPromptDialog: React.FC<DeleteStudentPromptDialogProps> = ({
  onNoClick,
  onYesClick,
}) => {
  const { t, i18n } = useTranslation();

  const { selectedStudents } = useAppSelector((state) => state.student);
  const renderStudentName = () => {
    const studentNames = [];
    for (let student of selectedStudents) {
      studentNames.push(`${student.last_name} ${student.first_name}`);
    }
    const seperator = i18n.language === SupportedLang.ja ? "と" : ", ";
    return studentNames.join(seperator);
  };

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const remove = async () => {
    setIsLoading(true);
    let successCount = 0;
    for (let student of selectedStudents) {
      const deleteAction = await dispatch(deleteStudent({ id: student.id }));
      if (isFulfilled(deleteAction)) successCount += 1;
    }
    if (successCount === selectedStudents.length) {
      dispatch(resetSelectedStudents());
      dispatch(
        setSuccessStatus({
          title: "_student_form._delete_student_success",
          message: "_student_form._delete_student_success_content",
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
    onYesClick();
    setIsLoading(false);
  };

  return (
    <MessageDialog>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-center">
          {t("_student._delete_warning", {
            name: renderStudentName(),
          })}
        </h2>
        <div className="flex justify-between items-center space-x-5">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_generic._no")}
              onClick={onNoClick}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              label={t("_generic._yes")}
              loading={isLoading}
              onClick={remove}
            />
          </div>
        </div>
      </div>
    </MessageDialog>
  );
};

export default DeleteStudentPromptDialog;
