import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getClasses } from "features/class/classAction";
import { CLASS_PATH } from "router/pathName";

const ClassName = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => classes.length === 0 && dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [dispatch, getClasses]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const [className, setClassName] = useState("");
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    setClassName(currentClass.name);
  }, [id, classes]);

  return (
    <div className="space-y-1 lg:space-y-1">
      <h3 className="lg:w-1/4 font-medium text-xl lg:text-2xl">{className}</h3>
      <div className="flex justify-end">
        <Link
          to={`${CLASS_PATH}/${id}`}
          className="underline font-bold text-lg"
        >
          {t("_student._change_class_name")}
        </Link>
      </div>
    </div>
  );
};

export default ClassName;
