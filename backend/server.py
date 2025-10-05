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

# Portfolio API Endpoints
@api_router.get("/portfolio")
async def get_portfolio():
    """Get portfolio data - for now returning static data, can be moved to DB later"""
    from portfolio_data import get_portfolio_data
    try:
        portfolio_data = get_portfolio_data()
        return {"success": True, "data": portfolio_data}
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching portfolio data")

# Contact Form Endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactForm):
    """Handle contact form submission"""
    try:
        # Store contact form in database
        contact_dict = contact_data.dict()
        contact_dict['timestamp'] = datetime.utcnow()
        contact_dict['status'] = 'new'
        contact_dict['id'] = str(uuid.uuid4())
        
        # Save to database
        await db.contacts.insert_one(contact_dict)
        
        # Send email notification (if SMTP is configured)
        try:
            await send_contact_email(contact_data)
        except Exception as email_error:
            logger.warning(f"Failed to send email notification: {str(email_error)}")
            # Don't fail the API call if email fails
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon."
        )
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing contact form")

@api_router.get("/contacts")
async def get_contacts():
    """Get all contact form submissions - admin endpoint"""
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
        return {"success": True, "data": contacts}
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching contacts")

# Email sending function
async def send_contact_email(contact_data: ContactForm):
    """Send email notification for contact form submission"""
    
    # Check if email configuration exists
    smtp_server = os.environ.get('SMTP_SERVER')
    smtp_port = os.environ.get('SMTP_PORT', '587')
    smtp_username = os.environ.get('SMTP_USERNAME')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('CONTACT_EMAIL', contact_data.email)
    
    if not all([smtp_server, smtp_username, smtp_password]):
        logger.warning("SMTP configuration not found, skipping email notification")
        return
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact: {contact_data.subject}"
        
        # Email body
        body = f"""
        New contact form submission from your portfolio:
        
        Name: {contact_data.name}
        Email: {contact_data.email}
        Subject: {contact_data.subject}
        
        Message:
        {contact_data.message}
        
        ---
        Sent from Jatin Garg's Portfolio Website
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, int(smtp_port))
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Contact email sent successfully for {contact_data.name}")
        
    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
        raise

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
