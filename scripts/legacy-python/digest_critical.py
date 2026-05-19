import os

def read_file(path):
    print(f"\n--- START FILE: {path} ---")
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            print(f.read())
    except Exception as e:
        print(f"[Error reading file: {e}]")
    print(f"--- END FILE: {path} ---")

def run_digest():
    # 1. SPECIFIC CRITICAL FILES
    target_files = [
        # The Import Logic (How JSON is read)
        "frontend/scripts/import.js",
        "frontend/scripts/import_one.js",
        "frontend/scripts/import-glossary.js",
        
        # The UI Configuration (How colors/themes are defined)
        "frontend/app/themes.ts",
        "frontend/tailwind.config.js",
        "frontend/app/globals.css",
        
        # The Backend Logic (If generation happens here)
        "backend/main.py", 
        
        # The Prompt/Instructions (If in text format)
        "frontend/sanity/master_instructions_block.txt"
    ]

    for t in target_files:
        if os.path.exists(t):
            read_file(t)
        else:
            print(f"\n[!] File not found (skipping): {t}")

    # 2. SANITY FOLDER SCAN (CRITICAL FOR SCHEMA)
    # Schemas are often split across multiple files. We grab all .ts/.js in sanity/
    sanity_dir = "frontend/sanity"
    if os.path.exists(sanity_dir):
        print(f"\n=== SCANNING {sanity_dir} FOR SCHEMAS ===")
        for root, dirs, files in os.walk(sanity_dir):
            for file in files:
                # We want config, schemas, and types
                if file.endswith(".ts") or file.endswith(".js") or file.endswith(".json"):
                    # Skip node_modules or dist if they somehow exist there
                    if "node_modules" in root: continue
                    
                    full_path = os.path.join(root, file)
                    read_file(full_path)

if __name__ == "__main__":
    run_digest()