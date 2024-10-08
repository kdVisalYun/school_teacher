import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import MultipleValueDropdownInput from "./MultipleValueDropdownInput";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getClasses } from "features/class/classAction";
import type { DropdownInputOption } from "types/DropdownInputOption";

interface ClassMultipleValueDropdownInputProps {
  classId: string[];
  disable?: boolean;
  onChange: (classId: string[]) => void;
}

const ClassMultipleValueDropdownInput: React.FC<
  ClassMultipleValueDropdownInputProps
> = ({ classId, disable = false, onChange }) => {
  const { t } = useTranslation();
  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [dispatch, getClasses]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const classOptions: DropdownInputOption[] = classes.map((c) => {
    let option: DropdownInputOption = {
      label: "",
      value: "",
    };
    option.label = `${c.year} - ${c.name}`;
    option.value = c.id.toString();
    return option;
  });

  return (
    <div className="w-full">
      <MultipleValueDropdownInput
        placeholder={t("_account_form._plese_select_class")}
        options={classOptions}
        value={classId}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default ClassMultipleValueDropdownInput;
