import type { Column } from "./table";

interface TableBodyProps {
  columns: Column[];
  data: any[];
  rowSizeClass: string;
  striped: boolean;
  onRowClick?: (row: any) => void;
}

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
