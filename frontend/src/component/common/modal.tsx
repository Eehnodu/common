import { useEffect } from "react";
import Button from "@/component/common/button";

type Size = "sm" | "md" | "lg";
type ButtonCount = 0 | 1 | 2;

interface ModalProps {
  open: boolean;
  onClose: () => void;

  title: string;
  description?: string;

  size?: Size;

  buttonCount?: ButtonCount; // 0: 없음, 1: 한 개, 2: 두 개
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;

  closeOnOverlay?: boolean;
  className?: string;
  bodyClassName?: string; // 전체 내용 래퍼에 추가 스타일 주고 싶을 때
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  size = "md",
  buttonCount = 2,
  primaryText = "확인",
  secondaryText = "취소",
  onPrimary,
  onSecondary,
  closeOnOverlay = true,
  className = "",
  bodyClassName = "",
}: ModalProps) => {
  const sizeClass =
    size === "sm"
      ? "min-w-56 max-w-64"
      : size === "lg"
        ? "min-w-80 max-w-[32rem]"
        : "min-w-64 max-w-80";

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = () => {
    if (!closeOnOverlay) return;
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handlePrimary = () => {
    if (onPrimary) onPrimary();
    else onClose();
  };

  const handleSecondary = () => {
    if (onSecondary) onSecondary();
    else onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg
          w-full ${sizeClass} mx-4
          flex flex-col
          ${className}
        `}
        onClick={handleContentClick}
      >
        {/* title / description / button 한 컬럼으로 */}
        <div
          className={`
            px-5 pt-5 pb-4
            flex flex-col items-center text-center gap-3
            ${bodyClassName}
          `}
        >
          {/* Title */}
          <div className="text-base font-semibold">{title}</div>

          {/* Description */}
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}

          {/* Buttons */}
          {buttonCount > 0 && (
            <div className="mt-2 flex gap-2 justify-center w-full">
              {buttonCount === 2 && (
                <Button variant="sub1" size="sm" onClick={handleSecondary}>
                  {secondaryText}
                </Button>
              )}

              <Button variant="main" size="sm" onClick={handlePrimary}>
                {primaryText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
