import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

type Size = "sm" | "md" | "lg";
type Position = "top" | "bottom";

interface SelectBoxProps {
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  size?: Size;
  position?: Position;
  disabled?: boolean;
}

const SelectBox = ({
  value,
  onChange,
  options,
  placeholder = "선택하세요",
  className = "",
  size = "md",
  position = "bottom",
  disabled = false,
}: SelectBoxProps) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // ▼ size 스타일
  const sizeStyles = {
    sm: {
      input: "h-8 text-xs px-2",
      item: "h-7 text-xs px-2",
      list: "text-xs py-1",
      arrow: "w-3 h-3",
    },
    md: {
      input: "h-10 text-sm px-3",
      item: "h-9 text-sm px-3",
      list: "text-sm py-1.5",
      arrow: "w-4 h-4",
    },
    lg: {
      input: "h-12 text-base px-3",
      item: "h-10 text-base px-3",
      list: "text-base py-2",
      arrow: "w-5 h-5",
    },
  }[size];

  const selectedOption = options.find((o) => o.value === value);

  // ▼ 팝업 위치
  const popupPosition =
    position === "top" ? "bottom-full mb-1 left-0" : "top-full mt-1 left-0";

  // ▼ 외부 클릭 → 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val: string | number) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={boxRef} className={`relative inline-block w-full ${className}`}>
      {/* Input */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`border rounded-md bg-white w-full flex items-center justify-between hover:bg-gray-50 whitespace-nowrap
      ${sizeStyles.input}
      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
    `}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>

        <ChevronDown
          className={`${sizeStyles.arrow} transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Option List */}
      {open && (
        <div
          className={`
        absolute border bg-white shadow-lg rounded-md z-10
        min-w-full
        ${sizeStyles.list}
        ${popupPosition}
      `}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`${sizeStyles.item} w-full text-left hover:bg-main/10 ${
                value === opt.value ? "bg-main text-white" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
