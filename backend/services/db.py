"""
backend/services/db.py
──────────────────────
Supabase client singleton.
"""

import logging
from typing import Optional
from supabase import create_client as create_supabase_client, Client as SupabaseClient
from config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

log = logging.getLogger("htr-brain")

_supabase: Optional[SupabaseClient] = None


def get_supabase() -> Optional[SupabaseClient]:
    global _supabase
    if _supabase is None and SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
        _supabase = create_supabase_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    return _supabase
