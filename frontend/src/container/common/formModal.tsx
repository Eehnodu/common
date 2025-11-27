import { useState } from "react";
import FormModal from "@/component/common/feedback/formModal";
import Button from "@/component/common/form/button";

const FormModalPage = () => {
  // header 데모
  const [headerModal, setHeaderModal] = useState<
    "center" | "left" | "none" | null
  >(null);

  // size 데모
  const [sizeModal, setSizeModal] = useState<"sm" | "md" | "lg" | null>(null);

  // footer 데모
  const [footerModal, setFooterModal] = useState<{
    type: 0 | 1 | 2;
    align?: "left" | "center" | "right";
  } | null>(null);

  return (
    <div className="p-6 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-center">FormModal </h1>

      {/* HEADER 타입별 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Header 타입별</h2>
        <p className="text-sm text-gray-600 text-center">
          headerType에 따라 타이틀/설명이 정렬되거나 숨겨집니다.
        </p>

        <div className="flex gap-3">
          <Button
            variant="sub1"
            size="sm"
            onClick={() => setHeaderModal("left")}
          >
            headerType = "left"
          </Button>
          <Button
            variant="sub1"
            size="sm"
            onClick={() => setHeaderModal("center")}
          >
            headerType = "center"
          </Button>
          <Button
            variant="sub1"
            size="sm"
            onClick={() => setHeaderModal("none")}
          >
            headerType = "none"
          </Button>
        </div>

        {/* header 데모용 모달 */}
        <FormModal
          open={headerModal !== null}
          onClose={() => setHeaderModal(null)}
          headerType={headerModal ?? "left"}
          title="회원 정보 수정"
          description="필수 정보를 입력해 주세요."
          size="md"
          footerType={2}
          footerAlign="right"
          primaryText="저장"
          secondaryText="취소"
          onPrimary={() => setHeaderModal(null)}
        >
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p>headerType 값에 따라 타이틀/설명 정렬이 달라집니다.</p>
            <ul className="list-disc list-inside text-xs text-gray-600">
              <li>left: 좌측 정렬</li>
              <li>center: 가운데 정렬</li>
              <li>none: 헤더 영역 없이 body만 표시</li>
            </ul>
          </div>
        </FormModal>
      </section>

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

        {/* size 데모용 모달 */}
        <FormModal
          open={sizeModal !== null}
          onClose={() => setSizeModal(null)}
          headerType="left"
          title="크기 테스트"
          description={`현재 size: ${sizeModal ?? "md"}`}
          size={sizeModal ?? "md"}
          footerType={1}
          footerAlign="right"
          primaryText="확인"
          onPrimary={() => setSizeModal(null)}
        >
          <div className="text-sm text-gray-700">
            <p>size에 따라 max-width가 변경됩니다.</p>
            <ul className="mt-2 list-disc list-inside text-xs text-gray-600">
              <li>sm → max-w-sm</li>
              <li>md → max-w-md</li>
              <li>lg → max-w-lg</li>
            </ul>
          </div>
        </FormModal>
      </section>

      {/* FOOTER 타입 + 정렬 */}
      <section className="flex flex-col mx-auto gap-3 items-center justify-center border border-gray-400 rounded-md p-4">
        <h2 className="text-xl font-semibold">Footer 타입 & 정렬</h2>
        <p className="text-sm text-gray-600 text-center">
          footerType과 footerAlign 조합으로 버튼 개수와 정렬을 제어합니다.
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-center">
            <Button
              variant="sub1"
              size="sm"
              onClick={() => setFooterModal({ type: 0 })}
            >
              footerType = 0 (없음)
            </Button>
            <Button
              variant="sub1"
              size="sm"
              onClick={() => setFooterModal({ type: 1 })}
            >
              footerType = 1 (1개)
            </Button>
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              variant="sub1"
              size="sm"
              onClick={() => setFooterModal({ type: 2, align: "left" })}
            >
              type 2 / align="left"
            </Button>
            <Button
              variant="sub1"
              size="sm"
              onClick={() => setFooterModal({ type: 2, align: "center" })}
            >
              type 2 / align="center"
            </Button>
            <Button
              variant="sub1"
              size="sm"
              onClick={() => setFooterModal({ type: 2, align: "right" })}
            >
              type 2 / align="right"
            </Button>
          </div>
        </div>

        {/* footer 데모용 모달 */}
        <FormModal
          open={footerModal !== null}
          onClose={() => setFooterModal(null)}
          headerType="left"
          title="Footer 설정 예시"
          description={
            footerModal
              ? `footerType: ${footerModal.type}${
                  footerModal.align ? `, align: ${footerModal.align}` : ""
                }`
              : ""
          }
          size="sm"
          footerType={footerModal?.type ?? 0}
          footerAlign={footerModal?.align ?? "right"}
          primaryText="확인"
          secondaryText="취소"
          onPrimary={() => setFooterModal(null)}
          onSecondary={() => setFooterModal(null)}
        >
          <div className="text-sm text-gray-700">
            <p>footerType과 footerAlign에 따라 아래 버튼 영역이 바뀝니다.</p>
            <ul className="mt-2 list-disc list-inside text-xs text-gray-600">
              <li>0 → 버튼 없이 body만 표시</li>
              <li>1 → primary 버튼 한 개</li>
              <li>2 → secondary + primary 두 개</li>
              <li>align: left / center / right → 버튼 정렬 변경</li>
            </ul>
          </div>
        </FormModal>
      </section>
    </div>
  );
};

export default FormModalPage;
