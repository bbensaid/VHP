import os

def list_files(startpath):
    # Folders to completely ignore
    ignore = {'.git', 'node_modules', '__pycache__', 'venv', 'env', '.idea', 'dist', 'build'}
    
    for root, dirs, files in os.walk(startpath):
        # Filter out ignored folders
        dirs[:] = [d for d in dirs if d not in ignore]
        
        # logical depth check (root is 0)
        depth = root.replace(startpath, '').count(os.sep)
        if depth > 2: continue # Stop going deeper than 2 sub-folders
        
        indent = ' ' * 4 * (depth)
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 4 * (depth + 1)
        for f in files:
            print(f'{subindent}{f}')

if __name__ == "__main__":
    list_files('.')