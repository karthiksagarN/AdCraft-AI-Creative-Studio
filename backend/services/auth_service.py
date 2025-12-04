from supabase import create_client, Client
from config import Config

class AuthService:
    _client: Client = None

    @classmethod
    def get_client(cls) -> Client:
        if not cls._client:
            if Config.SUPABASE_URL and Config.SUPABASE_KEY:
                cls._client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
            else:
                print("Warning: Supabase credentials not set.")
                return None
        return cls._client

    @classmethod
    def get_admin_client(cls) -> Client:
        if Config.SUPABASE_URL and Config.SUPABASE_SERVICE_ROLE_KEY:
            return create_client(Config.SUPABASE_URL, Config.SUPABASE_SERVICE_ROLE_KEY)
        return None

    @staticmethod
    def sign_up(email: str, password: str):
        client = AuthService.get_client()
        if not client:
            return {"error": "Supabase not configured"}
        try:
            res = client.auth.sign_up({
                "email": email,
                "password": password
            })
            return res
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def sign_in(email: str, password: str):
        client = AuthService.get_client()
        if not client:
            return {"error": "Supabase not configured"}
        try:
            res = client.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            return res
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_user(token: str):
        client = AuthService.get_client()
        if not client:
            return None
        try:
            res = client.auth.get_user(token)
            return res.user
        except Exception as e:
            print(f"Error verifying token: {e}")
            return None

    @staticmethod
    def check_and_increment_usage(token: str, limit: int = 2):
        client = AuthService.get_client()
        admin_client = AuthService.get_admin_client()
        
        if not client or not admin_client:
            return {"error": "Supabase configuration missing (Anon or Service Role Key)"}
        
        try:
            # 1. Get User (Verify Token)
            user_res = client.auth.get_user(token)
            user = user_res.user
            if not user:
                return {"error": "Invalid token"}

            # 2. Check Metadata
            metadata = user.user_metadata or {}
            current_usage = metadata.get("demo_uses", 0)
            
            if current_usage >= limit:
                return {"error": "Demo limit reached", "usage": current_usage}

            # 3. Increment using Admin Client
            new_usage = current_usage + 1
            admin_client.auth.admin.update_user_by_id(
                user.id,
                {"user_metadata": {**metadata, "demo_uses": new_usage}}
            )
            
            return {"success": True, "usage": new_usage}

        except Exception as e:
            print(f"Error tracking usage: {e}")
            return {"error": str(e)}
