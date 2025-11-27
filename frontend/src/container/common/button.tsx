import { useState } from "react";
import Button from "@/component/common/form/button";
import { Home, ArrowRight } from "lucide-react";

const sizes = ["sm", "md", "lg"] as const;

const ButtonPage = () => {
  const renderSizeRow = (
    variant: "main" | "sub1" | "sub2",
    rowLabel: string,
    iconType: "none" | "left" | "right" | "both"
  ) => (
    <div className="flex flex-col gap-1 items-start mt-2">
      <div className="text-base text-black">{rowLabel}</div>

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
      <h1 className="text-2xl font-bold text-center">버튼</h1>

      <div className="grid grid-cols-3 gap-8 items-start">
        {/* -------- MAIN COLUMN -------- */}
        <div className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
          <h2 className="text-xl font-bold">Main 버튼</h2>

          <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-1 items-start">
              <div className="text-base text-black">
                기본 / Hover / Active (md)
              </div>

              <div className="flex gap-2">
                <Button variant="main">기본</Button>
                <Button variant="main" className="bg-main-hover">
                  Hover
                </Button>
                <Button variant="main" className="bg-main-active">
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
              <div className="text-base text-black">
                기본 / Hover / Active (md)
              </div>

              <div className="flex gap-2">
                <Button variant="sub1">기본</Button>
                <Button variant="sub1" className="bg-sub1-hover">
                  Hover
                </Button>
                <Button variant="sub1" className="bg-sub1-active">
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
              <div className="text-base text-black">
                기본 / Hover / Active (md)
              </div>

              <div className="flex gap-2">
                <Button variant="sub2">기본</Button>
                <Button variant="sub2" className="bg-sub2-hover">
                  Hover
                </Button>
                <Button variant="sub2" className="bg-sub2-active">
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
      </div>
    </div>
  );
};

export default ButtonPage;
