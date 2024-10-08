import BackButton from "components/__reusable/BackButton";
import Summarization from "./Summarization";

const UploadPicturesSummarizationPage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <div className="flex-1">
        <Summarization />
      </div>
    </section>
  );
};

export default UploadPicturesSummarizationPage;
