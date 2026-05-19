import os

# We need to see your Navigation Structure to fix the Prompt Enums
files = [
    "frontend/components/NavDropdown.tsx",
    "frontend/components/Header.tsx", 
    "frontend/components/Sidebar.tsx"
]

for p in files:
    if os.path.exists(p):
        print(f"\n--- START: {p} ---")
        with open(p, 'r', encoding='utf-8') as f:
            print(f.read())
        print(f"--- END: {p} ---")