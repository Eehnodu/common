from fastapi import APIRouter

from app.core.provider.endpoint import with_provider
from app.core.provider.login import with_login
from app.core.provider.service import ServiceProvider

router = APIRouter()

@router.post("/send")
@with_provider
@with_login
async def gpt(p: ServiceProvider):
    return await p.gpt_service.gpt(p.request)
