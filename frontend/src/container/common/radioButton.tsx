import { useState } from "react";
import RadioButton from "@/component/common/form/radioButton";

const RadioButtonPage = () => {
  const [valueSm, setValueSm] = useState("a");
  const [valueMd, setValueMd] = useState("a");
  const [valueLg, setValueLg] = useState("a");

  return (
    <div className="p-6 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold text-center">RadioButton</h1>

      {/* 사이즈별 */}
      <section className="flex flex-col gap-6 items-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈별</h2>

        {/* SM */}
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm text-gray-700">SM</span>
          <div className="flex gap-4 items-center">
            <RadioButton
              name="group-sm"
              size="sm"
              label="Option A"
              value="a"
              checked={valueSm === "a"}
              onChange={setValueSm}
            />
            <RadioButton
              name="group-sm"
              size="sm"
              label="Option B"
              value="b"
              checked={valueSm === "b"}
              onChange={setValueSm}
            />
          </div>
        </div>

        {/* MD */}
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm text-gray-700">MD</span>
          <div className="flex gap-4 items-center">
            <RadioButton
              name="group-md"
              size="md"
              label="Option A"
              value="a"
              checked={valueMd === "a"}
              onChange={setValueMd}
            />
            <RadioButton
              name="group-md"
              size="md"
              label="Option B"
              value="b"
              checked={valueMd === "b"}
              onChange={setValueMd}
            />
          </div>
        </div>

        {/* LG */}
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm text-gray-700">LG</span>
          <div className="flex gap-4 items-center">
            <RadioButton
              name="group-lg"
              size="lg"
              label="Option A"
              value="a"
              checked={valueLg === "a"}
              onChange={setValueLg}
            />
            <RadioButton
              name="group-lg"
              size="lg"
              label="Option B"
              value="b"
              checked={valueLg === "b"}
              onChange={setValueLg}
            />
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-3 items-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">비활성</h2>

        <div className="flex gap-4 items-center">
          <RadioButton
            size="md"
            name="disabled"
            label="Disabled A"
            value="a"
            checked={false}
            disabled
          />

          <RadioButton
            size="md"
            name="disabled"
            label="Disabled B"
            value="b"
            checked={true}
            disabled
          />
        </div>
      </section>
    </div>
  );
};

export default RadioButtonPage;
