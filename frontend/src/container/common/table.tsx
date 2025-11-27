// tablePage.tsx
import Table, { Column } from "@/component/common/table/table";

interface RowData {
  name: string;
  age: number;
  job: string;
}

const baseColumns: Column[] = [
  {
    key: "name",
    header: "이름",
    width: "30%",
    align: "center",
  },
  {
    key: "age",
    header: "나이",
    width: "15%",
    align: "center",
  },
  {
    key: "job",
    header: "직업",
    width: "35%",
    align: "center",
  },
];

const rows: RowData[] = [
  { name: "홍길동", age: 25, job: "개발자" },
  { name: "김영희", age: 32, job: "디자이너" },
  { name: "박철수", age: 29, job: "PM" },
];

const TablePage = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">Table 모음</h1>

      <section className="flex flex-col gap-3 mx-40 border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">기본 테이블</h2>
        <Table columns={baseColumns} data={rows} />
      </section>

      <section className="flex flex-col gap-3 mx-40 border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈별</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-1 text-sm text-gray-700">size="sm"</div>
            <Table columns={baseColumns} data={rows} size="sm" />
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-700">size="md"</div>
            <Table columns={baseColumns} data={rows} size="md" />
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-700">size="lg"</div>
            <Table columns={baseColumns} data={rows} size="lg" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 mx-40 border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Zebra</h2>
        <p className="text-xs text-gray-600">
          행을 클릭하면 콘솔에 해당 행 데이터가 출력됩니다.
        </p>
        <Table
          columns={baseColumns}
          data={rows}
          striped
          onRowClick={(row) => {
            // eslint-disable-next-line no-console
            console.log("row clicked:", row);
          }}
        />
      </section>
    </div>
  );
};

export default TablePage;
