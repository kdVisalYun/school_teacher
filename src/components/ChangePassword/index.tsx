import BackButton from "components/__reusable/BackButton";
import Form from "./Form";

const ChangePasswordPage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <div className="flex-1">
        <Form />
      </div>
    </section>
  );
};

export default ChangePasswordPage;
