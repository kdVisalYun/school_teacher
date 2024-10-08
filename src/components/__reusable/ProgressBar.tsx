import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-[#D9D9D9] rounded-lg relative">
      <div
        style={{ width: `${progress}%` }}
        className={`h-2 ${
          progress < 100 ? "bg-[#595657]" : "bg-primary"
        } rounded-lg absolute transition-all ease-out duration-1000`}
      ></div>
    </div>
  );
};

export default ProgressBar;
