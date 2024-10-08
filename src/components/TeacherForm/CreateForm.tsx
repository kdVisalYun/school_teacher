import { useEffect, useState, useRef, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import InputGroup from "./InputGroup";
import Container from "components/__reusable/Container";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import RememberPasswordPromptDialog from "./RememberPasswordPrompt";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getTotalTeachers } from "services/teacherServices";
import { createTeacher } from "features/teacher/teacherAction";
import { generate } from "utilities/RandomStringGenerator";
import type { TeacherFormData } from "types/Teacher";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";

const CreateForm = () => {
  const { t } = useTranslation();
  const [teacher, setTeacher] = useState<TeacherFormData>({
    first_name: "",
    last_name: "",
    first_name_kata: "",
    last_name_kata: "",
    login_key: "",
    staff_class: [],
    password: "",
  });

  const { facility } = useAppSelector((state) => state.facility);
  const setUpAccount = async () => {
    if (!facility) return;
    const totalTeachers = await getTotalTeachers();
    const accountId = (totalTeachers + 1).toString().padStart(4, "0");
    const loginKey = `${facility.code}@${accountId}`;
    const password = generate(8);
    const currentTeacher = { ...teacher };
    currentTeacher.login_key = loginKey;
    currentTeacher.password = password;
    setTeacher(currentTeacher);
  };
  useEffect(() => {
    setUpAccount();
  }, []);

  const [isDisable, setIsDisable] = useState(true);

  const [isRememberPassword, setIsRememberPassword] = useState(true);
  const showRememeberPasswordPrompt = (e: FormEvent) => {
    e.preventDefault();
    setIsRememberPassword(false);
  };

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.teacher);
  const formElement = useRef<HTMLFormElement>(null);
  const create = async () => {
    if (!formElement.current) return;
    setIsRememberPassword(true);
    const formData = new FormData(formElement.current);
    const teacherFormData: TeacherFormData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      first_name_kata: formData.get("first_name_kata") as string,
      last_name_kata: formData.get("last_name_kata") as string,
      login_key: formData.get("login_key") as string,
      staff_class: (formData.get("staff_class") as string).split(","),
      password: formData.get("password") as string,
    };
    const createAction = await dispatch(
      createTeacher({ formData: teacherFormData })
    );
    if (isFulfilled(createAction)) {
      dispatch(
        setSuccessStatus({
          title: "_account_form._add_teacher_complete",
          message: "_account_form._add_teacher_complete_content",
        })
      );
      setUpAccount();
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <Container>
      <form
        ref={formElement}
        className="space-y-3 lg:space-y-5"
        onSubmit={showRememeberPasswordPrompt}
      >
        <InputGroup
          teacher={teacher}
          disableSubmit={(isDisable) => setIsDisable(isDisable)}
        />
        <PrimaryActionButton
          isButton={false}
          label={t("_account_form._submit")}
          disabled={isDisable}
        />
        {loading && <LoadingDialog />}
      </form>
      {!isRememberPassword && (
        <RememberPasswordPromptDialog
          onNoClick={() => setIsRememberPassword(true)}
          onYesClick={create}
        />
      )}
    </Container>
  );
};

export default CreateForm;
