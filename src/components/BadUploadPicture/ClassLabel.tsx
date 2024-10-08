import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getClasses } from "features/class/classAction";
import type { Class } from "types/Class";

const ClassLabel = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => classes.length === 0 && dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [dispatch, getClasses]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) {
      setCurrentClass(null);
      return;
    }
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    setCurrentClass(currentClass);
  }, [classes, id]);

  return (
    <h2 className="text-xl font-semibold">{`${currentClass?.name || ""} - ${t(
      "_unpublishable_picture._unpublishable_picture"
    )}`}</h2>
  );
};

export default ClassLabel;
