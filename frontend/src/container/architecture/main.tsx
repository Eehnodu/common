// src/App.tsx (또는 ArchitectureMain.tsx)
import { useState } from "react";

type TechType = "frontend" | "backend" | "db" | "cache" | "queue";
type SectionId = "client" | "server" | "data";

type SlotConfig = {
  id: string;
  label: string;
  section: SectionId;
  techType: TechType;
};

const SLOTS: SlotConfig[] = [
  {
    id: "frontend",
    label: "Frontend",
    section: "client",
    techType: "frontend",
  },
  { id: "api", label: "API Server", section: "server", techType: "backend" },
  {
    id: "worker",
    label: "Worker / Batch",
    section: "server",
    techType: "backend",
  },
  { id: "database", label: "Database", section: "data", techType: "db" },
  { id: "cache", label: "Cache", section: "data", techType: "cache" },
  { id: "queue", label: "Message Queue", section: "data", techType: "queue" },
];

type TechOption = {
  id: string;
  label: string;
  type: TechType;
  image: string;
};

const TECH_OPTIONS: TechOption[] = [
  // frontend
  { id: "react", label: "React", type: "frontend", image: "/icons/react.png" },
  { id: "next", label: "Next.js", type: "frontend", image: "/icons/next.png" },

  // backend
  {
    id: "spring",
    label: "Spring Boot",
    type: "backend",
    image: "/icons/spring.png",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    type: "backend",
    image: "/icons/fastapi.png",
  },
  {
    id: "express",
    label: "Express",
    type: "backend",
    image: "/icons/express.png",
  },

  // db
  { id: "mysql", label: "MySQL", type: "db", image: "/icons/mysql.png" },
  {
    id: "postgres",
    label: "PostgreSQL",
    type: "db",
    image: "/icons/postgres.png",
  },

  // cache
  { id: "redis", label: "Redis", type: "cache", image: "/icons/redis.png" },

  // queue
  { id: "kafka", label: "Kafka", type: "queue", image: "/icons/kafka.png" },
  { id: "sqs", label: "SQS", type: "queue", image: "/icons/sqs.png" },
];

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "client", label: "Client" },
  { id: "server", label: "Server" },
  { id: "data", label: "Data / Infra" },
];

const getOptionsByType = (techType: TechType) => {
  return TECH_OPTIONS.filter((t) => t.type === techType);
};

const getTechById = (id: string) => {
  return TECH_OPTIONS.find((t) => t.id === id) || null;
};

const ArchitectureMain = () => {
  // 위: 폼에서 현재 선택 값
  const [selected, setSelected] = useState<Record<string, string>>({
    frontend: "react",
    api: "spring",
    worker: "",
    database: "mysql",
    cache: "redis",
    queue: "",
  });

  // 아래: "다이어그램 생성" 눌렀을 때 스냅샷
  const [diagramSelected, setDiagramSelected] = useState<
    Record<string, string>
  >({
    frontend: "react",
    api: "spring",
    worker: "",
    database: "mysql",
    cache: "redis",
    queue: "",
  });

  const handleChange = (slotId: string, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [slotId]: value,
    }));
  };

  const handleGenerateDiagram = () => {
    setDiagramSelected(selected);
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Architecture Builder</h1>
      <p style={{ marginBottom: 16, fontSize: 13, color: "#666" }}>
        슬롯마다 스택을 선택하면, 타입에 맞는 옵션만 선택할 수 있게 되어 있음.
      </p>

      {/* 선택 폼 영역 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: 12,
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              background: "#fafafa",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
              {section.label}
            </div>

            {SLOTS.filter((slot) => slot.section === section.id).map((slot) => {
              const options = getOptionsByType(slot.techType);
              const tech = getTechById(selected[slot.id]);

              return (
                <div
                  key={slot.id}
                  style={{
                    borderRadius: 10,
                    background: "#ffffff",
                    padding: 10,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {slot.label}
                  </div>

                  <select
                    value={selected[slot.id] || ""}
                    onChange={(e) => handleChange(slot.id, e.target.value)}
                    style={{
                      padding: 4,
                      fontSize: 13,
                      borderRadius: 6,
                      border: "1px solid #ddd",
                    }}
                  >
                    <option value="">선택 안 함</option>
                    {options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {tech && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 4,
                      }}
                    >
                      <img
                        src={tech.image}
                        alt={tech.label}
                        style={{
                          width: 24,
                          height: 24,
                          objectFit: "contain",
                        }}
                      />
                      <span style={{ fontSize: 12 }}>{tech.label}</span>
                    </div>
                  )}

                  {!tech && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#aaa",
                        marginTop: 4,
                      }}
                    >
                      아직 선택된 기술이 없습니다.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 다이어그램 생성 버튼 */}
      <button
        onClick={handleGenerateDiagram}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          borderRadius: 999,
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        이 설정으로 다이어그램 생성
      </button>

      {/* 다이어그램 미리보기 영역 */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>Diagram Preview</span>
          <span style={{ fontSize: 12, color: "#999" }}>
            Client → Server → Data
          </span>
        </div>

        {/* 여기부터 실제 다이어그램: 섹션 배경 제거, 이미지만 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {SECTIONS.map((section, index) => {
            const sectionSlots = SLOTS.filter(
              (slot) => slot.section === section.id
            );
            const techs = sectionSlots
              .map((slot) => getTechById(diagramSelected[slot.id]))
              .filter((t) => t !== null) as TechOption[];

            return (
              <div
                key={section.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* 섹션 안: 선택된 기술 아이콘들만 */}
                <div
                  style={{
                    minWidth: 120,
                    minHeight: 80,
                    padding: 8,
                    borderRadius: 12,
                    border: "1px solid #e5e5e5",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {techs.length === 0 && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#ddd",
                      }}
                    >
                      {/* 비워두거나 아주 연한 플레이스홀더 */}
                    </div>
                  )}

                  {techs.map((tech) => (
                    <img
                      key={tech.id}
                      src={tech.image}
                      alt={tech.label}
                      style={{
                        width: 32,
                        height: 32,
                        objectFit: "contain",
                      }}
                    />
                  ))}
                </div>

                {/* 오른쪽 화살표 (마지막 섹션은 없음) */}
                {index < SECTIONS.length - 1 && (
                  <div
                    style={{
                      fontSize: 24,
                      color: "#bbb",
                    }}
                  >
                    ➜
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureMain;
