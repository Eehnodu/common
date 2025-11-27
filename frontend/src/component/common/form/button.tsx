import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button 컴포넌트에서 사용할 속성 타입
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내부에 표시될 콘텐츠 */
  children: ReactNode;

  /** 버튼 스타일 종류 (main / sub1 / sub2) */
  variant?: "main" | "sub1" | "sub2";

  /** 버튼 사이즈 (sm / md / lg) */
  size?: "sm" | "md" | "lg";

  /** 텍스트 왼쪽에 표시할 아이콘 */
  leftIcon?: ReactNode;

  /** 텍스트 오른쪽에 표시할 아이콘 */
  rightIcon?: ReactNode;

  /** 추가 커스텀 클래스 */
  className?: string;
}

/**
 * 재사용 가능한 기본 Button 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="main" size="md">저장하기</Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button leftIcon={<IconPlus />}>추가</Button>
 * ```
 */
const Button = ({
  children,
  variant = "main",
  size = "md",
  leftIcon = null,
  rightIcon = null,
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex w-max min-w-fit shrink-0 items-center justify-center rounded font-medium transition-colors";

  const variants = {
    main: "bg-main hover:bg-main-hover active:bg-main-active text-white",
    sub1: "bg-sub1 hover:bg-sub1-hover active:bg-sub1-active text-white",
    sub2: "bg-sub2 hover:bg-sub2-hover active:bg-sub2-active text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-5 py-2.5 text-lg gap-2.5",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
