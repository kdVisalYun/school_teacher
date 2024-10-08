import { useState } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Form from "./Form";
import BatchCreateForm from "./BatchCreateForm";
import useAppDispatch from "hooks/useAppDispatch";
import { createStudent } from "features/student/studentAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import type { StudentFormData } from "types/Student";

const CreateForm = () => {
  const { classId } = useParams();
  const { t } = useTranslation();
  const [isIndividual, setIsIndividual] = useState(true);

  const dispatch = useAppDispatch();
  const create = async (formData: StudentFormData, pictures: File[]) => {
    const createAction = await dispatch(
      createStudent({ formData, trainingPictures: pictures })
    );
    if (isFulfilled(createAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._add_student_complete",
          message: "_student_form._add_student_complete_content",
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  const [student, _] = useState<StudentFormData>({
    first_name: "",
    first_name_kata: "",
    last_name_kata: "",
    last_name: "",
    birthday: "",
    graduation_date: "",
    class_id: classId || "",
    is_ng: false,
  });
  return (
    <div className="space-y-3">
      <div className="w-full bg-[#fafafa] rounded-lg">
        <div className="flex flex-row">
          <button
            className={`py-3 px-5 w-fit min-w-[10%] text-center ${
              !isIndividual ? "bg-[#E7E7E7]" : ""
            } rounded-tl-lg hover:bg-[#fafafa] cursor-pointer`}
            onClick={() => setIsIndividual(true)}
          >
            {t("_student_form._individual_registration")}
          </button>
          <button
            className={`py-3 px-5 w-fit min-w-[10%] text-center ${
              isIndividual ? "bg-[#E7E7E7]" : ""
            } hover:bg-[#fafafa] cursor-pointer`}
            onClick={() => setIsIndividual(false)}
          >
            {t("_student_form._batch_registration")}
          </button>
        </div>
        {isIndividual ? (
          <Form isUpdate={false} student={student} onSubmit={create} />
        ) : (
          <BatchCreateForm />
        )}
      </div>
    </div>
  );
};

export default CreateForm;
