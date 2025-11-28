import { useState } from "react";
import { usePost } from "@/hooks/common/useAPI";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import Button from "@/component/common/form/button";
import TextareaBox from "@/component/common/form/textareaBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

interface GptChartResponse {
  code: string;
  config: {
    type: string;
    data: any;
    options?: any;
  };
}

interface GptChartBody {
  prompt: string;
}

const ChartPreview = ({ config }: { config: GptChartResponse["config"] }) => {
  if (!config) return null;

  const { type, data, options } = config;

  const mergedOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
  };

  if (type === "bar") return <Bar data={data} options={mergedOptions} />;
  if (type === "line") return <Line data={data} options={mergedOptions} />;
  if (type === "pie") return <Pie data={data} options={mergedOptions} />;
  if (type === "doughnut")
    return <Doughnut data={data} options={mergedOptions} />;

  return <div>지원하지 않는 차트 타입: {type}</div>;
};

const GptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [config, setConfig] = useState<GptChartResponse["config"] | null>(null);

  const gptMutation = usePost<GptChartBody, GptChartResponse>("api/gpt/send");

  const handleClick = () => {
    if (!prompt.trim()) return;

    gptMutation.mutate(
      { prompt },
      {
        onSuccess: (data) => {
          setCode(data.code);
          setConfig(data.config);
        },
      }
    );
  };

  return (
    <div className="p-6 h-full w-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">차트 생성기</h1>

      {/* Prompt Input + Button */}
      <div className="mb-4 flex flex-col gap-2">
        <TextareaBox
          value={prompt}
          size="lg"
          onChange={(val) => setPrompt(val)}
          placeholder="예: 1월~6월 매출 데이터로 바 차트 그려줘"
          rows={3}
        />
        <Button
          variant="main"
          size="md"
          onClick={handleClick}
          disabled={gptMutation.isPending}
        >
          {gptMutation.isPending ? "생성 중..." : "GPT로 차트 생성"}
        </Button>
      </div>

      {/* Code + Chart Layout */}
      <div className="flex gap-4 h-[500px]">
        {/* LEFT: 받은 코드 */}
        <div className="flex flex-col w-1/3 h-full">
          <h3 className="text-lg font-bold mb-2">받은 코드</h3>

          <div className="flex-1 border border-gray-300 rounded p-3 overflow-auto">
            <pre className="whitespace-pre-wrap break-all text-xs font-mono">
              {code || "아직 받은 코드가 없습니다."}
            </pre>
          </div>
        </div>

        {/* RIGHT: 차트 출력 */}
        <div className="flex flex-col w-2/3 h-full">
          <h3 className="text-lg font-bold mb-2">차트 출력</h3>

          <div className="flex-1 border border-gray-300 rounded p-3">
            {config ? (
              <ChartPreview config={config} />
            ) : (
              <div>차트가 아직 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptPage;
