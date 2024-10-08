import BackButton from "components/__reusable/BackButton";
import Menu from "./Menu";
import ClassTable from "./ClassTable";

const ClassPage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <Menu />
      <ClassTable />
    </section>
  );
};

export default ClassPage;
