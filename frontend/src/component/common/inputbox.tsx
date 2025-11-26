import { useState } from "react";

type Size = "sm" | "md" | "lg";

interface InputBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: Size;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputBox = ({
  value = "",
  onChange,
  placeholder = "입력하세요",
  className = "",
  size = "md",
  disabled = false,
  success = false,
  error = false,
  leftIcon,
  rightIcon,
}: InputBoxProps) => {
  const [focused, setFocused] = useState(false);

  const sizeStyles = {
    sm: {
      wrapper: "h-8 text-xs px-2 gap-1",
      input: "text-xs",
      icon: "w-3 h-3",
    },
    md: {
      wrapper: "h-10 text-sm px-3 gap-2",
      input: "text-sm",
      icon: "w-4 h-4",
    },
    lg: {
      wrapper: "h-12 text-base px-3 gap-3",
      input: "text-base",
      icon: "w-5 h-5",
    },
  }[size];

  // 상태별 border 색상
  const borderColor = (() => {
    if (error) return "border-red-500";
    if (success) return "border-green-500";
    if (focused) return "border-main"; // 클릭 시
    return "border-gray-300 hover:border-main";
  })();

  return (
    <div
      className={`
        flex items-center rounded-md border bg-white w-full
        transition-colors
        ${sizeStyles.wrapper}
        ${borderColor}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-text"}
        ${className}
      `}
      onClick={() => !disabled && setFocused(true)}
    >
      {/* 왼쪽 아이콘 */}
      {leftIcon && (
        <span className={`flex items-center ${sizeStyles.icon}`}>
          {leftIcon}
        </span>
      )}

      {/* 입력창 */}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          flex-1 outline-none bg-transparent
          ${sizeStyles.input}
        `}
      />

      {/* 오른쪽 아이콘 */}
      {rightIcon && (
        <span className={`flex items-center ${sizeStyles.icon}`}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default InputBox;
