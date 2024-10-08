import React, { ReactNode, useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

import TextInput from "components/__reusable/TextInput";
import ClassMultipleValueDropdownInput from "components/__reusable/ClassMultipleValueDropdownInput";
import type { TeacherFormData } from "types/Teacher";

interface InputGroupProps {
  teacher: TeacherFormData;
  disableSubmit: (isDisable: boolean) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ teacher, disableSubmit }) => {
  const { t } = useTranslation();
  const [loginKey, setLoginKey] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [classId, setClassId] = useState<string[]>([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoginKey(teacher.login_key);
    setLastName(teacher.last_name);
    setFirstName(teacher.first_name);
    setLastNameKana(teacher.last_name_kata);
    setFirstNameKana(teacher.first_name_kata);
    setClassId(teacher.staff_class);
    setPassword(teacher.password || "XXXXXXXXX");
  }, [teacher]);

  const renderInput = (label: string, inputElemet: ReactNode) => (
    <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
      <h3 className="lg:w-1/4 font-medium">{label}</h3>
      {inputElemet}
    </div>
  );

  useEffect(() => {
    const isDisable =
      !firstName ||
      !lastName ||
      !firstNameKana ||
      !lastNameKana ||
      classId.length === 0;
    disableSubmit(isDisable);
  }, [firstName, lastName, firstNameKana, lastNameKana, classId]);

  return (
    <Fragment>
      <h2 className="text-xl lg:text-2xl font-medium">
        {t("_account_form._teacher_account")}
      </h2>
      {renderInput(
        `${t("_account_form._teacher_account_id")}(*)`,
        <Fragment>
          <input
            type="hidden"
            name="login_key"
            value={loginKey.split("@")[1]}
          />
          <TextInput
            name={"login_key"}
            placeholder={t("_account_form._teacher_account_id")}
            value={loginKey}
            disabled={true}
            onChange={(value) => setLoginKey(value)}
          />
        </Fragment>
      )}
      {renderInput(
        `${t("_account_form._teacher_name")}(*)`,
        <div className="w-full flex space-x-3">
          <div className="w-1/2">
            <TextInput
              name={"last_name"}
              placeholder={t("_account_form._last_name")}
              value={lastName}
              onChange={(value) => setLastName(value)}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              name={"first_name"}
              placeholder={t("_account_form._first_name")}
              value={firstName}
              onChange={(value) => setFirstName(value)}
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
                value={lastNameKana}
                onChange={(value) => setLastNameKana(value)}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name={"first_name_kata"}
                placeholder={t("_account_form._first_name_kana")}
                value={firstNameKana}
                onChange={(value) => setFirstNameKana(value)}
              />
            </div>
          </div>
        </div>
      )}
      {renderInput(
        `${t("_account_form._class_in_charge")}(*)`,
        <Fragment>
          <ClassMultipleValueDropdownInput
            classId={classId}
            onChange={(classId) => setClassId(classId)}
          />
          <input type="hidden" name="staff_class" value={classId.join(",")} />
        </Fragment>
      )}
      {renderInput(
        `${t("_account_form._password")}(*)`,
        <Fragment>
          {teacher.password && (
            <input type="hidden" name="password" value={password} />
          )}
          <TextInput
            name={"password"}
            placeholder={t("_account_form._password")}
            value={password}
            disabled={true}
            onChange={() => {}}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default InputGroup;
