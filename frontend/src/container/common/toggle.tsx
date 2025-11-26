import Toggle from "@/component/common/toggle";

const sizes = ["sm", "md", "lg"] as const;

const TogglePage = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">토글 </h1>

      <div className="flex flex-col gap-8">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4"
          >
            <h2 className="text-xl font-semibold">{size.toUpperCase()} 토글</h2>

            {/* 기본/On */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-base text-black w-24">기본 (Off)</span>
                <Toggle size={size} checked={false} onChange={() => {}} />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base text-black w-24">기본 (On)</span>
                <Toggle size={size} checked={true} onChange={() => {}} />
              </div>
            </div>

            {/* Disabled */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-base text-black w-24">
                  Disabled (Off)
                </span>
                <Toggle
                  size={size}
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base text-black w-24">Disabled (On)</span>
                <Toggle
                  size={size}
                  checked={true}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TogglePage;
