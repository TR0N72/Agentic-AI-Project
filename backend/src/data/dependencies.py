from fastapi import HTTPException, Depends
from .database import supabase
from supabase import Client


async def get_supabase() -> Client:
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase client not initialized.")
    return supabase
