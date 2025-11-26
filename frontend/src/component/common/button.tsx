import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "main" | "sub1" | "sub2";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

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
