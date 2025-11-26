import { useState } from "react";
import TextareaBox from "@/component/common/textareaBox";

const TextareaBoxPage = () => {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");

  return (
    <div className="p-6 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-center">TextareaBox </h1>

      <div className="flex flex-row mx-auto gap-20 items-center justify-center">
        {/* 사이즈별 */}
        <section className="flex flex-col gap-5 items-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-semibold">사이즈별</h2>

          <div className="flex flex-col gap-6 w-[400px]">
            {/* SM */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">SM</span>
              <TextareaBox
                size="sm"
                value={sm}
                onChange={setSm}
                placeholder="Small textarea"
                rows={3}
              />
            </div>

            {/* MD */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">MD</span>
              <TextareaBox
                size="md"
                value={md}
                onChange={setMd}
                placeholder="Medium textarea"
              />
            </div>

            {/* LG */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">LG</span>
              <TextareaBox
                size="lg"
                value={lg}
                onChange={setLg}
                placeholder="Large textarea"
              />
            </div>
          </div>
        </section>

        {/* 상태(success / error / disabled) */}
        <section className="flex flex-col gap-5 items-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-semibold">상태</h2>

          <div className="flex flex-col gap-5 w-[400px]">
            <TextareaBox placeholder="Success textarea" success />

            <TextareaBox placeholder="Error textarea" error />

            <TextareaBox placeholder="Disabled textarea" disabled />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TextareaBoxPage;
