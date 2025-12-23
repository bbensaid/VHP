import os
from dotenv import load_dotenv

load_dotenv(override=True)  # This loads the .env file

api_key = os.getenv("GOOGLE_API_KEY") # Now you can use it
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found. Please create a .env file with your key.")
print(f"🔑 DEBUG: Loaded API Key: {api_key[:10]}... (Check if this matches your NEW key)")

#######

from llama_index.llms.google_genai import GoogleGenAI

# It automatically grabs the key from os.environ["GOOGLE_API_KEY"]
llm = GoogleGenAI(model="models/gemini-flash-lite-latest", api_key=api_key)

#######

from llama_index.core import Document, VectorStoreIndex, Settings, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding

# For the Language Model (LLM), use your best general model
Settings.llm = llm

# For the Embedding Model, use the specialized embedding model
Settings.embed_model = GoogleGenAIEmbedding(model="models/text-embedding-004", api_key=api_key)

# --- End of Configuration ---



current_dir = os.path.dirname(__file__)
PDF_FILE_PATH = os.path.join(current_dir, "data/Wyman_Report.pdf")

# If the file doesn't exist in backend/data, try the parent directory (project root)
if not os.path.exists(PDF_FILE_PATH):
    PDF_FILE_PATH = os.path.join(os.path.dirname(current_dir), "data/Wyman_Report.pdf")

try:
    documents = SimpleDirectoryReader(input_files=[PDF_FILE_PATH]).load_data()
except Exception as e:
    print(f"Error loading PDF: {e}")
    print(f"Could not load the PDF file from '{PDF_FILE_PATH}'.")
    print("Please make sure the file exists and the required dependencies are installed (e.g., `pip install pypdf`).")
    documents = [Document(text="This is a dummy document. The PDF could not be loaded.")]

parser = SentenceSplitter()
nodes = parser.get_nodes_from_documents(documents)

try:
    print("⏳ Generating embeddings and index... (this might take a moment)")
    index = VectorStoreIndex(nodes)
    query_engine = index.as_query_engine()
except Exception as e:
    print(f"\n❌ Fatal Error during indexing: {e}")
    if "403" in str(e) or "PERMISSION_DENIED" in str(e):
        print("\n🚨 CRITICAL: Your Google API Key is blocked.")
        print("Reason: It was likely detected as leaked on a public repository.")
        print("👉 Action: Generate a NEW key at https://aistudio.google.com/app/apikey and update your .env file.")
    exit()

print(f"Using LLM model: {Settings.llm.metadata.model_name}")
print("Ask me anything about the content of your PDF file!")

while True:
    question = input("Your question: ")
    if question.lower() == "exit":
        break
    try:
        response = query_engine.query(question)
        print(response)
    except Exception as e:
        print(f"❌ An error occurred: {e}")
