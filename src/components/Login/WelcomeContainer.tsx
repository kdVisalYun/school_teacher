import { useTranslation } from "react-i18next";

const WelcomeContainer = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col space-y-3 items-center justify-center">
      <div className="w-full">
        <img
          className="m-auto"
          src="/images/irodoki_logo.svg"
          alt="irodoki_logo"
        />
      </div>
      <h1 className="text-2xl font-medium">{t("_login._welcome")}</h1>
      <p className="px-5 text-center">{t("_login._welcome_message")}</p>
    </section>
  );
};

export default WelcomeContainer;
