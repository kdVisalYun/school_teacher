import { useTranslation } from "react-i18next";

const InfoContainer = () => {
  const { t } = useTranslation();

  return (
    <section>
      <p>{t("_login._contact")}</p>
      <p>{t("_login._sakura_company")}</p>
      <p>{t("_login._irodoki_support_office")}</p>
      <p>{t("_login._email")}：support@irodoki.com</p>
      <p>TEL:06-4967-1283</p>
      <p>{t("_login._working_hour")}</p>
      <p>{t("_login._not_working_time")}</p>
    </section>
  );
};

export default InfoContainer;
