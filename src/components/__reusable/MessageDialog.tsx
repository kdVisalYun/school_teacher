import React from "react";
import { createPortal } from "react-dom";

interface MessageDialogProps {
  children: React.ReactNode;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ children }) => {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[99]">
      <div className="w-[90%] lg:w-1/2 p-5 bg-white z-[100]">{children}</div>
    </div>,
    document.querySelector("#dialog")!
  );
};

export default MessageDialog;
