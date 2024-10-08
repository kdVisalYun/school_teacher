import React from "react";

import LoadingIcon from "assets/icons/LoadingIcon";

interface PictureThumbnailProps {
  imageSrc: string;
  name: string;
}

const PictureThumbnail: React.FC<PictureThumbnailProps> = ({
  imageSrc,
  name,
}) => {
  return (
    <div className="w-full h-full rounded-md border border-[#A0A0A0] relative">
      <img
        className="min-w-[100%] h-[100%] rounded-md"
        src={imageSrc || "/images/default_thumbnail.svg"}
        alt={name}
      />
    </div>
  );
};

export default PictureThumbnail;
