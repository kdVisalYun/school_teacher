import BackButton from "components/__reusable/BackButton";
import FilterForm from "./FilterForm";
import MonthlyPictureGraph from "./MonthlyPictureGraph";
import useAppDispatch from "hooks/useAppDispatch";
import { reset } from "features/pictureSearch/pictureSearchSlice";

const PictureFilterPage = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton onClick={() => dispatch(reset())} />
      <div className="flex-1 flex flex-col-reverse lg:flex-row lg:space-x-10">
        <div className="w-full h-full lg:w-1/2">
          <MonthlyPictureGraph />
        </div>
        <div className="w-full lg:w-1/2 mb-5 lg:m-0">
          <FilterForm />
        </div>
      </div>
    </section>
  );
};

export default PictureFilterPage;
