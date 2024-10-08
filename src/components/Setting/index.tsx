import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BackButton from "components/__reusable/BackButton";
import Container from "components/__reusable/Container";
import { CHANGE_PASSWORD_PATH } from "router/pathName";

const SettingPage = () => {
  const { t } = useTranslation();
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <div className="flex-1">
        <Container>
          <div className="p-2 space-y-3">
            <Link
              to={CHANGE_PASSWORD_PATH}
              className="underline text-lg font-semibold"
            >
              {t("_setting._change_password")}
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default SettingPage;
