import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/component/common/button";

type Size = "sm" | "md" | "lg";
type HeaderType = "center" | "left" | "none";
type FooterType = 0 | 1 | 2;
type FooterAlign = "left" | "center" | "right";

interface FormModalProps {
  open: boolean;
  onClose: () => void;

  // header
  headerType?: HeaderType;
  title?: string;
  description?: string;

  // body
  children?: React.ReactNode;
  size?: Size;
  className?: string;
  bodyClassName?: string;

  // footer
  footerType?: FooterType; // 0: 없음, 1: 한 개, 2: 두 개
  footerAlign?: FooterAlign;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;

  // 기타
  closeOnOverlay?: boolean;
  showCloseIcon?: boolean;
}

const FormModal = ({
  open,
  onClose,
  headerType = "center",
  title,
  description,
  children,
  size = "md",
  className = "",
  bodyClassName = "",
  footerType = 2,
  footerAlign = "right",
  primaryText = "확인",
  secondaryText = "취소",
  onPrimary,
  onSecondary,
  closeOnOverlay = true,
  showCloseIcon = true,
}: FormModalProps) => {
  const sizeClass =
    size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-lg" : "max-w-md";

  const footerJustify =
    footerAlign === "left"
      ? "justify-start"
      : footerAlign === "center"
        ? "justify-center"
        : "justify-end";

  // ESC 닫기
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
  };

  const handleSecondary = () => {
    if (onSecondary) onSecondary();
    else onClose();
  };

  // header 렌더 여부
  const showHeader = headerType !== "none" || showCloseIcon;

  const headerAlignClass =
    headerType === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg
          w-full ${sizeClass} mx-4
          max-h-[90vh] flex flex-col
          ${className}
        `}
        onClick={handleContentClick}
      >
        {/* HEADER */}
        {showHeader && (
          <div
            className={`
      relative flex w-full
      ${headerType === "none" ? "p-2" : "px-4 py-3 border-b"}
      ${headerType === "center" ? "items-center text-center" : ""}
      ${headerType === "left" ? "items-start text-left" : ""}
    `}
          >
            {/* headerType=none이면 title/description 숨김 */}
            {headerType !== "none" && (
              <div className="flex-1 pr-6">
                {title && (
                  <div className="text-base font-semibold">{title}</div>
                )}
                {description && (
                  <div className="text-xs text-gray-600">{description}</div>
                )}
              </div>
            )}

            {/* X 버튼: 모든 headerType에서 동일한 위치 */}
            {showCloseIcon && (
              <button
                type="button"
                onClick={onClose}
                className="
          absolute top-2 right-2
          p-1 rounded hover:bg-gray-100
        "
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* BODY */}
        <div
          className={`
            px-4 py-3 overflow-auto
            ${bodyClassName}
          `}
        >
          {children}
        </div>

        {/* FOOTER */}
        {footerType !== 0 && (
          <div
            className={`
              px-4 py-3 border-t flex gap-2
              ${footerJustify}
            `}
          >
            {footerType === 1 && (
              <Button variant="main" size="sm" onClick={handlePrimary}>
                {primaryText}
              </Button>
            )}

            {footerType === 2 && (
              <>
                <Button variant="sub2" size="sm" onClick={handleSecondary}>
                  {secondaryText}
                </Button>
                <Button variant="main" size="sm" onClick={handlePrimary}>
                  {primaryText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
