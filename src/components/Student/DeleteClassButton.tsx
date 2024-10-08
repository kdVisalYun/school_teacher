import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import MessageDialog from "components/__reusable/MessageDialog";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { deleteClass } from "features/class/classAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { CLASS_PATH } from "router/pathName";

const DeleteClassButton = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { classes, loading } = useAppSelector((state) => state.class);
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    setClassName(currentClass.name);
  }, [id, classes]);

  const [isShowPrompt, setIsShowPrompt] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const remove = async () => {
    const deleteAction = await dispatch(
      deleteClass({ id: parseInt(id || "") })
    );
    if (isFulfilled(deleteAction)) {
      setIsShowPrompt(false);
      dispatch(
        setSuccessStatus({
          title: "_class_form._class_delete_success",
          message: "_class_form._class_delete_success_content",
        })
      );
      navigate(CLASS_PATH, { replace: true });
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end">
        <button
          className="font-bold text-[#ff0000] underline"
          onClick={() => setIsShowPrompt(true)}
        >
          {t("_student._delete_class_button")}
        </button>
      </div>
      {isShowPrompt && (
        <MessageDialog>
          <div className="space-y-2 lg:space-y-1">
            <h2 className="text-2xl font-semibold text-center">
              {t("_student._delete_class_warning", {
                name: className,
              })}
            </h2>
            <div className="flex justify-between items-center space-x-5">
              <div className="w-1/2">
                <SecondaryActionButton
                  label={t("_generic._no")}
                  onClick={() => setIsShowPrompt(false)}
                />
              </div>
              <div className="w-1/2">
                <PrimaryActionButton
                  label={t("_generic._yes")}
                  loading={loading}
                  onClick={remove}
                />
              </div>
            </div>
          </div>
        </MessageDialog>
      )}
    </Fragment>
  );
};

export default DeleteClassButton;
