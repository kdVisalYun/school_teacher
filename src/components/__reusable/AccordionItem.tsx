import { useRef, useState, useEffect, ReactNode, FC } from "react";
import ReactDOM from "react-dom/client";

interface AccordionItemProp {
  titleElement: ReactNode;
  contentElement: ReactNode;
}

const AccordionItem: FC<AccordionItemProp> = ({
  titleElement,
  contentElement,
}) => {
  const parentsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const getContentHeight = () => {
    const content = document.createElement("div");
    const rootContent = ReactDOM.createRoot(content);
    rootContent.render(contentElement);
    setTimeout(() => {
      if (!parentsRef.current) return;
      parentsRef.current.append(content);
      setContentHeight(content.scrollHeight);
      parentsRef.current.removeChild(content);
    }, 0);
  };
  useEffect(() => {
    getContentHeight();
  }, [parentsRef.current]);

  return (
    <div
      ref={parentsRef}
      role="button"
      className="w-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center p-2 border-b border-b-[#f3f3f3]">
        {titleElement}
        <button
          className={`w-10 h-10 bg-[#f3f3f3] p-2 rounded-full text-primary font-bold ${
            isOpen ? "-rotate-45" : "rotate-0"
          } transition-transform ease-linear duration-200`}
        >
          +
        </button>
      </div>
      <div
        className="transition-[height] ease-linear duration-200"
        style={{ height: isOpen ? contentHeight : 0 }}
      >
        <div
          className={`transition-opacity ease-linear duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {contentElement}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
