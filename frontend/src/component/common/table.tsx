type Size = "sm" | "md" | "lg";

type Align = "left" | "center" | "right";

export interface Column {
  key: string;
  header: string;
  width?: string;
  align?: Align;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  size?: Size;
  striped?: boolean;
  className?: string;
  onRowClick?: (row: any) => void;
}

const sizeStyles = {
  sm: "text-xs h-8",
  md: "text-sm h-10",
  lg: "text-base h-12",
};

const Table = ({
  columns,
  data,
  size = "md",
  striped = false,
  className = "",
  onRowClick,
}: TableProps) => {
  const rowSizeClass = sizeStyles[size];

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse rounded-md overflow-hidden">
        {/* 헤더 */}
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr className={rowSizeClass}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-3 py-2 font-medium text-gray-700
                  border-b border-gray-200
                  ${getAlignClass(col.align)}
                `}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* 바디 */}
        <tbody>
          {data.map((row, index) => {
            const stripedClass = striped && index % 2 === 1 ? "bg-gray-50" : "";

            const clickableClass = onRowClick
              ? "cursor-pointer hover:bg-main/10"
              : "hover:bg-main/10";

            return (
              <tr
                key={index}
                className={`${rowSizeClass} ${stripedClass} ${clickableClass}`}
                onClick={() => {
                  if (onRowClick) onRowClick(row);
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-3 py-2 border-b border-gray-200
                      ${getAlignClass(col.align)}
                    `}
                  >
                    {col.render
                      ? col.render(row)
                      : ((row as any)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}

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
      </table>
    </div>
  );
};

const getAlignClass = (align?: Align) => {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
};

export default Table;
