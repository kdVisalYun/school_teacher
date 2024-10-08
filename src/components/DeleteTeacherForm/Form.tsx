import { ReactNode, useState, useEffect, useCallback, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Container from "components/__reusable/Container";
import TextInput from "components/__reusable/TextInput";
import DateInput from "components/__reusable/DateInput";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import MessageDialog from "components/__reusable/MessageDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getTeachers, deleteTeacher } from "features/teacher/teacherAction";
import type { DeleteTeacherFormData, TeacherFormData } from "types/Teacher";
import { isFulfilled } from "@reduxjs/toolkit";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import LoadingDialog from "components/__reusable/LoadingDialog";

const minDate = new Date();

const Form = () => {
  const { t } = useTranslation();

  const [deleteDate, setDeleteDate] = useState(new Date());

  const { teachers, loading } = useAppSelector((state) => state.teacher);
  const dispatch = useAppDispatch();
  const fetchTeachers = () => teachers.length === 0 && dispatch(getTeachers());
  const callFetchTeachers = useCallback(fetchTeachers, [dispatch, getTeachers]);
  useEffect(() => {
    callFetchTeachers();
  }, [callFetchTeachers]);

  const { id } = useParams();
  const [teacher, setTeacher] = useState<TeacherFormData>({
    first_name: "",
    last_name: "",
    first_name_kata: "",
    last_name_kata: "",
    login_key: "",
    staff_class: [],
  });
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) return;
    const teacher = teachers.find(
      (teacher) => teacher.id === parseInt(id || "")
    );
    if (!teacher) return;
    setTeacher({
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      first_name_kata: teacher.first_name_kata,
      last_name_kata: teacher.last_name_kata,
      login_key: teacher.login_key,
      staff_class: teacher.staff_class.map((c) => c.id.toString()),
    });
    setDeleteDate(
      teacher.delete_time ? new Date(teacher.delete_time) : new Date()
    );
  }, [id, teachers]);

  const renderInput = (label: string, inputElemet: ReactNode) => (
    <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
      <h3 className="lg:w-1/4 font-medium">{label}</h3>
      {inputElemet}
    </div>
  );

  const [isShowDeletePrompt, setIsShowDeletePrompt] = useState(false);
  const showDeletePrompt = (e: FormEvent) => {
    e.preventDefault();
    setIsShowDeletePrompt(true);
  };

  const setDeleteSchedule = async () => {
    setIsShowDeletePrompt(false);
    const formData: DeleteTeacherFormData = {
      delete_time: deleteDate.toISOString(),
    };
    const deleteAction = await dispatch(
      deleteTeacher({ id: parseInt(id || ""), formData })
    );
    if (isFulfilled(deleteAction)) {
      dispatch(
        setSuccessStatus({
          title: "_account_form._delete_complete",
          message: "_account_form._delete_complete_content",
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <Container>
      <form className="space-y-3 lg:space-y-5" onSubmit={showDeletePrompt}>
        <h2 className="text-xl lg:text-2xl font-medium">
          {t("_account_form._teacher_account")}
        </h2>
        {renderInput(
          t("_account_form._teacher_account_id"),
          <TextInput
            name={"login_key"}
            placeholder={t("_account_form._teacher_account_id")}
            value={teacher.login_key}
            disabled={true}
            onChange={() => {}}
          />
        )}
        {renderInput(
          t("_account_form._teacher_name"),
          <div className="w-full flex space-x-3">
            <div className="w-1/2">
              <TextInput
                name={"last_name"}
                placeholder={t("_account_form._last_name")}
                value={teacher.last_name}
                onChange={() => {}}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name={"first_name"}
                placeholder={t("_account_form._first_name")}
                value={teacher.first_name}
                onChange={() => {}}
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
                  placeholder={t("_account_form._last_name_kana")}
                  value={teacher.last_name_kata}
                  onChange={() => {}}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  name={"first_name_kata"}
                  placeholder={t("_account_form._first_name_kana")}
                  value={teacher.first_name_kata}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        )}
        {renderInput(
          `${t("_account_form._deletion_date")}(*)`,
          <DateInput
            name={"deleteDate"}
            enableTime={true}
            currentDate={deleteDate}
            minDate={minDate}
            onChange={(date) => setDeleteDate(date)}
          />
        )}
        <PrimaryActionButton
          isButton={false}
          label={t("_account_form._delete_account")}
        />
      </form>
      {loading && <LoadingDialog />}
      {isShowDeletePrompt && (
        <MessageDialog>
          <div className="space-y-3">
            <h2 className="text-2xl text-center font-semibold">
              {t("_account_form._delete_account_prompt_title")}
            </h2>
            <p className="text-center">
              {t("_account_form._delete_account_prompt_content")}
            </p>
            <div className="flex space-x-5">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._no")}
                  onClick={() => setIsShowDeletePrompt(false)}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_generic._yes")}
                  onClick={setDeleteSchedule}
                />
              </div>
            </div>
          </div>
        </MessageDialog>
      )}
    </Container>
  );
};

export default Form;
