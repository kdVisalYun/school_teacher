import BackButton from "components/__reusable/BackButton";
import ClassName from "./ClassName";
import StudentTable from "./StudentTable/StudentTable";
import DeleteClassButton from "./DeleteClassButton";
import useAppDispatch from "hooks/useAppDispatch";
import {
  resetSelectedStudents,
  resetSortBy,
  resetStudent,
} from "features/student/studentSlice";

const StudentPage = () => {
  const dispatch = useAppDispatch();
  const reset = () => {
    dispatch(resetSelectedStudents());
    dispatch(resetSortBy());
    dispatch(resetStudent());
  };

  return (
    <section className="h-full space-y-3 lg:space-y-5 flex flex-col">
      <BackButton onClick={reset} />
      <ClassName />
      <StudentTable />
      <DeleteClassButton />
    </section>
  );
};

export default StudentPage;
