import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/component/common/button";

type RangeValue = {
  start: Date | null;
  end: Date | null;
};

type Position = "top" | "bottom" | "left" | "right";
type Size = "sm" | "md" | "lg";

interface DatepickerProps {
  value?: RangeValue;
  onChange?: (value: RangeValue) => void;
  className?: string;
  position?: Position; // 팝업 위치
  size?: Size; // 크기
}

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
const days = ["일", "월", "화", "수", "목", "금", "토"];

const Datepicker = ({
  value,
  onChange,
  className = "",
  position = "bottom",
  size = "md",
}: DatepickerProps) => {
  const [open, setOpen] = useState(false);

  const start = value?.start ?? null;
  const end = value?.end ?? null;

  const now = start || new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  // 캘린더 안에서만 사용할 임시 선택 값 (확인 눌러야 밖으로 나감)
  const [draft, setDraft] = useState<RangeValue>({
    start,
    end,
  });

  const draftStart = draft.start;
  const draftEnd = draft.end;

  // ------- size 스타일 맵 -------
  const sizeStyles = {
    sm: {
      input: "min-w-[220px] h-8 text-xs",
      calendar: "w-60 p-2 text-xs",
      dayHeight: "h-7",
      icon: "w-3.5 h-3.5",
      textSize: "text-[10px]",
    },
    md: {
      input: "min-w-[260px] h-10 text-sm",
      calendar: "w-72 p-3 text-sm",
      dayHeight: "h-8",
      icon: "w-4 h-4",
      textSize: "text-[12px]",
    },
    lg: {
      input: "min-w-[300px] h-12 text-base",
      calendar: "w-80 p-4 text-base",
      dayHeight: "h-10",
      icon: "w-5 h-5",
      textSize: "text-[14px]",
    },
  }[size];

  const prevMonth = () => {
    let y = viewYear;
    let m = viewMonth - 1;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const nextMonth = () => {
    let y = viewYear;
    let m = viewMonth + 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const getDates = () => {
    const first = new Date(viewYear, viewMonth, 1);
    const last = new Date(viewYear, viewMonth + 1, 0);

    const dates: (Date | null)[] = [];

    for (let i = 0; i < first.getDay(); i += 1) {
      dates.push(null);
    }
    for (let d = 1; d <= last.getDate(); d += 1) {
      dates.push(new Date(viewYear, viewMonth, d));
    }
    return dates;
  };

  const dates = getDates();

  // 날짜 클릭은 draft만 수정, onChange는 안 부름
  const handlePick = (picked: Date) => {
    // start 없음 혹은 start/end 둘 다 이미 선택된 상태 → 새로 시작
    if (!draftStart || (draftStart && draftEnd)) {
      setDraft({ start: picked, end: null });
      return;
    }

    // start만 있고 end 없음
    if (picked < draftStart) {
      // start보다 이전 날짜 선택 → start를 새로 지정
      setDraft({ start: picked, end: null });
    } else {
      // 정상적으로 end 선택
      setDraft({ start: draftStart, end: picked });
    }
  };

  const isInRange = (date: Date) => {
    if (!draftStart || !draftEnd) return false;
    return date >= draftStart && date <= draftEnd;
  };

  const isSameDay = (a: Date | null, b: Date | null) => {
    if (!a || !b) return false;
    return a.toDateString() === b.toDateString();
  };

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;

  const formatOrPlaceholder = (d: Date | null) =>
    d ? format(d) : "yyyy-mm-dd";

  // 인풋에는 확정된 value 기준으로만 보여줌 (draft 아님)
  const displayText = () =>
    `${formatOrPlaceholder(start)} ~ ${formatOrPlaceholder(end)}`;

  // 팝업 위치
  const getPositionClass = () => {
    if (position === "top") {
      return "bottom-full mb-2 left-0";
    }
    if (position === "left") {
      return "right-full mr-2 top-0";
    }
    if (position === "right") {
      return "left-full ml-2 top-0";
    }
    // bottom (default)
    return "top-full mt-2 left-0";
  };

  const popupPositionClass = getPositionClass();

  const handleToggleOpen = () => {
    const nextOpen = !open;
    // 열릴 때마다 draft를 현재 value 기준으로 리셋
    if (!open && nextOpen) {
      setDraft({ start, end });
    }
    setOpen(nextOpen);
  };

  const handleCancel = () => {
    // 값 지우고 닫기
    onChange?.({ start: null, end: null });
    setDraft({ start: null, end: null });
    setOpen(false);
  };

  const handleConfirm = () => {
    onChange?.(draft);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Input */}
      <button
        type="button"
        onClick={handleToggleOpen}
        className={`${sizeStyles.input} border px-3 rounded-md bg-white text-center hover:bg-gray-50 whitespace-nowrap`}
      >
        {displayText()}
      </button>

      {/* Calendar */}
      {open && (
        <div
          className={`
            absolute z-10 bg-white border rounded-lg shadow-lg
            ${sizeStyles.calendar}
            ${popupPositionClass}
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded hover:bg-main/20"
            >
              <ChevronLeft className={sizeStyles.icon} />
            </button>

            <div className="font-semibold">
              {viewYear}년 {months[viewMonth]}
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded hover:bg-main/20"
            >
              <ChevronRight className={sizeStyles.icon} />
            </button>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 text-center text-gray-600 mb-1">
            {days.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 text-center gap-y-1">
            {dates.map((d, i) => {
              if (!d) {
                return <div key={i} className={sizeStyles.dayHeight} />;
              }

              const selectedStart = isSameDay(d, draftStart);
              const selectedEnd = isSameDay(d, draftEnd);
              const inRange = isInRange(d);

              let classes = `${sizeStyles.dayHeight} flex items-center justify-center`;

              if (selectedStart && selectedEnd) {
                classes += " bg-main text-white rounded-md";
              } else if (selectedStart) {
                classes += " bg-main text-white rounded-l-md";
              } else if (selectedEnd) {
                classes += " bg-main text-white rounded-r-md";
              } else if (inRange) {
                classes += " bg-main/20";
              } else {
                // 범위 밖의 일반 날짜만 hover 컬러 적용
                classes += " hover:bg-main/10";
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePick(d)}
                  className={classes}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* 취소 / 확인 버튼 */}
          <div className="flex justify-end gap-2 mt-3 pt-2 border-t">
            <Button variant="sub2" size="sm" onClick={handleCancel}>
              <span className={`${sizeStyles.textSize}`}>취소</span>
            </Button>
            <Button variant="main" size="sm" onClick={handleConfirm}>
              <span className={`${sizeStyles.textSize}`}>확인</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
