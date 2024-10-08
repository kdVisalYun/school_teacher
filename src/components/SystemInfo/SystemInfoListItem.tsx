import React from "react";
import { format } from "date-fns";

import AccordionItem from "components/__reusable/AccordionItem";

interface SystemInfoListItemProps {
  title: string;
  startDate: Date;
  memo: string;
}

const SystemInfoListItem: React.FC<SystemInfoListItemProps> = ({
  title,
  startDate,
  memo,
}) => {
  return (
    <AccordionItem
      titleElement={
        <div className="w-full lg:flex text-lg lg:space-x-3">
          <p className="w-[10%] text-primary">
            {format(new Date(startDate), "yyyy.MM.dd")}
          </p>
          <p className="flex-1 font-semibold text-xl">{title}</p>
        </div>
      }
      contentElement={
        <pre className="p-2 bg-[#fdf1f3] text-lg text-[#707070]">{memo}</pre>
      }
    />
  );
};

export default SystemInfoListItem;
