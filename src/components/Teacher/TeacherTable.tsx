import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import LoadingDialog from "components/__reusable/LoadingDialog";
import Container from "components/__reusable/Container";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getTeachers } from "features/teacher/teacherAction";
import type { Teacher } from "types/Teacher";
import { ACCOUNT_PATH } from "router/pathName";
import { PRINCIPAL, NEW } from "config/keywords";
import useIsPrincipal from "hooks/useIsPrincipal";

const TeacherTable = () => {
  const { t } = useTranslation();

  const { teachers, loading } = useAppSelector((state) => state.teacher);
  const dispatch = useAppDispatch();
  const fetchTeachers = () => dispatch(getTeachers());
  const callFetchTeachers = useCallback(fetchTeachers, [dispatch, getTeachers]);
  useEffect(() => {
    callFetchTeachers();
  }, [callFetchTeachers]);

  const renderTeacherName = (teacher: Teacher) => {
    if (teacher.first_name_kata && teacher.last_name_kata)
      return `${teacher.last_name} ${teacher.first_name} (${teacher.last_name_kata} ${teacher.first_name_kata})`;
    else return `${teacher.last_name} ${teacher.first_name}`;
  };

  const renderClassName = (teacher: Teacher) => {
    const className = teacher.staff_class.map((c) => c.name);
    return className.join(", ");
  };

  const navigate = useNavigate();
  const isPrincipal = useIsPrincipal();

  return isPrincipal ? (
    <div className="h-full flex flex-col space-y-2 lg:space-y-3">
      <h2 className="text-xl lg:text-2xl font-medium">
        {t("_account._teacher_account")}
      </h2>
      <div className="w-1/2 lg:w-1/6">
        <PrimaryActionButton
          label={`+ ${t("_account._add")}`}
          onClick={() => navigate(`${ACCOUNT_PATH}/${NEW}`)}
        />
      </div>
      <div className="flex-1">
        <Container>
          <div className="h-full overflow-auto relative">
            <div className="w-full h-full absolute">
              {loading && <LoadingDialog />}
              {!loading && teachers.length === 0 && (
                <p>{t("_generic._no_data")}</p>
              )}
              {!loading && teachers.length > 0 && (
                <table className="w-full relative">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="w-1/2 p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        {t("_account._account_name")}
                      </th>
                      <th className="w-1/2 p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        {t("_account._account_class")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id.toString()}>
                        <td className="w-1/2 p-2 border border-[#D9D9D9]">
                          <Link
                            to={`${ACCOUNT_PATH}/${teacher.id}`}
                            className="underline"
                          >
                            {renderTeacherName(teacher)}
                          </Link>
                        </td>
                        <td className="w-1/2 p-2 border border-[#D9D9D9]">
                          {renderClassName(teacher)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  ) : null;
};

export default TeacherTable;
