import React from "react";
import { useTranslation } from "react-i18next";

import Checkbox from "./Checkbox";

interface IsFavoriteCheckboxProps {
  isFavorite: boolean;
  onChange: (status: boolean) => void;
}

const IsFavoriteCheckbox: React.FC<IsFavoriteCheckboxProps> = ({
  isFavorite,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full">
      <Checkbox
        name={"all"}
        label={t("_published_picture._sensei_fusen")}
        isChecked={isFavorite}
        onChange={onChange}
      />
    </div>
  );
};

export default IsFavoriteCheckbox;
