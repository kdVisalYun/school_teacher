import { useTranslation } from "react-i18next";

import MessageDialog from "components/__reusable/MessageDialog";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { resetErrorStatus } from "features/error/errorSlice";

const ErrorMessageDialog = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.error);

  const close = () => {
    dispatch(resetErrorStatus());
  };

  return error ? (
    <MessageDialog>
      <div className="flex flex-col justify-center items-center space-y-3">
        <h2 className="text-2xl  font-semibold">
          {t("_generic._unknown_error")}
        </h2>
        <pre>{t(message)}</pre>
        <PrimaryActionButton
          label={t("_generic._close")}
          onClick={() => close()}
        />
      </div>
    </MessageDialog>
  ) : (
    <></>
  );
};

export default ErrorMessageDialog;
