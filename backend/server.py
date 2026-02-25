from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


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
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = ""
    address: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactInquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    address: Optional[str] = ""
    message: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Total Family Home Solutions API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(input: ContactInquiryCreate):
    """Submit a contact/quote request form and send email notification"""
    inquiry_dict = input.model_dump()
    inquiry_obj = ContactInquiry(**inquiry_dict)
    
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.contact_inquiries.insert_one(doc)
    
    # Send email notification
    try:
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        sender_email = os.environ.get('SENDER_EMAIL')
        notification_email = os.environ.get('NOTIFICATION_EMAIL')
        
        if sendgrid_api_key and sender_email and notification_email:
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> {inquiry_obj.name}</p>
                        <p><strong>Email:</strong> {inquiry_obj.email}</p>
                        <p><strong>Phone:</strong> {inquiry_obj.phone or 'Not provided'}</p>
                        <p><strong>Project Address:</strong> {inquiry_obj.address or 'Not provided'}</p>
                    </div>
                    <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h3 style="color: #334155; margin-top: 0;">Project Details:</h3>
                        <p>{inquiry_obj.message}</p>
                    </div>
                    <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
                        Submitted on {inquiry_obj.created_at.strftime('%B %d, %Y at %I:%M %p')}
                    </p>
                </div>
            </body>
            </html>
            """
            
            message = Mail(
                from_email=sender_email,
                to_emails=notification_email,
                subject=f"New Quote Request from {inquiry_obj.name}",
                html_content=html_content
            )
            
            sg = SendGridAPIClient(sendgrid_api_key)
            sg.send(message)
            logger.info(f"Email notification sent for contact inquiry from {inquiry_obj.name}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        # Don't raise exception - still save the inquiry even if email fails
    
    return inquiry_obj

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    """Get all contact inquiries"""
    inquiries = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
    
    for inquiry in inquiries:
        if isinstance(inquiry['created_at'], str):
            inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
    
    return inquiries


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
