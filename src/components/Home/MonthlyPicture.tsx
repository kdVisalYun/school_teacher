import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ShootingStar from "./assets/ShootingStar";
import Title from "./assets/Title";
import Flags from "./assets/Flags";
import Camera from "./assets/Camera";
import Polaroid from "components/__reusable/Polaroid";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import MonthlyPicturesDialog from "./MonthlyPicturesDialog";
import { getRandomPictures } from "services/pictureServices";
import type { RandomPicture } from "types/Pictures";
import { getCurrentLanguage } from "utilities/CurrentLanguageGetter";

const MonthlyPicture = () => {
  const { t } = useTranslation();
  const [pictures, setPictures] = useState<RandomPicture[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const fetchPictures = async () => {
    setErrorMessage("");
    try {
      const pictures = await getRandomPictures(2, getCurrentLanguage());
      setPictures(pictures);
    } catch (e: any) {
      setErrorMessage(e.response.data.error || "_generic._unknown_error");
    }
  };
  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <div className="h-full w-full bg-white rounded-lg flex flex-col justify-between">
      <div className="h-full flex flex-col justify-start relative">
        <div className="w-[30%] ms-3">
          <ShootingStar />
        </div>
        <div className="w-[40%] mx-auto">
          <Title />
        </div>
        <div className="w-full relative bottom-5">
          <Flags />
        </div>
        {errorMessage && (
          <p className="text-xl font-semibold text-center">{t(errorMessage)}</p>
        )}
        {!errorMessage && (
          <div className="w-full flex-1 relative m-auto">
            {pictures[1] && (
              <div className="w-[60%] -rotate-45 absolute left-[50%] -translate-x-[50%] top-[25%] -translate-y-[25%]">
                <Polaroid imgSrc={pictures[1].converted_picture || ""} />
              </div>
            )}
            <div className="w-[60%] m-auto relative top-[25%] -translate-y-[25%] z-10">
              <Polaroid imgSrc={pictures[0]?.converted_picture || ""} />
            </div>
          </div>
        )}
      </div>
      <div className="w-full relative">
        <div className="w-1/2 m-auto">
          <PrimaryActionButton
            label={t("_home._see_more")}
            onClick={() => setIsOpenDialog(true)}
          />
        </div>
        <div className="w-[30%] relative left-[100%] -translate-x-[100%]">
          <Camera />
        </div>
      </div>
      {isOpenDialog && (
        <MonthlyPicturesDialog onClose={() => setIsOpenDialog(false)} />
      )}
    </div>
  );
};

export default MonthlyPicture;
