import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import Form from "./Form";
import useAppDispatch from "hooks/useAppDispatch";
import { createClass } from "features/class/classAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import type { ClassFormData } from "types/Class";

const CreateForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const create = async (formData: ClassFormData) => {
    const createAction = await dispatch(createClass({ formData }));
    if (isFulfilled(createAction)) {
      dispatch(
        setSuccessStatus({
          title: "_class_form._class_add_success",
          message: "_class_form._class_add_success_content",
        })
      );
    } else {
      setErrorStatus("");
    }
  };

  return (
    <Fragment>
      <h2 className="text-xl lg:text-2xl font-medium">
        {t("_class_form._create_class")}
      </h2>
      <Form isUpdate={false} data={null} onSubmit={create} />
    </Fragment>
  );
};

export default CreateForm;
