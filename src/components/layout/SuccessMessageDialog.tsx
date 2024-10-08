import { useTranslation } from "react-i18next";

import MessageDialog from "components/__reusable/MessageDialog";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { resetSuccessStatus } from "features/success/successSlice";

const SuccessMessageDialog = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { success, title, message, onClose } = useAppSelector(
    (state) => state.success
  );

  const close = () => {
    onClose && onClose();
    dispatch(resetSuccessStatus());
  };

  return success ? (
    <MessageDialog>
      <div className="flex flex-col justify-center items-center space-y-3">
        {/* <h2 className="text-2xl  font-semibold">成功</h2> */}
        <h2 className="text-2xl  font-semibold">{t(title)}</h2>
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

export default SuccessMessageDialog;
