import React from "react";

import PictureThumbnail from "./PictureThumbnail";
import type { Picture } from "types/PictureCollection";

interface PictureCollectionProps {
  pictures: Picture[];
  selectedPictures: Picture[];
  onSelect: (pictures: Picture[]) => void;
}

const PictureCollection: React.FC<PictureCollectionProps> = ({
  pictures,
  selectedPictures,
  onSelect,
}) => {
  const selectPicture = (picture: Picture) => {
    const index = selectedPictures.findIndex((p) => p.id === picture.id);
    if (index >= 0) {
      const temp = [...selectedPictures];
      temp.splice(index, 1);
      onSelect(temp);
    } else {
      onSelect([...selectedPictures, picture]);
    }
  };

  return (
    <div className="flex flex-wrap">
      {pictures.map((picture) => (
        <div key={picture.id} className="relative">
          <input
            id={picture.id.toString()}
            className="absolute top-1 left-1 cursor-pointer z-10"
            type="radio"
            value={""}
            onClick={() => selectPicture(picture)}
            checked={
              selectedPictures.find((pic) => pic.id === picture.id) !==
              undefined
            }
          />
          <label className="block w-20 h-20 me-3 mb-3">
            <PictureThumbnail
              imageSrc={picture.picture}
              name={picture.picture}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default PictureCollection;
