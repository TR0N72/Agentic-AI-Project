import os
from supabase import create_client, Client
from fastapi import Depends, HTTPException

def get_db() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase URL and service key are not configured.")
    
    try:
        client = create_client(url, key)
        return client
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect to Supabase: {e}")

def get_supabase_client(supabase: Client = Depends(get_db)):
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase client is not available.")
    return supabase
