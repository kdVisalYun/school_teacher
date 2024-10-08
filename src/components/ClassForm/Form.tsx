import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TextInput from "components/__reusable/TextInput";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import DropdownInput from "components/__reusable/DropdownInput";
import useAppSelector from "hooks/useAppSelector";
import { DropdownInputOption } from "types/DropdownInputOption";
import type { ClassFormData } from "types/Class";

const INITIAL_YEAR = new Date();

const START_YEAR = 2023;
let year = START_YEAR;
const YEAR_OPTION: DropdownInputOption[] = [];
const TODAY = new Date();
const MAX_YEAR = TODAY.getFullYear() + 1;
do {
  YEAR_OPTION.push({
    label: year.toString(),
    value: year.toString(),
  });
  year += 1;
} while (year <= MAX_YEAR);

interface FormProps {
  isUpdate: boolean;
  data: ClassFormData | null;
  onSubmit: (formData: ClassFormData) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ isUpdate, data, onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [academicYear, setAcademicYear] = useState(
    INITIAL_YEAR.getFullYear().toString()
  );
  useEffect(() => {
    if (!data) return;
    setName(data.name);
    setAcademicYear(data.year);
  }, [data]);

  const renderInput = (label: string, inputElement: ReactNode) => {
    return (
      <div className="lg:flex items-center justify-start space-y-3 lg:space-x-3 lg:space-y-0">
        <h3 className="lg:w-1/4 font-medium">{label}</h3>
        {inputElement}
      </div>
    );
  };

  const { loading } = useAppSelector((state) => state.class);
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, year: academicYear });
    if (!isUpdate) {
      setName("");
      setAcademicYear(INITIAL_YEAR.getFullYear().toString());
    }
  };

  return (
    <form className="space-y-3 lg:space-y-5" onSubmit={submitForm}>
      {renderInput(
        t("_class_form._academic_year"),
        <DropdownInput
          placeholder={t("_class_form._academic_year")}
          options={YEAR_OPTION}
          value={academicYear}
          onChange={(value) => setAcademicYear(value)}
        />
      )}
      {renderInput(
        t("_class_form._class_name"),
        <TextInput
          name={"className"}
          placeholder={t("_class_form._class_name")}
          disabled={false}
          value={name}
          onChange={(value) => setName(value)}
        />
      )}
      <div>
        <p>{t("_class_form._class_name_warning")}</p>
        <p>{t("_class_form._class_name_change_info")}</p>
      </div>
      <div className="w-full">
        <PrimaryActionButton
          isButton={false}
          label={t("_class_form._submit")}
          loading={loading}
          disabled={name === ""}
        />
      </div>
    </form>
  );
};

export default Form;
