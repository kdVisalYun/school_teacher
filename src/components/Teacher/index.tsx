import BackButton from "components/__reusable/BackButton";
import CurrentAccount from "./CurrentAccount";
import TeacherTable from "./TeacherTable";

const TeacherPage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <CurrentAccount />
      <div className="flex-1">
        <TeacherTable />
      </div>
    </section>
  );
};

export default TeacherPage;
