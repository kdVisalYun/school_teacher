import React from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onChangePage,
}) => {
  const { t } = useTranslation();

  const calculateStartIndex = () => {
    if (!totalItems) return 0;
    return Math.max(0, currentPage * pageSize + 1);
  };

  const calculateEndIndex = () => {
    const expectedEndIndex = (currentPage + 1) * pageSize;
    return Math.min(totalItems, expectedEndIndex);
  };

  const calculatePageCount = () => {
    const pageCount = totalItems / pageSize;
    return Math.max(pageCount, 1);
  };

  return (
    <div className="space-y-1 lg:flex lg:justify-between lg:items-center">
      <p>
        {t("_published_picture._showing_result", {
          total: totalItems,
          start: calculateStartIndex(),
          end: calculateEndIndex(),
        })}
      </p>
      <ReactPaginate
        pageCount={calculatePageCount()}
        pageRangeDisplayed={1}
        breakLabel="..."
        previousLabel={`< ${t("_published_picture._back_page")}`}
        previousClassName="p-2 bg-white border border-primary rounded font-regular text-[12px] flex items-center space-x-1"
        nextLabel={`${t("_published_picture._next_page")} >`}
        nextClassName="p-2 bg-white border border-primary rounded font-regular text-[12px] flex items-center space-x-1"
        className="flex items-center space-x-1"
        pageClassName="px-3 py-2 bg-white border border-primary rounded font-regular text-[12px]"
        activeClassName="text-primary"
        onPageChange={(e) => onChangePage(e.selected)}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination;
