from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional
import uuid
import shutil
import os
import asyncio

from config import Config
from schemas import GenerateResponse, Creative
from services.storage_service import StorageService
from services.image_service import ImageService
from services.text_service import TextService
from services.zip_service import ZipService

app = FastAPI(title="AI Creative Studio API")

# CORS
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
    return {"status": "healthy", "mock_mode": Config.MOCK_MODE}

@app.post("/generate", response_model=GenerateResponse)
async def generate_creatives(
    logo: UploadFile = File(...),
    product: UploadFile = File(...),
    brand_name: str = Form(...),
    tagline: Optional[str] = Form(None),
    tone: str = Form(...),
    num_creatives: int = Form(10)
):
    session_id = str(uuid.uuid4())
    
    # Save uploads
    logo_path = await StorageService.save_upload(logo)
    product_path = await StorageService.save_upload(product)
    
    creatives = []
    tasks = []
    
    # Generate creatives in parallel
    # We'll generate 5 variations of prompts based on tone
    prompts = [
        f"A minimalist product shot of {brand_name}, {tone} lighting, clean background",
        f"A lifestyle shot of {brand_name} in use, {tone} atmosphere, happy people",
        f"A close-up detail shot of {brand_name}, {tone} texture, macro photography",
        f"A studio shot of {brand_name} on a podium, {tone} colors, dramatic lighting",
        f"A flat lay composition of {brand_name} with props, {tone} style, overhead view"
    ]
    
    # Repeat prompts to match num_creatives
    import itertools
    prompt_cycle = itertools.cycle(prompts)
    
    for i in range(num_creatives):
        prompt = next(prompt_cycle)
        # Create coroutines for image and text generation
        tasks.append(generate_single_creative(i, prompt, tone, brand_name, tagline))
        
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
        text_content = f"Headline: {res.headline}\nCaption: {res.caption}\nTone: {res.tone}"
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

async def generate_single_creative(index: int, prompt: str, tone: str, brand_name: str, tagline: str) -> Creative:
    # Generate Image
    image_path = await ImageService.generate_image(prompt, tone)
    image_url = StorageService.get_file_url(image_path)
    
    # Generate Text
    copy = TextService.generate_copy(brand_name, tone, context=f"Tagline: {tagline}")
    
    return Creative(
        id=str(uuid.uuid4()),
        image_url=image_url,
        headline=copy.get("headline", "Default Headline"),
        caption=copy.get("caption", "Default Caption"),
        tone=tone
    )

@app.get("/sessions/{session_id}/zip")
async def get_zip(session_id: str):
    # TODO: Implement zip retrieval if needed separately, but we return it in generate
    return {"status": "not implemented"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
