import os

# CONFIGURATION
FOLDER_NAME = 'book-images'
OUTPUT_HTML = 'view_images.html'

# 1. Get files and sort by time
if not os.path.exists(FOLDER_NAME):
    print(f"Error: Folder '{FOLDER_NAME}' not found.")
    exit()

files = [f for f in os.listdir(FOLDER_NAME) if f.lower().endswith('.png')]
files.sort(key=lambda x: os.path.getmtime(os.path.join(FOLDER_NAME, x)))

# 2. Create HTML content (Just a list of images one after another)
html = "<html><head><style>"
html += "body { margin: 0; padding: 20px; text-align: center; background: #555; }"
html += "img { max-width: 100%; height: auto; display: block; margin: 0 auto; }"
html += "</style></head><body>"

for filename in files:
    # We use the relative path so the browser can find the image
    html += f'<img src="{FOLDER_NAME}/{filename}">'

html += "</body></html>"

# 3. Save file
with open(OUTPUT_HTML, "w") as f:
    f.write(html)

print(f"DONE. Open '{OUTPUT_HTML}' in Chrome or Safari, then Print -> Save as PDF.")