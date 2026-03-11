import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Gemini client
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is required in your .env file")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        temperature=0.7,
    ),
    system_instruction="You are a CMS JSON generator. Always respond with valid JSON only.",
)


def generate_sanity_article(topic, data_points):
    """
    Generates a Sanity-compatible JSON article using Gemini and a prompt template.
    """

    # 1. Define Paths
    base_path = os.getcwd()
    template_path = "frontend/sanity/prompt_template_v10.txt"

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

    # 4. Call Gemini with JSON enforcement
    print(f"Generating article for: {topic}...")

    try:
        response = model.generate_content(final_prompt)
        raw_content = response.text
    except Exception as e:
        print(f"❌ Gemini API Error: {e}")
        return

    # 5. Extract and Validate
    try:
        article_json = json.loads(raw_content)

        output_dir = "frontend/sanity/content"
        if template_path.startswith(".."):
            output_dir = "../frontend/sanity/content"

        os.makedirs(output_dir, exist_ok=True)

        slug = article_json.get("slug", {}).get("current", "untitled-article")
        filename = os.path.join(output_dir, f"{slug}.json")

        with open(filename, "w", encoding="utf-8") as out:
            json.dump(article_json, out, indent=2, ensure_ascii=False)

        print(f"✅ Success! Saved to {filename}")
        return article_json

    except json.JSONDecodeError:
        print("❌ Error: Gemini did not output valid JSON.")
        print("Raw Output:", raw_content)
    except Exception as e:
        print(f"❌ Error saving file: {e}")


if __name__ == "__main__":
    print("--- Sanity Content Generator (Gemini) ---")
    topic_in = input("Enter Topic: ") or "The Impact of AI on Rural Health"
    data_in = input("Enter Key Data: ") or "Cost reduction: 15%, Efficiency: +20%"

    generate_sanity_article(topic_in, data_in)
