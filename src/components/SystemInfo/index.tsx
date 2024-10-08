import BackButton from "components/__reusable/BackButton";
import SystemInfoList from "./SystemInfoList";

const SystemInfoPage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <div className="flex-1">
        <SystemInfoList />
      </div>
    </section>
  );
};

export default SystemInfoPage;
