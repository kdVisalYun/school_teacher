import React from "react";
import { useTranslation } from "react-i18next";

import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";

interface DeletePromptDialogProps {
  onNoClick: () => void;
  onYesClick: () => void;
}

const DeletePromptDialog: React.FC<DeletePromptDialogProps> = ({
  onNoClick,
  onYesClick,
}) => {
  const { t } = useTranslation();

  return (
    <MessageDialog>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-center">
          {t("_published_picture._delete_prompt_header")}
        </h2>
        <p className="text-center">
          {t("_published_picture._delete_prompt_message")}
        </p>
        <div className="flex justify-between items-center space-x-5">
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

export default DeletePromptDialog;
