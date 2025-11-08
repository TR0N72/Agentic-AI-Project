from fastapi import HTTPException, Depends
from supabase import Client, create_client
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None


async def get_supabase() -> Client:
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase client not initialized.")
    return supabase
