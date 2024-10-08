import { useState, useEffect, useCallback } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";

import Form from "./Form";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getClasses, updateClass } from "features/class/classAction";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import type { ClassFormData } from "types/Class";

const UpdateForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => classes.length === 0 && dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [
    classes,
    dispatch,
    getClasses,
  ]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const [className, setClassName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    setClassName(currentClass.name);
    setAcademicYear(currentClass.year.toString());
  }, [id, classes]);

  const update = async (formData: ClassFormData) => {
    const updateAction = await dispatch(
      updateClass({ id: parseInt(id || ""), formData })
    );
    if (isFulfilled(updateAction)) {
      dispatch(
        setSuccessStatus({
          title: "_class_form._class_update_success",
          message: "_class_form._class_update_success_content",
        })
      );
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <Fragment>
      <h2 className="text-xl lg:text-2xl font-medium">
        {t("_class_form._update_class")}
      </h2>
      <Form
        isUpdate={false}
        data={{ name: className, year: academicYear }}
        onSubmit={update}
      />
    </Fragment>
  );
};

export default UpdateForm;
