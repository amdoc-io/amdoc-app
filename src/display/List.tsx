import { ReactNode, useState } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { TfiReload } from "react-icons/tfi";

interface ListProps<T> {
  className?: string;
  header?: ReactNode;
  render?: (row: T) => ReactNode;
  emptyText?: ReactNode;
  data?: T[];
  grid?: string;
  loading?: boolean;
  onPageChange?: (value: number) => void;
  totalPages?: number;
}

export const List = <T,>(props: ListProps<T>) => {
  const {
    className = "",
    render = () => null,
    header,
    emptyText = "No data",
    grid = "grid-cols-1",
    data = [],
    onPageChange = () => {},
    totalPages = 1,
    loading = false,
  } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let left = Math.max(2, currentPage - 1);
      let right = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage === 1) {
        right = currentPage + 2;
      } else if (currentPage === totalPages) {
        left = currentPage - 2;
      }

      if (left > 2) {
        pageNumbers.push("...");
      }

      for (let i = left; i <= right; i++) {
        pageNumbers.push(i);
      }

      if (right < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <div
          className={`p-4 gap-4 xl:gap-12 bg-gray-100/80 font-medium grid ${grid}`}
        >
          {header}
        </div>
        {!loading && data.length === 0 && (
          <div className="p-8 text-center text-description border-t border-gray-300 flex justify-center items-center">
            {emptyText}
          </div>
        )}
        {loading && (
          <div className="p-8 text-center text-description border-t border-gray-300 flex justify-center items-center">
            <div className="text-[20px] animate-spin">
              <TfiReload />
            </div>
          </div>
        )}
        {!loading && (
          <ul>
            {data.map((item, i) => (
              <li
                key={i}
                className={`p-4 gap-4 xl:gap-12 border-t border-gray-300 grid ${grid}`}
              >
                {render(item)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex font-medium justify-center">
        <div className="flex items-center gap-4">
          <div
            className={`text-[20px] ${
              currentPage === 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={handlePreviousPage}
          >
            <RxChevronLeft />
          </div>
          {renderPageNumbers().map((pageNumber, index) => (
            <div
              key={index}
              className={`transition-all duration-300 h-8 w-8 flex justify-center items-center rounded-md cursor-pointer ${
                currentPage === pageNumber
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white hover:bg-gray-200/50"
              }`}
              onClick={() => {
                if (typeof pageNumber === "number") {
                  setCurrentPage(pageNumber);
                  onPageChange(pageNumber);
                }
              }}
            >
              {pageNumber}
            </div>
          ))}
          <div
            className={`text-[20px] ${
              currentPage === totalPages
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={handleNextPage}
          >
            <RxChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};
