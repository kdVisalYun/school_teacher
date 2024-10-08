import { useEffect, useState, useRef, FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams, useNavigate } from "react-router-dom";

import InputGroup from "./InputGroup";
import Container from "components/__reusable/Container";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import MessageDialog from "components/__reusable/MessageDialog";
import RememberPasswordPromptDialog from "./RememberPasswordPrompt";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getTeachers, updateTeacher } from "features/teacher/teacherAction";
import { generate } from "utilities/RandomStringGenerator";
import type { TeacherFormData } from "types/Teacher";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { DELETE_ACCOUNT_PATH } from "router/pathName";

const UpdateForm = () => {
  const { t } = useTranslation();
  const [teacher, setTeacher] = useState<TeacherFormData>({
    first_name: "",
    last_name: "",
    first_name_kata: "",
    last_name_kata: "",
    login_key: "",
    staff_class: [],
  });

  const { teachers, loading } = useAppSelector((state) => state.teacher);
  const dispatch = useAppDispatch();
  const fetchTeachers = () => teachers.length === 0 && dispatch(getTeachers());
  const callFetchTeachers = useCallback(fetchTeachers, [dispatch, getTeachers]);
  useEffect(() => {
    callFetchTeachers();
  }, [callFetchTeachers]);

  const { id } = useParams();
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
  }, [id, teachers]);

  const [isDisable, setIsDisable] = useState(true);

  const [isShowResetPasswordPrompt, setIsShowResetPasswordPrompt] =
    useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const resetPassword = () => {
    setIsShowResetPasswordPrompt(false);
    setIsResetPassword(true);
    setTeacher({ ...teacher, password: generate(8) });
  };

  const formElement = useRef<HTMLFormElement>(null);
  const update = async (e: FormEvent | undefined) => {
    if (e) e.preventDefault();
    setIsRememberPassword(true);
    if (!formElement.current) return;
    const formData = new FormData(formElement.current);
    const teacherFormData: TeacherFormData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      first_name_kata: formData.get("first_name_kata") as string,
      last_name_kata: formData.get("last_name_kata") as string,
      login_key: formData.get("login_key") as string,
      staff_class: (formData.get("staff_class") as string).split(","),
      password: (formData.get("password") as string) || undefined,
    };
    const updateAction = await dispatch(
      updateTeacher({ id: parseInt(id || ""), formData: teacherFormData })
    );
    if (isFulfilled(updateAction)) {
      dispatch(
        setSuccessStatus({
          title: "_account_form._update_success",
          message: "_account_form._update_success_content",
        })
      );
      setIsResetPassword(false);
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  const [isRememberPassword, setIsRememberPassword] = useState(true);
  const showRememeberPasswordPrompt = (e: FormEvent) => {
    e.preventDefault();
    setIsRememberPassword(false);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <form
        ref={formElement}
        className="space-y-3 lg:space-y-5"
        onSubmit={(e) =>
          isResetPassword ? showRememeberPasswordPrompt(e) : update(e)
        }
      >
        <InputGroup
          teacher={teacher}
          disableSubmit={(isDisable) => setIsDisable(isDisable)}
        />
        <div className="flex space-x-5">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_account_form._new_password")}
              disabled={isResetPassword}
              onClick={() => setIsShowResetPasswordPrompt(true)}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              isButton={false}
              label={t("_account_form._submit")}
              disabled={isDisable}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="underline font-semibold text-[#ff0000]"
            onClick={() => navigate(`${DELETE_ACCOUNT_PATH}/${id}`)}
          >
            {t("_account_form._delete_teacher_button")}
          </button>
        </div>
        {loading && <LoadingDialog />}
      </form>
      {isShowResetPasswordPrompt && (
        <MessageDialog>
          <div className="space-y-3">
            <p className="text-center">
              {t("_account_form._new_password_warning")}
            </p>
            <div className="flex space-x-5">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._no")}
                  onClick={() => setIsShowResetPasswordPrompt(false)}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_generic._yes")}
                  onClick={resetPassword}
                />
              </div>
            </div>
          </div>
        </MessageDialog>
      )}
      {!isRememberPassword && (
        <RememberPasswordPromptDialog
          onNoClick={() => setIsRememberPassword(true)}
          onYesClick={() => update(undefined)}
        />
      )}
    </Container>
  );
};

export default UpdateForm;
