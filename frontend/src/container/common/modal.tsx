import { useState } from "react";
import Modal from "@/component/common/modal";
import Button from "@/component/common/button";

type Size = "sm" | "md" | "lg";

const ModalPage = () => {
  const [sizeModal, setSizeModal] = useState<Size | null>(null);
  const [buttonModal, setButtonModal] = useState<0 | 1 | 2 | null>(null);

  return (
    <div className="p-6 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold text-center">Modal</h1>

      {/* SIZE별 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Size별</h2>
        <p className="text-sm text-gray-600 text-center">
          size에 따라 모달의 최대 너비가 달라집니다.
        </p>

        <div className="flex gap-3">
          <Button variant="sub1" size="sm" onClick={() => setSizeModal("sm")}>
            size = "sm"
          </Button>
          <Button variant="sub1" size="sm" onClick={() => setSizeModal("md")}>
            size = "md"
          </Button>
          <Button variant="sub1" size="sm" onClick={() => setSizeModal("lg")}>
            size = "lg"
          </Button>
        </div>

        <Modal
          open={sizeModal !== null}
          onClose={() => setSizeModal(null)}
          size={sizeModal ?? "md"}
          title="사이즈 모달"
          description={
            sizeModal
              ? `현재 size는 "${sizeModal}" 입니다.`
              : "size 예시 모달입니다."
          }
          buttonCount={1}
          primaryText="확인"
          onPrimary={() => setSizeModal(null)}
        />
      </section>

      {/* 버튼 개수별 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">버튼 개수별</h2>
        <p className="text-sm text-gray-600 text-center">
          buttonCount에 따라 버튼이 한 개 또는 두 개로 표시됩니다.
        </p>

        <div className="flex gap-3">
          <Button variant="sub1" size="sm" onClick={() => setButtonModal(0)}>
            buttonCount = 0
          </Button>
          <Button variant="sub1" size="sm" onClick={() => setButtonModal(1)}>
            buttonCount = 1
          </Button>
          <Button variant="sub1" size="sm" onClick={() => setButtonModal(2)}>
            buttonCount = 2
          </Button>
        </div>

        <Modal
          open={buttonModal !== null}
          onClose={() => setButtonModal(null)}
          size="sm"
          title="버튼 개수 예시"
          description={
            buttonModal
              ? `버튼 개수: ${buttonModal}`
              : "버튼이 없는 모달입니다."
          }
          buttonCount={buttonModal ?? 0}
          primaryText="확인"
          secondaryText="취소"
          onPrimary={() => setButtonModal(null)}
          onSecondary={() => setButtonModal(null)}
        />
      </section>
    </div>
  );
};

export default ModalPage;
