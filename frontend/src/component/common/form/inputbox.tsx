import { useState } from "react";

/**
 * InputBox 사이즈 타입
 */
type Size = "sm" | "md" | "lg";

/**
 * InputBox 컴포넌트 Props
 *
 * @property value        입력된 텍스트 값
 * @property onChange     값 변경 시 호출되는 콜백
 * @property placeholder  입력창 placeholder
 * @property className    래퍼 커스텀 클래스
 * @property size         입력창 크기 (sm/md/lg)
 * @property disabled     비활성화 여부
 * @property success      성공 상태 (border 녹색)
 * @property error        오류 상태 (border 빨강)
 * @property leftIcon     왼쪽 아이콘
 * @property rightIcon    오른쪽 아이콘
 */
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

/**
 * 재사용 가능한 InputBox 컴포넌트
 *
 * - 상태(success/error)에 따라 border 색상 변경
 * - left/right 아이콘 삽입 가능
 * - 크기 조절(sm/md/lg)
 *
 * @example 기본 사용
 * ```tsx
 * <InputBox value={text} onChange={setText} />
 * ```
 *
 * @example 아이콘 포함
 * ```tsx
 * <InputBox leftIcon={<Search />} placeholder="검색" />
 * ```
 *
 * @example 상태 표시
 * ```tsx
 * <InputBox success value="완료" />
 * <InputBox error value="오류" />
 * ```
 */
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
  /**
   * focus 상태를 위한 내부 state
   */
  const [focused, setFocused] = useState(false);

  /**
   * 사이즈별 스타일 맵
   */
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

  /**
   * border 색상 상태 계산
   */
  const borderColor = (() => {
    if (error) return "border-red-500";
    if (success) return "border-green-500";
    if (focused) return "border-main";
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
