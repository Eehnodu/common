import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button 컴포넌트에서 사용할 속성 타입
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "main" | "sub1" | "sub2";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  full?: boolean;
  className?: string;
}

/**
 * 재사용 가능한 기본 Button 컴포넌트
 */
const Button = ({
  children,
  variant = "main",
  size = "md",
  leftIcon = null,
  rightIcon = null,
  full = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex shrink-0 items-center justify-center rounded font-medium transition-colors";

  const width = full ? "w-full" : "w-max min-w-fit";

  const variants = {
    main: disabled
      ? "bg-main-active text-white/40 cursor-not-allowed"
      : "bg-main hover:bg-main-hover active:bg-main-active text-white",

    sub1: disabled
      ? "bg-sub1-active text-white/40 cursor-not-allowed"
      : "bg-sub1 hover:bg-sub1-hover active:bg-sub1-active text-white",

    sub2: disabled
      ? "bg-sub2-active text-black/30 cursor-not-allowed"
      : "bg-sub2 hover:bg-sub2-hover active:bg-sub2-active text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-5 py-2.5 text-lg gap-2.5",
  };

  return (
    <button
      disabled={disabled}
      className={`
        ${base}
        ${width}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-60 pointer-events-none" : ""}
        ${className}
      `}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
