import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { getRandomPictures } from "services/pictureServices";
import type { RandomPicture } from "types/Pictures";
import { getCurrentLanguage } from "utilities/CurrentLanguageGetter";
import CancelIcon from "assets/icons/CancelIcon";
import Tape1 from "./assets/Tape1";
import Tape2 from "./assets/Tape2";
import Tape3 from "./assets/Tape3";
import Tape4 from "./assets/Tape4";
import Tape5 from "./assets/Tape5";
import Tape6 from "./assets/Tape6";
import Tape7 from "./assets/Tape7";
import Tape8 from "./assets/Tape8";
import PrintIcon from "assets/icons/PrintIcon";
import Polaroid from "components/__reusable/Polaroid";
import generatePdf from "utilities/PdfGenerator";
import useWindowDimensions from "hooks/useWindowDimensions";

const SCALE = 0.95;
const PRINT_DOCUMENT_HEIGHT = 2480;
const PRINT_DOCUMENT_WIDTH = 3508;

interface MonthlyPicturesDialogProps {
  onClose: () => void;
}

const MonthlyPicturesDialog: React.FC<MonthlyPicturesDialogProps> = ({
  onClose,
}) => {
  const { t } = useTranslation();
  const deviceScreen = useWindowDimensions();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonContainerRef = useRef<HTMLDivElement>(null);
  const printButtonContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pictures, setPictures] = useState<RandomPicture[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPictures = async () => {
    setErrorMessage("");
    try {
      const pictures = await getRandomPictures(6, getCurrentLanguage());
      setPictures(pictures);
    } catch (e: any) {
      setErrorMessage(e.response.data.error || "_generic._unknown_error");
    }
  };
  useEffect(() => {
    fetchPictures();
  }, []);

  const adjustDialogDimension = () => {
    if (deviceScreen.width > deviceScreen.height) {
      return {
        width: !containerRef.current
          ? "100%"
          : containerRef.current.clientHeight *
            SCALE *
            (PRINT_DOCUMENT_WIDTH / PRINT_DOCUMENT_HEIGHT),
      };
    }
    return {
      height: !containerRef.current
        ? "100%"
        : containerRef.current.clientWidth *
          SCALE *
          (PRINT_DOCUMENT_WIDTH / PRINT_DOCUMENT_HEIGHT),
    };
  };

  const adjustPictureContainerDimension = () => {
    const dimension = adjustDialogDimension();
    const styles = dialogRef.current
      ? window.getComputedStyle(dialogRef.current)
      : undefined;
    if (dimension.width) {
      if (typeof dimension.width === "number") {
        return {
          width:
            dimension.width -
            (styles !== undefined
              ? parseInt(styles.paddingLeft) + parseInt(styles.paddingRight)
              : 0),
        };
      } else return dimension;
    }

    if (dimension.height) {
      if (typeof dimension.height === "number") {
        const cancelContainerHeight = cancelButtonContainerRef.current
          ? cancelButtonContainerRef.current.clientHeight
          : 0;
        const printContainerHeight = printButtonContainerRef.current
          ? printButtonContainerRef.current.clientHeight
          : 0;
        const paddingVertical =
          styles !== undefined
            ? parseInt(styles.paddingTop) + parseInt(styles.paddingBottom)
            : 0;
        return {
          height:
            dimension.height -
            (cancelContainerHeight + printContainerHeight + paddingVertical),
        };
      } else return dimension;
    }
  };

  const print = () => {
    if (!containerRef.current) return;
    const container = document.createElement("div");
    container.classList.add("w-full", "h-[90%]", "relative", "m-auto");
    container.style.fontSize = "1.3cqw";
    container.innerHTML = containerRef.current.innerHTML;
    const content = container.outerHTML;
    generatePdf("今月のわくわく", "landscape", content);
  };

  return createPortal(
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div
        ref={dialogRef}
        className="p-5 bg-white z-50"
        style={adjustDialogDimension()}
      >
        <div
          className={`flex flex-col ${
            deviceScreen.height < deviceScreen.width ? "h-[90vh]" : "w-[90vw]"
          }`}
        >
          <div
            ref={cancelButtonContainerRef}
            className="h-[5%] w-full flex justify-end"
          >
            <button onClick={onClose}>
              <CancelIcon width={24} height={24} color={"black"} />
            </button>
          </div>
          <div
            ref={containerRef}
            className="w-full h-full relative m-auto"
            style={{
              ...adjustPictureContainerDimension(),
              fontSize: "1.2cqw",
            }}
          >
            <div className="w-full h-full absolute top-0 left-[50%] -translate-x-[50%] z-10 pointer-events-auto">
              {errorMessage && (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-3xl font-semibold text-center text-white">
                    {errorMessage}
                  </p>
                </div>
              )}
              {!errorMessage && (
                <div className="w-full h-full flex flex-wrap">
                  <div className="w-full h-[50%] flex justify-between">
                    <div className="w-[25%] h-full m-auto p-1 relative rotate-12 flex flex-col justify-center">
                      <div className="w-full relative max-h-full">
                        <Polaroid
                          imgSrc={pictures[0]?.converted_picture}
                          disableComment={false}
                        />
                        <div className="w-[50%] absolute top-0 -translate-y-[30%] left-0 -translate-x-[25%]">
                          <Tape1 />
                        </div>
                      </div>
                    </div>
                    <div className="w-[25%] h-full m-auto p-1 relative flex flex-col justify-center">
                      <div
                        className={`w-full relative ${
                          pictures[1] ? "max-h-full" : "h-full"
                        }`}
                      >
                        <Polaroid
                          imgSrc={pictures[1]?.converted_picture || ""}
                          disableComment={false}
                        />
                        <div className="w-[50%] absolute top-0 -translate-y-[30%] left-0 -translate-x-[25%]">
                          <Tape2 />
                        </div>
                      </div>
                    </div>
                    <div className="w-[25%] h-full m-auto p-1 relative -rotate-[17deg] flex flex-col justify-center">
                      <div
                        className={`w-full relative ${
                          pictures[2] ? "max-h-full" : "h-full"
                        }`}
                      >
                        <Polaroid
                          imgSrc={pictures[2]?.converted_picture || ""}
                          disableComment={false}
                        />
                        <div className="w-[30%] absolute top-0 -translate-y-[30%] left-0 -translate-x-[25%]">
                          <Tape3 />
                        </div>
                        <div className="w-[50%] absolute top-0 -translate-y-[30%] right-0 translate-x-[25%]">
                          <Tape4 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[50%] flex justify-between">
                    <div className="w-[25%] h-full m-auto p-1 relative -rotate-12 flex flex-col justify-center">
                      <div
                        className={`w-full relative ${
                          pictures[3] ? "max-h-full" : "h-full"
                        }`}
                      >
                        <Polaroid
                          imgSrc={pictures[3]?.converted_picture || ""}
                          disableComment={false}
                        />
                        <div className="w-[30%] absolute top-0 -translate-y-[30%] left-[50%] -translate-x-[50%]">
                          <Tape5 />
                        </div>
                      </div>
                    </div>
                    <div className="w-[25%] h-full m-auto p-1 relative flex flex-col justify-center">
                      <div
                        className={`w-full relative ${
                          pictures[4] ? "max-h-full" : "h-full"
                        }`}
                      >
                        <Polaroid
                          imgSrc={pictures[4]?.converted_picture || ""}
                          disableComment={false}
                        />
                        <div className="w-[30%] absolute top-0 -translate-y-[30%] left-0 -translate-x-[25%]">
                          <Tape6 />
                        </div>
                        <div className="w-[40%] absolute top-0 -translate-y-[30%] right-0 translate-x-[25%]">
                          <Tape7 />
                        </div>
                      </div>
                    </div>
                    <div className="w-[25%] h-full m-auto p-1 relative rotate-12 flex flex-col justify-center">
                      <div
                        className={`w-full relative ${
                          pictures[5] ? "max-h-full" : "h-full"
                        }`}
                      >
                        <Polaroid
                          imgSrc={pictures[5]?.converted_picture || ""}
                          disableComment={false}
                        />
                        <div className="w-[50%] absolute top-0 -translate-y-[40%] left-[50%] -translate-x-[50%] -rotate-12">
                          <Tape8 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            ref={printButtonContainerRef}
            className="h-[5%] w-full flex justify-end space-x-3"
          >
            <button
              className="h-fit bg-[#499F9940] text-primary font-semibold p-2 rounded-md flex space-x-2"
              onClick={print}
            >
              <p>{t("_home._print")}</p>
              <PrintIcon width={24} height={24} color={"#499F99"} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default MonthlyPicturesDialog;
