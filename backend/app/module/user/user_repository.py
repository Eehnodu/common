# app/module/user/user_repository.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import lazyload

from app.module.user.user import User


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_id(self, id: int):
        result = await self.db.execute(
            select(User)
            .options(lazyload("*"))
            .where(User.id == id)
        )
        return result.scalar_one()
    
    async def get_user_by_email(self, user_email: str) -> User | None:
        result = await self.db.execute(select(User).where(User.user_email == user_email))
        return result.scalar_one_or_none()