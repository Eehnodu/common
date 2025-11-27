import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination 컴포넌트 크기 타입
 */
type PaginationSize = "sm" | "md";

/**
 * Pagination 컴포넌트 Props
 *
 * @property page          현재 페이지 번호 (1-based)
 * @property totalPages    전체 페이지 수
 * @property onChange      페이지 변경 시 호출되는 콜백
 * @property visibleCount  한 번에 보여줄 페이지 버튼 개수 (기본 5)
 * @property size          버튼 크기 (sm / md)
 * @property className     외부 래퍼 커스텀 클래스
 */
interface Props {
  page: number; // 1-based
  totalPages: number;
  onChange: (page: number) => void;
  visibleCount?: number;
  size?: PaginationSize;
  className?: string;
}

/**
 * 범위 기반 Pagination 컴포넌트
 *
 * - 페이지를 일정 묶음(visibleCount) 단위로 나누어 보여줌
 * - Prev / Next 버튼은 묶음(그룹) 단위 이동
 * - 현재 페이지 강조 표시
 *
 * @example 기본 사용
 * ```tsx
 * <Pagination
 *   page={page}
 *   totalPages={20}
 *   onChange={(p) => setPage(p)}
 * />
 * ```
 *
 * @example 3개씩 보여주기
 * ```tsx
 * <Pagination visibleCount={3} />
 * ```
 *
 * @example 작은 사이즈
 * ```tsx
 * <Pagination size="sm" />
 * ```
 */
const Pagination = ({
  page,
  totalPages,
  onChange,
  visibleCount = 5,
  size = "md",
  className = "",
}: Props) => {
  // totalPages가 0 이하라면 Pagination 표시할 필요 없음
  if (totalPages <= 0) return null;

  /**
   * 실제 보여줄 페이지 버튼 수
   * - visibleCount보다 totalPages가 더 작은 경우 totalPages로 조정
   */
  const count = Math.max(1, Math.min(visibleCount, totalPages));

  /** 안전하게 범위(1~totalPages) 안으로 보정된 현재 페이지 */
  const currentPage = Math.min(Math.max(1, page), totalPages);

  /**
   * 현재 페이지가 속한 묶음(group)의 시작/끝 계산
   * 예: 1~5, 6~10, 11~15 ...
   */
  const start = Math.floor((currentPage - 1) / count) * count + 1;
  const end = Math.min(totalPages, start + count - 1);

  /** 현재 묶음에 표시할 페이지 번호 배열 */
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base =
    "inline-flex items-center justify-center rounded-md border text-sm transition";
  const sizeClass = size === "sm" ? "h-7 min-w-7 px-1" : "h-8 min-w-8 px-2";
  const normal = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";
  const active = "!bg-main-active !text-white !border-main-active";
  const disabled = "opacity-40 pointer-events-none cursor-default";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  /**
   * 이전 묶음으로 이동
   * - 현재 그룹의 첫 페이지(start) 기준으로 이전 묶음 이동
   */
  const handlePrevGroup = () => {
    if (start === 1) return;
    onChange(start - 1);
  };

  /**
   * 다음 묶음으로 이동
   * - 다음 묶음의 첫 페이지로 이동
   */
  const handleNextGroup = () => {
    if (end === totalPages) return;
    onChange(Math.min(totalPages, start + count));
  };

  /** 특정 페이지로 이동 */
  const handleClickPage = (p: number) => {
    if (p !== currentPage) {
      onChange(p);
    }
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
