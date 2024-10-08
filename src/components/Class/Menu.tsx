import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import { CLASS_PATH, STUDENT_PATH } from "router/pathName";
import { NEW } from "config/keywords";

const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full lg:flex lg:space-x-3 space-y-3 lg:space-y-0">
      <SecondaryActionButton
        label={`+ ${t("_class._add_class")}`}
        onClick={() => navigate(`${CLASS_PATH}/${NEW}`)}
      />
      <PrimaryActionButton
        label={`+ ${t("_class._add_student")}`}
        onClick={() => navigate(`${STUDENT_PATH}/${NEW}`)}
      />
    </div>
  );
};

export default Menu;
