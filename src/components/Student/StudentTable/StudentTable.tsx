import { useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Menu from "./Menu";
import SortDropdown from "./SortDropdown";
import Checkbox from "components/__reusable/Checkbox";
import StudentInfo from "./StudentInfo";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getStudents } from "features/student/studentAction";
import {
  resetSelectedStudents,
  setSelectedStudents,
} from "features/student/studentSlice";
import Container from "components/__reusable/Container";
import { Student } from "types/Student";
import { formatDate } from "utilities/DateFormatter";
import { SupportedLang } from "config/constants";
import LoadingDialog from "components/__reusable/LoadingDialog";

const StudentTable = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { students, sortBy, selectedStudents, loading } = useAppSelector(
    (state) => state.student
  );
  const dispatch = useAppDispatch();
  const fetchStudents = () =>
    !isNaN(parseInt(id || "")) &&
    dispatch(
      getStudents({
        classId: parseInt(id || ""),
        sortValue: sortBy,
      })
    );
  const callFetchStudents = useCallback(fetchStudents, [
    id,
    dispatch,
    getStudents,
    sortBy,
  ]);
  useEffect(() => {
    callFetchStudents();
  }, [callFetchStudents]);

  const renderParentsRegisterDate = (student: Student) => {
    if (!student.parent) return "-";
    else
      return formatDate(new Date(student.parent.create_time), {
        [SupportedLang.ja]: "yo Mo do",
        [SupportedLang.en]: "MMMM, d, yyyy",
      });
  };

  const selectAllStudents = (status: boolean) => {
    dispatch(resetSelectedStudents());
    for (let student of students) {
      dispatch(setSelectedStudents({ isAdd: status, student }));
    }
  };

  return (
    <div className="flex-1">
      <Container>
        {loading && <LoadingDialog />}
        <div className="h-full flex flex-col space-y-1">
          <div className="lg:flex lg:justify-between lg:items-center space-y-3 lg:space-y-0">
            <div className="flex-1 lg:flex lg:items-center lg:space-x-10 space-y-3 lg:space-y-0">
              <div className="w-fit">
                <p>
                  {t("_student._total_student")}
                  {students.length}
                </p>
                <p>
                  {selectedStudents.length > 0 &&
                    t("_student._selected_students", {
                      total: selectedStudents.length,
                    })}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <Menu />
              </div>
            </div>
            <div className="w-full lg:w-1/4">
              <SortDropdown />
            </div>
          </div>
          <div className="flex-1 overflow-auto relative">
            <div className="w-full h-full absolute">
              {!loading && students.length === 0 && (
                <p>{t("_generic._no_data")}</p>
              )}
              {!loading && students.length > 0 && (
                <table className="w-full relative">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="w-[60%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        <div className="flex justify-between items-center">
                          <Checkbox
                            name={"all"}
                            label={""}
                            isChecked={
                              selectedStudents.length === students.length
                            }
                            onChange={selectAllStudents}
                          />
                          <p className="flex-1 text-center">
                            {t("_student._student_name")}
                          </p>
                        </div>
                      </th>
                      <th className="w-[40%] p-2 bg-[#f7f7f7] border border-[#D9D9D9]">
                        {t("_student._parents_registration_date")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="w-[60%] p-2 border border-[#D9D9D9]">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              name={student.id.toString()}
                              label={""}
                              isChecked={
                                selectedStudents.findIndex(
                                  (s) => s.id === student.id
                                ) >= 0
                              }
                              onChange={(status) =>
                                dispatch(
                                  setSelectedStudents({
                                    isAdd: status,
                                    student,
                                  })
                                )
                              }
                            />
                            <StudentInfo student={student} />
                          </div>
                        </td>
                        <td className="w-[40%] p-2 border border-[#D9D9D9]">
                          {renderParentsRegisterDate(student)}
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

export default StudentTable;
