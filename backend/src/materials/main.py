from fastapi import FastAPI, Depends, HTTPException
from supabase import Client
import os
import consul
from prometheus_fastapi_instrumentator import Instrumentator
import httpx

from api_schemas import MaterialCreate, MaterialUpdate, MaterialResponse
from database import get_supabase_client

app = FastAPI(
    title="Material Service",
    description="Manages learning materials with CRUD operations.",
    version="1.0.0",
)

Instrumentator().instrument(app).expose(app)

TOPICS_SERVICE_URL = os.getenv("TOPICS_SERVICE_URL", "http://localhost:8013")

def register_service():
    c = consul.Consul(host="consul")
    container_name = os.getenv("CONTAINER_NAME", "material_service")
    c.agent.service.register(
        name="material-service",
        service_id="material-service-1",
        address=container_name,
        port=8015, # Assuming a new port for this service
        check=consul.Check.http(f"http://{container_name}:8015/health", interval="10s")
    )

@app.on_event("startup")
def startup_event():
    register_service()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/materials/", response_model=MaterialResponse)
async def create_material(material: MaterialCreate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists in the topics service
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{material.topic_id}")
            response.raise_for_status()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=404, detail=f"Topic with ID {material.topic_id} not found.")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('materials').insert(material.dict()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create material")
    
    return response.data[0]

@app.get("/materials/{material_id}", response_model=MaterialResponse)
def read_material(material_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('materials').select("*").eq('material_id', material_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return response.data[0]

@app.get("/materials/by-topic/{topic_id}", response_model=List[MaterialResponse])
def get_materials_by_topic(topic_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('materials').select("*").eq('topic_id', topic_id).execute()
    if not response.data:
        return [] # Return empty list if no materials found for the topic
    
    return response.data

@app.put("/materials/{material_id}", response_model=MaterialResponse)
async def update_material(material_id: int, material: MaterialUpdate, supabase: Client = Depends(get_supabase_client)):
    # Check if topic_id exists if it's being updated
    if material.topic_id:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(f"{TOPICS_SERVICE_URL}/topics/{material.topic_id}")
                response.raise_for_status()
            except httpx.HTTPStatusError:
                raise HTTPException(status_code=404, detail=f"Topic with ID {material.topic_id} not found.")
            except httpx.RequestError:
                raise HTTPException(status_code=503, detail="Topics service is unavailable.")

    response = supabase.table('materials').update(material.dict(exclude_unset=True)).eq('material_id', material_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Material not found")

    return response.data[0]

@app.delete("/materials/{material_id}")
def delete_material(material_id: int, supabase: Client = Depends(get_supabase_client)):
    response = supabase.table('materials').delete().eq('material_id', material_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return {"message": "Material deleted successfully"}
