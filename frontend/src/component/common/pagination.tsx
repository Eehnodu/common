import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationSize = "sm" | "md";

interface Props {
  page: number; // 1-based
  totalPages: number;
  onChange: (page: number) => void;
  visibleCount?: number; // ✅ 한 번에 몇 개씩 보여줄지
  size?: PaginationSize;
  className?: string;
}

const Pagination = ({
  page,
  totalPages,
  onChange,
  visibleCount = 5,
  size = "md",
  className = "",
}: Props) => {
  if (totalPages <= 0) return null;

  const count = Math.max(1, Math.min(visibleCount, totalPages));

  // 안전하게 범위 안으로 보정
  const currentPage = Math.min(Math.max(1, page), totalPages);

  // 현재 페이지가 속한 "묶음"의 시작/끝
  const start = Math.floor((currentPage - 1) / count) * count + 1;
  const end = Math.min(totalPages, start + count - 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base =
    "inline-flex items-center justify-center rounded-md border text-sm transition";
  const sizeClass = size === "sm" ? "h-7 min-w-7 px-1" : "h-8 min-w-8 px-2";
  const normal = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";
  const active = "!bg-main-active !text-white !border-main-active";
  const disabled = "opacity-40 pointer-events-none cursor-default";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const handlePrevGroup = () => {
    if (start === 1) return;
    const newPage = start - 1; // ✅ 이전 묶음의 "마지막" 페이지
    onChange(newPage);
  };

  const handleNextGroup = () => {
    if (end === totalPages) return;
    const newPage = Math.min(totalPages, start + count); // ✅ 다음 묶음의 "첫" 페이지
    onChange(newPage);
  };

  const handleClickPage = (p: number) => {
    if (p === currentPage) return;
    onChange(p);
  };

  return (
    <nav
      className={`flex items-center gap-2 select-none ${className}`}
      aria-label="Pagination"
    >
      {/* 이전 묶음 */}
      <button
        type="button"
        className={`${base} ${sizeClass} ${normal} ${
          start === 1 ? disabled : ""
        }`}
        onClick={handlePrevGroup}
        aria-label="Previous pages group"
        disabled={start === 1}
      >
        <ChevronLeft className={iconSize} />
      </button>

      {/* 현재 묶음 페이지들 */}
      {pages.map((p) => {
        const isActive = p === currentPage;

        return (
          <button
            key={p}
            type="button"
            onClick={() => handleClickPage(p)}
            aria-current={isActive ? "page" : undefined}
            className={`${base} ${sizeClass} ${isActive ? active : normal}`}
          >
            {p}
          </button>
        );
      })}

      {/* 다음 묶음 */}
      <button
        type="button"
        className={`${base} ${sizeClass} ${normal} ${
          end === totalPages ? disabled : ""
        }`}
        onClick={handleNextGroup}
        aria-label="Next pages group"
        disabled={end === totalPages}
      >
        <ChevronRight className={iconSize} />
      </button>
    </nav>
  );
};

export default Pagination;
