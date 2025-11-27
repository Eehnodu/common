import { useState } from "react";
import InputBox from "@/component/common/form/inputbox";
import { Search, X } from "lucide-react";

const InputBoxPage = () => {
  const [smLeft, setSmLeft] = useState("");
  const [smRight, setSmRight] = useState("");

  const [mdLeft, setMdLeft] = useState("");
  const [mdRight, setMdRight] = useState("");

  const [lgLeft, setLgLeft] = useState("");
  const [lgRight, setLgRight] = useState("");

  return (
    <div className="p-6 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-center">InputBox </h1>

      {/* Size + Left/Right Icon 6개 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈 + 방향별 아이콘</h2>

        <div className="flex flex-col gap-4 w-80">
          {/* SM */}
          <InputBox
            size="sm"
            placeholder="SM Left Icon"
            value={smLeft}
            onChange={setSmLeft}
            leftIcon={<Search className="w-3 h-3" />}
          />

          <InputBox
            size="sm"
            placeholder="SM Right Icon"
            value={smRight}
            onChange={setSmRight}
            rightIcon={
              smRight ? (
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSmRight("")}
                />
              ) : undefined
            }
          />

          {/* MD */}
          <InputBox
            size="md"
            placeholder="MD Left Icon"
            value={mdLeft}
            onChange={setMdLeft}
            leftIcon={<Search className="w-4 h-4" />}
          />

          <InputBox
            size="md"
            placeholder="MD Right Icon"
            value={mdRight}
            onChange={setMdRight}
            rightIcon={
              mdRight ? (
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setMdRight("")}
                />
              ) : undefined
            }
          />

          {/* LG */}
          <InputBox
            size="lg"
            placeholder="LG Left Icon"
            value={lgLeft}
            onChange={setLgLeft}
            leftIcon={<Search className="w-5 h-5" />}
          />

          <InputBox
            size="lg"
            placeholder="LG Right Icon"
            value={lgRight}
            onChange={setLgRight}
            rightIcon={
              lgRight ? (
                <X
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setLgRight("")}
                />
              ) : undefined
            }
          />
        </div>
      </section>

      {/* Error & Disabled */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">에러 / 비활성</h2>

        <div className="flex flex-col gap-3 w-80">
          <InputBox placeholder="기본 Input" />

          <InputBox placeholder="에러 Input" error={true} />

          <InputBox placeholder="성공 Input" success={true} />

          <InputBox placeholder="비활성 Input" disabled />
        </div>
      </section>
    </div>
  );
};

export default InputBoxPage;
