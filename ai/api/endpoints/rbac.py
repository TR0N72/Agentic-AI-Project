from fastapi import APIRouter, Depends, HTTPException, Header
from shared.auth.dependencies import (
    require_roles, get_current_user, require_permissions, 
    require_all_permissions, require_admin, require_teacher_or_admin, 
    require_student_or_above, require_user_management, 
    require_course_management, require_content_management,
    require_system_management, require_analytics_access
)
from shared.auth.models import User, UserRole, Permission
from typing import List
import os
import httpx

router = APIRouter()

# =============================================================================
# User Profile and Basic Routes
# =============================================================================

@router.get("/me", tags=["rbac"])
async def get_current_user_profile(user: User = Depends(get_current_user)):
    """
    Get current user's profile information.
    
    Returns the profile information of the currently authenticated user.
    Requires valid JWT token.
    
    Returns user ID, email, username, roles, permissions, and metadata.
    """
    return {
        "user_id": user.id,
        "email": user.email,
        "username": user.username,
        "roles": [role.value for role in user.roles],
        "permissions": [perm.value for perm in user.get_all_permissions()],
        "is_active": user.is_active,
        "metadata": user.metadata
    }


@router.get("/auth/refresh")
async def refresh_token(refresh_token: str):
    from shared.auth.auth_service import auth_service_singleton
    try:
        new_tokens = await auth_service_singleton.refresh_token(refresh_token)
        return {"tokens": new_tokens}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/auth/login", tags=["authentication"])
async def login(credentials: dict):
    """
    User login endpoint.
    
    Authenticates users and returns JWT tokens for API access.
    Delegates to external authentication service.
    
    - **email**: User's email address
    - **password**: User's password
    
    Returns JWT access and refresh tokens along with user information.
    """
    from auth.auth_service import auth_service_singleton
    
    email = credentials.get("email")
    password = credentials.get("password")
    
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    
    if not auth_service_singleton._configured:
        # Development mode - return mock tokens
        if os.getenv("ENVIRONMENT", "").lower() == "development":
            return {
                "access_token": "mock-access-token-12345",
                "refresh_token": "mock-refresh-token-67890",
                "token_type": "bearer",
                "expires_in": 3600,
                "user": {
                    "id": "dev-user-123",
                    "email": email,
                    "username": "devuser",
                    "roles": ["admin"],
                    "permissions": ["external_api_access"],
                    "is_active": True
                }
            }
        
        raise HTTPException(status_code=500, detail="Auth service not configured")
    
    # Call external auth service
    try:
        url = f"{auth_service_singleton.base_url.rstrip('/')}/login"
        payload = {"email": email, "password": password}
        
        async with httpx.AsyncClient(timeout=auth_service_singleton.timeout_seconds) as client:
            resp = await client.post(url, json=payload)
            
        if resp.status_code == 200:
            return resp.json()
        elif resp.status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            raise HTTPException(status_code=502, detail=f"Auth service error: {resp.status_code}")
            
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail=f"Auth service unreachable: {exc}")


@router.post("/auth/register", tags=["authentication"])
async def register(user_data: dict):
    """
    User registration endpoint.
    
    Creates a new user account in the system.
    Delegates to external authentication service.
    
    - **email**: User's email address
    - **password**: User's password
    - **username**: User's username (optional)
    - **role**: User's role (default: student)
    
    Returns user information and authentication tokens.
    """
    from auth.auth_service import auth_service_singleton
    
    email = user_data.get("email")
    password = user_data.get("password")
    username = user_data.get("username")
    
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    
    if not auth_service_singleton._configured:
        raise HTTPException(status_code=500, detail="Auth service not configured")
    
    # Call external auth service
    try:
        url = f"{auth_service_singleton.base_url.rstrip('/')}/register"
        payload = {
            "email": email,
            "password": password,
            "username": username,
            "role": user_data.get("role", "student")  # Default to student
        }
        
        async with httpx.AsyncClient(timeout=auth_service_singleton.timeout_seconds) as client:
            resp = await client.post(url, json=payload)
            
        if resp.status_code == 201:
            return resp.json()
        elif resp.status_code == 409:
            raise HTTPException(status_code=409, detail="User already exists")
        else:
            raise HTTPException(status_code=502, detail=f"Auth service error: {resp.status_code}")
            
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail=f"Auth service unreachable: {exc}")


@router.post("/auth/logout")
async def logout(
    authorization: str = Header(default=None),
    user: User = Depends(get_current_user)
):
    """Logout user and revoke token."""
    from auth.auth_service import auth_service_singleton
    
    # Extract token from authorization header
    token = None
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()
    
    if token:
        # Revoke token with auth service
        success = await auth_service_singleton.revoke_token(token)
        if not success and auth_service_singleton._configured:
            # If revocation failed and we're using external service, still return success
            # as the token might be invalid anyway
            pass
    
    return {"message": "Logged out successfully", "user_id": user.id}


# =============================================================================
# Admin-Only Routes
# =============================================================================

@router.get("/admin/dashboard", tags=["admin"])
async def admin_dashboard(user: User = Depends(require_admin)):
    """
    Admin dashboard with system overview.
    
    Provides system statistics and administrative information.
    Requires admin role for access.
    
    Returns system stats including total users, active sessions, and health status.
    """
    return {
        "message": "Welcome to admin dashboard",
        "user": {
            "id": user.id,
            "email": user.email,
            "roles": [role.value for role in user.roles]
        },
        "system_stats": {
            "total_users": 1250,
            "active_sessions": 89,
            "system_health": "healthy"
        }
    }


@router.get("/admin/users")
async def list_all_users(user: User = Depends(require_user_management)):
    """List all users in the system (admin only)."""
    return {
        "users": [
            {"id": "1", "email": "user1@example.com", "role": "student"},
            {"id": "2", "email": "user2@example.com", "role": "teacher"},
            {"id": "3", "email": "user3@example.com", "role": "admin"}
        ],
        "total": 3
    }


@router.post("/admin/users")
async def create_user(
    user_data: dict,
    admin_user: User = Depends(require_all_permissions(Permission.CREATE_USER))
):
    """Create a new user (admin only)."""
    return {
        "message": "User created successfully",
        "user_id": "new-user-123",
        "created_by": admin_user.id
    }


@router.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: str,
    admin_user: User = Depends(require_all_permissions(Permission.DELETE_USER))
):
    """Delete a user (admin only)."""
    return {
        "message": f"User {user_id} deleted successfully",
        "deleted_by": admin_user.id
    }


@router.get("/admin/api-keys")
async def list_api_keys(admin_user: User = Depends(require_admin)):
    """List all API keys (admin only)."""
    from auth.api_key_middleware import APIKeyMiddleware
    
    # Get API key middleware instance
    middleware = None
    for mw in app.user_middleware:
        if isinstance(mw.cls, APIKeyMiddleware):
            middleware = mw.cls(app)
            break
    
    if not middleware:
        raise HTTPException(status_code=500, detail="API key middleware not found")
    
    # Return sanitized API key information
    api_keys = []
    for key, info in middleware.api_keys.items():
        api_keys.append({
            "key_id": info.key_id,
            "name": info.name,
            "roles": info.roles,
            "permissions": info.permissions,
            "is_active": info.is_active,
            "expires_at": info.expires_at,
            "created_at": info.created_at,
            "last_used_at": info.last_used_at,
            "usage_count": info.usage_count,
            "metadata": info.metadata,
            "key_preview": f"{key[:8]}...{key[-4:]}"  # Show partial key for identification
        })
    
    return {
        "api_keys": api_keys,
        "total": len(api_keys),
        "requested_by": admin_user.id
    }


@router.post("/admin/api-keys")
async def create_api_key(
    key_data: dict,
    admin_user: User = Depends(require_admin)
):
    """Create a new API key (admin only)."""
    import secrets
    import time
    
    name = key_data.get("name", "New API Key")
    roles = key_data.get("roles", ["student"])
    permissions = key_data.get("permissions", ["external_api_access"])
    expires_days = key_data.get("expires_days", 365)  # Default 1 year
    metadata = key_data.get("metadata", {})
    
    # Generate secure API key
    api_key = f"ak_{secrets.token_urlsafe(32)}"
    
    # Calculate expiration
    expires_at = int(time.time()) + (expires_days * 24 * 60 * 60)
    
    # Create API key info
    key_info = {
        "key": api_key,
        "key_id": f"key-{int(time.time())}",
        "name": name,
        "roles": roles,
        "permissions": permissions,
        "is_active": True,
        "expires_at": expires_at,
        "created_at": int(time.time()),
        "metadata": metadata
    }
    
    # In a real implementation, you would save this to a database
    # For now, we'll just return the key info
    return {
        "message": "API key created successfully",
        "api_key": api_key,  # Only returned once during creation
        "key_info": key_info,
        "created_by": admin_user.id,
        "warning": "Store this API key securely. It will not be shown again."
    }


@router.put("/admin/api-keys/{key_id}")
async def update_api_key(
    key_id: str,
    update_data: dict,
    admin_user: User = Depends(require_admin)
):
    """Update an API key (admin only)."""
    from auth.api_key_middleware import APIKeyMiddleware
    
    # Get API key middleware instance
    middleware = None
    for mw in app.user_middleware:
        if isinstance(mw.cls, APIKeyMiddleware):
            middleware = mw.cls(app)
            break
    
    if not middleware:
        raise HTTPException(status_code=500, detail="API key middleware not found")
    
    # Find the API key
    key_info = None
    target_key = None
    for key, info in middleware.api_keys.items():
        if info.key_id == key_id:
            key_info = info
            target_key = key
            break
    
    if not key_info:
        raise HTTPException(status_code=404, detail="API key not found")
    
    # Update allowed fields
    if "name" in update_data:
        key_info.name = update_data["name"]
    if "roles" in update_data:
        key_info.roles = update_data["roles"]
    if "permissions" in update_data:
        key_info.permissions = update_data["permissions"]
    if "is_active" in update_data:
        key_info.is_active = update_data["is_active"]
    if "metadata" in update_data:
        key_info.metadata.update(update_data["metadata"])
    
    return {
        "message": f"API key {key_id} updated successfully",
        "updated_by": admin_user.id,
        "key_info": {
            "key_id": key_info.key_id,
            "name": key_info.name,
            "roles": key_info.roles,
            "permissions": key_info.permissions,
            "is_active": key_info.is_active,
            "expires_at": key_info.expires_at,
            "created_at": key_info.created_at,
            "last_used_at": key_info.last_used_at,
            "usage_count": key_info.usage_count,
            "metadata": key_info.metadata
        }
    }


@router.delete("/admin/api-keys/{key_id}")
async def delete_api_key(
    key_id: str,
    admin_user: User = Depends(require_admin)
):
    """Delete an API key (admin only)."""
    from auth.api_key_middleware import APIKeyMiddleware
    
    # Get API key middleware instance
    middleware = None
    for mw in app.user_middleware:
        if isinstance(mw.cls, APIKeyMiddleware):
            middleware = mw.cls(app)
            break
    
    if not middleware:
        raise HTTPException(status_code=500, detail="API key middleware not found")
    
    # Find and remove the API key
    target_key = None
    for key, info in middleware.api_keys.items():
        if info.key_id == key_id:
            target_key = key
            break
    
    if not target_key:
        raise HTTPException(status_code=404, detail="API key not found")
    
    # Remove from middleware (in production, this would be persisted to database)
    del middleware.api_keys[target_key]
    
    return {
        "message": f"API key {key_id} deleted successfully",
        "deleted_by": admin_user.id
    }


@router.get("/system/status")
async def system_status(user: User = Depends(require_system_management)):
    """Get system status and health metrics."""
    return {
        "status": "healthy",
        "uptime": "7 days, 3 hours",
        "memory_usage": "45%",
        "cpu_usage": "23%",
        "active_connections": 156
    }


# =============================================================================
# Teacher and Admin Routes
# =============================================================================

@router.get("/teacher/dashboard", tags=["rbac"])
async def teacher_dashboard(user: User = Depends(require_teacher_or_admin)):
    """
    Teacher dashboard with course management.
    
    Provides course management interface for teachers.
    Requires teacher or admin role for access.
    
    Returns course information and teaching statistics.
    """
    return {
        "message": "Welcome to teacher dashboard",
        "user": {
            "id": user.id,
            "email": user.email,
            "roles": [role.value for role in user.roles]
        },
        "courses": [
            {"id": "1", "name": "Mathematics 101", "students": 25},
            {"id": "2", "name": "Physics 201", "students": 18}
        ]
    }


@router.get("/courses")
async def list_courses(user: User = Depends(require_student_or_above)):
    """List all courses (students, teachers, admins)."""
    return {
        "courses": [
            {"id": "1", "name": "Mathematics 101", "instructor": "Dr. Smith"},
            {"id": "2", "name": "Physics 201", "instructor": "Dr. Johnson"},
            {"id": "3", "name": "Chemistry 101", "instructor": "Dr. Brown"}
        ]
    }


@router.post("/courses")
async def create_course(
    course_data: dict,
    user: User = Depends(require_course_management)
):
    """Create a new course (teachers and admins)."""
    return {
        "message": "Course created successfully",
        "course_id": "new-course-123",
        "created_by": user.id
    }


@router.put("/courses/{course_id}")
async def update_course(
    course_id: str,
    course_data: dict,
    user: User = Depends(require_course_management)
):
    """Update a course (teachers and admins)."""
    return {
        "message": f"Course {course_id} updated successfully",
        "updated_by": user.id
    }


@router.delete("/courses/{course_id}")
async def delete_course(
    course_id: str,
    user: User = Depends(require_all_permissions(Permission.DELETE_COURSE))
):
    """Delete a course (admins only)."""
    return {
        "message": f"Course {course_id} deleted successfully",
        "deleted_by": user.id
    }


@router.get("/content")
async def list_content(user: User = Depends(require_student_or_above)):
    """List all content (students, teachers, admins)."""
    return {
        "content": [
            {"id": "1", "title": "Introduction to Calculus", "type": "lesson"},
            {"id": "2", "title": "Physics Lab Manual", "type": "lab"},
            {"id": "3", "title": "Chemistry Quiz", "type": "quiz"}
        ]
    }


@router.post("/content")
async def create_content(
    content_data: dict,
    user: User = Depends(require_content_management)
):
    """Create new content (teachers and admins)."""
    return {
        "message": "Content created successfully",
        "content_id": "new-content-123",
        "created_by": user.id
    }


# =============================================================================
# Student Routes (Students, Teachers, Admins)
# =============================================================================

@router.get("/student/dashboard")
async def student_dashboard(user: User = Depends(require_student_or_above)):
    """Student dashboard with enrolled courses."""
    return {
        "message": "Welcome to student dashboard",
        "user": {
            "id": user.id,
            "email": user.email,
            "roles": [role.value for role in user.roles]
        },
        "enrolled_courses": [
            {"id": "1", "name": "Mathematics 101", "progress": "75%"},
            {"id": "2", "name": "Physics 201", "progress": "45%"}
        ]
    }


@router.get("/questions")
async def list_questions(user: User = Depends(require_student_or_above)):
    """List questions (students, teachers, admins)."""
    return {
        "questions": [
            {"id": "1", "text": "What is the derivative of x²?", "type": "math"},
            {"id": "2", "text": "Explain Newton's laws", "type": "physics"}
        ]
    }


@router.post("/questions")
async def create_question(
    question_data: dict,
    user: User = Depends(require_permissions(Permission.CREATE_QUESTION))
):
    """Create a new question (students, teachers, admins)."""
    return {
        "message": "Question created successfully",
        "question_id": "new-question-123",
        "created_by": user.id
    }
