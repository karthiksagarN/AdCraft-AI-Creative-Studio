import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    FAL_KEY = os.getenv("FAL_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Supabase Config
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    
    MOCK_MODE = not (FAL_KEY and OPENAI_API_KEY)
    
    # Storage paths
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    STATIC_DIR = os.path.join(BASE_DIR, "static")
    CREATIVES_DIR = os.path.join(STATIC_DIR, "creatives")
    TEMP_DIR = os.path.join(STATIC_DIR, "temp")

    @staticmethod
    def ensure_dirs():
        os.makedirs(Config.CREATIVES_DIR, exist_ok=True)
        os.makedirs(Config.TEMP_DIR, exist_ok=True)

Config.ensure_dirs()
