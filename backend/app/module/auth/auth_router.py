# app/module/auth/auth_router.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from app.core.provider.endpoint import with_provider
from app.core.provider.login import with_login
from app.core.provider.service import ServiceProvider

router = APIRouter()

@router.post("/login")
@with_provider
async def login(p: ServiceProvider):
    user, type = await p.auth_service.login(p.request)
    response = JSONResponse(status_code=200, content={"message": "user login successful"})
    await p.auth_service.token_util.create_jwt_token(user, response, type)
    return response

@router.post("/logout")
@with_provider
@with_login
async def logout(p:ServiceProvider):
    response = JSONResponse(status_code=200, content={"message": "user logout successful"})
    await p.auth_service.token_util.delete_token(response)
    return response

@router.post("/refresh_token")
@with_provider
async def refresh_token(p: ServiceProvider):
    id, type = await p.auth_service.token_util.verify_refresh(p.request)
    if type == "user":
        user = await p.auth_service.get_user_by_id(id)
    elif type == "admin":
        user = await p.admin_service.get_admin_by_id(id)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")

    response = JSONResponse(status_code=200, content={"message": "user login successful"})
    await p.auth_service.token_util.create_jwt_token(user, response, type)
    return response