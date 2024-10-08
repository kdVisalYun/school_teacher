import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import CancelIcon from "assets/icons/CancelIcon";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";

interface PictureCropDialogProp {
  picture: string;
  onSave: (blob: Blob) => void;
  onClose: () => void;
}

const PictureCropDialog: React.FC<PictureCropDialogProp> = ({
  picture,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const cropRef = useRef<ReactCrop>(null);
  const [cropConfig, setCropConfig] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });

  const cropMaskRef = useRef(null);
  const renderCropCircleUI = () => {
    if (!cropRef.current) return;
    const circle = document.querySelector(
      ".ReactCrop__crop-mask defs mask ellipse"
    );
    if (!circle) return;
    const radiusYAttr = circle.getAttribute("ry")?.split("px")[0];
    if (isNaN(parseInt(radiusYAttr || ""))) return;
    const radiusY = parseInt(radiusYAttr || "");
    const cropAreaHeight = Math.round(cropConfig.height);
    const height = cropAreaHeight - 2 * (radiusY / 4);
    const halfWidth = Math.sqrt(Math.pow(radiusY, 2) - Math.pow(height / 2, 2));
    return (
      <div
        ref={cropMaskRef}
        style={{
          width: `${halfWidth * 2}px`,
          height: `${height}px`,
          margin: `${radiusY / 4}px auto`,
          borderBottom: "3px solid #e6b941",
          borderTop: "3px solid #e6b941",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#e6b941",
            position: "absolute",
            left: `${halfWidth * 2.1}px`,
            top: "-10px",
            width: "100%",
          }}
        >
          {t("_student_form._head")}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#e6b941",
            position: "absolute",
            left: `${halfWidth * 2.1}px`,
            bottom: "-10px",
            width: "100%",
          }}
        >
          {t("_student_form._chin")}
        </div>
      </div>
    );
  };

  const adjustCropCircle = () => {
    if (!cropRef.current) return;
    if (!cropRef.current.componentRef.current) return;
    const width = cropRef.current.componentRef.current.offsetWidth;
    const height = cropRef.current.componentRef.current.offsetHeight;
    const xPosition = width / 2 - 100;
    const yPosition = height / 2 - 100;
    setCropConfig({ ...cropConfig, x: xPosition, y: yPosition });
    const addOnMask = document.querySelector(".ReactCrop__selection-addon");
    if (!addOnMask) return;
    addOnMask.classList.add("pointer-events-none");
  };

  const imageRef = useRef<HTMLImageElement>(null);
  const getCroppedImage = () => {
    if (!imageRef.current) return;
    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      imageRef.current,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      onSave(blob);
    });
  };

  return createPortal(
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="w-[90%] bg-white z-50">
        <div className="h-screen flex justify-between space-x-2">
          <div className="w-3/4 bg-[#fcfcfc] flex flex-col justify-center border-e border-e-[#eee]">
            <h2 className="text-2xl font-semibold text-center mt-5">
              {t("_student_form._crop_guideline")}
            </h2>
            <div className="max-w-full max-h-full m-auto">
              <ReactCrop
                ref={cropRef}
                crop={cropConfig}
                onChange={(c) => setCropConfig(c)}
                aspect={1}
                circularCrop={true}
                keepSelection={true}
                renderSelectionAddon={() => renderCropCircleUI()}
              >
                <img
                  ref={imageRef}
                  className="m-auto"
                  style={{ maxHeight: "75vh" }}
                  src={picture}
                  alt="Preview"
                  onLoad={() => adjustCropCircle()}
                />
              </ReactCrop>
            </div>
          </div>
          <div className="w-1/4 py-2 pe-2 space-y-5">
            <div className="flex justify-end">
              <button type="button" onClick={onClose}>
                <CancelIcon width={32} height={32} color={"black"} />
              </button>
            </div>
            <PrimaryActionButton
              label={t("_student_form._save")}
              onClick={getCroppedImage}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("dialog")!
  );
};

export default PictureCropDialog;
