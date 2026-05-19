import os
import re

def read_file(path):
    print(f"\n--- START FILE: {path} ---")
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            print(f.read())
    except Exception as e:
        print(f"[Error reading: {e}]")
    print(f"--- END FILE: {path} ---")

def run():
    content_dir = "frontend/sanity/content"
    
    # 1. Find the latest article files
    if os.path.exists(content_dir):
        files = os.listdir(content_dir)
        # Filter for article-like json files
        article_files = [f for f in files if f.endswith('.json') and 'article' in f.lower()]
        
        # Sort them to find the latest (simple alphanumeric sort)
        article_files.sort()
        
        # Pick the last 3 files (likely the most recent versions)
        targets = article_files[-3:] if len(article_files) > 3 else article_files
        
        print(f"Found latest articles: {targets}")
        
        for f in targets:
            read_file(os.path.join(content_dir, f))
    else:
        print(f"Directory not found: {content_dir}")

    # 2. Check for the Prompt Template
    prompt_path = "frontend/sanity/prompt_template_draft.txt"
    if os.path.exists(prompt_path):
        read_file(prompt_path)
    else:
        print(f"\n[!] Prompt draft not found at: {prompt_path}")

if __name__ == "__main__":
    run()