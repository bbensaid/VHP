import os
from dotenv import load_dotenv
from google import genai

# 1. Load your key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("❌ Error: GOOGLE_API_KEY not found in .env file")
    exit()

print(f"✅ Found API Key: {api_key[:5]}...")

# 2. Connect to Google
try:
    client = genai.Client(api_key=api_key)
    print("✅ Connected to Client. Fetching models (this may take a second)...")
    
    # 3. List Models
    found_any = False
    for m in client.models.list():
        if "gemini" in m.name:
            print(f"   • {m.name}")
            found_any = True
            
    if not found_any:
        print("❌ No 'gemini' models found. Your key might have scope issues.")

except Exception as e:
    print(f"❌ Connection failed: {e}")