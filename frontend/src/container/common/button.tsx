import { useState } from "react";
import Button from "@/component/common/button";
import { Home, ArrowRight } from "lucide-react";

interface StyleInfo {
  label: string;
  fontSize: string;
  borderRadius: string;
  width: string;
  height: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  color: string;
  backgroundColor: string;
}

const sizes = ["sm", "md", "lg"] as const;

const ButtonPage = () => {
  const [styleInfo, setStyleInfo] = useState<StyleInfo | null>(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string
  ) => {
    const computed = window.getComputedStyle(e.currentTarget);

    setStyleInfo({
      label,
      fontSize: computed.fontSize,
      borderRadius: computed.borderRadius,
      width: computed.width,
      height: computed.height,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      color: computed.color,
      backgroundColor: computed.backgroundColor,
    });
  };

  const renderSizeRow = (
    variant: "main" | "sub1" | "sub2",
    rowLabel: string,
    iconType: "none" | "left" | "right" | "both"
  ) => (
    <div className="flex flex-col gap-1 items-start mt-2">
      {/* 구분용 라벨: 크기 + 두께 */}
      <div className="text-base  text-black">{rowLabel}</div>

      <div className="flex gap-2">
        {sizes.map((size) => {
          const leftIcon =
            iconType === "left" || iconType === "both" ? (
              <Home size={18} />
            ) : null;
          const rightIcon =
            iconType === "right" || iconType === "both" ? (
              <ArrowRight size={18} />
            ) : null;

          return (
            <Button
              key={size}
              variant={variant}
              size={size}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onClick={(e) =>
                handleButtonClick(
                  e,
                  `${variant} / ${rowLabel} / ${size.toUpperCase()}`
                )
              }
            >
              {size.toUpperCase()}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">버튼 </h1>

      <div className="grid grid-cols-4 gap-8 items-start">
        {/* -------- MAIN COLUMN -------- */}
        <div className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-bold">Main 버튼</h2>

          <div className="flex flex-col gap-4 items-start">
            {/* 기본 / hover / active */}
            <div className="flex flex-col gap-1 items-start">
              <div className="text-base  text-black">
                기본 / Hover / Active (md)
              </div>

              <div className="flex gap-2">
                <Button
                  variant="main"
                  onClick={(e) => handleButtonClick(e, "Main / 기본(md)")}
                >
                  기본
                </Button>
                <Button
                  variant="main"
                  className="bg-main-hover"
                  onClick={(e) => handleButtonClick(e, "Main / Hover(md)")}
                >
                  Hover
                </Button>
                <Button
                  variant="main"
                  className="bg-main-active"
                  onClick={(e) => handleButtonClick(e, "Main / Active(md)")}
                >
                  Active
                </Button>
              </div>
            </div>

            {renderSizeRow("main", "기본 버튼 (size)", "none")}
            {renderSizeRow("main", "Left Icon (size)", "left")}
            {renderSizeRow("main", "Right Icon (size)", "right")}
            {renderSizeRow("main", "Left + Right Icon (size)", "both")}
          </div>
        </div>

        {/* -------- SUB1 COLUMN -------- */}
        <div className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-bold">Sub1 버튼</h2>

          <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-1 items-start">
              <div className="text-base  text-black">
                기본 / Hover / Active (md)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="sub1"
                  onClick={(e) => handleButtonClick(e, "Sub1 / 기본(md)")}
                >
                  기본
                </Button>
                <Button
                  variant="sub1"
                  className="bg-sub1-hover"
                  onClick={(e) => handleButtonClick(e, "Sub1 / Hover(md)")}
                >
                  Hover
                </Button>
                <Button
                  variant="sub1"
                  className="bg-sub1-active"
                  onClick={(e) => handleButtonClick(e, "Sub1 / Active(md)")}
                >
                  Active
                </Button>
              </div>
            </div>

            {renderSizeRow("sub1", "기본 버튼 (size)", "none")}
            {renderSizeRow("sub1", "Left Icon (size)", "left")}
            {renderSizeRow("sub1", "Right Icon (size)", "right")}
            {renderSizeRow("sub1", "Left + Right Icon (size)", "both")}
          </div>
        </div>

        {/* -------- SUB2 COLUMN -------- */}
        <div className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-bold">Sub2 버튼</h2>

          <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-1 items-start">
              <div className="text-base  text-black">
                기본 / Hover / Active (md)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="sub2"
                  onClick={(e) => handleButtonClick(e, "Sub2 / 기본(md)")}
                >
                  기본
                </Button>
                <Button
                  variant="sub2"
                  className="bg-sub2-hover"
                  onClick={(e) => handleButtonClick(e, "Sub2 / Hover(md)")}
                >
                  Hover
                </Button>
                <Button
                  variant="sub2"
                  className="bg-sub2-active"
                  onClick={(e) => handleButtonClick(e, "Sub2 / Active(md)")}
                >
                  Active
                </Button>
              </div>
            </div>

            {renderSizeRow("sub2", "기본 버튼 (size)", "none")}
            {renderSizeRow("sub2", "Left Icon (size)", "left")}
            {renderSizeRow("sub2", "Right Icon (size)", "right")}
            {renderSizeRow("sub2", "Left + Right Icon (size)", "both")}
          </div>
        </div>

        {/* -------- CSS INFO COLUMN -------- */}
        <div className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-bold">CSS 정보</h2>

          <div className="border rounded bg-white shadow p-4 text-base">
            {!styleInfo && (
              <p className="text-gray-500 text-sm">
                오른쪽 버튼 중 하나를 클릭하면
                <br />
                CSS 정보가 여기에 표시됩니다.
              </p>
            )}

            {styleInfo && (
              <div className="space-y-2">
                <div className="text-lg  text-black mb-2">
                  {styleInfo.label}
                </div>

                <div>font-size: {styleInfo.fontSize}</div>
                <div>border-radius: {styleInfo.borderRadius}</div>
                <div>padding-top: {styleInfo.paddingTop}</div>
                <div>padding-right: {styleInfo.paddingRight}</div>
                <div>padding-bottom: {styleInfo.paddingBottom}</div>
                <div>padding-left: {styleInfo.paddingLeft}</div>
                <div>text-color: {styleInfo.color}</div>
                <div>background: {styleInfo.backgroundColor}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
