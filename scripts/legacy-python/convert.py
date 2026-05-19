import csv
import re

def convert_repomix_to_csv(xml_file, csv_file):
    with open(xml_file, 'r', encoding='utf-8') as f:
        xml_content = f.read()

    # Match each <file path="...">...</file> block from the Repomix output
    pattern = re.compile(r'<file path="([^"]+)">(.*?)</file>', re.DOTALL)
    matches = pattern.findall(xml_content)
    
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # Write the CSV headers
        writer.writerow(['File Path', 'Content'])
        
        for file_path, file_content in matches:
            # Strip leading/trailing newlines from the code content
            writer.writerow([file_path, file_content.strip()])

    print(f"Successfully converted {len(matches)} files into {csv_file}")

# Run the conversion
convert_repomix_to_csv('repomix-output.xml', 'repomix-output.csv')