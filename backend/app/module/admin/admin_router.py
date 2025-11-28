# app/module/auth/auth_router.py

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.provider.endpoint import with_provider
from app.core.provider.login import with_login
from app.core.provider.service import ServiceProvider

router = APIRouter()