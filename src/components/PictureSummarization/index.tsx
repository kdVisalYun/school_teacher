import BackButton from "components/__reusable/BackButton";
import Summarization from "./Summarization";
import useAppDispatch from "hooks/useAppDispatch";
import { reset } from "features/pictureSearch/pictureSearchSlice";

const PictureSummarizationPage = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton onClick={() => dispatch(reset())} />
      <div className="flex-1">
        <Summarization />
      </div>
    </section>
  );
};

export default PictureSummarizationPage;
