import Table, { Column } from "@/component/common/table/table";
import Pagination from "@/component/common/pagination";
import SelectBox from "@/component/common/form/selectBox";
import InputBox from "@/component/common/form/inputbox";
import { useState } from "react";
import Calendar, { RangeValue } from "@/component/common/form/calendar";

const columns: Column[] = [
  { key: "name", header: "이름" },
  { key: "age", header: "나이" },
  { key: "job", header: "직업" },
];

const data: any[] = [{ name: "홍길동", age: 25, job: "개발자" }];

const AdminMain = () => {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<RangeValue>({
    start: null,
    end: null,
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-4">
        <Calendar value={range} onChange={(val) => setRange(val)} />

        <SelectBox
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
        />
        <InputBox
          placeholder="Search"
          value={search}
          onChange={(val) => setSearch(val)}
        />
      </div>

      <Table columns={columns} data={data} />

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <Pagination
          page={1}
          total={data.length}
          pageSize={5}
          onChange={(page) => {
            console.log(page);
          }}
        />
      </div>
    </div>
  );
};

export default AdminMain;
