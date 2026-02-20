import json
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Client
# Ensure OPENAI_API_KEY is set in your environment or .env file
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_sanity_article(topic, data_points):
    """
    Generates a Sanity-compatible JSON article using OpenAI and a prompt template.
    """
    
    # 1. Define Paths
    # We check if we are in root or backend to find the template
    base_path = os.getcwd()
    template_path = "frontend/sanity/prompt_template_v10.txt"
    
    # If running from backend/ directory, adjust path
    if base_path.endswith("backend") or not os.path.exists(template_path):
        if os.path.exists("../frontend/sanity/prompt_template_v10.txt"):
            template_path = "../frontend/sanity/prompt_template_v10.txt"
        
    if not os.path.exists(template_path):
        print(f"❌ Error: Template file not found at {template_path}")
        print(f"Current working directory: {base_path}")
        return

    # 2. Load the Template
    with open(template_path, "r", encoding="utf-8") as f:
        prompt_content = f.read()

    # 3. Inject Variables
    final_prompt = prompt_content.replace("[Insert Topic]", topic)
    final_prompt = final_prompt.replace("[Insert Data]", data_points)

    # 4. Call LLM with JSON Enforcement
    print(f"Generating article for: {topic}...")
    
    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo", 
            messages=[
                {"role": "system", "content": "You are a CMS JSON generator."},
                {"role": "user", "content": final_prompt}
            ],
            response_format={"type": "json_object"}, # <--- CRITICAL: Enforces valid JSON
            temperature=0.7
        )
    except Exception as e:
        print(f"❌ OpenAI API Error: {e}")
        return

    # 5. Extract and Validate
    raw_content = response.choices[0].message.content
    
    try:
        article_json = json.loads(raw_content)
        
        # Determine output directory based on template path logic
        output_dir = "frontend/sanity/content"
        if template_path.startswith(".."):
            output_dir = "../frontend/sanity/content"
            
        # Ensure directory exists
        os.makedirs(output_dir, exist_ok=True)

        # Save to file for import
        slug = article_json.get('slug', {}).get('current', 'untitled-article')
        filename = os.path.join(output_dir, f"{slug}.json")
        
        with open(filename, "w", encoding="utf-8") as out:
            json.dump(article_json, out, indent=2, ensure_ascii=False)
            
        print(f"✅ Success! Saved to {filename}")
        return article_json
        
    except json.JSONDecodeError:
        print("❌ Error: LLM did not output valid JSON.")
        print("Raw Output:", raw_content)
    except Exception as e:
        print(f"❌ Error saving file: {e}")

if __name__ == "__main__":
    # Example Usage
    print("--- Sanity Content Generator ---")
    topic_in = input("Enter Topic: ") or "The Impact of AI on Rural Health"
    data_in = input("Enter Key Data: ") or "Cost reduction: 15%, Efficiency: +20%"
    
    generate_sanity_article(topic_in, data_in)