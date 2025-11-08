from __future__ import annotations

import os
from typing import Optional
from datetime import datetime, timezone, timedelta

from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from jose import jwt

from .models import UserRole, Permission, TokenPayload

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
Base = declarative_base()

class DBUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    roles = Column(String, default=UserRole.STUDENT.value) # Stored as comma-separated string
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class UserService:
    def __init__(self, database_url: str):
        self.engine = create_engine(database_url, connect_args={"check_same_thread": False})
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        Base.metadata.create_all(bind=self.engine)

    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire.timestamp(), "iat": datetime.now(timezone.utc).timestamp()})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    def get_user_by_email(self, email: str) -> Optional[DBUser]:
        with self.SessionLocal() as session:
            return session.query(DBUser).filter(DBUser.email == email).first()

    def get_user_by_username(self, username: str) -> Optional[DBUser]:
        with self.SessionLocal() as session:
            return session.query(DBUser).filter(DBUser.username == username).first()

    def register_user(self, email: str, password: str, username: Optional[str] = None) -> DBUser:
        with self.SessionLocal() as session:
            hashed_password = self.get_password_hash(password)
            db_user = DBUser(email=email, hashed_password=hashed_password, username=username)
            try:
                session.add(db_user)
                session.commit()
                session.refresh(db_user)
                return db_user
            except IntegrityError:
                session.rollback()
                raise ValueError("Email or username already registered")

    def get_user_permissions(self, user: DBUser) -> list[str]:
        # This is a simplified example. In a real app, you'd fetch permissions based on roles.
        # For now, let's assume a default set or derive from roles.
        # If roles are stored as a comma-separated string:
        user_roles = [UserRole(role) for role in user.roles.split(',') if role in [r.value for r in UserRole]]
        all_permissions = set()
        for role in user_roles:
            all_permissions.update(Permission.get_permissions(role))
        return [p.value for p in all_permissions]

user_service_singleton = UserService(DATABASE_URL)
