from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional
import uuid
import shutil
import os
import asyncio

from config import Config
from schemas import GenerateResponse, Creative, UserLogin, UserSignup, AuthResponse, ContactMessage
from services.storage_service import StorageService
from services.image_service import ImageService
from services.text_service import TextService
from services.zip_service import ZipService
from services.auth_service import AuthService

app = FastAPI(title="AI Creative Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
app.mount("/static", StaticFiles(directory=Config.STATIC_DIR), name="static")

@app.head("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/contact")
async def contact_form(msg: ContactMessage):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    try:
        sender_email = Config.MAIL_USERNAME
        sender_password = Config.MAIL_PASSWORD
        receiver_email = Config.MAIL_USERNAME # Send to self

        if not sender_email or not sender_password:
            print("Mail credentials not found. Logging to console instead.")
            print(f"--- NEW CONTACT MESSAGE ---")
            print(f"From: {msg.name} <{msg.email}>")
            print(f"Subject: {msg.subject}")
            print(f"Message: {msg.message}")
            print(f"---------------------------")
            return {"status": "success", "message": "Message logged (credentials missing)"}

        # Create message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = f"New Contact Form: {msg.subject}"
        message["Reply-To"] = msg.email

        body = f"""
        You have received a new message from the contact form.

        Name: {msg.name}
        Email: {msg.email}
        Subject: {msg.subject}

        Message:
        {msg.message}
        """
        message.attach(MIMEText(body, "plain"))

        # Send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(message)

        return {"status": "success", "message": "Email sent successfully"}

    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@app.post("/auth/signup", response_model=AuthResponse)
async def signup(user: UserSignup):
    res = AuthService.sign_up(user.email, user.password)
    if "error" in res:
        raise HTTPException(status_code=400, detail=res["error"])
    return {"user": res.user.dict() if hasattr(res, 'user') and res.user else None}

@app.post("/auth/login", response_model=AuthResponse)
async def login(user: UserLogin):
    res = AuthService.sign_in(user.email, user.password)
    if isinstance(res, dict) and "error" in res:
        raise HTTPException(status_code=400, detail=res["error"])
    return {"access_token": res.session.access_token, "user": res.user.dict()}


@app.post("/generate", response_model=GenerateResponse)
async def generate_creatives(
    logo: UploadFile = File(...),
    product: UploadFile = File(...),
    brand_name: str = Form(...),
    tagline: Optional[str] = Form(None),
    tone: str = Form(...),
    style_key: str = Form("premium"),
    tagline_mode: str = Form("auto"),
    num_creatives: int = Form(2),
    authorization: Optional[str] = Header(None)
):
    # Verify Auth & Limit
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    
    token = authorization.replace("Bearer ", "")
    usage_res = AuthService.check_and_increment_usage(token)
    
    if "error" in usage_res:
        if usage_res["error"] == "Demo limit reached":
            raise HTTPException(status_code=403, detail="Demo limit reached (Max 2 generations)")
        else:
            raise HTTPException(status_code=401, detail=usage_res["error"])

    session_id = str(uuid.uuid4())

    # Save uploads
    logo_path = await StorageService.save_upload(logo)
    product_path = await StorageService.save_upload(product)
    
    creatives = []
    tasks = []
    
    # Generate creatives in parallel
    for i in range(num_creatives):
        # Determine tagline based on mode
        current_tagline = None
        if tagline_mode == "manual":
            current_tagline = tagline
        elif tagline_mode == "auto":
            current_tagline = TextService.generate_tagline(brand_name, tone)
        # if none, current_tagline remains None
            
        # Create coroutines for image and text generation
        tasks.append(generate_single_creative(i, tone, brand_name, current_tagline, product_path, logo_path, style_key, tagline_mode))
        
    results = await asyncio.gather(*tasks)
    
    files_to_zip = []
    
    for i, res in enumerate(results, 1):
        creatives.append(res)
        
        # Original image path
        filename = res.image_url.split("/")[-1]
        original_image_path = os.path.join(Config.CREATIVES_DIR, filename)
        
        # New filenames for zip
        image_name = f"ad_variant_{i:02d}.png"
        text_name = f"ad_variant_{i:02d}.txt"
        
        # Add image mapping
        files_to_zip.append({
            "path": original_image_path,
            "name": image_name
        })
        
        # Create text file
        text_content = f"Headline: {res.headline}\nCaption: {res.caption}\nTone: {res.tone}\nTagline: {res.caption if res.caption else 'N/A'}" # res.caption is actually used for tagline in schema? No, schema has caption.
        # Wait, schema has headline/caption. I should probably store the tagline used in the text file too.
        # Let's check schema again. Creative has headline, caption.
        # I'll put the tagline in the text file.
        text_content = f"Headline: {res.headline}\nTagline: {res.caption}\nTone: {res.tone}" # Using caption field for tagline for now as per previous logic?
        # Previous logic: caption=copy.get("caption")
        # I should probably be consistent.
        
        text_path = os.path.join(Config.TEMP_DIR, f"{session_id}_{text_name}")
        with open(text_path, "w") as f:
            f.write(text_content)
            
        # Add text mapping
        files_to_zip.append({
            "path": text_path,
            "name": text_name
        })

    # Create ZIP
    zip_url_path = ZipService.create_zip(session_id, files_to_zip)
    zip_url = StorageService.get_file_url(zip_url_path)
    
    return {
        "session_id": session_id,
        "creatives": creatives,
        "zip_url": zip_url
    }

async def generate_single_creative(index: int, tone: str, brand_name: str, tagline: str, product_path: str, logo_path: str, style_key: str, tagline_mode: str) -> Creative:
    # Generate Image
    image_path = await ImageService.generate_image(brand_name, tone, tagline, product_path, logo_path, style_key, tagline_mode)
    image_url = StorageService.get_file_url(image_path)
    
    # Generate Text (Headline/Caption) - Independent of tagline on image
    copy = TextService.generate_copy(brand_name, tone, context=f"Tagline: {tagline}")
    
    return Creative(
        id=str(uuid.uuid4()),
        image_url=image_url,
        headline=copy.get("headline", "Default Headline"),
        caption=tagline if tagline else copy.get("caption", "Default Caption"), # Return the used tagline as caption for display
        tone=tone
    )

@app.get("/sessions/{session_id}/zip")
async def get_zip(session_id: str):
    # TODO: Implement zip retrieval if needed separately, but we return it in generate
    return {"status": "not implemented"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
