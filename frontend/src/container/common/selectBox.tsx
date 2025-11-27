import { useState } from "react";
import SelectBox from "@/component/common/form/selectBox";

const options = [
  { label: "옵션 1", value: "1" },
  { label: "옵션 2", value: "2" },
  { label: "옵션 3", value: "3" },
];

const SelectBoxPage = () => {
  const [valueSm, setValueSm] = useState<string | number | null>(null);
  const [valueMd, setValueMd] = useState<string | number | null>(null);
  const [valueLg, setValueLg] = useState<string | number | null>(null);

  const [posTop, setPosTop] = useState<string | number | null>(null);
  const [posBottom, setPosBottom] = useState<string | number | null>(null);

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">SelectBox</h1>

      {/* size */}
      <section className="flex w-96 mx-auto flex-col items-center gap-4 border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Size</h2>

        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-10 text-sm text-gray-700">SM</span>
            <SelectBox
              size="sm"
              options={options}
              value={valueSm}
              onChange={setValueSm}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-10 text-sm text-gray-700">MD</span>
            <SelectBox
              size="md"
              options={options}
              value={valueMd}
              onChange={setValueMd}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-10 text-sm text-gray-700">LG</span>
            <SelectBox
              size="lg"
              options={options}
              value={valueLg}
              onChange={setValueLg}
            />
          </div>
        </div>
      </section>

      {/* position */}
      <section className="flex w-96 mx-auto flex-col items-center gap-4 border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Position</h2>

        <div className="flex w-full gap-6">
          <div className="flex w-full flex-col gap-2 items-center justify-center">
            <span className="text-sm text-gray-700">position="top"</span>
            <SelectBox
              position="top"
              options={options}
              value={posTop}
              onChange={setPosTop}
            />
          </div>

          <div className="flex w-full flex-col gap-2 items-center justify-center">
            <span className="text-sm text-gray-700">position="bottom"</span>
            <SelectBox
              position="bottom"
              options={options}
              value={posBottom}
              onChange={setPosBottom}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectBoxPage;
