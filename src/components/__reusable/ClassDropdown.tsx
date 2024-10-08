import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import DropdownInput from "./DropdownInput";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getClasses } from "features/class/classAction";
import type { DropdownInputOption } from "types/DropdownInputOption";

interface ClassDropdownProps {
  currentClassId: string;
  disable?: boolean;
  onChange: (classId: number) => void;
}

const ClassDropdown: React.FC<ClassDropdownProps> = ({
  currentClassId,
  disable = false,
  onChange,
}) => {
  const { t } = useTranslation();
  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => classes.length === 0 && dispatch(getClasses());
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
    <div className="w-full h-full">
      <DropdownInput
        placeholder={t("_published_picture._plese_select_class")}
        options={classOptions}
        value={currentClassId || ""}
        disable={disable}
        onChange={(value) => {
          if (isNaN(parseInt(value))) return;
          onChange(parseInt(value));
        }}
      />
    </div>
  );
};

export default ClassDropdown;
