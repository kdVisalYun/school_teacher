import React, { useEffect, useState } from "react";

interface PolaroidProps {
  imgSrc: string;
  disableComment?: boolean;
}

const Polaroid: React.FC<PolaroidProps> = ({
  imgSrc,
  disableComment = true,
}) => {
  const [comment, setComment] = useState("");
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      const orientation = img.width > img.height ? "horizontal" : "vertical";
      setOrientation(orientation);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  return (
    <div
      className={`w-full bg-white border border-black rounded-sm p-1 space-y-1 flex flex-col justify-between ${
        orientation === "horizontal" ? "max-h-full" : "h-full"
      }`}
    >
      <div
        className={`flex-1 w-full ${
          orientation === "horizontal" ? "max-h-[80%]" : "h-[80%]"
        }`}
      >
        {imgSrc && (
          <img
            className="max-w-full max-h-full m-auto object-contain object-top"
            src={imgSrc}
          />
        )}
      </div>
      {!disableComment && (
        <textarea
          className="w-full rounded-sm outline-none resize-none no-scrollbar"
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default Polaroid;
