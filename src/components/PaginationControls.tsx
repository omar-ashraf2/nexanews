import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { useMemo } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalResults: number;
  combinedPageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}
const MAX_UI_PAGES = 100;

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalResults,
  combinedPageSize,
  onPageChange,
  disabled,
}) => {
  const totalPages = useMemo(() => {
    if (!totalResults) return 1;
    const computedTotal = Math.ceil(totalResults / combinedPageSize);
    return Math.min(computedTotal, MAX_UI_PAGES);
  }, [totalResults, combinedPageSize]);

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  if (totalPages <= 1) return null;

  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={goToPrevPage}
            disabled={currentPage === 1 || disabled}
          />
        </PaginationItem>

        {paginationRange.map((item, idx) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => onPageChange(item)}
                isActive={item === currentPage}
                disabled={disabled}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={goToNextPage}
            disabled={currentPage === totalPages || disabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
