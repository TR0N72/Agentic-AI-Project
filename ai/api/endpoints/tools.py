from fastapi import APIRouter, Depends, HTTPException
from core.deps import tool_registry
from shared.auth.dependencies import require_roles

router = APIRouter()

@router.get("/tools/list", tags=["tools"])
async def list_tools(user=Depends(require_roles("admin", "teacher"))):
    """
    List available tools for AI agents.
    
    Returns a list of all available tools that can be used by AI agents.
    Requires teacher or admin role for access.
    
    Returns a list of tool definitions with names and descriptions.
    """
    try:
        tools = tool_registry.list_tools()
        return {"tools": tools}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tools/execute", tags=["tools"])
async def execute_tool(tool_name: str, parameters: dict, user=Depends(require_roles("admin"))):
    """
    Execute a specific tool directly.
    
    Runs a tool with the provided parameters and returns the result.
    Requires admin role for direct tool execution.
    
    - **tool_name**: Name of the tool to execute
    - **parameters**: Parameters to pass to the tool
    
    Returns the tool execution result.
    """
    try:
        result = await tool_registry.execute_tool(tool_name, parameters)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
