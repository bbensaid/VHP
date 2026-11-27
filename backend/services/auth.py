"""
backend/services/auth.py
─────────────────────────
JWT-based Supabase auth: user extraction and role-gating FastAPI dependencies.
"""

import logging
import os

import jwt
from fastapi import HTTPException, Request
from pydantic import BaseModel

from config import SUPABASE_JWT_SECRET, SUPABASE_URL
from services.db import get_supabase

log = logging.getLogger("htr-brain")

ROLE_HIERARCHY = ["free", "subscriber", "student", "professional", "advisory", "admin"]

# Supabase signs session tokens with ES256 (asymmetric): verify against the
# project's published keys. The old code only knew HS256 + SUPABASE_JWT_SECRET;
# that secret was never set on Fly, so it fell into "dev mode" and accepted
# every request, signed in or not, as user "dev" with role subscriber.
_JWKS = jwt.PyJWKClient(f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json", cache_keys=True) if SUPABASE_URL else None

# Beta policy, explicit instead of accidental: visitors who are not signed in may
# use the AI Analyst at subscriber level while this is "true". Unset it at launch.
ALLOW_ANONYMOUS_AI = os.getenv("ALLOW_ANONYMOUS_AI", "").lower() == "true"


class AuthedUser(BaseModel):
    user_id: str  # "" for an anonymous visitor
    email: str
    role: str


def _decode(token: str) -> dict:
    alg = jwt.get_unverified_header(token).get("alg", "")
    if alg == "HS256":
        if not SUPABASE_JWT_SECRET:
            raise jwt.InvalidTokenError("HS256 token but no SUPABASE_JWT_SECRET configured")
        return jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], audience="authenticated")
    if not _JWKS:
        raise jwt.InvalidTokenError("no JWKS (SUPABASE_URL unset)")
    key = _JWKS.get_signing_key_from_jwt(token).key
    return jwt.decode(token, key, algorithms=["ES256", "RS256"], audience="authenticated")


async def get_auth_user(request: Request) -> AuthedUser:
    if not SUPABASE_URL and not SUPABASE_JWT_SECRET:
        log.warning("No Supabase configured: local dev mode (requests accepted as subscriber)")
        return AuthedUser(user_id="dev", email="dev@localhost", role="subscriber")

    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ", 1)[1].strip() if auth_header.startswith("Bearer ") else ""
    if not token or token == "dev":
        if ALLOW_ANONYMOUS_AI:
            return AuthedUser(user_id="", email="", role="subscriber")
        raise HTTPException(status_code=401, detail="Sign in required")

    try:
        payload = _decode(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except (jwt.InvalidTokenError, jwt.PyJWKClientError) as e:
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


async def require_signed_in_subscriber(request: Request) -> AuthedUser:
    """Subscriber AND a real account: anonymous beta visitors may read the AI
    Analyst but must not write operational records (/bed-capacity)."""
    user = await require_subscriber(request)
    if not user.user_id:
        raise HTTPException(status_code=401, detail="Sign in required")
    return user
