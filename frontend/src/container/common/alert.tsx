import { useState } from "react";
import Alert from "@/component/common/feedback/alert";

const AlertPage = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="p-6 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-center">Alert</h1>

      {/* 기본 타입들 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">타입별 Alert</h2>

        <Alert
          type="info"
          title="Info 알림"
          description="정보성 메시지를 나타냅니다."
        />
        <Alert
          type="success"
          title="Success"
          description="작업이 정상적으로 완료되었습니다."
        />
        <Alert
          type="warning"
          title="Warning"
          description="주의가 필요한 상황입니다."
        />
        <Alert type="error" title="Error" description="문제가 발생했습니다." />
      </section>

      {/* 사이즈 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">사이즈별 Alert</h2>

        <Alert size="sm" type="info" title="Small Alert" />
        <Alert size="md" type="success" title="Medium Alert" />
        <Alert size="lg" type="warning" title="Large Alert" />
      </section>

      {/* Close 가능한 Alert */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Closable Alert</h2>

        {visible ? (
          <Alert
            type="error"
            closable
            onClose={() => setVisible(false)}
            title="닫기 가능한 알림"
            description="버튼을 누르면 사라집니다."
          />
        ) : (
          <button
            className="px-4 py-2 bg-main text-white rounded"
            onClick={() => setVisible(true)}
          >
            다시 보여주기
          </button>
        )}
      </section>
    </div>
  );
};

export default AlertPage;
