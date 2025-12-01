# app/module/infra/gpt_service.py

import json
from fastapi import Request, HTTPException
from openai import AsyncOpenAI
from app.core.config.settings import settings
from app.core.utils.response import fail

client = AsyncOpenAI(api_key=settings.openai_api_key)


class GPTService:
    def __init__(self, user_repo):
        # ServiceProvider에서 GPTService(self.user_repo) 이런 식으로 생성하니까
        self.user_repo = user_repo

    async def gpt(self, request: Request):
        try:
            body = await request.json()
            prompt = body.get("prompt", "")

            # GPT에게 "Chart.js config만 JSON으로 줘" 라고 강하게 시키기
            instruction = """
    You are a Chart.js config generator.

    User will describe the chart they want (e.g. "Show monthly revenue from Jan to Jun as a bar chart").

    You MUST respond ONLY with a valid JSON object with this shape:

    {
    "type": "bar" | "line" | "pie" | "doughnut",
    "data": {
        "labels": ["Jan", "Feb", ...],
        "datasets": [
        {
            "label": "string",
            "data": [number, ...]
        }
        ]
    },
    "options": {
        // valid Chart.js options
    }
    }

    Rules:
    - No markdown.
    - No backticks.
    - No extra text or explanation.
    - Only a single JSON object.
            """.strip()

            response = await client.responses.create(
                model="gpt-4o-mini",
                instructions=instruction,
                input=prompt,
            )

            raw_text = response.output_text  # GPT가 준 텍스트(= JSON 문자열)
            try:
                config = json.loads(raw_text)
            except json.JSONDecodeError:
                fail("Invalid chart config from GPT", "INVALID_CHART_CONFIG", 500)

            # 왼쪽에 보여줄 예쁜 코드 문자열 + 오른쪽에서 쓸 config 둘 다 리턴
            pretty_code = json.dumps(config, indent=2, ensure_ascii=False)

            return {
                "code": pretty_code,  # 화면 왼쪽
                "config": config,     # 화면 오른쪽에서 Chart.js에 그대로 넣을 값
            }
        except Exception as e:
            print("error", e)
            fail("Internal server error", "INTERNAL_ERROR", 500)