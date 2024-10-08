import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Container from "components/__reusable/Container";
import SortDropdown from "./SortDropdown";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getClassesOfAcademicYear } from "features/class/classAction";
import { CLASS_PATH } from "router/pathName";
import { STUDENT } from "config/keywords";

const now = new Date();

const ClassTable = () => {
  const { t } = useTranslation();
  const { classes, sortBy, loading } = useAppSelector((state) => state.class);
  const [year, setYear] = useState(now.getFullYear());
  const dispatch = useAppDispatch();
  const fetchClasses = () => dispatch(getClassesOfAcademicYear({ year }));
  const callFetchClasses = useCallback(fetchClasses, [
    dispatch,
    year,
    sortBy,
    getClassesOfAcademicYear,
  ]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const renderYearButton = () => {
    let currentYear = now.getFullYear();
    const START_YEAR = 2023;
    const yearButtons = [];
    while (currentYear >= START_YEAR) {
      const y = currentYear;
      yearButtons.push(
        <button
          key={y}
          className={
            y === year
              ? "bg-primary px-2 rounded text-white border border-primary"
              : "border border-primary px-2 rounded"
          }
          onClick={() => setYear(y)}
        >
          {`${y}年度`}
        </button>
      );
      currentYear -= 1;
    }
    return yearButtons;
  };

  return (
    <div className="flex-1">
      <Container>
        <div className="h-full flex flex-col space-y-1">
          <div className="w-[99%] overflow-auto">
            <div className="flex whitespace-nowrap space-x-3">
              {renderYearButton()}
            </div>
          </div>
          <div className="w-full lg:flex lg:justify-end">
            <div className="w-full lg:w-1/4">
              <SortDropdown />
            </div>
          </div>
          <div className="flex-1 overflow-auto relative">
            <div className="w-full h-full absolute">
              {loading && <LoadingDialog />}
              {!loading && classes.length === 0 && (
                <p>{t("_generic._no_data")}</p>
              )}
              {!loading && classes.length > 0 && (
                <table className="w-full relative">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="w-[60%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        {t("_class._class_name")}
                      </th>
                      <th className="w-[40%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        {t("_class._total_students")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((c) => (
                      <tr key={c.id}>
                        <td className="w-[60%] p-2 border border-[#D9D9D9]">
                          <Link
                            to={`${CLASS_PATH}/${c.id}/${STUDENT}`}
                            className="underline"
                          >
                            {`${c.year} - ${c.name}`}
                          </Link>
                        </td>
                        <td className="w-[40%] p-2 border border-[#D9D9D9] text-right">
                          {c.number_of_student}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClassTable;
