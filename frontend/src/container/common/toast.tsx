import { useState } from "react";
import Toast from "@/component/common/toast";
import Button from "@/component/common/button";

const ToastPage = () => {
  const [toast, setToast] = useState({
    open: false,
    type: "info",
    title: "",
    description: "",
    duration: 3000,
  });

  const showToast = (
    type: "info" | "success" | "warning" | "error",
    title: string,
    description?: string,
    duration = 3000
  ) => {
    setToast({
      open: true,
      type,
      title,
      description: description || "",
      duration,
    });
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">Toast</h1>

      {/* 타입별 토스트 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">타입별 Toast</h2>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="main"
            onClick={() => showToast("info", "정보 알림", "알림 메시지입니다.")}
          >
            Info
          </Button>

          <Button
            size="sm"
            variant="sub1"
            onClick={() =>
              showToast("success", "성공!", "정상적으로 처리되었습니다.")
            }
          >
            Success
          </Button>

          <Button
            size="sm"
            variant="sub2"
            onClick={() =>
              showToast("warning", "주의 필요", "확인 후 진행해주세요.")
            }
          >
            Warning
          </Button>

          <Button
            size="sm"
            variant="main"
            onClick={() => showToast("error", "오류 발생", "문제가 있습니다.")}
          >
            Error
          </Button>
        </div>
      </section>

      {/* duration 테스트 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">자동 닫힘 (duration)</h2>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="main"
            onClick={() => showToast("success", "3초 뒤 사라짐", "", 3000)}
          >
            3초 Toast
          </Button>

          <Button
            size="sm"
            variant="main"
            onClick={() => showToast("info", "5초 뒤 사라짐", "", 5000)}
          >
            5초 Toast
          </Button>

          <Button
            size="sm"
            variant="main"
            onClick={() => showToast("warning", "자동 닫힘 없음", "", 0)}
          >
            닫힘 없음
          </Button>
        </div>
      </section>

      {/* closable 테스트 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">수동 닫기(closable)</h2>
        <Button
          size="sm"
          variant="sub2"
          onClick={() =>
            setToast({
              open: true,
              type: "error",
              title: "X 버튼으로 닫기 가능",
              description: "",
              duration: 0,
            })
          }
        >
          closable Toast
        </Button>
      </section>

      {/* 실제 Toast */}
      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        type={toast.type as any}
        title={toast.title}
        description={toast.description}
        duration={toast.duration}
        closable
      />
    </div>
  );
};

export default ToastPage;
