from pydantic import BaseModel
from typing import List, Optional

class Creative(BaseModel):
    id: str
    image_url: str
    headline: str
    caption: str
    tone: str

class GenerateResponse(BaseModel):
    session_id: str
    creatives: List[Creative]
    zip_url: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserSignup(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: Optional[str] = None
    user: Optional[dict] = None
    error: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str
