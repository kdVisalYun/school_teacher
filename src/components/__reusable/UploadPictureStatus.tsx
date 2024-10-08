import React, { useEffect, useRef, useState } from "react";
import { useSSR, useTranslation } from "react-i18next";

import CheckedIcon from "assets/icons/CheckedIcon";

const ICON_HALF_WIDTH = "0.875rem";

interface UploadPictureStatusProps {
  isUploaded: boolean;
  isAIChecked: boolean;
  remainingUncheckedAIPictures: number;
  isAllPicturesChecked: boolean;
}

const UploadPictureStatus: React.FC<UploadPictureStatusProps> = ({
  isUploaded,
  isAIChecked,
  remainingUncheckedAIPictures,
  isAllPicturesChecked,
}) => {
  const { t } = useTranslation();
  const uploadIconRef = useRef<HTMLDivElement>(null);
  const aiCheckIconRef = useRef<HTMLDivElement>(null);
  const checkedIconRef = useRef<HTMLDivElement>(null);

  const [uploadIconWidth, setUploadIconWidth] = useState(0);
  const [aiCheckIconWidth, setAiCheckIconWidth] = useState(0);
  const [checkedIconWidth, setCheckedIconWidth] = useState(0);

  useEffect(() => {
    if (uploadIconRef.current)
      setUploadIconWidth(uploadIconRef.current.offsetWidth);
    if (aiCheckIconRef.current)
      setAiCheckIconWidth(aiCheckIconRef.current.clientWidth);
    if (checkedIconRef.current)
      setCheckedIconWidth(checkedIconRef.current.clientWidth);
  }, [uploadIconRef.current, aiCheckIconRef.current, checkedIconRef.current]);

  return (
    <div className="w-full flex">
      <div className="w-1/3 relative">
        <div className="w-fit m-auto" ref={uploadIconRef}>
          {isUploaded ? <CheckedIndicator /> : <PendingIndicator />}
        </div>
        <div
          style={{
            width: `calc(50% - ${uploadIconWidth / 2}px)`,
            height: "1px",
            backgroundColor: isUploaded ? "#0DC942" : "#767676",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(${uploadIconWidth / 2}px, -50%)`,
          }}
        ></div>
      </div>
      <div className="w-1/3 relative">
        <div
          style={{
            width: `calc(50% - ${aiCheckIconWidth / 2}px)`,
            height: "1px",
            backgroundColor: isUploaded ? "#0DC942" : "#767676",
            position: "absolute",
            top: "50%",

            transform: "translateY(-50%)",
          }}
        ></div>
        <div className="w-fit m-auto" ref={aiCheckIconRef}>
          {isAIChecked ? <CheckedIndicator /> : <PendingIndicator />}
        </div>
        <div
          className="flex items-center"
          style={{
            width: `calc(50% - ${aiCheckIconWidth / 2}px)`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(${aiCheckIconWidth / 2}px, -50%)`,
          }}
        >
          {remainingUncheckedAIPictures > 0 && (
            <pre className="w-fit">
              {` ${t("_unpublished_picture._ai_progress", {
                total:
                  remainingUncheckedAIPictures > 100
                    ? "100+"
                    : remainingUncheckedAIPictures,
              })}`}
            </pre>
          )}
          <div
            className="flex-1 h-[1px]"
            style={{ backgroundColor: isAIChecked ? "#0DC942" : "#767676" }}
          ></div>
        </div>
      </div>
      <div className="w-1/3 relative">
        <div
          style={{
            width: `calc(50% - ${checkedIconWidth / 2}px)`,
            height: "1px",
            backgroundColor: isAIChecked ? "#0DC942" : "#767676",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        ></div>
        <div className="w-fit m-auto" ref={checkedIconRef}>
          {isAllPicturesChecked ? <CheckedIndicator /> : <PendingIndicator />}
        </div>
      </div>
    </div>
  );
};

const CheckedIndicator = () => {
  return (
    <div className="w-7 h-7 p-1 rounded-full border border-[#0DC942]">
      <CheckedIcon width={"100%"} height={"100%"} color={"#0DC942"} />
    </div>
  );
};

const PendingIndicator = () => {
  return (
    <div className="w-7 h-7 p-1 rounded-full border border-[#767676]"></div>
  );
};

export default UploadPictureStatus;
