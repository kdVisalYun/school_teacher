import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import { UPLOAD_PATH, UNPUBLISHED_PICTURES_PATH } from "router/pathName";

const PictureMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full lg:flex lg:space-x-3 space-y-3 lg:space-y-0">
      <PrimaryActionButton
        label={t("_home._upload")}
        onClick={() => navigate(UPLOAD_PATH)}
      />
      <SecondaryActionButton
        label={t("_home._photo_check")}
        onClick={() => navigate(UNPUBLISHED_PICTURES_PATH)}
      />
    </div>
  );
};

export default PictureMenu;
