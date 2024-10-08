import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import OperationDropdown from "./OperationDropdown";
import { CLASS_PATH } from "router/pathName";
import { NEW, STUDENT } from "config/keywords";

const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="w-full lg:flex lg:space-x-3 space-y-1 lg:space-y-0">
      <SecondaryActionButton
        label={t("_student._add_student")}
        onClick={() => navigate(`${CLASS_PATH}/${id}/${STUDENT}/${NEW}`)}
      />
      <OperationDropdown />
    </div>
  );
};

export default Menu;
