import { useState } from "react";
import Pagination from "@/component/common/pagination";

const PaginationPage = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">페이지네이션</h1>

      {/* 기본(Default) */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">기본(Default)</h2>
        <div className="flex items-center gap-4">
          <Pagination
            page={page1}
            totalPages={10}
            onChange={(p) => setPage1(p)}
          />
        </div>
      </section>

      {/* 사이즈별 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈별</h2>

        <div className="flex flex-col gap-4 items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-base text-black">SM</span>
            <Pagination
              size="sm"
              page={page2}
              totalPages={10}
              onChange={(p) => setPage2(p)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-base text-black">MD</span>
            <Pagination
              size="md"
              page={page3}
              totalPages={10}
              onChange={(p) => setPage3(p)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginationPage;
