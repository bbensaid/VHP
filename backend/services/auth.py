"""
backend/services/auth.py
─────────────────────────
JWT-based Supabase auth: user extraction and role-gating FastAPI dependencies.
"""

import logging
import jwt
from fastapi import HTTPException, Request
from pydantic import BaseModel
from services.db import get_supabase
from config import SUPABASE_JWT_SECRET

log = logging.getLogger("htr-brain")

ROLE_HIERARCHY = ["free", "subscriber", "student", "professional", "advisory", "admin"]


class AuthedUser(BaseModel):
    user_id: str
    email: str
    role: str


async def get_auth_user(request: Request) -> AuthedUser:
    if not SUPABASE_JWT_SECRET:
        log.warning("SUPABASE_JWT_SECRET not set — dev mode (all requests accepted as subscriber)")
        return AuthedUser(user_id="dev", email="dev@localhost", role="subscriber")

    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    token = auth_header.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], audience="authenticated")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")

    user_id = payload.get("sub")
    email   = payload.get("email", "")

    supabase = get_supabase()
    role = "free"
    if supabase and user_id:
        try:
            res = supabase.table("user_roles").select("role").eq("user_id", user_id).execute()
            roles = [r["role"] for r in (res.data or [])]
            for r in reversed(ROLE_HIERARCHY):
                if r in roles:
                    role = r
                    break
        except Exception as e:
            log.warning(f"Could not fetch roles for {user_id}: {e}")

    return AuthedUser(user_id=user_id or "", email=email, role=role)


async def require_subscriber(request: Request) -> AuthedUser:
    user = await get_auth_user(request)
    if ROLE_HIERARCHY.index(user.role) < ROLE_HIERARCHY.index("subscriber"):
        raise HTTPException(
            status_code=403,
            detail="A Subscriber plan or higher is required to use the AI Analyst."
        )
    return user
