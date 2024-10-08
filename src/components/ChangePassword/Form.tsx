import { useState, ReactNode, Fragment, useEffect, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

import Container from "components/__reusable/Container";
import TextInput from "components/__reusable/TextInput";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import type { ChangePasswordFormData } from "types/User";
import { changePassword } from "services/userServices";
import LoadingDialog from "components/__reusable/LoadingDialog";
import { getCurrentLanguage } from "utilities/CurrentLanguageGetter";
import useAppDispatch from "hooks/useAppDispatch";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";

const containUppercaseRegex = /^(?=.*[A-Z]).*$/;
const containLowercaseRegex = /^(?=.*[a-z]).*$/;
const containNumberRegex = /^(?=.*\d).+$/;

const Form = () => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [haveInteracted, setHaveInteracted] = useState(false);

  const renderInput = (label: string, inputElement: ReactNode) => (
    <div className="lg:flex items-center space-y-1 lg:space-x-3 lg:space-y-0">
      <h3 className="lg:w-1/4 font-medium">{label}</h3>
      <div className="lg:w-3/4">{inputElement}</div>
    </div>
  );

  const [isDisable, setIsDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const validatePasswordInput = () => {
    setErrorMessage("");
    if (newPassword.length < 8) {
      setErrorMessage(t("_change_password._short_password"));
      return;
    }

    if (!containUppercaseRegex.test(newPassword)) {
      setErrorMessage(t("_change_password._not_contain_uppercase"));
      return;
    }

    if (!containLowercaseRegex.test(newPassword)) {
      setErrorMessage(t("_change_password._not_contain_lowercase"));
      return;
    }

    if (!containNumberRegex.test(newPassword)) {
      setErrorMessage(t("_change_password._not_contain_number"));
      return;
    }
  };
  useEffect(() => {
    if (haveInteracted) {
      validatePasswordInput();
    }
  }, [newPassword, haveInteracted]);
  useEffect(() => {
    setIsDisable(
      oldPassword === "" ||
        newPassword === "" ||
        confirmedNewPassword === "" ||
        newPassword !== confirmedNewPassword ||
        errorMessage.length > 0
    );
  }, [oldPassword, newPassword, confirmedNewPassword, errorMessage]);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const change = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const formData: ChangePasswordFormData = {
        old_password: oldPassword,
        new_password: newPassword,
        verify_password: confirmedNewPassword,
      };
      await changePassword(formData, getCurrentLanguage());
      dispatch(
        setSuccessStatus({
          title: "_change_password._change_complete",
          message: "_change_password._change_complete_content",
        })
      );
      setOldPassword("");
      setNewPassword("");
      setConfirmedNewPassword("");
    } catch (e: any) {
      dispatch(
        setErrorStatus(
          ((e as AxiosError).response?.data as any).error ||
            t("_generic._unknown_error")
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && <LoadingDialog />}
      <form className="space-y-3 lg:space-y-5" onSubmit={change}>
        {renderInput(
          `${t("_change_password._current_password")}`,
          <TextInput
            name={"old_password"}
            placeholder={t("_change_password._current_password")}
            value={oldPassword}
            onChange={(value) => setOldPassword(value)}
          />
        )}
        {renderInput(
          `${t("_change_password._new_password")}`,
          <Fragment>
            <input
              className="w-full p-3 rounded-lg outline-none border border-[#9B9B9B] disabled:bg-white/50 disabled:text-[#666666]"
              type="text"
              name={"new_password"}
              placeholder={t("_change_password._new_password")}
              autoComplete="off"
              value={newPassword}
              onBlur={() => setHaveInteracted(true)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
            <p className="text-sm">{t("_change_password._password_rule")}</p>
          </Fragment>
        )}
        {renderInput(
          `${t("_change_password._new_password_confirmation")}`,
          <TextInput
            name={"verify_password"}
            placeholder={t("_change_password._new_password_confirmation")}
            value={confirmedNewPassword}
            onChange={(value) => setConfirmedNewPassword(value)}
          />
        )}
        <p className="text-[#ff0000]">{errorMessage}</p>
        <PrimaryActionButton
          isButton={false}
          label={t("_change_password._change")}
          disabled={isDisable}
        />
      </form>
    </Container>
  );
};

export default Form;
