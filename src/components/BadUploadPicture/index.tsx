import BackButton from "components/__reusable/BackButton";
import Pictures from "./Pictures";

const BadUploadPicture = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <div className="flex-1">
        <Pictures />
      </div>
    </section>
  );
};

export default BadUploadPicture;
