import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import TextInput from "components/__reusable/TextInput";
import PasswordInput from "components/__reusable/PasswordInput";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { login } from "features/auth/authAction";
import { getUserProfile } from "features/user/userAction";
import { BASE_PATH } from "router/pathName";

const LoginForm = () => {
  const authState = useAppSelector((state) => state.auth);
  const userState = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [loginKey, setLoginKey] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginAction = await dispatch(login({ loginKey, password }));
    if (!isFulfilled(loginAction)) return;

    const getUserAction = await dispatch(getUserProfile());
    if (isFulfilled(getUserAction)) {
      navigate(BASE_PATH, { replace: true });
    }
  };

  return (
    <form className="w-full space-y-3" onSubmit={handleFormSubmit}>
      <TextInput
        name="login_key"
        placeholder={t("_login._account_id")}
        value={loginKey}
        onChange={(value) => setLoginKey(value)}
      />
      <PasswordInput
        name="password"
        placeholder={t("_login._password")}
        disabled={false}
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <p className="text-[#ff0000]">
        {t(authState.error || userState.error || "")}
      </p>
      <PrimaryActionButton
        label={t("_login._login")}
        isButton={false}
        disabled={loginKey === "" || password === ""}
        loading={authState.loading || userState.loading || false}
      />
    </form>
  );
};

export default LoginForm;
