import React from "react";
import { useTranslation } from "react-i18next";

import MessageDialog from "components/__reusable/MessageDialog";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";

interface RememberPasswordPromptDialogProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const RememberPasswordPromptDialog: React.FC<
  RememberPasswordPromptDialogProps
> = ({ onYesClick, onNoClick }) => {
  const { t } = useTranslation();

  return (
    <MessageDialog>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-center">
          {t("_account_form._caution")}
        </h2>
        <p className="text-center">{t("_account_form._note_down_password")}</p>
        <div className="flex justify-between items-center space-x-5 w-full">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_generic._no")}
              onClick={onNoClick}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              label={t("_generic._yes")}
              onClick={onYesClick}
            />
          </div>
        </div>
      </div>
    </MessageDialog>
  );
};

export default RememberPasswordPromptDialog;
