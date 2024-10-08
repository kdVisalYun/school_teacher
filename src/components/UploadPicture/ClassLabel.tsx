import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UploadPictureStatus from "components/__reusable/UploadPictureStatus";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getClasses } from "features/class/classAction";
import type { Class } from "types/Class";

const ClassLabel = () => {
  const { id } = useParams();

  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => classes.length === 0 && dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [dispatch, getClasses]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  useEffect(() => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    setCurrentClass(currentClass);
  }, [classes, id]);

  return (
    <div className="w-full lg:flex lg:justify-between lg:items-center space-y-2 lg:space-y-0">
      <h2 className="text-xl font-semibold">{currentClass?.name || ""}</h2>
    </div>
  );
};

export default ClassLabel;
