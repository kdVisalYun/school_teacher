import React from "react";

import UploadPhotoIcon from "assets/icons/UploadPhotoIcon";

interface FileInputProps {
  label: string;
  buttonLabel: string;
  multipleSelect?: boolean;
  acceptType?: string;
  onUpload: (files: FileList | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  buttonLabel,
  multipleSelect = false,
  acceptType = "",
  onUpload,
}) => {
  return (
    <div className="w-full bg-[#F4F4F4] px-3 py-2 flex flex-row justify-between items-center space-x-2 rounded-md">
      <div className="p-1 border-2 border-[#A0A0A0] border-dashed rounded-lg">
        <UploadPhotoIcon width={32} height={32} color={"#767676"} />
      </div>
      <p className="flex-1 text-sm lg:text-base">{label}</p>
      <label htmlFor="upload" className="cursor-pointer">
        <div
          className={
            "block p-2 rounded-md text-base text-primary border border-primary cursor-pointer"
          }
        >
          {buttonLabel}
        </div>
        <input
          type="file"
          multiple={multipleSelect}
          accept={acceptType}
          id="upload"
          style={{ display: "none" }}
          onChange={(e) => onUpload(e.target.files)}
          onClick={(e: any) => (e.target.value = null)}
        ></input>
      </label>
    </div>
  );
};

export default FileInput;
