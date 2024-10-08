import { Fragment } from "react/jsx-runtime";

import UploadPictureStatus from "./UploadPictureStatus";
import useAppSelector from "hooks/useAppSelector";

const UploadPicture = () => {
  const { uploadQueue } = useAppSelector((state) => state.picture);

  return (
    <Fragment>
      {uploadQueue.map((batch) => (
        <UploadPictureStatus pictureBatch={batch} />
      ))}
    </Fragment>
  );
};

export default UploadPicture;
