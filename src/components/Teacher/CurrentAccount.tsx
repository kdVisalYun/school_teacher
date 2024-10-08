import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import TextInput from "components/__reusable/TextInput";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getUserProfile } from "features/user/userAction";
import { CHANGE_PASSWORD_PATH } from "router/pathName";

const CurrentAccount = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const fetchUserProfile = () => dispatch(getUserProfile());
  const callFetchUserProfile = useCallback(fetchUserProfile, [
    dispatch,
    getUserProfile,
  ]);
  useEffect(() => {
    callFetchUserProfile();
  }, [callFetchUserProfile]);

  return (
    <div className="space-y-2 lg:space-y-3">
      <h2 className="text-xl lg:text-2xl font-medium">
        {t("_account._account_info")}
      </h2>
      <div className="space-y-1">
        <div className="lg:flex items-center space-y-1 lg:space-x-3 lg:space-y-0">
          <h3 className="lg:w-1/5 font-medium">{t("_account._account_id")}</h3>
          <div className="lg:w-4/5">
            <TextInput
              name={"login_key"}
              placeholder={t("_account._account_id")}
              disabled={true}
              value={user?.login_key || ""}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="lg:flex items-center space-y-1 lg:space-x-3 lg:space-y-0">
          <h3 className="lg:w-1/5 font-medium">{t("_account._password")}</h3>
          <div className="lg:w-4/5">
            <TextInput
              name={"password"}
              placeholder={t("_account._password")}
              disabled={true}
              value={"XXXXXXXXXX"}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="underline text-lg font-semibold"
          onClick={() => navigate(CHANGE_PASSWORD_PATH)}
        >
          {t("_account._change_password")}
        </button>
      </div>
    </div>
  );
};

export default CurrentAccount;
