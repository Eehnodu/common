import Table, { Column } from "@/component/common/table/table";
import Pagination from "@/component/common/pagination";
import SelectBox from "@/component/common/form/selectBox";
import InputBox from "@/component/common/form/inputbox";
import { useState } from "react";
import Calendar, { RangeValue } from "@/component/common/form/calendar";
import { CalendarIcon, Search } from "lucide-react";

const columns: Column[] = [
  { key: "name", header: "이름", align: "center" },
  { key: "age", header: "나이", align: "center" },
  { key: "job", header: "직업", align: "center" },
];

const data: any[] = [{ name: "홍길동", age: 25, job: "개발자" }];

const AdminMain = () => {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<RangeValue>({
    start: null,
    end: null,
  });

  return (
    <div className="relative flex w-full h-full px-20 py-10 flex-col gap-4 overflow-hidden">
      <div className="flex w-1/3 justify-end gap-4 ml-auto">
        <Calendar
          showIcon={true}
          value={range}
          onChange={(val) => setRange(val)}
        />
        <SelectBox
          placeholder="원하는 값을 선택해주세요."
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
          ]}
        />
        <InputBox
          leftIcon={<Search className="w-4 h-4" />}
          placeholder="Search"
          value={search}
          onChange={(val) => setSearch(val)}
        />
      </div>

      <Table columns={columns} data={data} size="sm" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
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
