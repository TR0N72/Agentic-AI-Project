from fastapi import APIRouter, HTTPException
from api.models import VectorSearchRequest, TextRequest, IngestRequest, HybridSearchRequest
from core.deps import vector_service, bm25_service, qdrant_service
from services.hybrid_retriever_service import HybridRetriever

router = APIRouter()

@router.post("/vector/search")
async def vector_search(request: VectorSearchRequest):
    try:
        results = await vector_service.search(request.query, request.top_k)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/vector/add")
async def add_to_vector_db(request: TextRequest):
    try:
        result = await vector_service.add_document(request.text)
        return {"status": "success", "id": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/vector/get/{doc_id}")
async def get_vector_document(doc_id: str):
    try:
        doc = await vector_service.get_document(doc_id)
        if not doc:
            raise HTTPException(status_code=404, detail="Document not found")
        return doc
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ingest", tags=["vector-search"])
async def ingest_documents(request: IngestRequest):
    """
    Ingest documents into the vector database for search.
    
    Adds documents to both BM25 (Elasticsearch) and semantic (Qdrant) search indexes.
    Essential for building the educational content database.
    
    - **texts**: List of text documents to ingest
    - **metadata_list**: Optional metadata for each document
    
    Returns the document IDs from both search indexes.
    """
    try:
        # Add to Elastic for BM25
        ids_es = bm25_service.add_documents_batch(request.texts, request.metadata_list)
        # Add to Qdrant for vectors
        ids_qdrant = await qdrant_service.add_documents_batch(request.texts, request.metadata_list)
        # Also keep in existing Chroma for backward-compat
        await vector_service.add_documents_batch(request.texts, request.metadata_list)
        return {"elastic_ids": ids_es, "qdrant_ids": ids_qdrant}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/search/hybrid", tags=["hybrid-search"])
async def search_hybrid(request: HybridSearchRequest):
    """
    Perform hybrid search combining BM25 and semantic search.
    
    Combines keyword-based search (BM25) with semantic similarity search for optimal results.
    Ideal for finding relevant educational content and questions.
    
    - **query**: The search query
    - **top_k**: Number of results to return (default: 10)
    - **alpha**: Weight for BM25 vs semantic search (0.0-1.0, default: 0.6)
    - **filter**: Optional metadata filters
    
    Returns ranked search results with combined scores.
    """
    try:
        retriever = HybridRetriever(bm25_service=bm25_service, vector_service=qdrant_service, alpha=request.alpha)
        results = await retriever.search(request.query, top_k=request.top_k, filter_metadata=request.filter)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/search/questions", tags=["hybrid-search"])
async def search_questions(request: HybridSearchRequest):
    """
    Search specifically for questions in the educational database.
    
    Filters search results to only include content marked as questions.
    Useful for finding similar SAT/UTBK questions for practice.
    
    - **query**: The search query
    - **top_k**: Number of results to return (default: 10)
    - **alpha**: Weight for BM25 vs semantic search (0.0-1.0, default: 0.6)
    - **filter**: Additional metadata filters (type=question is automatically added)
    
    Returns ranked question results.
    """
    try:
        retriever = HybridRetriever(bm25_service=bm25_service, vector_service=qdrant_service, alpha=request.alpha)
        filt = request.filter or {}
        filt.update({"type": "question"})
        results = await retriever.search(request.query, top_k=request.top_k, filter_metadata=filt)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/search/materials", tags=["hybrid-search"])
async def search_materials(request: HybridSearchRequest):
    """
    Search specifically for educational materials and study guides.
    
    Filters search results to only include content marked as materials.
    Useful for finding study guides, formula sheets, and reference materials.
    
    - **query**: The search query
    - **top_k**: Number of results to return (default: 10)
    - **alpha**: Weight for BM25 vs semantic search (0.0-1.0, default: 0.6)
    - **filter**: Additional metadata filters (type=material is automatically added)
    
    Returns ranked material results.
    """
    try:
        retriever = HybridRetriever(bm25_service=bm25_service, vector_service=qdrant_service, alpha=request.alpha)
        filt = request.filter or {}
        filt.update({"type": "material"})
        results = await retriever.search(request.query, top_k=request.top_k, filter_metadata=filt)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
