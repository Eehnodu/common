import type { Column } from "./table";

interface TableHeaderProps {
  columns: Column[];
  rowSizeClass: string;
}

const TableHeader = ({ columns, rowSizeClass }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-100 border-b border-gray-300">
      <tr className={rowSizeClass}>
        {columns.map((col) => {
          const alignClass =
            col.align === "center"
              ? "text-center"
              : col.align === "right"
                ? "text-right"
                : "text-left";

          return (
            <th
              key={col.key}
              className={`
                px-3 py-2 font-medium text-gray-700
                border-b border-gray-200
                ${alignClass}
              `}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
