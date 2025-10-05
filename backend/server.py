from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Portfolio Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    email: str
    phone: Optional[str] = None
    linkedin: str
    twitter: Optional[str] = None
    youtube: Optional[str] = None
    location: str
    profileImage: str
    bio: str

class Experience(BaseModel):
    company: str
    location: str
    role: str
    period: str
    achievements: List[str]

class Project(BaseModel):
    title: str
    subtitle: str
    description: str
    technologies: List[str]
    videoUrl: Optional[str] = None
    category: str

class Skills(BaseModel):
    gamedev: List[str]
    programming: List[str]
    tools: List[str]

class CurrentWork(BaseModel):
    title: str
    subtitle: str
    company: str
    description: str
    myContributions: List[str]
    technologies: List[str]
    impact: str

class CoreStrength(BaseModel):
    title: str
    description: str
    skills: List[str]

class CoreStrengths(BaseModel):
    title: str
    areas: List[CoreStrength]

class Education(BaseModel):
    degree: str
    institution: str
    period: str
    cgpa: str
    additionalEducation: dict
    certifications: List[str]

class Leadership(BaseModel):
    role: str
    organization: str
    period: str
    description: str
    achievements: List[str]

class Portfolio(BaseModel):
    personal: PersonalInfo
    currentWork: CurrentWork
    coreStrengths: CoreStrengths
    skills: Skills
    experience: List[Experience]
    earlyProjects: List[Project]
    education: Education
    leadership: List[Leadership]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
