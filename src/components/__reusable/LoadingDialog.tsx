import { createPortal } from "react-dom";

import LoadingIcon from "assets/icons/LoadingIcon";

const LoadingDialog = () => {
  return createPortal(
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="w-[90%] lg:w-1/2 p-5 z-50">
        <div className="w-32 m-auto">
          <LoadingIcon />
        </div>
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default LoadingDialog;
