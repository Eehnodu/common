import { useState } from "react";
import Datepicker from "@/component/common/datepicker";

type Range = {
  start: Date | null;
  end: Date | null;
};

const formatDate = (date: Date | null) => {
  if (!date) return "yyyy-mm-dd";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const DatepickerPage = () => {
  const [rangeDefault, setRangeDefault] = useState<Range>({
    start: null,
    end: null,
  });

  const [rangeTop, setRangeTop] = useState<Range>({
    start: null,
    end: null,
  });

  const [rangeLeft, setRangeLeft] = useState<Range>({
    start: null,
    end: null,
  });

  const [rangeRight, setRangeRight] = useState<Range>({
    start: null,
    end: null,
  });

  // 사이즈별 데모용 range
  const [rangeSm, setRangeSm] = useState<Range>({
    start: null,
    end: null,
  });
  const [rangeMd, setRangeMd] = useState<Range>({
    start: null,
    end: null,
  });
  const [rangeLg, setRangeLg] = useState<Range>({
    start: null,
    end: null,
  });

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">날짜 범위 선택 (Range)</h1>

      {/* 기본(bottom) */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">기본 Range Datepicker</h2>
        <p className="text-sm text-gray-600 text-center">
          하나의 컴포넌트에서 시작일과 종료일을 한 번에 선택합니다.
        </p>

        <div className="flex items-center gap-4">
          <Datepicker
            value={rangeDefault}
            onChange={(val) => setRangeDefault(val)}
          />

          <div className="text-sm text-gray-700 whitespace-nowrap">
            {`${formatDate(rangeDefault.start)} ~ ${formatDate(
              rangeDefault.end
            )}`}
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-20 items-center justify-center">
        {/* 팝업 위치별 예시 */}
        <section className="flex flex-col gap-3 items-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-semibold">팝업 위치(position) 예시</h2>
          <p className="text-sm text-gray-600 text-center">
            position prop으로 캘린더가 열리는 방향을 지정할 수 있습니다.
          </p>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-6 max-w-xl">
              {/* TOP */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-700">position="top"</span>
                <Datepicker
                  position="top"
                  value={rangeTop}
                  onChange={(val) => setRangeTop(val)}
                />
              </div>

              {/* BOTTOM */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-700">position="bottom"</span>
                <Datepicker
                  position="bottom"
                  value={rangeDefault}
                  onChange={(val) => setRangeDefault(val)}
                />
              </div>

              {/* LEFT */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-700">position="left"</span>
                <Datepicker
                  position="left"
                  value={rangeLeft}
                  onChange={(val) => setRangeLeft(val)}
                />
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-700">position="right"</span>
                <Datepicker
                  position="right"
                  value={rangeRight}
                  onChange={(val) => setRangeRight(val)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 사이즈 예시 */}
        <section className="flex flex-col gap-3 items-center border border-gray-400 rounded-md p-7">
          <h2 className="text-xl font-semibold">사이즈(size) 예시</h2>
          <p className="text-sm text-gray-600 text-center">
            size prop으로 Datepicker의 높이와 캘린더 크기를 조절할 수 있습니다.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-10 text-sm text-gray-700">SM</span>
              <Datepicker
                size="sm"
                value={rangeSm}
                onChange={(val) => setRangeSm(val)}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 text-sm text-gray-700">MD</span>
              <Datepicker
                size="md"
                value={rangeMd}
                onChange={(val) => setRangeMd(val)}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 text-sm text-gray-700">LG</span>
              <Datepicker
                size="lg"
                value={rangeLg}
                onChange={(val) => setRangeLg(val)}
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DatepickerPage;
