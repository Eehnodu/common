import { useState } from "react";
import Checkbox from "@/component/common/form/checkbox";

const CheckboxPage = () => {
  const [sm, setSm] = useState(false);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(false);

  const [all, setAll] = useState(false);
  const [opt1, setOpt1] = useState(false);
  const [opt2, setOpt2] = useState(false);

  const handleAllChange = (checked: boolean) => {
    setAll(checked);
    setOpt1(checked);
    setOpt2(checked);
  };

  const handleOpt1Change = (checked: boolean) => {
    setOpt1(checked);
    const nextAll = checked && opt2;
    setAll(nextAll);
  };

  const handleOpt2Change = (checked: boolean) => {
    setOpt2(checked);
    const nextAll = checked && opt1;
    setAll(nextAll);
  };

  return (
    <div className="p-6 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold text-center">Checkbox</h1>

      {/* 사이즈별 */}
      <section className="flex flex-col gap-6 items-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈별</h2>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">SM</span>
            <Checkbox
              size="sm"
              label="Small Checkbox"
              checked={sm}
              onChange={setSm}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">MD</span>
            <Checkbox
              size="md"
              label="Medium Checkbox"
              checked={md}
              onChange={setMd}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">LG</span>
            <Checkbox
              size="lg"
              label="Large Checkbox"
              checked={lg}
              onChange={setLg}
            />
          </div>
        </div>
      </section>

      {/* 전체 선택 예시 */}
      <section className="flex flex-col gap-4 items-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">전체 선택 예시</h2>

        <div className="flex flex-col gap-2 w-full">
          <Checkbox
            size="md"
            label="전체 선택"
            checked={all}
            onChange={handleAllChange}
          />

          <div className="pl-5 flex flex-col gap-1">
            <Checkbox
              size="md"
              label="옵션 1"
              checked={opt1}
              onChange={handleOpt1Change}
            />
            <Checkbox
              size="md"
              label="옵션 2"
              checked={opt2}
              onChange={handleOpt2Change}
            />
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4 items-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">비활성</h2>

        <div className="flex gap-4 items-center">
          <Checkbox size="md" label="Disabled (off)" checked={false} disabled />
          <Checkbox size="md" label="Disabled (on)" checked={true} disabled />
        </div>
      </section>
    </div>
  );
};

export default CheckboxPage;
