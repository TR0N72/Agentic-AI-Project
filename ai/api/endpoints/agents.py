from fastapi import APIRouter, Depends, HTTPException
from api.models import AgentRequest
from core.deps import agent_service
from shared.auth.dependencies import get_current_user

router = APIRouter()

@router.post("/agent/execute", tags=["agents"])
async def execute_agent(request: AgentRequest, user=Depends(get_current_user)):
    """
    Execute AI agent with tool integration.
    
    Runs an AI agent that can use various tools to solve complex problems.
    Ideal for multi-step problem solving and educational tutoring scenarios.
    
    - **query**: The problem or question for the agent to solve
    - **tools**: List of tools the agent can use (optional)
    
    Returns the agent's solution and reasoning process.
    """
    try:
        result = await agent_service.execute(request.query, request.tools)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
