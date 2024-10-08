import { useLocation } from "react-router-dom";

import BackButton from "components/__reusable/BackButton";
import Pictures from "./Pictures";
import { PICTURES_SUMMARIZATION_PATH } from "router/pathName";
import useAppDispatch from "hooks/useAppDispatch";
import { setClassId } from "features/pictureSearch/pictureSearchSlice";
import type { PictureSummarizationNavState } from "types/Summarization";

const PicturesPage = () => {
  const location = useLocation();
  const state = location.state as PictureSummarizationNavState;
  const dispatch = useAppDispatch();
  const clickBackButton = () => {
    if (
      state &&
      state.prevPath &&
      state.prevPath === PICTURES_SUMMARIZATION_PATH
    ) {
      dispatch(setClassId({ classId: null }));
    }
  };

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton onClick={clickBackButton} />
      <div className="flex-1">
        <Pictures />
      </div>
    </section>
  );
};

export default PicturesPage;
