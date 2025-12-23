import os
import logging
from dotenv import load_dotenv

# --- 1. Server Imports (New) ---
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- 2. LlamaIndex Imports (From your code) ---
from llama_index.llms.google_genai import GoogleGenAI
from llama_index.core import Document, VectorStoreIndex, Settings, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding

# --- 3. Configuration & Secrets ---
load_dotenv(override=True)
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY not found. Please create a .env file with your key.")

print(f"🔑 DEBUG: Loaded API Key: {api_key[:10]}... (Server Starting)")

# --- 4. Initialize FastAPI Server ---
app = FastAPI(title="Vermont Health Brain")

# Enable CORS so Next.js (port 3000) can talk to Python (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 5. AI Settings (Your Specific Models) ---
# LLM: Flash Lite (High quota, low cost)
Settings.llm = GoogleGenAI(model="models/gemini-flash-lite-latest", api_key=api_key)

# Embedding: Text Embedding 004
Settings.embed_model = GoogleGenAIEmbedding(model="models/text-embedding-004", api_key=api_key)

# Global variable to store the "Brain"
chat_engine = None
startup_error = None

# --- 6. Data Loading (Runs once on Startup) ---
@app.on_event("startup")
async def startup_event():
    global chat_engine, startup_error
    print("\n🚀 Server starting up... loading data.")

    # Define the data path relative to this file
    current_dir = os.path.dirname(__file__)
    data_dir = os.path.join(current_dir, "data")
    
    # Check if data folder exists
    if not os.path.exists(data_dir):
        print(f"⚠️ Warning: Data directory not found at {data_dir}")
        print("   Using a dummy document so the server doesn't crash.")
        documents = [Document(text="No PDF files found. Please add PDFs to the data folder.")]
    else:
        # Load EVERYTHING in the data folder (Wyman Report + Textbook)
        print(f"📂 Scanning folder: {data_dir}")
        try:
            documents = SimpleDirectoryReader(data_dir).load_data()
            print(f"📄 Loaded {len(documents)} pages/chunks from PDFs.")
        except Exception as e:
            print(f"❌ Error loading PDFs: {e}")
            documents = [Document(text="Error loading documents.")]

    # Create the Index
    try:
        print("⏳ Generating embeddings and index... (this might take a moment)")
        # We use your SentenceSplitter logic here implicitly via VectorStoreIndex defaults
        index = VectorStoreIndex.from_documents(documents)
        chat_engine = index.as_chat_engine(chat_mode="context")
        print("✅ Index ready! The API is listening.")
        
    except Exception as e:
        startup_error = str(e)
        print(f"\n❌ Fatal Error during indexing: {e}")
        if "403" in str(e) or "PERMISSION_DENIED" in str(e):
            print("🚨 CRITICAL: Your Google API Key is blocked.")

# --- 7. The Endpoint (This replaces your While Loop) ---
class ChatRequest(BaseModel):
    question: str

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Frontend sends: { "question": "What is Act 167?" }
    Backend replies: { "answer": "Act 167 is..." }
    """
    if startup_error:
        raise HTTPException(status_code=500, detail=f"Startup Error: {startup_error}")
    if not chat_engine:
        raise HTTPException(status_code=500, detail="Server is still starting up. Try again in 5 seconds.")
    
    try:
        response = await chat_engine.achat(request.question)
        return {"answer": str(response)}
    except Exception as e:
        print(f"❌ Error generating response: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "ok", "model": "gemini-flash-lite-latest"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)