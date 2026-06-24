import os
import re

FILES_IN_ORDER = [
    "Table_of_Contents.md",
    "lessons/Lesson_1_Application_Level_Instructions.md",
    "lessons/Lesson_2_The_5_Part_Framework.md",
    "lessons/Lesson_3_The_Art_of_Chunking.md",
    "lessons/Lesson_4_Stateful_Prompting.md",
    "lessons/Lesson_5_InfoSec_and_Prompting.md",
    "lessons/Module_1_Capstone.md",
    "lessons/Lesson_6_Packaging_Workflows.md",
    "lessons/Lesson_7_Agentic_Delegation.md",
    "lessons/Module_2_Capstone.md",
    "lessons/Lesson_8_Dynamic_Memory_and_Self_Correction.md",
    "lessons/Lesson_9_Continuous_Validation_and_Sandboxing.md",
    "lessons/Lesson_10_Multi_Agent_Orchestration.md",
    "lessons/Module_3_Capstone.md"
]

OUTPUT_DIR = "Outputs"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Vibe_Coding_Masterclass.md")

def build_ebook():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    combined_content = []
    
    # Title Page
    combined_content.append("# The Vibe Coding & Stateful Prompting Masterclass\n\n*A comprehensive guide to Agentic Engineering*\n\n---\n")

    for filename in FILES_IN_ORDER:
        if not os.path.exists(filename):
            print(f"Warning: {filename} not found.")
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Clean up internal markdown links for the single file format
        # This regex matches markdown links to local .md files and converts them to anchor links or plain text
        # E.g. [Lesson 1](Lesson_1_Application_Level_Instructions.md) -> [Lesson 1](#lesson-1)
        # We will do a simple stripping of the link URL if it ends with .md to avoid broken links
        content = re.sub(r'\[([^\]]+)\]\([^\)]+\.md\)', r'**\1**', content)
        
        combined_content.append(content)
        combined_content.append("\n\n<div style=\"page-break-after: always;\"></div>\n\n---\n\n")
        
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("".join(combined_content))
        
    print(f"Successfully built eBook at {OUTPUT_FILE}")

if __name__ == "__main__":
    build_ebook()
