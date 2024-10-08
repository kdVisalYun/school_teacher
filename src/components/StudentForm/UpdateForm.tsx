import { useCallback, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import Form from "./Form";
import MessageDialog from "components/__reusable/MessageDialog";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import {
  getStudents,
  updateStudent,
  deleteStudent,
} from "features/student/studentAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { StudentSortValue } from "config/constants";
import type { StudentFormData } from "types/Student";
import LoadingDialog from "components/__reusable/LoadingDialog";
import type { UpdatedTrainingPicture } from "types/TrainingPicture";

const UpdateForm = () => {
  const { t } = useTranslation();
  const { classId, id } = useParams();
  const { students, loading } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();
  const fetchStudents = () =>
    students.length === 0 &&
    dispatch(
      getStudents({
        classId: !isNaN(parseInt(classId || "")) ? parseInt(classId || "") : 0,
        sortValue: StudentSortValue.name_asc,
      })
    );
  const callFetchStudents = useCallback(fetchStudents, [
    classId,
    dispatch,
    getStudents,
  ]);
  useEffect(() => {
    callFetchStudents();
  }, [callFetchStudents]);

  const [student, setStudent] = useState<StudentFormData>({
    first_name: "",
    first_name_kata: "",
    last_name_kata: "",
    last_name: "",
    birthday: "",
    graduation_date: "",
    class_id: "",
    is_ng: false,
  });
  useEffect(() => {
    if (students.length === 0) return;
    if (isNaN(parseInt(id || ""))) return;
    const student = students.find(
      (student) => student.id === parseInt(id || "")
    );
    if (!student) return;
    setStudent({
      first_name: student.first_name,
      first_name_kata: student.first_name_kata,
      last_name_kata: student.last_name_kata,
      last_name: student.last_name,
      birthday: student.birthday,
      graduation_date: student.graduation_date,
      class_id: student.class_id.toString(),
      is_ng: student.is_ng,
    });
  }, [students, id]);

  const update = async (
    formData: StudentFormData,
    pictures: File[],
    updatedTrainingPictures: UpdatedTrainingPicture[] | undefined
  ) => {
    const updateAction = await dispatch(
      updateStudent({
        id: parseInt(id || ""),
        formData,
        trainingPictures: pictures,
        updatedTrainingPictures: updatedTrainingPictures || [],
      })
    );
    if (isFulfilled(updateAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._update_student_complete",
          message: "_student_form._update_student_complete_content",
          onClose: () => window.history.back(),
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  const [isShowDeletePrompt, setIsShowDeletePrompt] = useState(false);
  const remove = async () => {
    setIsShowDeletePrompt(false);
    const deleteAction = await dispatch(
      deleteStudent({ id: parseInt(id || "") })
    );
    if (isFulfilled(deleteAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._delete_student_success",
          message: "_student_form._delete_student_success_content",
          onClose: () => {
            window.history.back();
          },
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <div className="space-y-1">
      <Form isUpdate={true} student={student} onSubmit={update} />
      {loading && <LoadingDialog />}
      <div className="flex justify-end">
        <button
          className="underline font-bold text-[#ff0000]"
          onClick={() => setIsShowDeletePrompt(true)}
        >
          {t("_student_form._delete_student_button")}
        </button>
      </div>
      {isShowDeletePrompt && (
        <MessageDialog>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-center">
              {t("_student._delete_warning", {
                name: `${student.last_name} ${student.first_name}`,
              })}
            </h2>
            <div className="flex justify-between items-center space-x-5">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._no")}
                  onClick={() => setIsShowDeletePrompt(false)}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_generic._yes")}
                  onClick={remove}
                />
              </div>
            </div>
          </div>
        </MessageDialog>
      )}
    </div>
  );
};

export default UpdateForm;
