import React from "react";
import BackIcon from "assets/icons/BackIcon";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-fit p-2 rounded-full bg-white drop-shadow-[2px_2px_6px_rgba(0,0,0,0.1)]"
      onClick={() => {
        onClick && onClick();
        window.history.back();
      }}
    >
      <BackIcon width={32} height={32} color={"#000000"} />
    </button>
  );
};

export default BackButton;
