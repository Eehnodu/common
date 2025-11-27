import type { Column } from "./table";

/**
 * TableBody 컴포넌트 Props
 *
 * @property columns       테이블 컬럼 정보 배열
 * @property data          렌더링할 실제 데이터 배열
 * @property rowSizeClass  테이블 행 높이/텍스트 크기 클래스 (Table 컴포넌트에서 계산해 전달)
 * @property striped       줄무늬(지브라) 스타일 적용 여부
 * @property onRowClick    각 행 클릭 시 호출되는 콜백
 */
interface TableBodyProps {
  columns: Column[];
  data: any[];
  rowSizeClass: string;
  striped: boolean;
  onRowClick?: (row: any) => void;
}

/**
 * TableBody 컴포넌트
 *
 * - 컬럼 정의(columns)에 따라 각 셀을 렌더링
 * - render 속성이 있는 경우 커스텀 렌더링 적용
 * - striped 옵션이 true면 홀수 행에 배경색 적용
 * - onRowClick이 전달되면 각 행 클릭 가능
 * - 데이터가 없을 경우 “데이터가 없습니다.” 메시지 출력
 *
 * @example 기본 사용
 * ```tsx
 * <TableBody
 *   columns={columns}
 *   data={rows}
 *   rowSizeClass="text-sm h-10"
 *   striped
 * />
 * ```
 */
const TableBody = ({
  columns,
  data,
  rowSizeClass,
  striped,
  onRowClick,
}: TableBodyProps) => {
  return (
    <tbody>
      {data.map((row, index) => {
        const stripedClass = striped && index % 2 === 1 ? "bg-gray-50" : "";

        return (
          <tr
            key={index}
            className={`${rowSizeClass} ${stripedClass}`}
            onClick={() => {
              if (onRowClick) onRowClick(row);
            }}
          >
            {columns.map((col) => {
              const alignClass =
                col.align === "center"
                  ? "text-center"
                  : col.align === "right"
                    ? "text-right"
                    : "text-left";

              return (
                <td
                  key={col.key}
                  className={`
                    px-3 py-2 border-b border-gray-200
                    ${alignClass}
                  `}
                >
                  {col.render ? col.render(row) : ((row as any)[col.key] ?? "")}
                </td>
              );
            })}
          </tr>
        );
      })}

      {/* 데이터 없음 표시 */}
      {data.length === 0 && (
        <tr>
          <td
            colSpan={columns.length}
            className="px-3 py-4 text-center text-xs text-gray-500 border-b border-gray-200"
          >
            데이터가 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
